import {MigrationInterface, QueryRunner} from "typeorm";

export class hola1651606989661 implements MigrationInterface {
    name = 'hola1651606989661'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`genre\` CHANGE \`id\` \`id_genre\` int NOT NULL AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`book\` CHANGE \`id\` \`id_book\` int NOT NULL AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`author\` CHANGE \`id\` \`id_author\` int NOT NULL AUTO_INCREMENT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`author\` CHANGE \`id_author\` \`id\` int NOT NULL AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`book\` CHANGE \`id_book\` \`id\` int NOT NULL AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`genre\` CHANGE \`id_genre\` \`id\` int NOT NULL AUTO_INCREMENT`);
    }

}
