import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const signed = (request as any).signedCookies || {};

    // Cookie assinado válido = autenticado (stateless, funciona em serverless)
    if (signed['admin_session']) {
      return true;
    }

    const response = context.switchToHttp().getResponse();
    response.redirect('/admin/login');
    return false;
  }
}
