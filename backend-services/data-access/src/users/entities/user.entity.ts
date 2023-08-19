import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  lastname: string;

  @Column('text')
  firstname: string;

  @Column('text', { nullable: false })
  email: string;

  @Column('text', { nullable: false })
  password: string;

  @Column('boolean', { default: false })
  is_suspended: boolean;

  @Column('boolean', { default: true })
  first_signin: boolean;

  @Column('number')
  organization_id: number;

  @Column('number')
  profile_id: number;
}
