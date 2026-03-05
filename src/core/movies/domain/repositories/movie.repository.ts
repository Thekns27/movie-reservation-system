import { PaginationMeta } from "src/common/dto/response/response.dto";
import { Movie } from "../entities/movie.entity";


export abstract class MovieRepository {
  abstract save(movies: Movie): Promise<Movie>;
  abstract findById(id: string): Promise<Movie | null>;
  abstract findAll(): Promise<{ data: Movie[]; paginateMeta?: PaginationMeta }>;
  abstract delete(id: string): Promise<void>;
}
