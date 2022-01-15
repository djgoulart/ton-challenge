import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";

@Entity("counters")
class Counter {
  @PrimaryColumn()
  id: string;

  @Column()
  namespace: string;

  @Column()
  hits: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export { Counter };
