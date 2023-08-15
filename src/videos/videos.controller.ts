import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UploadedFile,
  ParseFilePipe,
  HttpStatus,
  UseInterceptors,
  Res,
} from '@nestjs/common';
import { VideosService } from './videos.service';
import {
  CreateVideoDto,
  CreateVideoWithUploadDoc,
} from './dto/create-video.dto';
import { VideoFileValidator } from './video-file.validator';
import { FileInterceptor } from '@nestjs/platform-express';
import { createReadStream } from 'node:fs';
import { join } from 'node:path';
import { Response } from 'express';
import { VideoSerializer } from './video.serializer';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';

@Controller('videos')
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: CreateVideoWithUploadDoc,
  })
  @UseInterceptors(FileInterceptor('file'))
  @Post()
  create(
    @Body() createVideoDto: CreateVideoDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new VideoFileValidator({
            maxSize: 1024 * 1024 * 100,
            mimetype: 'video/mp4',
          }),
        ],
        errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      }),
    )
    file: Express.Multer.File,
  ) {
    console.log(file);
    return this.videosService.create({
      ...createVideoDto,
      file,
    });
  }

  @Get()
  async findAll() {
    const videos = await this.videosService.findAll();
    return videos.map((video) => new VideoSerializer(video));
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.videosService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateVideoDto: UpdateVideoDto) {
  //   return this.videosService.update(+id, updateVideoDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.videosService.remove(+id);
  // }

  @Get('file/:file')
  file(@Param('file') file: string, @Res() res: Response) {
    const fileStream = createReadStream(join(process.cwd(), 'upload', file));
    fileStream.pipe(res);
  }
}
