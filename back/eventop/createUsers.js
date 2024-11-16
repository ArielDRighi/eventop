"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const users_entity_1 = require("@app/users/entities/users.entity");
const typeorm_1 = require("@app/config/typeorm");
const users = [
    { name: 'User1', email: 'user1@example.com', password: 'Password1!' },
    { name: 'User2', email: 'user2@example.com', password: 'Password2!' },
    { name: 'User3', email: 'user3@example.com', password: 'Password3!' },
    { name: 'User4', email: 'user4@example.com', password: 'Password4!' },
    { name: 'User5', email: 'user5@example.com', password: 'Password5!' },
];
async function createUsers() {
    const dataSource = await typeorm_1.connectionSource.initialize();
    const userRepository = dataSource.getRepository(users_entity_1.User);
    try {
        for (const user of users) {
            const newUser = userRepository.create(user);
            await userRepository.save(newUser);
        }
        console.log('Users created successfully');
    }
    catch (error) {
        console.error('Error creating users:', error);
    }
    finally {
        await dataSource.destroy();
    }
}
createUsers();
//# sourceMappingURL=createUsers.js.map