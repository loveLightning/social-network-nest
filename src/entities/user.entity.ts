import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { ProfileEntity } from './profile.entity';
import { MessageEntity } from './message.entity';
import { GroupEntity } from './group.entity';
import { UserPresenceEntity } from './user-presence.entity';
import { Role } from 'src/types/roles.types';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude({ toPlainOnly: true })
  password?: string;

  @OneToOne(() => ProfileEntity, (profile) => profile.user, {
    cascade: ['insert', 'update'],
  })
  @JoinColumn()
  profile: ProfileEntity;

  @OneToMany(() => MessageEntity, (message) => message.author, {
    nullable: true,
  })
  @JoinColumn()
  messages: MessageEntity[];

  @ManyToMany(() => UserEntity, (user) => user.groups, { nullable: true })
  groups: GroupEntity[];

  @OneToOne(() => UserPresenceEntity, (presence) => presence.user, {
    nullable: true,
  })
  @JoinColumn()
  presence: UserPresenceEntity;

  @Column({ type: 'enum', enum: Role, default: Role.User })
  role: Role.User;
}
