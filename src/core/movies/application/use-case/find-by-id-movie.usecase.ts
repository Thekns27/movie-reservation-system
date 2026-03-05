import { Inject, Injectable } from "@nestjs/common";
import { REPOSITORY_TOKEN } from "src/common/constant/repository.config";
import { MovieRepository } from "../../domain/repositories/movie.repository";
import { Movie } from "../../domain/entities/movie.entity";
import { NotFoundException } from "src/common/exceptions/not-found.exception";
import { ERROR_CODES } from "src/common/errors/errors.code";


@Injectable()
export class FindByIdMovieUseCase {
    constructor (
        @Inject(REPOSITORY_TOKEN.MOVIE)
        private readonly movieRepo:MovieRepository,
    ) {}

    async execute (id : string ):Promise<Movie>{
        const movie = await this.movieRepo.findById(id)
        if(!movie){
            throw new NotFoundException(ERROR_CODES.USER_NOT_FOUND)
        }
        return movie;
    }
}