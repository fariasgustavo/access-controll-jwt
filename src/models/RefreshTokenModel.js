const knex = require("../database");
const jwt = require("jsonwebtoken");

module.exports = {
    async create(token) {
        try{
            const { id: user_id } = jwt.decode(token);
            const result = knex('refresh_tokens')
                .insert({user_id,token});
    
            return result;
        }catch(e){
            throw new Error(e);
        }
    }
  };
  