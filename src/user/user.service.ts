import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
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

  // 회원가입
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

  // 전체 사용자 조회
  async findAllUsers(): Promise<User[]> {
    try {
      return await this.userRepository.find();
    } catch (error) {
      console.error('findAllUsers error:', error);
      throw new InternalServerErrorException('사용자 조회 중 오류 발생');
    }
  }

  // 사용자 ID로 조회 (로그인 후 프로필용)
  async findById(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  // 사용자 이름(username)으로 조회
  async findUsername(username: string): Promise<User | null> {
    console.log('(3번째 로그) DB 조회 시작 : ', username);
    return this.userRepository.findOne({ where: { username } });
  }

  // ID로 조회하는 다른 메서드가 있다면 통합 가능
  async findUserById(id: number): Promise<User | null> {
    return await this.userRepository.findOneBy({ id });
  }
}
