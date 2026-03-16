import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn({ name: "id" })
  id!: number;

  @Column({ name: "name", type: "varchar", length: 100, nullable: true })
  name!: string;

  @Column({ name: "email", type: "varchar", length: 150, unique: true })
  email!: string;

  @Column({ name: "password", type: "varchar", length: 150 })
  password!: string;

  @Column({ name: "mobile", type: "varchar", length: 15, nullable: true})
  mobile!: string;

  @Column({ name: "profile", type: "varchar", nullable: true })
  profile!: string;

  @Column({ name: "address", type: "text", nullable: true })
  address!: string;

  @Column({ name: "credit", type: "int", default: 3 })
  credit!: number;

  @Column({ name: "otp", type: "varchar", nullable: true })
  otp!: string;

  @Column({ name: "status", type: "varchar", nullable: true })
  status!: string;

  @CreateDateColumn({
    name: "created_at",
    type: "timestamp",
  })
  created_at!: Date;

  @UpdateDateColumn({
    name: "updated_at",
    type: "timestamp",
  })
  updated_at!: Date;
}




