import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

export enum MentoringCategory {
  study = '사무직',
  benefit = 'IT',
  Company = '디자인',
  career = '요식',
  Youth = '마케팅',
}

@Entity()
export class MentoringBulletinBoard {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: MentoringCategory,
  })
  category: MentoringCategory;

  @Column({ length: 100 })
  title: string;

  @Column({ length: 2000 })
  text: string;

  @Column({ length: 1000, nullable: true })
  img: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ default: 0 })
  view: number;
}
