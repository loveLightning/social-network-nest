import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('profiles')
export class ProfileEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullname: string;

  @Column({ default: '' })
  about?: string;

  @Column({ nullable: true })
  banner?: string;

  @Column({ nullable: true })
  avatar_url?: string;

  @Column({ unique: true, nullable: true })
  mobile_number?: string;

  @OneToOne(() => UserEntity, (user) => user.profile)
  user: UserEntity;
}
