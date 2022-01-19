import { MigrationInterface, QueryRunner } from 'typeorm';

export class fillTreatmentPlanCatalogResources1637631028826 implements MigrationInterface {

    public subjectsTable = 'cTreatPlanRes01_subjects';
    public activitiesTable = 'cTreatPlanRes02_activities';
    public fileTypesTable = 'cTreatPlanRes04_file_types';
    public filesTable = 'cTreatPlanRes03_files';

    public subjects = [
        {id: 1, value: 'Iniciales'},
        {id: 2, value: 'Cognitivas'},
        {id: 3, value: 'Emotivas'},
        {id: 4, value: 'Fisiológicas'},
    ];

    public activities = [
        {id: 1, value: 'Principios de la TCC', objective: 'Informar en que consiste el tipo de terapia a seguir',
            application: 'Todos los tipos de problemas emocionales y conductuales', subject_id: 1},
        {id: 2, value: 'Pensamientos Automáticos Negativos', objective: 'Enseñar como funciona el pensamiento y bajo que circunstancias se vuelve disfuncional',
            application: 'Todos los tipos de problemas emocionales y conductuales', subject_id: 1},
        {id: 3, value: 'Filtraje', objective: 'Enseñar el tipo de distorsión cognitiva: Filtraje, para quitar la visión de túnel ...',
            application: 'Todos los tipos de problemas emocionales y conductuales, especialmente en depresión', subject_id: 2},
        {id: 4, value: 'Deberías', objective: 'Enseñar el tipo de distorsión cognitiva: Deberias, para flexibilizar el pensamiento ...',
            application: 'Todos los tipos de problemas emocionales y conductuales', subject_id: 2},
    ];

    public fileTypes = [
        {id: 1, value: 'Podcast'},
        {id: 2, value: 'Lectura'},
        {id: 3, value: 'Informativa'},
        {id: 4, value: 'Psico-educación'},
        {id: 5, value: 'Video'},
        {id: 6, value: 'Audio'},
        {id: 7, value: 'Resgistro'},
        {id: 8, value: 'Exposición'},
    ];

    public files = [
        {id: 1, value: 'Principios de la TCC.mp3', activity_id: 1, file_type_id: 1},
        {id: 2, value: 'Principios de la TCC.wav', activity_id: 1, file_type_id: 5},
        {id: 3, value: 'Pensamientos Automáticos Negativos.mp3', activity_id: 2, file_type_id: 1},
        {id: 4, value: 'Filtraje.mp3', activity_id: 3, file_type_id: 1},
    ];

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query('delete from ' + this.subjectsTable + ';');
        await queryRunner.hasTable(this.subjectsTable).then(async () => {
            await queryRunner.manager.createQueryBuilder().insert().into(this.subjectsTable).values(this.subjects).execute();
        });
        console.log(`table ${this.subjectsTable} was filled with ${this.subjects.length} registers`)

        await queryRunner.query('delete from ' + this.activitiesTable + ';');
        await queryRunner.hasTable(this.activitiesTable).then(async () => {
            await queryRunner.manager.createQueryBuilder().insert().into(this.activitiesTable).values(this.activities).execute();
        });
        console.log(`table ${this.activitiesTable} was filled with ${this.activities.length} registers`)

        await queryRunner.query('delete from ' + this.fileTypesTable + ';');
        await queryRunner.hasTable(this.fileTypesTable).then(async () => {
            await queryRunner.manager.createQueryBuilder().insert().into(this.fileTypesTable).values(this.fileTypes).execute();
        });
        console.log(`table ${this.fileTypesTable} was filled with ${this.fileTypes.length} registers`)

        await queryRunner.query('delete from ' + this.filesTable + ';');
        await queryRunner.hasTable(this.filesTable).then(async () => {
            await queryRunner.manager.createQueryBuilder().insert().into(this.filesTable).values(this.files).execute();
        });
        console.log(`table ${this.filesTable} was filled with ${this.files.length} registers`)

    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query('delete from ' + this.subjectsTable + ';');
        console.log(`table ${this.subjectsTable} was cleared`)

        await queryRunner.query("delete from " + this.activitiesTable + ";");
        console.log(`table ${this.activitiesTable} was cleared`)

        await queryRunner.query("delete from " + this.fileTypesTable + ";");
        console.log(`table ${this.fileTypesTable} was cleared`)

        await queryRunner.query("delete from " + this.filesTable + ";");
        console.log(`table ${this.filesTable} was cleared`)

    }

}
