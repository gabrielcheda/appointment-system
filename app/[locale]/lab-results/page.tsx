'use client'

import { FileText, Upload, Download, Search } from 'lucide-react'

export default function LabResultsPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Resultados de Exames</h1>
          <p className="text-gray-500 mt-1">Portal de exames laboratoriais</p>
        </div>
        <button className="btn btn-primary flex items-center space-x-2">
          <Upload className="w-5 h-5" />
          <span>Importar Resultado</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="card">
          <p className="text-sm text-gray-500">Exames Pendentes</p>
          <p className="text-2xl font-bold text-warning-600">23</p>
        </div>
        <div className="card">
          <p className="text-sm text-gray-500">Resultados Hoje</p>
          <p className="text-2xl font-bold text-primary-600">12</p>
        </div>
        <div className="card">
          <p className="text-sm text-gray-500">Aguardando Análise</p>
          <p className="text-2xl font-bold text-gray-900">8</p>
        </div>
        <div className="card">
          <p className="text-sm text-gray-500">Total Este Mês</p>
          <p className="text-2xl font-bold text-success-600">156</p>
        </div>
      </div>

      <div className="card mb-6">
        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por paciente, tipo de exame..."
              className="input pl-10"
            />
          </div>
          <button className="btn btn-secondary">Filtrar</button>
        </div>
      </div>

      <div className="card">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Exames Recentes</h2>
        <div className="space-y-3">
          {[
            { patient: 'Ana Maria Silva', exam: 'Hemograma Completo', date: '2024-01-15', status: 'Concluído' },
            { patient: 'João Pedro Santos', exam: 'Glicemia em Jejum', date: '2024-01-14', status: 'Concluído' },
            { patient: 'Maria José Oliveira', exam: 'Colesterol Total', date: '2024-01-14', status: 'Pendente' },
            { patient: 'Carlos Eduardo Souza', exam: 'Raio-X Tórax', date: '2024-01-13', status: 'Concluído' },
            { patient: 'Beatriz Fernandes', exam: 'Ultrassom Abdominal', date: '2024-01-13', status: 'Em Análise' },
          ].map((result, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-lg hover:border-primary-300 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <FileText className="w-5 h-5 text-primary-600" />
                    <div>
                      <h3 className="font-semibold text-gray-900">{result.patient}</h3>
                      <p className="text-sm text-gray-600">{result.exam}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500">
                    Data: {new Date(result.date).toLocaleDateString('pt-BR')}
                  </p>
                </div>

                <div className="flex items-center space-x-3">
                  <span className={`badge ${
                    result.status === 'Concluído' ? 'badge-success' :
                    result.status === 'Pendente' ? 'badge-warning' :
                    'badge-primary'
                  }`}>
                    {result.status}
                  </span>
                  {result.status === 'Concluído' && (
                    <button className="p-2 hover:bg-gray-100 rounded-lg">
                      <Download className="w-5 h-5 text-gray-600" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
