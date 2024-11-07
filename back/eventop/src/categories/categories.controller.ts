import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { CategoryService } from './categories.service';
import { CreateCategoryDto } from './dto/CreateCategory.dto';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  //   Rutas

  @Get()
  @HttpCode(HttpStatus.OK)
  getCategories() {
    const categories = this.categoryService.getCategories();
    return categories;
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getCategoryById(@Param('id') categoryId: number) {
    const category = this.categoryService.getCategoryById(categoryId);
    return category;
  }

  @Post('create')
  createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.createCategory(createCategoryDto);
  }

  @Delete('id')
  deleteCategory(@Param('id') categoryId: number) {
    return this.categoryService.deleteCategory(categoryId);
  }
}
