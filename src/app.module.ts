import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './configs/typeorm.config';
import { CompanyModule } from './company/company.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), CompanyModule],
})
export class AppModule {}
