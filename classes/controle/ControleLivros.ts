import { Livro } from '../modelo/Livro';
var livros: Livro[] =[
{
    codigo: 1,
    codEditora:1,
    titulo: 'Use a Cabeça: Java',
    resumo:'Use a Cabeça! Java é uma experiência completa de aprendizado em programação orientada a Objetos (00) e Java.',   
    autores:['Bert Bates','Kathy Sierra'],
},
{
    codigo: 2,
    codEditora: 2,
    titulo: 'Java, como Programar',
    resumo:'Milhões de alunos e profissionais aprenderam programação e desenvolvimento de software com os livros Deitel',
    autores: ['Paul Deitel', 'Harvey Deitel'],
},
{
    codigo: 3,
    codEditora: 3,
    titulo: 'Core Java for the Impatient',
    resumo: `Readers familiar with Horstmann's original, two-volume "Core Java" books who are looking for a comprehensive, but condensed guide to all of the new features and functions of Java SE 9 will learn how these new features impact the language and core libraries.`,
    autores: ['Cay horstmann'],
},
];
class ControleLivros {
    obterLivros(): Livro[]{
        return livros;
    }

    incluir(livro: Livro):void{
        const novoCodigo =
        livros.reduce((max,l) => Math.max(max,l.codigo), 0) +1;
        livro.codigo = novoCodigo;
        livros.push(livro);
    }
    excluir(codigo: number):void{
        const indiceLivro = livros.findIndex((livro) => livro.codigo === codigo);
        if (indiceLivro >=0) {
            livros.splice(indiceLivro, 1);
        }
    }
}

export {ControleLivros};
