const jwt = require('jsonwebtoken')
const consts = require('../constants' );
const { SECRET_KEY } = consts;

module.exports = {
    getToken: (user)=>{
        return new Promise((resolve, reject)=>{
            try{
                const token = `Bearer ${jwt.sign(user,SECRET_KEY)}`
                resolve({
                    token: token
                })
            }
            catch(err){
                reject(err)
            }
        })
    },
    verifyToken: async (req, res, next) => {
        //Missing Token
        if(!req.headers.authorization){
            res.status(401).send({error: 'Authorization headers not present'})
        }
        console.log(req.headers.authorization)
        const token = req.headers.authorization.split(' ')[1]
        console.log(token)
        try{
            const resp = jwt.verify(token,SECRET_KEY)
            if(!resp){
                res.status(401).send({error: 'Unauthorized Access'})
            }
            next()
        }
        catch(err){
            res.status(401).send({error: 'Unauthorized Access'})
        }
        
    }
}