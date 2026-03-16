import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({ name: "message" })
export class Message {
  @PrimaryGeneratedColumn({ name: "id" })
  id!: number;

  @Column({ name: "room_id", type: "int", nullable: true })
  room_id!: string;

  @Column({ name: "sender_id", type: "int", nullable: true })
  sender_id!: string;

  @Column({ name: "receiver_id", type: "int", nullable: true })
  receiver_id!: string;

  @Column({ name: "message", type: "text", nullable: true })
  message!: string;

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
