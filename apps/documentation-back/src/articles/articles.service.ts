import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { Article } from '../entities/article.entity';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article)
    private articlesRepository: Repository<Article>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll({
    userSubId,
  }: {
    userSubId: string;
  }): Promise<Partial<Article>[]> {
    const user = await this.usersRepository.findOne({
      where: { sub_id: userSubId },
    });
    if (!user) {
      return [];
    }
    const articles = await this.articlesRepository.find({
      where: { userId: user.id },
    });
    return articles.map((article) => ({
      userId: article.userId,
      title: article.title,
      id: article.id,
      createdAt: article.createdAt,
      updatedAt: article.updatedAt,
    }));
  }

  async findOne({
    id,
    userSubId,
  }: {
    id: string;
    userSubId: string;
  }): Promise<Article | null> {
    const user = await this.usersRepository.findOne({
      where: { sub_id: userSubId },
    });
    if (!user) {
      return null;
    }
    return this.articlesRepository.findOne({
      where: { id, userId: user.id },
    });
  }

  async create({
    title,
    userSubId,
  }: {
    title: string;
    userSubId: string;
  }): Promise<Article> {
    const user = await this.usersRepository.findOne({
      where: { sub_id: userSubId },
    });
    if (!user) {
      throw new Error(`User with sub_id ${userSubId} not found`);
    }
    const article = this.articlesRepository.create({
      title,
      userId: user.id,
    });
    return this.articlesRepository.save(article);
  }

  async update(
    id: string,
    userSubId: string,
    data: { title?: string; content?: string },
  ): Promise<Article> {
    const user = await this.usersRepository.findOne({
      where: { sub_id: userSubId },
    });
    if (!user) {
      throw new Error(`User with sub_id ${userSubId} not found`);
    }
    await this.articlesRepository.update(id, data);
    const article = await this.findOne({ id, userSubId });
    if (!article) {
      throw new Error(`Article with id ${id} not found`);
    }
    return article;
  }

  async delete(id: string, userSubId: string): Promise<Article> {
    const user = await this.usersRepository.findOne({
      where: { sub_id: userSubId },
    });
    if (!user) {
      throw new Error(`User with sub_id ${userSubId} not found`);
    }
    const article = await this.findOne({ id, userSubId });
    if (!article) {
      throw new Error(`Article with id ${id} not found`);
    }
    await this.articlesRepository.delete(id);
    return article;
  }
}
