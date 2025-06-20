import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToMany,
  ManyToOne,
  JoinColumn,
  JoinTable,
} from 'typeorm';
import { User } from '../../tempUser/user.entity';

@Entity('StudyGroup')
export class StudyGroup {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  groupname: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'hostId' })
  host: User;

  @Column({ length: 20 })
  place: string;

  @Column()
  personnel: number;

  @ManyToMany(() => User, (user) => user.joinedGroups)
  @JoinTable()
  members: User[];

  @Column({ length: 1000 })
  grouptext: string;

  @Column({ length: 1000, nullable: true })
  img: string;

  @CreateDateColumn()
  createdAt: Date;
}
