import '../App.css';
import './Simulados.css'
import Input from '../components/search.jsx'
import Button from '../components/button.jsx';
import Action from '../components/actions.jsx';

const simuladosData = [
  { id: 1, nome: 'Simulado 1', data: '22/01/2025', questoes: 20, media: 5.3 },
  { id: 2, nome: 'Simulado 2', data: '30/03/2025', questoes: 30, media: 8.1 },
  { id: 3, nome: 'Simulado 3', data: '04/08/2025', questoes: 32, media: 9.7 },
  { id: 4, nome: 'Simulado 4', data: '09/12/2025', questoes: 26, media: 6.1 },
  { id: 5, nome: 'Simulado 5', data: '30/01/2026', questoes: 40, media: 7.7 },
];

function Simulados() {
    return(
        <div className="main-simulado">
            <header>
                <h1>Meus Simulados</h1>
                <div id="novo_simulado">
                    <Button />
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
                        <th scope="col">Nome do Simulado</th>
                        <th scope="col">Data</th>
                        <th scope="col">Qtd. Questões</th>
                        <th scope="col">Média</th>
                        <th scope="col">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {simuladosData.map((simulado) => (
                        <tr key={simulado.id}>
                            <th scope="row">{simulado.nome}</th>
                            <td>{simulado.data}</td>
                            <td>{simulado.questoes}</td>
                            <td>
                                <span className={`badge-media ${simulado.media >= 6 ? 'media-boa' : 'media-ruim'}`}>
                                    {simulado.media}
                                </span>
                            </td>
                            <td>
                                <Action />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </div>
    )
}

export default Simulados;