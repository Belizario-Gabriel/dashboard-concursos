import { Edit2, BarChart2 } from 'lucide-react';

function Action2() {
    return (
                <div className="flex items-center gap-2">
                      <button
                        className="text-blue-400 hover:text-blue-300 transition-colors p-1.5 hover:bg-blue-400/10 rounded"
                        title="Editar"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        className="text-green-400 hover:text-green-300 transition-colors p-1.5 hover:bg-green-400/10 rounded"
                        title="Ver Gráfico de Evolução"
                      >
                        <BarChart2 className="w-4 h-4" />
                      </button>
                </div>
    );
}

export default Action2;