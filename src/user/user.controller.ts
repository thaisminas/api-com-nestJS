import { UserRegisterDto } from './dto/user.create.dto';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAllt(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Post('cadastrar')
  async cadastrar(@Body() data: UserRegisterDto): Promise<any> {
    return <any>{
      message: "Salvou";
    }
  }
}
