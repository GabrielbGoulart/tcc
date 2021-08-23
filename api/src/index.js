
import express from "express";
import cors from 'cors';
import { enviroment } from "./enviroment/enviroment";
import * as StockRouter from './stocks/stocks.router'
import * as UsersRoute from './users/users.route'
import { initPG } from "./databases/postgres";
import { db, USER } from "./models";
import { tokenParse } from "./security/token_validate";

console.log(enviroment)
const app = express();
const PORT = enviroment.API_SETTINGS.PORT
app.use(cors())
app.all('/*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  res.header("Access-Control-Expose-Headers", "*")
  next()
});
app.options('*', cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(tokenParse)


const routers = [StockRouter,UsersRoute]



const bootstrap = async (routers) => {
  return new Promise(async (resolve) => {
    await db.sync({force:true})
    await USER.create({email:'estudante.ufc@ufc.com.br',password:'testedoteste'})
    for (const router of routers) {
      if (!router.applyRoutes) {
        throw new Error('Implementar Método applyRouter na classe de rota')
      }
      router.applyRoutes(app)
    }
    resolve()
  })
}


bootstrap(routers)
.then(() => {
  console.log('teste')
  app.listen(PORT, () => console.log(`server listening at port `+ PORT))
  app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
      status: error.status,
      message: error.message,
      stack: error.stack
    })
  })
})
