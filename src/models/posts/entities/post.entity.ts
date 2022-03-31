import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  title?: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ nullable: true })
  image?: string;

  @Column({ type: 'timestamptz', default: new Date() })
  createdAt: Date;

  @Column({ nullable: true, type: 'timestamptz' })
  updatedAt?: Date;
}
