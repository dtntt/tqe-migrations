import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class treatmentPlanCatalogResources1632350184485 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.createTable(new Table({
            name: 'cTreatPlanRes01_subjects',
            indices: [{name: 'idx_cTreatPlanRes01_subjects_Id', columnNames: ['id']}],
            columns: [
                {name: 'id', type: 'int', isPrimary: true, isGenerated: true, generationStrategy: 'increment'},
                {name: 'value', type: 'varchar', length: '45', isNullable: false}
            ]
        }), true);
        console.log('The table cTreatPlanRes01_subjects, was created to use as resources catalog in the treatment plan');

        await queryRunner.createTable(new Table({
            name: 'cTreatPlanRes02_activities',
            indices: [{name: 'idx_cTreatPlanRes02_activities_Id', columnNames: ['id']}],
            columns: [
                {name: 'id', type: 'int', isPrimary: true, isGenerated: true, generationStrategy: 'increment'},
                {name: 'value', type: 'varchar', length: '45', isNullable: false},
                {name: 'subject_id', type: 'int'}
            ]
        }), true);
        await queryRunner.createForeignKey(
            'cTreatPlanRes02_activities',
            new TableForeignKey({
                columnNames: ['subject_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'cTreatPlanRes01_subjects',
                onDelete: 'CASCADE',
                name: 'idx_cTreatPlanRes02_activities_Subject_id'
            })
        );
        console.log('The table cTreatPlanRes04_file_types was created, to use as resources catalog in the treatment plan');

        await queryRunner.createTable(new Table({
            name: 'cTreatPlanRes04_file_types',
            indices: [{name: 'idx_cTreatPlanRes04_file_types_Id', columnNames: ['id']}],
            columns: [
                {name: 'id', type: 'int', isPrimary: true, isGenerated: true, generationStrategy: 'increment'},
                {name: 'value', type: 'varchar', length: '45', isNullable: false},
            ]
        }), true);
        console.log("The table cTreatPlanRes04_file_types was created, to use as resources catalog in the treatment plan");

        await queryRunner.createTable(new Table({
            name: 'cTreatPlanRes03_files',
            indices: [{name: 'idx_cTreatPlanRes03_files_Id', columnNames: ['id']}],
            columns: [
                {name: 'id', type: 'int', isPrimary: true, isGenerated: true, generationStrategy: 'increment'},
                {name: 'value', type: 'varchar', length: '45', isNullable: false},
                {name: 'activity_id', type: 'int'},
                {name: 'file_type_id', type: 'int'}
            ]
        }), true);
        await queryRunner.createForeignKey(
            'cTreatPlanRes03_files',
            new TableForeignKey({
                columnNames: ['activity_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'cTreatPlanRes02_activities',
                onDelete: 'CASCADE',
                name: 'idx_cTreatPlanRes03_files_Activity_id'
            })
        )
        await queryRunner.createForeignKey(
            'cTreatPlanRes03_files',
            new TableForeignKey({
                columnNames: ['file_type_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'cTreatPlanRes04_file_types',
                onDelete: 'CASCADE',
                name: 'idx_cTreatPlanRes03_files_File_type_id'
            })
        )
        console.log("The table cTreatPlanRes03_files was created, to use as resources catalog in the treatment plan");

    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        const tableFiles = await queryRunner.getTable('cTreatPlanRes03_files');
        const fkActivityId = tableFiles.foreignKeys.find(fk => fk.columnNames.indexOf('activity_id') !== -1);
        const fkFileTypeId = tableFiles.foreignKeys.find(fk => fk.columnNames.indexOf('file_type_id') !== -1);
        const tableActivities = await queryRunner.getTable('cTreatPlanRes02_activities');
        const fkSubjectId = tableActivities.foreignKeys.find(fk => fk.columnNames.indexOf('subject_id') !== -1);

        await queryRunner.dropForeignKey('cTreatPlanRes03_files', fkActivityId);
        await queryRunner.dropForeignKey('cTreatPlanRes03_files', fkFileTypeId);
        await queryRunner.dropTable('cTreatPlanRes03_files');
        console.log('Table cTreatPlanRes03_files was deleted, was used as resources catalog in treatment plan');

        await queryRunner.dropForeignKey('cTreatPlanRes02_activities', fkSubjectId);
        await queryRunner.dropTable('cTreatPlanRes02_activities');
        console.log('Table cTreatPlanRes02_activities was deleted, was used as resources catalog in treatment plan');

        await queryRunner.dropTable('cTreatPlanRes01_subjects');
        console.log('Table cTreatPlanRes01_subjects was deleted, was used as resources catalog in treatment plan');

        await queryRunner.dropTable('cTreatPlanRes04_file_types');
        console.log('Table cTreatPlanRes04_file_types was deleted, was used as resources catalog in treatment plan');

    }

}
