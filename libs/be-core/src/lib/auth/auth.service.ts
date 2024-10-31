import { Injectable } from '@nestjs/common';
import { Role } from '../rbac/roles.enum';
import { Permission } from '../rbac/permissions.enum';

@Injectable()
export class AuthService {
  extractUserFromRequest(request: any): any {
    // Extract token from headers
    const authHeader = request.headers['authorization'];
    const token = authHeader?.split(' ')[1];

    // For now, return mock user
    return {
      id: '123',
      roles: [Role.Admin, Role.User],
      permissions: [Permission.Read, Permission.Write],
    };
  }
}
