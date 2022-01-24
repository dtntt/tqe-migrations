import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey, TableIndex } from 'typeorm';

export class consultEnterpriseCol1643051620800 implements MigrationInterface {

    private consultTable = 'tch01_consulta';
    private enterpriseCol = 'id_enterprise';
    private enterpriseTable = 'te01_enterprise';
    private enterpriseForeignKey = 'idx_ch01_consult_Enterprise_id';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.hasTable(this.consultTable).then(async (tableExist) => {
            if (tableExist) {
                await queryRunner.hasColumn(this.consultTable, this.enterpriseCol).then(async (columnExist) => {
                    if (!columnExist) {
                        await queryRunner.addColumn(this.consultTable, new TableColumn({
                            name: this.enterpriseCol,
                            type: 'int',
                            isNullable: true,
                            default: null,
                        }));
                        console.log(`Column ${this.enterpriseCol} was added to table ${this.consultTable}`);
                        await queryRunner.createIndex(this.consultTable, new TableIndex({
                            name: this.enterpriseForeignKey,
                            columnNames: [this.enterpriseCol]
                        }))
                        console.log(`Index ${this.enterpriseForeignKey} was created`);
                        await queryRunner.createForeignKey(this.consultTable, new TableForeignKey({
                            columnNames: [this.enterpriseCol],
                            referencedColumnNames: ['id_enterprise'],
                            referencedTableName: this.enterpriseTable,
                            name: this.enterpriseForeignKey
                        }));
                        console.log(`ForeignKey ${this.enterpriseForeignKey} was created`);
                    }
                })
            }
        });
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.hasTable(this.consultTable).then(async (tableExist) => {
            if (tableExist) {
                await queryRunner.hasColumn(this.consultTable, this.enterpriseCol).then(async (columnExist) => {
                    if (columnExist) {
                        await queryRunner.dropForeignKey(this.consultTable, this.enterpriseForeignKey);
                        console.log(`ForeignKey ${this.enterpriseForeignKey} was eliminated`);
                        await queryRunner.dropIndex(this.consultTable, this.enterpriseForeignKey);
                        console.log(`Index ${this.enterpriseForeignKey} was eliminated`);
                        await queryRunner.dropColumn(this.consultTable, this.enterpriseCol);
                        console.log(`Column ${this.enterpriseCol} was removed from table ${this.consultTable}`);
                    }
                })
            }
        });
    }

}
