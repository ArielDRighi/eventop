import { Injectable, NotFoundException } from '@nestjs/common';
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
      throw new NotFoundException('Ocurrió un error al cargar las categorías');
    }
    return categories;
  }

  async getCategoryById(categoryId: number): Promise<Category> {
    const category = await this.categoryRepository.findOne({
      where: { categoryId },
    });
    if (!category) {
      throw new NotFoundException(
        `Categoria con ID ${categoryId} no encontrada`,
      );
    }
    return category;
  }

  async createCategory(
    createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    const { name } = createCategoryDto;

    const newCategory = this.categoryRepository.create({ name });
    const savedCategory = await this.categoryRepository.save(newCategory);
    return savedCategory;
  }

  async deleteCategory(categoryId: number) {
    const category = await this.getCategoryById(categoryId);
    if (!category) {
      throw new NotFoundException(
        `Categoria con ID ${categoryId} no encontrada`,
      );
    }
    await this.categoryRepository.delete(categoryId);
    return `Categoria con ID${categoryId} eliminada con éxito!`;
  }
}
