import {
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { MessageEntity } from './message.entity';
import { UserEntity } from './user.entity';

@Entity('conversations')
@Index(['creator.id', 'recipient.id'], { unique: true })
export class ConversationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: number;

  @UpdateDateColumn({ name: 'updated_at' })
  lastMessageSentAt: Date;

  @OneToOne(() => UserEntity, { createForeignKeyConstraints: false })
  @JoinColumn()
  creator: UserEntity;

  @OneToOne(() => UserEntity, { createForeignKeyConstraints: false })
  @JoinColumn()
  recipient: UserEntity;

  @OneToOne(() => MessageEntity, { nullable: true })
  @JoinColumn({ name: 'last_message_sent' })
  lastMessageSent: MessageEntity;

  @OneToMany(() => MessageEntity, (message) => message.conversation, {
    cascade: ['insert', 'remove', 'update'],
  })
  @JoinColumn()
  messages: MessageEntity[];
}
