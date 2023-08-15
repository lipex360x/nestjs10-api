import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(private readonly prismaService: PrismaService) {}
  create(createCategoryDto: CreateCategoryDto) {
    // throw new Error('XPTO');

    return this.prismaService.category.create({
      data: createCategoryDto,
    });
  }

  findAll() {
    return this.prismaService.category.findMany();
  }

  update(id: number, category: UpdateCategoryDto) {
    return this.prismaService.category.update({
      where: { id: id },
      data: category,
    });
  }

  findOne(id: number) {
    return this.prismaService.category.findUniqueOrThrow({ where: { id } });
  }

  remove(id: number) {
    return this.prismaService.category.delete({ where: { id } });
  }
}
