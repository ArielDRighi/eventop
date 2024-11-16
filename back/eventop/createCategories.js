"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const categories_entity_1 = require("@app/categories/entities/categories.entity");
const typeorm_1 = require("@app/config/typeorm");
const categories = [
    { name: 'Music' },
    { name: 'Sports' },
    { name: 'Technology' },
    { name: 'Art' },
    { name: 'Food' },
];
async function createCategories() {
    const dataSource = await typeorm_1.connectionSource.initialize();
    const categoryRepository = dataSource.getRepository(categories_entity_1.Category);
    try {
        for (const category of categories) {
            const newCategory = categoryRepository.create(category);
            await categoryRepository.save(newCategory);
        }
        console.log('Categories created successfully');
    }
    catch (error) {
        console.error('Error creating categories:', error);
    }
    finally {
        await dataSource.destroy();
    }
}
createCategories();
//# sourceMappingURL=createCategories.js.map