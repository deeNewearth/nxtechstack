import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { LoginResponse, LoginInput } from '../graphql/generated/graphql';
import { UtilityService } from '../services/utility.service';
import { ValidationError } from '../errors/validation.error';

@Resolver('SignIn')
export class SignInResolver {
  constructor(
    private jwtService: JwtService,
    private utilityService: UtilityService
  ) {}

  @Query(() => Number)
  uptime() {
    return process.uptime();
  }

  @Mutation('login')
  login(@Args('credentials') credentials: LoginInput): LoginResponse {
    if (!this.utilityService.isValidEmail(credentials.email)) {
      throw new ValidationError('Invalid email format');
    }

    if (credentials.email !== 'test@example.com') {
      throw new Error('Invalid credentials');
    }

    const payload = { username: credentials.email, sub: credentials.email };
    const accessToken = this.jwtService.sign(payload);

    if (!accessToken) {
      throw new Error('Failed to generate token');
    }

    return { accessToken };
  }
}
