import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class treatmentPlanCatalogTechniques1632593175470 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.createTable(new Table({
            name: 'cTreatPlanTech01_classifications',
            indices: [{name: 'idx_cTreatPlanTech01_classifications_Id', columnNames: ['id']}],
            columns: [
                {name: 'id', type: 'int', isPrimary: true, isGenerated: true, generationStrategy: 'increment'},
                {name: 'value', type: 'varchar', length: '45', isNullable: false}
            ]
        }), true);
        console.log('The table cTreatPlanTech01_classifications, was created to use as techniques catalog in the treatment plan');

        await queryRunner.createTable(new Table({
            name: 'cTreatPlanTech02_techniques',
            indices: [{name: 'idx_cTreatPlanTech02_techniques_Id', columnNames: ['id']}],
            columns: [
                {name: 'id', type: 'int', isPrimary: true, isGenerated: true, generationStrategy: 'increment'},
                {name: 'value', type: 'varchar', length: '45', isNullable: false},
                {name: 'objective', type: 'varchar', length: '150', isNullable: true},
                {name: 'application', type: 'varchar', length: '150', isNullable: true},
                {name: 'sessions_length', type: 'int', isNullable: true},
                {name: 'classification_id', type: 'int'}
            ]
        }), true);
        await queryRunner.createForeignKey(
            'cTreatPlanTech02_techniques',
            new TableForeignKey({
                columnNames: ['classification_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'cTreatPlanTech01_classifications',
                onDelete: 'CASCADE',
                name: 'idx_cTreatPlanTech02_techniques_Classification_id'
            })
        );
        console.log('The table cTreatPlanRes04_file_types was created, to use as technique catalog in the treatment plan');

        await queryRunner.createTable(new Table({
            name: 'cTreatPlanTech03_variants',
            indices: [{name: 'idx_cTreatPlanTech03_variants_Id', columnNames: ['id']}],
            columns: [
                {name: 'id', type: 'int', isPrimary: true, isGenerated: true, generationStrategy: 'increment'},
                {name: 'value', type: 'varchar', length: '45', isNullable: false},
                {name: 'objective', type: 'varchar', length: '150', isNullable: true},
                {name: 'application', type: 'varchar', length: '150', isNullable: true},
                {name: 'sessions_length', type: 'int', isNullable: true},
                {name: 'technique_id', type: 'int'},
            ]
        }), true);
        await queryRunner.createForeignKey(
            'cTreatPlanTech03_variants',
            new TableForeignKey({
                columnNames: ['technique_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'cTreatPlanRes04_file_types',
                onDelete: 'CASCADE',
                name: 'idx_cTreatPlanRes02_activities_Technique_id'
            })
        )
        console.log("The table cTreatPlanTech03_variants was created, to use as technique catalog in the treatment plan");

    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        const tableVariants = await queryRunner.getTable('cTreatPlanTech03_variants');
        const fkVariants = tableVariants.foreignKeys.find(fk => fk.columnNames.indexOf('technique_id') !== -1);
        const tableTechniques = await queryRunner.getTable('cTreatPlanTech02_techniques');
        const fkTechniques = tableTechniques.foreignKeys.find(fk => fk.columnNames.indexOf('classification_id') !== -1);

        await queryRunner.dropForeignKey('cTreatPlanTech03_variants', fkVariants);
        await queryRunner.dropTable('cTreatPlanTech03_variants');
        console.log('Table cTreatPlanTech03_variants was deleted, was used as technique catalog in treatment plan');

        await queryRunner.dropForeignKey('cTreatPlanTech02_techniques', fkTechniques);
        await queryRunner.dropTable('cTreatPlanTech02_techniques');
        console.log('Table cTreatPlanTech02_techniques was deleted, was used as technique catalog in treatment plan');

        await queryRunner.dropTable('cTreatPlanTech01_classifications');
        console.log('Table cTreatPlanTech01_classifications was deleted, was used as technique catalog in treatment plan');

    }

}
