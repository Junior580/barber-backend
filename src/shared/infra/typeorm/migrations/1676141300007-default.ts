import { MigrationInterface, QueryRunner } from 'typeorm'

export class default1676141300007 implements MigrationInterface {
  name = 'default1676141300007'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "posts" DROP COLUMN "password"`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "posts" ADD "password" character varying NOT NULL`
    )
  }
}
