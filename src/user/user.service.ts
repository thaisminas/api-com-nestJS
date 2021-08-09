import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ResultDto } from './dto/result.dto';
import { UserRegisterDto } from './dto/user.create.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private UserRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.UserRepository.find();
  }

  async register(data: UserRegisterDto): Promise<ResultDto> {
    const user = new User();
    user.name = data.name;
    user.email = data.email;
    user.password = bcrypt.hashSync(data.password, 8);
    user.phone = data.phone;
    user.cpf = data.cpf;
    return this.UserRepository.save(data)
      .then((result) => {
        return <ResultDto>{
          status: true,
          mensagem: 'Usuário cadastrado com sucesso',
        };
      })
      .catch((error) => {
        return <ResultDto>{
          status: false,
          mensagem: 'Houve um erro ao cadastrar usuário',
        };
      });
  }

  async findOne(email: string): Promise<User | undefined> {
    return this.UserRepository.findOne({ email: email });
  }
}
