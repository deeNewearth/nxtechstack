// libs/be-core/src/lib/auth/gql-auth.guard.ts

import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GqlAuthGuard extends AuthGuard() {
  constructor(private configService: ConfigService) {
    // *UPDATED CODE START*
    // Determine the strategy to use based on configuration
    const authStrategy = configService.get<string>('AUTH_STRATEGY') || 'mock';
    super({ defaultStrategy: authStrategy });
    // *UPDATED CODE END*
  }

  override getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
}
