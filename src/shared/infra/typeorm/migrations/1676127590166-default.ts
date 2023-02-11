import { MigrationInterface, QueryRunner } from 'typeorm'

export class default1676127590166 implements MigrationInterface {
  name = 'default1676127590166'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "posts" DROP COLUMN "name"`)
    await queryRunner.query(`ALTER TABLE "posts" DROP COLUMN "email"`)
    await queryRunner.query(
      `ALTER TABLE "posts" ADD "tittle" character varying NOT NULL`
    )
    await queryRunner.query(
      `ALTER TABLE "posts" ADD "message" character varying NOT NULL`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "posts" DROP COLUMN "message"`)
    await queryRunner.query(`ALTER TABLE "posts" DROP COLUMN "tittle"`)
    await queryRunner.query(
      `ALTER TABLE "posts" ADD "email" character varying NOT NULL`
    )
    await queryRunner.query(
      `ALTER TABLE "posts" ADD "name" character varying NOT NULL`
    )
  }
}
