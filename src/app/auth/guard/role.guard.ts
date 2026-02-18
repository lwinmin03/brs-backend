import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Role, ROLE_KEY } from 'src/common/decorator/role.decorator';
import { role } from 'src/common/enum/role.enum';



@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const role = this.reflector.get(ROLE_KEY, context.getHandler());

    if (!role) return true;
    const req = context.switchToHttp().getRequest();

    const {user} = req.user;
    console.log("role",user?.role);
    
    return role?.includes(user?.role);
  }
}
