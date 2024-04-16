import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('user_presence')
export class UserPresenceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  statusMessage?: string;

  @Column({ default: false })
  showOffline: boolean;

  @OneToOne(() => UserEntity, (user) => user.presence)
  @JoinColumn()
  user: UserEntity;
}
