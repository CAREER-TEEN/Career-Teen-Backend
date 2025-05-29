import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
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
    console.log('회원가입 : ', input);
    try {
      const { username, password, name, age, job, resolution, role } = input;

      const nameCheck = await this.userRepository.findOneBy({ username });
      if (nameCheck) {
        throw new ConflictException('이미 등록된 사용자의 이름입니다.');
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = this.userRepository.create({
        username,
        password: hashedPassword,
        name,
        age,
        job,
        resolution,
        role,
      });

      return await this.userRepository.save(newUser);
    } catch (error) {
      console.error('회원가입 오류 : ', error);
      throw new InternalServerErrorException('회원가입 중 오류 발생');
    }
  }

  async findAllUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findUserById(id: number): Promise<User | null> {
    return await this.userRepository.findOneBy({ id });
  }

  async findUsername(username: string): Promise<User | null> {
    console.log('(3번째 로그) DB 조회 시작 : ', username);
    return this.userRepository.findOne({ where: { username } });
  }
}
