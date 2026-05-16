import '../App.css';
import { useState } from 'react';
import './Simulados.css'
import { Camera, AlertTriangle } from 'lucide-react';

const primaryColor = '#059669';

function Configuracoes() {
    const [nome, setNome] = useState('Gabriel Belizario');
    const [concurso, setConcurso] = useState('Banco do Brasil 2026');

    const handleSalvar = () => {
    alert('Alterações salvas com sucesso!');
  };

  const handleResetarDados = () => {
    if (
      confirm(
        'ATENÇÃO: Esta ação é irreversível e excluirá permanentemente todos os seus simulados, histórico e progresso. Deseja realmente resetar todos os seus dados?'
      )
    ) {
      alert('Dados resetados com sucesso!');
    }
  };
  
    return(
        <div className="main-simulado">
            <header>
                <h1>Configurações</h1>
                <p>Gerencie sua conta e preferências</p>
            </header>

{/* Primeiro card */}
            <div className="card-container">
                <div className="bg-slate-900 rounded-2xl border border-slate-800 p-8">
                    <header className="mb-6">
                        <h3 className="text-white font-semibold text-lg">Informações da Conta</h3>
                    </header>
                    
                    <div className="flex flex-col items-center mb-8">
                        <div className="relative">
                            <div
                                style={{ backgroundColor: primaryColor }}
                                className="w-24 h-24 rounded-full flex items-center justify-center text-white text-3xl font-bold"
                            >
                                G
                            </div>
                            <button
                                style={{ backgroundColor: primaryColor }}
                                className="absolute bottom-0 right-0 w-8 h-8 rounded-full flex items-center justify-center transition-opacity hover:opacity-90"
                            >
                                <Camera className="w-4 h-4 text-slate-900" />
                            </button>
                        </div>
                    </div>
          
                    <div className="space-y-6">
                        <div>
                            <label className="block text-slate-400 text-sm font-medium mb-2">
                                Seu Nome
                            </label>
                            <input
                                type="text"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                                className="w-full bg-slate-800 text-white placeholder-slate-500 px-4 py-3 rounded-lg border border-slate-700 focus:outline-none focus:border-[var(--focus-color)] transition-colors"
                            />
                        </div>

                        <div>
                            <label className="block text-slate-400 text-sm font-medium mb-2">
                                Nome do Concurso
                            </label>
                            <input
                                type="text"
                                value={concurso}
                                onChange={(e) => setConcurso(e.target.value)}
                                className="w-full bg-slate-800 text-white placeholder-slate-500 px-4 py-3 rounded-lg border border-slate-700 focus:outline-none focus:border-[var(--focus-color)] transition-colors"
                            />
                        </div>

                        <button
                            onClick={handleSalvar}
                            style={{ backgroundColor: primaryColor }}
                            className="w-full text-slate-900 font-semibold px-6 py-3 rounded-lg transition-opacity hover:opacity-90"
                        >
                            Salvar Alterações
                        </button>
                    </div>
                </div>
            </div>



{/* Alerta e excluir dados*/}

            <div className="card-container">
                <div className="bg-slate-900 rounded-2xl border border-red-900/50 p-8">
                <div className="flex items-start gap-4 mb-6">
                <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <AlertTriangle className="w-5 h-5 text-red-400" />
                </div>
            <div>
              <h3 className="text-white font-semibold text-lg mb-2">Zona de Perigo</h3>
              <p className="text-slate-400 text-sm">
                <strong className="text-red-400">Atenção:</strong> Esta ação é irreversível e excluirá
                permanentemente todos os seus simulados, histórico e progresso. Use com
                extrema cautela.
              </p>
            </div>
          </div>

          <button
            onClick={handleResetarDados}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors border border-red-500"
          >
            Resetar Meus Dados
          </button>
                </div>
            </div>
        </div>
    )
}

export default Configuracoes;