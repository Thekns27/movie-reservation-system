import { ConfigService } from '@nestjs/config';
import { Inject, Injectable } from "@nestjs/common";
import { REPOSITORY_TOKEN } from 'src/common/constant/repository.config';
import { MovieRepository } from '../../domain/repositories/movie.repository';
import { NotFoundException } from 'src/common/exceptions/not-found.exception';
import { ERROR_CODES } from 'src/common/errors/errors.code';


@Injectable()

export class UpdateMovieUseCase{
    constructor (
        @Inject(REPOSITORY_TOKEN.MOVIE)
        private readonly movieRepo:MovieRepository
    ){}

    async execute (id : string ) {
        const movie = await this.movieRepo.findById(id)
        if (!movie) {
            throw new NotFoundException(ERROR_CODES.MOVIE_NOT_FOUND)
        }
        return this.movieRepo.update;
    }
}