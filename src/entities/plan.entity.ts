import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({ name: "plan" })
export class Plan {
  @PrimaryGeneratedColumn({ name: "id" })
  id!: number;

  @Column({ name: "plan_id", type: "int", nullable: true })
  plan_id!: string;

  @Column({ name: "user_id", type: "int", nullable: true })
  user_id!: string;

  @Column({ name: "status", type: "varchar", default: 1 })
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
