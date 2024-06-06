import { MigrationInterface, QueryRunner } from "typeorm";

export class FileTable1717674095121 implements MigrationInterface {
    name = 'FileTable1717674095121'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`file\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(250) NOT NULL, \`url\` varchar(2000) NOT NULL, \`mimeType\` varchar(100) NOT NULL, \`extension\` varchar(255) NOT NULL, \`fileSize\` int NULL, \`userId\` int NULL, \`uploadedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`file\` ADD CONSTRAINT \`FK_b2d8e683f020f61115edea206b3\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`file\` DROP FOREIGN KEY \`FK_b2d8e683f020f61115edea206b3\``);
        await queryRunner.query(`DROP TABLE \`file\``);
    }

}
