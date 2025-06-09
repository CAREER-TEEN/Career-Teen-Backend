import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

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

  @Column({ length: 1000 })
  grouptext: string;

  @Column({ length: 1000, nullable: true })
  img: string;

  @CreateDateColumn()
  createAt: Date;
}
