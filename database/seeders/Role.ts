import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Role from 'App/Models/Role'

import cli from 'cli-color'

export default class RoleSeeder extends BaseSeeder {
  public async run() {
    try {
      await Role.create({
        role: 'root',
        slug: 'root',
        description: 'a system root',
      })

      await Role.create({
        role: 'admin',
        slug: 'administrador',
        description: 'a system administrator',
      })

      await Role.create({
        role: 'provider',
        slug: 'provedor',
        description: 'a system provider',
      })

      // -> crete user role
      await Role.create({
        role: 'user',
        slug: 'usuário',
        description: 'a comum system user',
      })
    } catch (error) {
      console.log(cli.red('[😡 ]'), cli.cyan('-'), cli.yellow('Não foi possível semear a Role.'))
      console.log(cli.red('ERROR ->' + error))
    }
  }
}
