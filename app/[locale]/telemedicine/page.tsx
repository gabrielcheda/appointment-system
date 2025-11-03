'use client'

import { Video, Calendar, Users, Clock } from 'lucide-react'

export default function TelemedicinePage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Telemedicina</h1>
          <p className="text-gray-500 mt-1">Consultas virtuais e atendimento remoto</p>
        </div>
        <button className="btn btn-primary flex items-center space-x-2">
          <Video className="w-5 h-5" />
          <span>Iniciar Consulta Virtual</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Consultas Hoje</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">8</p>
            </div>
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-primary-600" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Em Andamento</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">2</p>
            </div>
            <div className="w-12 h-12 bg-success-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-success-600" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Próxima em</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">15 min</p>
            </div>
            <div className="w-12 h-12 bg-warning-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-warning-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="text-center py-16">
          <Video className="w-24 h-24 mx-auto text-gray-300 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Funcionalidade em Desenvolvimento</h2>
          <p className="text-gray-600 mb-6">
            O módulo de telemedicina está sendo desenvolvido e estará disponível em breve.
          </p>
          <div className="max-w-2xl mx-auto text-left bg-gray-50 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 mb-3">Recursos Planejados:</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>✓ Videochamadas HD com criptografia</li>
              <li>✓ Compartilhamento de tela e documentos</li>
              <li>✓ Gravação de consultas (com consentimento)</li>
              <li>✓ Chat integrado</li>
              <li>✓ Prescrição digital</li>
              <li>✓ Integração com prontuário eletrônico</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
