import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  static readonly Role = {
    Mentor: 'mentor',
    Mentee: 'mentee',
  } as const;

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column()
  age: number;

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
