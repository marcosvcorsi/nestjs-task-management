import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from './users.repository';
import { HashService } from './hash.service';

@Module({
  imports: [TypeOrmModule.forFeature([UsersRepository])],
  providers: [HashService, AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
