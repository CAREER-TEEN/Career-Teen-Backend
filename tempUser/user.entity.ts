import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { BulletinBoard } from '../src/BulletinBoard/BulletinBoard.entity';
import { StudyGroup } from '../src/StudyGroup/StudyGroup.entity';
import { ManyToMany, JoinTable } from 'typeorm';
import { Comment } from '../src/comment/comment.entity';

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

  @Column({ type: 'varchar', length: 500, nullable: true })
  introduce: string;

  @Column({ type: 'jsonb', nullable: true })
  career: { date: string; description: string }[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ name: 'studygroup', type: 'varchar', length: 50, nullable: true })
  studyGroup: string;

  @Column({
    name: 'bulletinboard',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  bulletinBoard: string;

  @OneToMany(() => BulletinBoard, (board) => board.user)
  boards: BulletinBoard[];

  @OneToMany(() => StudyGroup, (studyGroup) => studyGroup.host)
  hostingGroups: StudyGroup[];

  @ManyToMany(() => StudyGroup, (group) => group.members)
  @JoinTable()
  joinedGroups: StudyGroup[];

  @Column({ type: 'int', nullable: true })
  person: number;

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];

  @Column({ type: 'varchar', length: 300, nullable: true })
  img: string;
}
