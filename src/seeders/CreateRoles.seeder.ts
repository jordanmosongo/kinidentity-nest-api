/* eslint-disable prettier/prettier */
import { Role } from 'src/typeorm/entities/Role';
import { Connection } from 'typeorm';
import { Seeder, Factory } from 'typeorm-seeding';

export class CreateRolesSeeder implements Seeder {
  async run(factory: Factory, connexion: Connection) {
    await connexion
      .createQueryBuilder()
      .insert()
      .into(Role)
      .values([
        { name: 'QUARTER_ADMIN' },
        { name: 'COMMUNE_ADMIN' },
        { name: 'TOWN_ADMIN' },
        { name: 'PEOPLE' },
      ])
      .execute();
  }
}
