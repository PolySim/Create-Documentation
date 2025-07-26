import { Injectable } from '@nestjs/common';
import { Article } from '../../generated/prisma';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ArticlesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Partial<Article>[]> {
    return this.prisma.article.findMany().then((articles) =>
      articles.map((article) => ({
        userId: article.userId,
        title: article.title,
        id: article.id,
        createdAt: article.createdAt,
        updatedAt: article.updatedAt,
      })),
    );
  }

  async findOne(id: string): Promise<Article | null> {
    return this.prisma.article.findUnique({ where: { id } });
  }

  async create(data: {
    title: string;
    content: string;
    userId: string;
  }): Promise<Article> {
    return this.prisma.article.create({ data });
  }

  async update(
    id: string,
    data: { title?: string; content?: string },
  ): Promise<Article> {
    return this.prisma.article.update({ where: { id }, data });
  }

  async delete(id: string): Promise<Article> {
    return this.prisma.article.delete({ where: { id } });
  }
}
