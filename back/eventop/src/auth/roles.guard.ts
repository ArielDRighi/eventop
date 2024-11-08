import {
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    Injectable,
  } from '@nestjs/common';
  import { Reflector } from '@nestjs/core';
  import { Observable } from 'rxjs';
  import { Role } from './roles.enum';
  
  @Injectable()
  export class RoleGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}
  
    canActivate(
      context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
      const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
        context.getHandler(),
        context.getClass(),
      ]);
      
      // Si no hay roles requeridos, se permite el acceso
      if (!requiredRoles) {
        return true;
      }
  
      const request = context.switchToHttp().getRequest();
      const user = request.user;
  
      if (!user) {
        throw new ForbiddenException('No tienes permiso para acceder');
      }
  
      // Obtenemos los roles del usuario
      const userRoles = user.role;
  
      // Aca vemos si el rol del usuario está incluido en los roles requeridos
      const hasRole = userRoles.some((role: Role) => requiredRoles.includes(role));
  
      if (!hasRole) {
        throw new ForbiddenException('No tienes permitido acceder');
      }
  
      return true;
    }
  }
  