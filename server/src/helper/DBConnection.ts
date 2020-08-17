import knex from 'knex';

export default class DBConnection {
  private static instance: DBConnection;
  private connection: knex;
  
  private constructor() {
    this.connection = knex({
      client: 'mysql',
      connection: {
        host: process.env.MYSQL_HOST_IP,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
      }
    }); 
  }

  public getConnection(): knex {
    return this.connection;
  } 

  static getInstance(): DBConnection {
    if(!DBConnection.instance) {
      DBConnection.instance = new DBConnection()
    }
    return DBConnection.instance;
  }
}