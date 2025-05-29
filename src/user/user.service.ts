import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

interface CreateUserInput {
  username: string;
  password: string;
  name: string;
  age: number;
  job: string;
  resolution: string;
  role: 'mentor' | 'mentee';
}

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(input: CreateUserInput): Promise<User> {
    const { username, password, name, age, job, resolution, role } = input;

    const nameCheck = await this.userRepository.findOneBy({ username });
    if (nameCheck) {
      throw new ConflictException('이미 등록된 사용자의 이름입니다.');
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = this.userRepository.create({
      username,
      passwd: hashPassword, //암호화 비밀번호
      name,
      age,
      job,
      resolution,
      role,
    });

    return await this.userRepository.save(newUser);
  }

  async findAllUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findUserById(id: number): Promise<User | null> {
    return await this.userRepository.findOneBy({ id });
  }
}
