import { USER } from "../models"
import * as jwt from "jsonwebtoken"
import { enviroment } from "../enviroment/enviroment"
async function login(req, res, next) {
    try {
        const { email, password } = req.body
        const user = await USER.findOne({ where: { email } })
        // @ts-ignore
        console.log(user)
        // console.log('teste', user, user.getDataValue('password'))
        if (password == user.getDataValue('password')) {
            res.json({id:user.getDataValue('id'),email:user.getDataValue('email'),token:jwt.sign({ id:user.getDataValue('id'),email:user.getDataValue('email')}, enviroment.SECURITY.apiSecret)})
        }
        else{throw new Error('Senha incorreta')}
    } catch (error) {
        console.log(error)
        res.status(400).json({message:'Usuário inválido'})

    }
}


export const applyRoutes = (application) => {
    application.post('/authenticate', [login])
    // application.post('/contracts/:id/edit/datesign', [authorize(), editStatus])
}
