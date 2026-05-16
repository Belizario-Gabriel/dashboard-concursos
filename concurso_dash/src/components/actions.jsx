import { Eye, Play, Trash2 } from 'lucide-react';

function Action() {
    return (
                <div className="flex items-center gap-2">
                      <button
                        className="text-yellow-400 hover:text-yellow-300 transition-colors p-1.5 hover:bg-yellow-400/10 rounded"
                        title="Ver Resultados"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        className="text-blue-400 hover:text-blue-300 transition-colors p-1.5 hover:bg-blue-400/10 rounded"
                        title="Retomar"
                      >
                        <Play className="w-4 h-4" />
                      </button>
                      <button
                        className="text-red-400 hover:text-red-300 transition-colors p-1.5 hover:bg-red-400/10 rounded"
                        title="Excluir"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                </div>
    );
}

export default Action;