import { MigrationInterface, QueryRunner } from "typeorm";

export class OrganizationMigration1692398512128 implements MigrationInterface {
    name = 'OrganizationMigration1692398512128'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`organization\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` text NOT NULL, \`size\` text NOT NULL, \`logo\` text NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`organization\``);
    }

}
