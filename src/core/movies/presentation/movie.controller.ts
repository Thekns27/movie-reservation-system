import { Controller, Post, Get, Body, Param, UseGuards, Patch } from '@nestjs/common';
import { CreateMovieUseCase } from '../application/use-case/create-movie.usecase';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateMovieDto } from '../application/dtos/create-movie.dto';
import { MovieResponseDto } from '../application/dtos/movie-response.dto';
import { MovieMapper } from '../application/mapper/movie.mapper';
import { ApiCustomResponse, ApiPaginatedResponse, PaginationMeta } from 'src/common/dto/response/response.dto';
import { FindAllMovieUseCase } from '../application/use-case/find-all-movie.usecase';
import { FindByIdMovieUseCase } from '../application/use-case/find-by-id-movie.usecase';
import { Movie } from '../domain/entities/movie.entity';

@Controller('movies')
export class MovieController {
  constructor(
    private readonly createMovieUC: CreateMovieUseCase,
    private readonly findAllmovie:FindAllMovieUseCase,
    private readonly findByMovieId: FindByIdMovieUseCase,
) {}
@Post()
//   @UseGuards(JwtAuthGuard)
@ApiOperation({ summary: 'Create a new movie' })
async create(@Body() dto: CreateMovieDto): Promise<MovieResponseDto> {
  const result = await this.createMovieUC.execute(dto);
  return MovieMapper.toResponse(result);
}


    @Get('')
    @ApiOperation({ summary: 'Get all movies' })
    @ApiPaginatedResponse(MovieResponseDto)
    @ApiResponse({ status: 500, description: 'Internal server error' })
    async findAll(): Promise<{
      data: MovieResponseDto[];
      paginateMeta: PaginationMeta;
    }> {
      return this.findAllmovie.execute();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get Movie by ID' })
    @ApiCustomResponse(MovieResponseDto)
    @ApiResponse({ status: 404, description: 'Movie not found' })
    @ApiResponse({ status: 500, description: 'Internal server error' })
    async findById(@Param('id') id: string): Promise<Movie> {
      return this.findByMovieId.execute(id);
    }

    @Patch(':id')
    async update () {

    }

}