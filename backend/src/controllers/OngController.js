const crypto = require('crypto');
const connection = require('../database/connection');

module.exports = {

  async index(request, response){
    const ongs = await connection('ongs').select('*');
    return response.json(ongs);
  },

  async edit(request, response){
    const ong_id = request.headers.authorization;
 
    const { 
      id,
      name, 
      email,
      whatsapp,
      address,
      number,
      city,
      uf 
    } = request.body;

    if(ong_id != id){
      return response.status(401).json({ error: 'Erro' });
    }
    await connection('ongs').update({
      name, 
      email,
      whatsapp,
      address,
      number,
      city,
      uf 
    });
    return response.json({ id });
  },
  
  async create(request, response){
    const { 
      name, 
      email,
      whatsapp,
      address,
      number,
      city,
      uf 
    } = request.body;
    const id = crypto.randomBytes(8).toString('HEX');
    await connection('ongs').insert({
      id,
      name, 
      email,
      whatsapp,
      address,
      number,
      city,
      uf 
    });
    return response.json({ id });
  }
};