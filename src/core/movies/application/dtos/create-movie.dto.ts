import { IsArray, IsBoolean, IsEmail, IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';


export class CreateMovieDto {
  @ApiProperty({ example: 'Inception', description: 'Title of the movie' })
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiProperty({ example: 'Sci-Fi', description: 'Genre of the movie' })
  @IsString()
  @IsNotEmpty()
  genre!: string;

  @ApiProperty({
    example: ['Leonardo DiCaprio', 'Cillian Murphy'],
    description: 'List of actors'
  })
  @IsArray()
  @IsString({ each: true })
  actors!: string[];

  @ApiProperty({ example: 148, description: 'Duration in minutes' })
  @IsInt()
  @Min(1)
  duration!: number;

  @ApiPropertyOptional({
    example: 'A thief who steals corporate secrets...',
    description: 'Short summary'
  })
  @IsString()
  @IsOptional()
  description?: string;
}
