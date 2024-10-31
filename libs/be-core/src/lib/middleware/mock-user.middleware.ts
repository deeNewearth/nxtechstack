import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { Role } from '../rbac/roles.enum';
import { Permission } from '../rbac/permissions.enum';

// Extend the Request interface to include the 'user' property
declare module 'express-serve-static-core' {
  interface Request {
    user?: {
      id: string;
      roles: Role[];
      permissions: Permission[];
    };
  }
}

@Injectable()
export class MockUserMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const roleParam = req.headers['x-mock-role'] as string;
    const permissionParam = req.headers['x-mock-permission'] as string;

    const user = {
      id: '123',
      roles: roleParam ? [roleParam as Role] : [Role.Guest],
      permissions: permissionParam ? [permissionParam as Permission] : [Permission.Read],
    };

    req.user = user;
    next();
  }
}
