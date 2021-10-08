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
//import cryptoRandomString from 'crypto-random-string';
import { Users } from '../../users/entities/users.entity';

@Entity()
export class Pastes extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column({ nullable: false })
  code: string;

  @Column({ nullable: false })
  name: string;

  @Column({ type: 'text', nullable: false })
  content: string;

  @CreateDateColumn({ name: 'created_at', select: false })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', select: false })
  updatedAt: Date;

  // @BeforeInsert()
  // handleBeforeInsert() {
  //   this.code = cryptoRandomString({
  //     length: 10,
  //   });
  // }
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  @ManyToOne(type => Users, user => user.pastes)
  user: Users;
}
