import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text', { nullable: true })
  lastname: string;

  @Column('text', { nullable: true })
  firstname: string;

  @Column('text', { nullable: false })
  email: string;

  @Column('text', { nullable: false })
  password: string;

  @Column('boolean', { default: false })
  is_suspended: boolean;

  @Column('boolean', { default: true })
  first_signin: boolean;

  @Column()
  organization_id: number;

  @Column()
  profile_id: number;
}
