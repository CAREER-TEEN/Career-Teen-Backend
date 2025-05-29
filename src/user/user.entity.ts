// CRLF -> LF로 변경 (CRLF는 종료구문에 오류 표시함)
// spaces 2로 변경
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'; //npm install typeorm

@Entity()
export class User {
  //클래스명 대문자 시작

  static readonly Role = {
    Mentor: 'mentor',
    Mentee: 'mentee',
  } as const;

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  passwd: string;

  @Column()
  name: string;

  @Column()
  age: number; //age string -> number로 변경

  @Column()
  job: string;

  @Column()
  resolution: string;

  @Column({ type: 'enum', enum: User.Role })
  role: (typeof User.Role)[keyof typeof User.Role];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
