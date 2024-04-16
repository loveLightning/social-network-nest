import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { GroupEntity } from './group.entity';
import { MessageAttachmentEntity } from './message-attachment.entity';

@Entity('group_messages')
export class GroupMessageEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: true })
  content: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: number;

  @ManyToOne(() => UserEntity, (user) => user.messages)
  author: UserEntity;

  @ManyToOne(() => GroupEntity, (group) => group.messages)
  group: GroupEntity;

  @OneToMany(() => MessageAttachmentEntity, (attachment) => attachment.message)
  @JoinColumn()
  attachments?: MessageAttachmentEntity[];
}
