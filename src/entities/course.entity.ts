import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: "course" })
export class Course {
  @PrimaryGeneratedColumn({ name: "course_id" })
  course_id!: number

  @PrimaryGeneratedColumn({ name: "user_id" })
  user_id!: number

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
