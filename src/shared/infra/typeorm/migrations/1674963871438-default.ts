import { MigrationInterface, QueryRunner } from 'typeorm'

export class default1674963871438 implements MigrationInterface {
  name = 'default1674963871438'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "appointments" DROP CONSTRAINT "PK_4a437a9a27e948726b8bb3e36ad"`
    )
    await queryRunner.query(`ALTER TABLE "appointments" DROP COLUMN "id"`)
    await queryRunner.query(
      `ALTER TABLE "appointments" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`
    )
    await queryRunner.query(
      `ALTER TABLE "appointments" ADD CONSTRAINT "PK_4a437a9a27e948726b8bb3e36ad" PRIMARY KEY ("id")`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "appointments" DROP CONSTRAINT "PK_4a437a9a27e948726b8bb3e36ad"`
    )
    await queryRunner.query(`ALTER TABLE "appointments" DROP COLUMN "id"`)
    await queryRunner.query(
      `ALTER TABLE "appointments" ADD "id" character varying NOT NULL`
    )
    await queryRunner.query(
      `ALTER TABLE "appointments" ADD CONSTRAINT "PK_4a437a9a27e948726b8bb3e36ad" PRIMARY KEY ("id")`
    )
  }
}
