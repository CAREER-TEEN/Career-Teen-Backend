import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { User } from '../../tempUser/user.entity';

@Entity()
export class ChatMessage {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.id, { eager: true })
  sender: User;

  @ManyToOne(() => User, (user) => user.id, { eager: true })
  receiver: User;

  @Column('text')
  content: string;

  @CreateDateColumn()
  createdAt: Date;
}
