import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class consultTimestamp1642443677986 implements MigrationInterface {

    private consultTable = 'tch01_consulta';
    private createdAtCol = 'created_at';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.hasTable(this.consultTable).then(async (tableExist) => {
            if (tableExist) {
                await queryRunner.hasColumn(this.consultTable, this.createdAtCol).then(async(columnExist) => {
                   if (!columnExist) {
                       await queryRunner.addColumn(this.consultTable, new TableColumn({
                           name: this.createdAtCol,
                           type: 'timestamp',
                           isNullable: false,
                           isGenerated: true,
                           //this is important to prevent auto update, and to fill earlier registers with an unspecified date
                           default: 0
                       }));
                   }
                })
            }
        });
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.hasTable(this.consultTable).then(async (tableExist) => {
            if (tableExist) {
                await queryRunner.hasColumn(this.consultTable, this.createdAtCol).then(async(columnExist) => {
                    if (columnExist) {
                        await queryRunner.dropColumn(this.consultTable, this.createdAtCol);
                    }
                })
            }
        });
    }

}
