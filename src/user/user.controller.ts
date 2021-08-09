import { ResultDto } from './dto/result.dto';
import { UserRegisterDto } from './dto/user.create.dto';
import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { User } from './user.entity';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('list')
  async findAllt(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Post('register')
  async register(@Body() data: UserRegisterDto): Promise<ResultDto> {
    return this.userService.register(data);
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return req.User;
  }
}
