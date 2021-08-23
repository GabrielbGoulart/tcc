import { DataTypes, Deferrable, Sequelize } from 'sequelize';
import { enviroment } from './enviroment/enviroment';
const sequelize = new Sequelize(enviroment.DB_SETTINGS.POSTGRES.DATABASE, enviroment.DB_SETTINGS.POSTGRES.USER, enviroment.DB_SETTINGS.POSTGRES.PASSWORD, {
  host: enviroment.DB_SETTINGS.POSTGRES.URL,
  dialect: 'postgres',
  // @ts-ignore
  operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

export const USER = sequelize.define("user", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: false

    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false
    }
})
export const ORDERS = sequelize.define("orders", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    target_value: {
      type: DataTypes.FLOAT,
    },
    stock: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    buynow:{
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    user_id:{
        type: DataTypes.INTEGER,
        references: {
            // This is a reference to another model
            model: USER,
       
            // This is the column name of the referenced model
            key: 'id'
          }
    }
})
export const db = sequelize