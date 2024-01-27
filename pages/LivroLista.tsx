import { useState, useEffect } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { Livro } from '@/classes/modelo/Livro';
import { Menu } from '@/classes/componentes/Menu';
import { LinhaLivro } from '@/classes/componentes/LinhaLivro';

const baseURL: string = 'http://localhost:3000/api/livros';

const LivroLista: React.FC = () => {
  const obter = async () => {
    const response = await fetch(baseURL);
    return response.json();
  };

  const excluirLivro = async (codigo: number) => {
    const response = await fetch(`${baseURL}/${codigo}`, { method: 'DELETE' });
    return response.ok;
  };

  const [livros, setLivros] = useState<Array<Livro>>([]);
  const [carregado, setCarregado] = useState(false);

  useEffect(() => {
    obter().then((data) => {
      setLivros(data);
      setCarregado(true);
    });
  }, [carregado]);

  const excluir = (codigo: number) => {
    excluirLivro(codigo).then(() => setCarregado(false));
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Loja Next</title>
      </Head>
      <Menu />

      <main className='container'>
        <h1 className={styles.title}>Lista de Livros</h1>

        <table className="table">
          <thead className="table-dark">
            <tr>
              <th>Título</th>
              <th>Resumo</th>
              <th>Editora</th>
              <th>Autor</th>
            </tr>
          </thead>
          <tbody>
            {livros.map((livro: Livro) => (
              <LinhaLivro
                key={livro.codigo}
                livro={livro}
                excluir={() => excluir(livro.codigo)}
              />
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default LivroLista;
