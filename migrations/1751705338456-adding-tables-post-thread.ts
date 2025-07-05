import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddingTablesPostThread1751705338456 implements MigrationInterface {
  name = 'AddingTablesPostThread1751705338456';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "threads" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        "deleted_at" TIMESTAMP,
        "external_id" character varying NOT NULL,
        "url" character varying NOT NULL,
        "site_full" character varying NOT NULL,
        "site" character varying NOT NULL,
        "site_section" character varying NOT NULL,
        "site_categories" jsonb NOT NULL DEFAULT '[]',
        "title" character varying NOT NULL,
        "title_full" character varying NOT NULL,
        "published_at" TIMESTAMP WITH TIME ZONE NOT NULL,
        "replies_count" integer NOT NULL DEFAULT '0',
        "participants_count" integer NOT NULL DEFAULT '0',
        "site_type" character varying NOT NULL,
        "country" character varying NOT NULL,
        "main_image_url" character varying NOT NULL,
        "performance_score" integer NOT NULL DEFAULT '0',
        "domain_rank" integer NOT NULL,
        "domain_rank_updated_at" TIMESTAMP WITH TIME ZONE NOT NULL,
        "social_data" jsonb,
        CONSTRAINT "PK_d8a74804c34fc3900502cd27275" PRIMARY KEY ("id"))`);
    await queryRunner.query(`CREATE TABLE "posts" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        "deleted_at" TIMESTAMP,
        "external_uuid" character varying NOT NULL,
        "url" character varying NOT NULL,
        "ord_in_thread" integer NOT NULL DEFAULT '0',
        "parent_url" character varying,
        "author" character varying NOT NULL,
        "published_at" TIMESTAMP WITH TIME ZONE NOT NULL,
        "title" character varying NOT NULL,
        "text" text NOT NULL,
        "highlight_text" text,
        "highlight_title" character varying NOT NULL DEFAULT '',
        "highlight_thread_title" character varying NOT NULL DEFAULT '',
        "language" character varying NOT NULL DEFAULT '',
        "thread_id" uuid,
        CONSTRAINT "REL_89efae744488da3393177c9ccb" UNIQUE ("thread_id"),
        CONSTRAINT "PK_2829ac61eff60fcec60d7274b9e" PRIMARY KEY ("id"))`);
    await queryRunner.query(
      `ALTER TABLE "posts" ADD CONSTRAINT "FK_89efae744488da3393177c9ccbf" FOREIGN KEY ("thread_id") REFERENCES "threads"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "posts" DROP CONSTRAINT "FK_89efae744488da3393177c9ccbf"`,
    );
    await queryRunner.query(`DROP TABLE "posts"`);
    await queryRunner.query(`DROP TABLE "threads"`);
  }
}
