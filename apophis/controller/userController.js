const sequelize = require('sequelize');
const ut = require('../modules/util');
const rm = require('../modules/responseMessage');
const sc = require('../modules/statusCode');
const jwt = require('../modules/jwt')
const {User} = require('../models');

module.exports = {
    login : async(req,res)=>{
        let user=null;
        const{
            snsId,
            provider
        }=req.body;
        try{
            user = await User.findOne({
                where:{
                    snsId,
                    provider
                }
            }) 
            if(!user){
                user = await User.create({
                    snsId,
                    provider
                })
                
            }
            const{accessToken,refreshToken}= await jwt.sign(user);
        return res.status(sc.OK).send(ut.success(sc.OK,rm.SIGN_IN_SUCCESS,{
            accessToken,
            refreshToken
        }))
        }catch(error){
            console.error(error);
            return res.status(sc.INTERNAL_SERVER_ERROR).send(ut.fail(sc.INTERNAL_SERVER_ERROR, rm.SIGN_IN_FAIL));
        }

    }
}