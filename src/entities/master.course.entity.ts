import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: "mastercourse" })
export class MasterCourse {
  @PrimaryGeneratedColumn({ name: "id" })
  id!: number

  @Column({ name: "name", type: "varchar", length: 100, nullable: true })
  name!: string;

  @Column({ name: "desc", type: "varchar", length: 100, nullable: true })
  desc!: string;

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
