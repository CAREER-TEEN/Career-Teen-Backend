import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Chat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  menteeId: number;

  @Column()
  mentorId: number;

  @Column('text')
  content: string;

  @CreateDateColumn()
  timestamp: Date;
}
