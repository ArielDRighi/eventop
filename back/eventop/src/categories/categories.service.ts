import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/categories.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/CreateCategory.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  //   Servicios

  async getCategories(): Promise<Category[]> {
    const categories = await this.categoryRepository.find();
    if (!categories.length) {
      throw new NotFoundException('No categories found');
    }
    return categories;
  }

  async getCategoryById(categoryId: number): Promise<Category> {
    const category = await this.categoryRepository.findOne({
      where: { categoryId },
    });
    if (!category) {
      throw new NotFoundException(`Category with ID ${categoryId} not found`);
    }
    return category;
  }

  async createCategory(
    createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    const { name } = createCategoryDto;
    const newCategory = this.categoryRepository.create({ name });
    try {
      const savedCategory = await this.categoryRepository.save(newCategory);
      return savedCategory;
    } catch (error) {
      throw new BadRequestException('Failed to create category');
    }
  }

  async deleteCategory(categoryId: number) {
    const category = await this.getCategoryById(categoryId);
    if (!category) {
      throw new NotFoundException(`Category with ID ${categoryId} not found`);
    }
    try {
      await this.categoryRepository.remove(category);
    } catch (error) {
      throw new BadRequestException('Failed to delete category');
    }
  }
}
