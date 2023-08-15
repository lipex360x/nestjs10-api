import { Type } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateVideoDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  title: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  description?: string | null;

  @IsNotEmpty()
  @Min(1)
  @IsInt()
  @Type(() => Number)
  category_id: number;
}

// export class CreateVideoWithUploadDto extends CreateVideoDto {}
