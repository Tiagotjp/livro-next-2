import { Menu } from '@/classes/componentes/Menu';
import { ControleEditora } from '@/classes/controle/ControleEditora';
import { Livro } from '@/classes/modelo/Livro';
import styles from '@/styles/Home.module.css';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

const controleEditora: ControleEditora = new ControleEditora();
const baseURL: string = 'http://localhost:3000/api/livros';

const LivroDados = () => {
  const incluirLivro = async (livro: Livro) => {
    const response = await fetch(baseURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(livro),
    });

    return response.ok;
  };

  const opcoes = controleEditora.getEditoras().map((editora) => ({
    value: editora.codEditora,
    text: editora.nome,
  }));

  const [titulo, setTitulo] = useState('');
  const [resumo, setResumo] = useState('');
  const [autores, setAutores] = useState('');
  const [codEditora, setCodEditora] = useState<number>(opcoes[0].value);
  const navigate = useRouter().push;

  const tratarCombo = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCodEditora(Number(event.target.value));
  };

  const incluir = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const livro: Livro = {
      codigo: 0,
      titulo: titulo,
      resumo: resumo,
      autores: autores.split('\n'),
      codEditora: codEditora,
    };
    incluirLivro(livro).then(() => {
      navigate('/LivroLista');
    });
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Dados do Livro</title>
      </Head>

      <Menu />

      <main className="container">
        <h1 className={styles.title}>Dados do Livro</h1>

        <form onSubmit={incluir}>
          <div className="form-group">
            <label htmlFor="titulo">Título</label>
            <input
              type="text"
              id="titulo"
              className="form-control"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="resumo">Resumo</label>
            <textarea
              id="resumo"
              className="form-control"
              value={resumo}
              onChange={(e) => setResumo(e.target.value)}
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="autores">Autores</label>
            <textarea
              id="autores"
              className="form-control"
              value={autores}
              onChange={(e) => setAutores(e.target.value)}
            ></textarea>
          </div>
          <div className="form-group mb-2">
            <label htmlFor="editora">Editora</label>
            <select
              id="editora"
              className="form-control"
              value={codEditora}
              onChange={tratarCombo}
            >
              {opcoes.map((opcao) => (
                <option key={opcao.value} value={opcao.value}>
                  {opcao.text}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              Salvar Dados
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default LivroDados;
