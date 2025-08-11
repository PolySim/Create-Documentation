import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/middleware/AuthGuard';
import { Article } from '../entities/article.entity';
import { ArticlesService } from './articles.service';

interface AuthenticatedRequest extends Request {
  user: { userId: string };
}

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Get()
  @UseGuards(AuthGuard)
  async findAll(@Req() req: AuthenticatedRequest): Promise<Partial<Article>[]> {
    return this.articlesService.findAll({ userSubId: req.user.userId });
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(
    @Req() req: AuthenticatedRequest,
    @Param('id') id: string,
  ): Promise<Article | null> {
    return this.articlesService.findOne({
      id,
      userSubId: req.user.userId,
    });
  }

  @Post()
  @UseGuards(AuthGuard)
  async create(
    @Req() req: AuthenticatedRequest,
    @Body() data: { title: string },
  ): Promise<Article> {
    return this.articlesService.create({
      title: data.title,
      userSubId: req.user.userId,
    });
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  async update(
    @Req() req: AuthenticatedRequest,
    @Param('id') id: string,
    @Body() data: { title?: string },
  ): Promise<Article> {
    return this.articlesService.update(id, req.user.userId, data);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async delete(
    @Req() req: AuthenticatedRequest,
    @Param('id') id: string,
  ): Promise<Article> {
    return this.articlesService.delete(id, req.user.userId);
  }
}
