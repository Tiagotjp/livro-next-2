import { NextApiRequest, NextApiResponse } from 'next';
import { controleLivro } from '.';

export default (req: NextApiRequest, res: NextApiResponse) => {
  try {
    switch (req.method) {
      case 'DELETE':
        const codigo = Number(req.query.codigo);
        controleLivro.excluir(codigo);
        res.status(200).json({ message: 'Livro excluído com sucesso' });
        break;
      default:
        res.setHeader('Allow', ['DELETE']);
        res.status(405).end(`Método ${req.method} não permitido`);
        break;
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro interno no servidor' });
  }
};