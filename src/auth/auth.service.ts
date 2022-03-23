import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { HashService } from './hash.service';
import { UsersRepository } from './users.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository)
    private readonly usersRepository: UsersRepository,
    private readonly hashService: HashService,
  ) {}

  async signUp({ username, password }: AuthCredentialsDto): Promise<void> {
    const hashPassword = await this.hashService.generate(password);

    return this.usersRepository.createUser({
      username,
      password: hashPassword,
    });
  }
}
