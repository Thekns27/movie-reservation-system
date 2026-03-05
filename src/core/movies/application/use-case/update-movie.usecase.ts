import { ConfigService } from '@nestjs/config';
import { Inject, Injectable } from "@nestjs/common";
import { REPOSITORY_TOKEN } from 'src/common/constant/repository.config';
import { MovieRepository } from '../../domain/repositories/movie.repository';
import { NotFoundException } from 'src/common/exceptions/not-found.exception';
import { ERROR_CODES } from 'src/common/errors/errors.code';
import { Movie } from '../../domain/entities/movie.entity';
import { UpdateMovieDto } from '../dtos/update-movie.dto';


@Injectable()

export class UpdateMovieUseCase{
    constructor (
        @Inject(REPOSITORY_TOKEN.MOVIE)
        private readonly movieRepo:MovieRepository
    ){}

    async execute (id : string,dto:UpdateMovieDto){
        const findmovie = await this.movieRepo.findById(id)
        if (!findmovie) {
            throw new NotFoundException(ERROR_CODES.MOVIE_NOT_FOUND);
        }
        const updatemovie = Movie.create({
            id : id,
            title: dto.title!,
            actors: dto.actors!,
            genre : dto.genre!,
            duration: dto.duration!,
            description: dto.description,
            isActive: true,
        })

  return await this.movieRepo.save(updatemovie);
}
}
