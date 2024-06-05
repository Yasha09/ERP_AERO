import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateRefreshTokenTable1717449944543 implements MigrationInterface {
    name = 'CreateRefreshTokenTable1717449944543'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`refresh_token\` (\`id\` int NOT NULL AUTO_INCREMENT, \`deviceId\` varchar(255) NOT NULL, \`token\` varchar(255) NULL, \`userId\` int NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_b38c8203d43a8d64ab42e80453\` (\`deviceId\`), UNIQUE INDEX \`IDX_c31d0a2f38e6e99110df62ab0a\` (\`token\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`refresh_token\` ADD CONSTRAINT \`FK_8e913e288156c133999341156ad\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`refresh_token\` DROP FOREIGN KEY \`FK_8e913e288156c133999341156ad\``);
        await queryRunner.query(`DROP INDEX \`IDX_c31d0a2f38e6e99110df62ab0a\` ON \`refresh_token\``);
        await queryRunner.query(`DROP INDEX \`IDX_b38c8203d43a8d64ab42e80453\` ON \`refresh_token\``);
        await queryRunner.query(`DROP TABLE \`refresh_token\``);
    }

}
