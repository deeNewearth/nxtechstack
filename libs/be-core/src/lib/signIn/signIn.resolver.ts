import { Args, Field, Float, InputType, Mutation, ObjectType, Query, Resolver } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
//import { LoginResponse } from './loginResponse';



@ObjectType()
export class LoginResponse {
  @Field()
  accessToken: string = '';
}

@InputType()
   export class LoginInput {
     @Field()
     email: string ="";

     @Field()
     password: string ="";
   }

@Resolver('root')
export class SignInResolver {
  constructor(private jwtService: JwtService) {}

  @Query(() => Float)
  uptime() {
    return process.uptime();
  }

  @Mutation(() => LoginResponse)
  login(
    @Args('credentials')
    { email, password }: LoginInput 
  ) {
    if (email !== 'test@example.com') {
      throw new Error('Invalid credentials');
    }

    const payload = { username: email, sub: email };

    return {
        accessToken: this.jwtService.sign(payload),
    };
  }
}
