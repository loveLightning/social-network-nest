import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { MessageEntity } from './message.entity';

@Entity('message_attachments')
export class MessageAttachmentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  fullpath: string;

  @ManyToOne(() => MessageEntity, (message) => message.attachments, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  message: MessageEntity;
}
