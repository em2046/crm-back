import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { UserService } from './user/user.service';
import { RoleService } from './role/role.service';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    public userService: UserService,
    public roleService: RoleService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const permissions = this.reflector.get<string[]>(
      'permissions',
      context.getHandler(),
    );
    if (!permissions) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const userUuid = request.headers['user-uuid'];

    return new Promise(async resolve => {
      const user = await this.userService.findOne(userUuid);
      const roles = user.roles;
      for (const role of roles) {
        const foundRole = await this.roleService.findOneInner(role.uuid);
        const userPermissions = foundRole.permissions;

        for (const permission of userPermissions) {
          const found = permissions.includes(permission.name);

          if (found) {
            resolve(true);
            return;
          }
        }
      }

      resolve(false);
    });
  }
}
