import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { GroupMessageEntity } from './group.message.entity';

@Entity('groups')
export class GroupEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  title?: string;

  @ManyToMany(() => UserEntity, (user) => user.groups)
  @JoinTable()
  users: UserEntity[];

  @OneToOne(() => UserEntity, { createForeignKeyConstraints: false })
  @JoinColumn()
  creator: UserEntity;

  @OneToOne(() => UserEntity, { createForeignKeyConstraints: false })
  @JoinColumn()
  owner: UserEntity;

  @OneToMany(() => GroupMessageEntity, (message) => message.group, {
    cascade: ['insert', 'remove', 'update'],
  })
  @JoinColumn()
  messages: GroupMessageEntity[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: number;

  @OneToOne(() => GroupMessageEntity)
  @JoinColumn({ name: 'last_message_sent' })
  lastMessageSent: GroupMessageEntity;

  @UpdateDateColumn({ name: 'updated_at' })
  lastMessageSentAt: Date;

  @Column({ nullable: true })
  avatar?: string;
}
