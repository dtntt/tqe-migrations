import { MigrationInterface, QueryRunner } from 'typeorm';

export class fillTreatmentPlanCatalogTechniques1637631050893 implements MigrationInterface {

    public classificationsTable = 'cTreatPlanTech01_classifications';
    public techniquesTable = 'cTreatPlanTech02_techniques';
    public variantsTable = 'cTreatPlanTech03_variants';

    public classifications = [
        {id: 1, value: 'Iniciales'},
        {id: 2, value: 'Cognitivas'},
        {id: 3, value: 'Counductuales'},
        {id: 4, value: 'Emotivas'},
        {id: 5, value: 'Fisiológicas'},
        {id: 6, value: 'Programas con varias técnicas'},
    ];

    public techniques = [
        {id: 1, value: 'Psicoeducación', objective: '', application: '',
            min_sessions_length: -1, max_sessions_length: -1, classification_id: 1},
        {id: 2, value: 'Empatía - rapport', objective: 'Percibir, compartir y comprender las experiencias del paciente. Ser un buen escucha', application: 'Todas las problematicas',
            min_sessions_length: null, max_sessions_length: null, classification_id: 1},
        {id: 3, value: 'Inteción paradójica', objective: '', application: '',
            min_sessions_length: null, max_sessions_length: null, classification_id: 2},
        {id: 4, value: 'Análisis costo - beneficio de los PAN', objective: '', application: '',
            min_sessions_length: null, max_sessions_length: null, classification_id: 2},
        {id: 5, value: 'Identificar creencias', objective: '', application: '',
            min_sessions_length: null, max_sessions_length: null, classification_id: 2},
    ];

    public variants = [
        {id: 1, value: 'Fundamientos del tratamiento', objective: 'Explicar en que se basa el usa de las distintas ...', application: 'Todas las problematicas',
            min_sessions_length: 2, max_sessions_length: 2, technique_id: 1},
        {id: 2, value: 'Padecimiento', objective: 'Explicar la naturaleza y principios que mantienen ...', application: 'Todas las problematicas',
            min_sessions_length: 2, max_sessions_length: 2, technique_id: 1},
        {id: 3, value: 'Retroalimentación o devolución', objective: 'Explicar la naturaleza y principios que mantienen ...', application: 'Todas las problematicas',
            min_sessions_length: 1, max_sessions_length: 2, technique_id: 1},
        {id: 4, value: 'Prescripción del síntoma. Provocar de forma voluntaría, los sintomas que ...', objective: 'Cambiar la interpretación de los juicios ...', application: '- Con pacientes desafiantes y opocionstas\n - Falta de control sobre el comporatmiento \n - Cuando el ...',
            min_sessions_length: 2, max_sessions_length: 3, technique_id: 3},
        {id: 5, value: 'Resticción paradójica y contención del cambio. Desaconsejar ...', objective: 'Cambiar la interpretación de los juicios ...', application: '- Con pacientes desafiantes y opocionstas\n - Falta de control sobre el comporatmiento \n - Cuando el ...',
            min_sessions_length: 2, max_sessions_length: 3, technique_id: 3},
        {id: 6, value: 'Cambio de postura. Adoptar y exagerar la visión catastrofista ...', objective: 'Cambiar la interpretación de los juicios ...', application: '- Con pacientes desafiantes y opocionstas\n - Falta de control sobre el comporatmiento \n - Cuando el ...',
            min_sessions_length: 2, max_sessions_length: 3, technique_id: 3},
        {id: 7, value: 'Programación de recaidas. Generar y controlar recaídas y comprobar que ...', objective: 'Cambiar la interpretación de los juicios ...', application: '- Con pacientes desafiantes y opocionstas\n - Falta de control sobre el comporatmiento \n - Cuando el ...',
            min_sessions_length: 2, max_sessions_length: 3, technique_id: 3},
    ];

public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query('delete from ' + this.classificationsTable + ';');
        await queryRunner.hasTable(this.classificationsTable).then(async () => {
            await queryRunner.manager.createQueryBuilder().insert().into(this.classificationsTable).values(this.classifications).execute();
        });
        console.log(`table ${this.classificationsTable} was filled with ${this.classifications.length} registers`)

        await queryRunner.query('delete from ' + this.techniquesTable + ';');
        await queryRunner.hasTable(this.techniquesTable).then(async () => {
            await queryRunner.manager.createQueryBuilder().insert().into(this.techniquesTable).values(this.techniques).execute();
        });
        console.log(`table ${this.techniquesTable} was filled with ${this.techniques.length} registers`)

        await queryRunner.query('delete from ' + this.variantsTable + ';');
        await queryRunner.hasTable(this.variantsTable).then(async () => {
            await queryRunner.manager.createQueryBuilder().insert().into(this.variantsTable).values(this.variants).execute();
        });
        console.log(`table ${this.variantsTable} was filled with ${this.variants.length} registers`)

    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query('delete from ' + this.classificationsTable + ';');
        console.log(`table ${this.variantsTable} was cleared`)

        await queryRunner.query("delete from " + this.techniquesTable + ";");
        console.log(`table ${this.variantsTable} was cleared`)

        await queryRunner.query("delete from " + this.variantsTable + ";");
        console.log(`table ${this.variantsTable} was cleared`)

    }

}
