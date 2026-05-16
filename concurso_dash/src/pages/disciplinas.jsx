import '../App.css';
import './Simulados.css'
import Input from '../components/search.jsx'
import Button2 from '../components/button2.jsx';
import Action2 from '../components/actions2.jsx';

const disciplinasData = [
  { id: 1, nome: 'Português', questoes: 99, presenca: 2, media: 55 },
  { id: 2, nome: 'Matemática', questoes: 190, presenca: 3, media: 81 },
  { id: 3, nome: 'Informáica', questoes: 125, presenca: 2, media: 97 },
  { id: 4, nome: 'Direito Administrativo', presenca: 4, questoes: 26, media: 31 },
  { id: 5, nome: 'Conhecimentos Bancários', presenca: 5, questoes: 40, media: 77 },
];

function Disciplinas() {
    return(
        <div className="main-simulado">
            <header>
                <h1>Disciplinas</h1>
                <div id="novo_simulado">
                    <Button2 />
                </div>
            </header>
        <div className='card-container'>
            <table>
                <thead>
                    <tr>
                        <th scope="col" className='buscador' colSpan="5">
                            <Input />
                        </th>

                    </tr>
                    <tr className='title'>
                        <th scope="col">Nome da Disciplina</th>
                        <th scope="col">Questões Resolvidas</th>
                        <th scope="col">Presença Simulados</th>
                        <th scope="col">Média Geral</th>
                        <th scope="col">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {disciplinasData.map((disciplina) => (
                        <tr key={disciplina.id}>
                            <th scope="row">{disciplina.nome}</th>
                            <td>{disciplina.questoes}</td>
                            <td>{disciplina.presenca}</td>
                            <td>
                                <span className={`badge-media ${disciplina.media >= 80 ? 'media-boa' : disciplina.media <= 60 ? 'media-ruim' : 'media-media'}`}>
                                    {disciplina.media}%
                                </span>
                            </td>
                            <td>
                                <Action2 />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </div>
    )
}

export default Disciplinas;