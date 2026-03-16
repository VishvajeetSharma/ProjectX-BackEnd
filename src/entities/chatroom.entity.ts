import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: "chatroom" })
export class ChatRoom {
  @PrimaryGeneratedColumn({ name: "id" })
  id!: number

  @Column({ name: "participants", type: "varchar", array: true, default: [] })
  participants!: string;

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
