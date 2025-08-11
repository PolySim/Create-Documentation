import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from '../entities/article.entity';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article)
    private articlesRepository: Repository<Article>,
  ) {}

  async findAll(): Promise<Partial<Article>[]> {
    const articles = await this.articlesRepository.find();
    return articles.map((article) => ({
      userId: article.userId,
      title: article.title,
      id: article.id,
      createdAt: article.createdAt,
      updatedAt: article.updatedAt,
    }));
  }

  async findOne(id: string): Promise<Article | null> {
    return this.articlesRepository.findOne({ where: { id } });
  }

  async create(data: {
    title: string;
    content: string;
    userId: string;
  }): Promise<Article> {
    const article = this.articlesRepository.create(data);
    return this.articlesRepository.save(article);
  }

  async update(
    id: string,
    data: { title?: string; content?: string },
  ): Promise<Article> {
    await this.articlesRepository.update(id, data);
    const article = await this.findOne(id);
    if (!article) {
      throw new Error(`Article with id ${id} not found`);
    }
    return article;
  }

  async delete(id: string): Promise<Article> {
    const article = await this.findOne(id);
    if (!article) {
      throw new Error(`Article with id ${id} not found`);
    }
    await this.articlesRepository.delete(id);
    return article;
  }
}
