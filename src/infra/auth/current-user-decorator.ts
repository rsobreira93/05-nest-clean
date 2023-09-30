import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { userPayload } from './jwt.strategy';

export const CurrentUser = createParamDecorator(
  (_: never, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    return request.user as userPayload;
  },
);
