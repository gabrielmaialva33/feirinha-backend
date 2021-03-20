import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'

import Database from '@ioc:Adonis/Lucid/Database'
import cli from 'cli-color'
import Env from '@ioc:Adonis/Core/Env'

import User from 'App/Models/User'

export default class UserSeeder extends BaseSeeder {
  public async run() {
    try {
      const root = await Database.query().select('id').from('roles').where('role', 'root').first()
      await User.create({
        name: 'root',
        username: 'root',
        email: 'root@root.com',
        password: '123456',
        role_id: root.id,
      })

      const admin = await Database.query().select('id').from('roles').where('role', 'admin').first()
      await User.create({
        name: Env.get('SEED_NAME'),
        username: Env.get('SEED_USERNAME'),
        email: Env.get('SEED_EMAIL'),
        password: Env.get('SEED_PASSWORD'),
        role_id: admin.id,
      })
    } catch (error) {
      console.log(cli.red('[😡 ]'), cli.cyan('-'), cli.yellow('Não foi possível semear o Users.'))
      console.log(cli.red('ERROR ->' + error))
    }
  }
}
