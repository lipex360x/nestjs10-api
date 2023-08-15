import { Injectable } from '@nestjs/common';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { PrismaService } from '../prisma/prisma/prisma.service';
import { InvalidRelationError } from './errors/invalid-relation.error';

@Injectable()
export class VideosService {
  constructor(private prismaService: PrismaService) {}
  async create(createVideoDto: CreateVideoDto) {
    const categoryExists = await this.prismaService.category.count({
      where: {
        id: createVideoDto.category_id,
      },
    });

    if (categoryExists === 0) {
      throw new InvalidRelationError('category not found');
    }

    const video = await this.prismaService.video.create({
      data: {
        title: createVideoDto.title,
        description: createVideoDto.description,
        category_id: createVideoDto.category_id,
        file_path: 'fake/video.mp4',
      },
    });

    return video;
  }

  findAll() {
    return this.prismaService.video.findMany();
  }

  findOne(id: number) {
    return this.prismaService.video.findUnique({
      where: {
        id,
      },
    });
  }

  update(id: number, updateVideoDto: UpdateVideoDto) {
    return `This action updates a #${id} video`;
  }

  remove(id: number) {
    return `This action removes a #${id} video`;
  }
}