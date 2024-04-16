import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { FriendRequestStatus } from 'src/types/friend.types';

@Index(['sender.id', 'receiver.id'], { unique: true })
@Entity({ name: 'friend_requests' })
export class FriendRequestEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => UserEntity, { createForeignKeyConstraints: false })
  @JoinColumn()
  sender: UserEntity;

  @OneToOne(() => UserEntity, { createForeignKeyConstraints: false })
  @JoinColumn()
  receiver: UserEntity;

  @CreateDateColumn()
  createdAt: number;

  @Column()
  status: FriendRequestStatus;
}
