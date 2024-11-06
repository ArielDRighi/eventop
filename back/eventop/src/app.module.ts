import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeOrm from './config/typeorm';

@Module({
  imports: [ ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
