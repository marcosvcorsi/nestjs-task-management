import { Body, Controller, Logger, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Controller('auth')
export class AuthController {
  private logger = new Logger(AuthController.name);

  constructor(private readonly authService: AuthService) {}

  @Post('/sign-up')
  async signUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<void> {
    this.logger.verbose(
      `User "${authCredentialsDto.username}" is trying to sign up`,
    );

    return this.authService.signUp(authCredentialsDto);
  }

  @Post('/sign-in')
  async signIn(
    @Body() authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    this.logger.verbose(
      `User "${authCredentialsDto.username}" is trying to sign in`,
    );

    return this.authService.signIn(authCredentialsDto);
  }
}
