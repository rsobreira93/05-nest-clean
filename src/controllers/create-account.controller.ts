import {
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Post,
  UsePipes,
} from '@nestjs/common';
import { hash } from 'bcryptjs';
import { ZodValidationPipe } from '@/pipes/zod-validation-pipe';
import { PrismaService } from '@/prisma/prisma.service';
import { z } from 'zod';

const createAccountBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
});

type CreateAccountBodySchema = z.infer<typeof createAccountBodySchema>;

@Controller('accounts')
export class CreateAccountController {
  constructor(private prisma: PrismaService) {}
  @Post()
  @UsePipes(new ZodValidationPipe(createAccountBodySchema))
  @HttpCode(201)
  async handle(@Body() body: CreateAccountBodySchema) {
    const { name, email, password } = body;

    const userWithSomeEmail = await this.prisma.user.findUnique({
      where: { email },
    });

    if (userWithSomeEmail) {
      throw new ConflictException('User with some email already exists');
    }

    const hashedPassword = await hash(password, 8);

    await this.prisma.user.create({
      data: { name, email, password: hashedPassword },
    });
  }
}
