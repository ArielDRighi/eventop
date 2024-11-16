"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("@app/app.module");
const users_service_1 = require("@app/users/users.service");
const roles_enum_1 = require("@app/auth/enum/roles.enum");
const bcrypt = require("bcrypt");
const config_1 = require("@nestjs/config");
async function bootstrap() {
    const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
    const userService = app.get(users_service_1.UserService);
    const configService = app.get(config_1.ConfigService);
    const adminEmail = configService.get('ADMIN_EMAIL');
    const adminPassword = configService.get('ADMIN_PASSWORD');
    if (!adminEmail || !adminPassword) {
        console.error('ADMIN_EMAIL and ADMIN_PASSWORD must be defined in environment variables');
        process.exit(1);
    }
    const existingAdmin = await userService.findOneByEmail(adminEmail);
    if (!existingAdmin) {
        const hashedPassword = await bcrypt.hash(adminPassword, 10);
        const adminUser = {
            email: adminEmail,
            password: hashedPassword,
            confirmPassword: hashedPassword,
            name: 'Admin',
            role: roles_enum_1.Role.Admin,
        };
        await userService.createUser(adminUser);
        console.log('Admin user created successfully');
    }
    else {
        console.log('Admin user already exists');
    }
    await app.close();
}
bootstrap();
//# sourceMappingURL=initAdminUser.js.map