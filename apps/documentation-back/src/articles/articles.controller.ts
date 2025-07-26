import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Article } from '../../generated/prisma';
import { ArticlesService } from './articles.service';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Get()
  async findAll(): Promise<Article[]> {
    return this.articlesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Article | null> {
    return this.articlesService.findOne(id);
  }

  @Post()
  async create(
    @Body() data: { title: string; content: string; userId: string },
  ): Promise<Article> {
    return this.articlesService.create(data);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() data: { title?: string; content?: string },
  ): Promise<Article> {
    return this.articlesService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Article> {
    return this.articlesService.delete(id);
  }
}
