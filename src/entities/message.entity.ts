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
import { ConversationEntity } from './conversation.entity';
import { MessageAttachmentEntity } from './message-attachment.entity';

@Entity('messages')
export class MessageEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: true })
  content: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: number;

  @ManyToOne(() => UserEntity, (user) => user.messages, { nullable: true })
  author: UserEntity;

  @ManyToOne(
    () => ConversationEntity,
    (conversation) => conversation.messages,
    { nullable: true },
  )
  conversation: ConversationEntity;

  @OneToMany(
    () => MessageAttachmentEntity,
    (attachment) => attachment.message,
    { nullable: true, onUpdate: 'CASCADE' },
  )
  @JoinColumn()
  attachments: MessageAttachmentEntity[];
}
