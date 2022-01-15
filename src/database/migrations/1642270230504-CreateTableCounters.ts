import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableCounters1642270230504 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "counters",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true
          },
          {
            name: "namespace",
            type: "varchar",
            isUnique: true,
          },
          {
            name: "hits",
            type: "int",
            unsigned: true,
            default: 0
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()",
          }
        ]
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("counters");
  }

}
