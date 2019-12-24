const knex = require("../database");
const { decodeToken } = require("../utils/token");

module.exports = {
    async create(token) {
        try{
            const { id: user_id } = decodeToken(token);
            const result = knex('refresh_tokens')
                .insert({user_id,token});
    
            return result;
        }catch(e){
            throw new Error(e);
        }
    }
  };
  