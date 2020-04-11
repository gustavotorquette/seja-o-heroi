const connection = require('../database/connection');

module.exports = {

  async index(request, response){
    const { page = 1 } = request.query;

    const [count] = await connection('casos').count();


    const casos = await connection('casos')
      .join('ongs', 'ongs.id', '=', 'casos.ong_id')
      .limit(5)
      .offset((page -1) * 5)
      .select([
          'casos.*', 
          'ongs.name', 
          'ongs.email', 
          'ongs.whatsapp',
          'ongs.address',
          'ongs.number',
          'ongs.city',
          'ongs.uf'
        ]);

    response.header('X-Total-Count', count['count(*)']);  

    return response.json(casos);
  },

  async create(request, response){
    const { title, description } = request.body;
    const ong_id = request.headers.authorization;

    const [id] = await connection('casos').insert({
      title,
      description,
      ong_id
    });

    return response.json({ id });
  },

  async edit(request, response){
    const { id } = request.params; // 3
    const ong_id = request.headers.authorization; //a78da0a0da7547e5

    const { title, description } = request.body;
    // {
    //   "title": "ESTÁ EDITADO COM SUCESSO",
    //   "description": "Descrição seu lindo"
    // }

    const caso = await connection('casos')
      .where('id', id)
      .select('ong_id')
      .first()

      if(caso.ong_id != ong_id){
        return response.status(401).json({ error: 'Você não tem permissão' });
      }

      await connection('casos').where('id', id).update({
        id,
        title, 
        description
      });

      return response.status(204).json({ id });
  },

  async delete(request, response){
    const { id } = request.params;
    const ong_id = request.headers.authorization;

    const caso = await connection('casos')
      .where('id', id)
      .select('ong_id')
      .first()


    if(caso.ong_id != ong_id){
      return response.status(401).json({ error: 'Você não tem permissão' });
    }
    
    await connection('casos').where('id', id).delete();

    return response.status(204).json({ success: "Caso deletado com sucesso" });
  }
};