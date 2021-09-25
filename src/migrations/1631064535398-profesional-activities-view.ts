import {MigrationInterface, QueryRunner} from "typeorm";

export class ProfessionalActivitiesView1631064535398 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("create or replace view professional_activities_view as select id_persona," +
            " id_cuenta, c06ap.id_actividad as id_actividad, nb_actividad as nombre, ds_actividad as descripcion " +
            "from mco03_informacion_academica_actividad_profesional join cc06_actividad_profesional c06ap on " +
            "mco03_informacion_academica_actividad_profesional.id_actividad = c06ap.id_actividad");
        console.log("The professional_activities_view was created to get it in the treatment plan as patient info");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("drop view professional_activities_view");
        console.log("The professional_activities_view was deleted, this view was used in the the treatment plan as patient info");
    }

}
