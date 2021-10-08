import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  BeforeInsert,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Users } from '../../users/entities/users.entity';
import {Exclude} from "class-transformer";

@Entity()
export class Pastes extends BaseEntity {
  @Exclude()
  @PrimaryGeneratedColumn()
  id: number;

  @Exclude()
  @Column({ name: 'user_id' })
  userId: number;

  @Exclude()
  @Column({ nullable: false })
  code: string;

  @Column({ nullable: false })
  name: string;

  @Column({ type: 'text', nullable: false })
  content: string;

  @Exclude()
  @CreateDateColumn({ name: 'created_at', select: false })
  createdAt: Date;

  @Exclude()
  @UpdateDateColumn({ name: 'updated_at', select: false })
  updatedAt: Date;

  @BeforeInsert()
  handleBeforeInsert() {
    this.code = (Math.random() + 1).toString(36).substring(7);
  }

  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  @ManyToOne(type => Users, user => user.pastes)
  user: Users;
}
