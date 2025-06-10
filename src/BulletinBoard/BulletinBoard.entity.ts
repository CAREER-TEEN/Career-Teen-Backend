import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

export enum Category {
  study = '시험·자격증',
  benefit = '혜택',
  Company = '취업',
  career = '진로·미래',
  Youth = '청년',
}

@Entity()
export class BulletinBoard {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: Category,
  })
  category: Category;

  @Column({ length: 100 })
  title: string;

  @Column({ length: 2000 })
  text: string;

  @Column({ length: 1000, nullable: true })
  img: string;

  @CreateDateColumn()
  createdAt: Date;
}
