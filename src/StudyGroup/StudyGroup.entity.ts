import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';
import { ManyToMany } from 'typeorm';
import { User } from '../../tempUser/user.entity';

@Entity()
export class StudyGroup {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  groupname: string;

  @Column({ length: 20 })
  host: string;

  @Column({ length: 20 })
  place: string;

  @Column()
  personnel: number;

  @ManyToMany(() => User, (user) => user.joinedGroups)
  members: User[];

  @Column({ length: 1000 })
  grouptext: string;

  @Column({ length: 1000, nullable: true })
  img: string;

  @CreateDateColumn()
  createAt: Date;
}
