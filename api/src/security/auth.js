export function authorize(profiles) {
    return (req, res, next) => {
        if (req.authenticated) {
            next()
        } else {
            res.status(403).send('Não possui usuário')
        }


    }
}
