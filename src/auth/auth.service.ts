import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
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
    private readonly jwtService: JwtService,
  ) {}

  async signUp({ username, password }: AuthCredentialsDto): Promise<void> {
    const hashPassword = await this.hashService.generate(password);

    return this.usersRepository.createUser({
      username,
      password: hashPassword,
    });
  }

  async signIn({
    username,
    password,
  }: AuthCredentialsDto): Promise<{ accessToken: string }> {
    const user = await this.usersRepository.findOne({ username });

    if (!user && !(await this.hashService.compare(password, user.password))) {
      throw new UnauthorizedException('Username or password is incorrect');
    }

    const accessToken = this.jwtService.sign({ username });

    return { accessToken };
  }
}
