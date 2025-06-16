import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { User } from '../User/user.entity';
import { BulletinBoard } from '../BulletinBoard/BulletinBoard.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @ManyToOne(() => User, (user) => user.comments)
  user: User;

  @ManyToOne(() => BulletinBoard, (board) => board.comments, {
    onDelete: 'CASCADE',
  })
  board: BulletinBoard;

  @CreateDateColumn()
  createdAt: Date;
}
