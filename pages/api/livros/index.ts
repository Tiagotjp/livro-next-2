import { ControleLivros } from '@/classes/controle/ControleLivros';
import { NextApiRequest, NextApiResponse } from 'next';

export const controleLivro = new ControleLivros();

export default (req: NextApiRequest, res: NextApiResponse) => {
  try {
    switch (req.method) {
      case 'GET':
        const livros = controleLivro.obterLivros();
        res.status(200).json(livros);
        break;
      case 'POST':
        const livro = req.body;
        controleLivro.incluir(livro);
        res.status(200).json({ message: 'Livro incluído com sucesso' });
        break;
      default:
        res.status(405).end(`Método ${req.method} não permitido`);
        break;
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro interno no servidor' });
  }
};