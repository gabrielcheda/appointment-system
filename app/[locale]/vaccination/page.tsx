'use client'

import { Syringe, Users, Calendar, TrendingUp } from 'lucide-react'

export default function VaccinationPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Controle de Vacinação</h1>
          <p className="text-gray-500 mt-1">Gestão de carteiras de vacinação</p>
        </div>
        <button className="btn btn-primary flex items-center space-x-2">
          <Syringe className="w-5 h-5" />
          <span>Registrar Vacina</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="card">
          <p className="text-sm text-gray-500">Vacinas Aplicadas (Mês)</p>
          <p className="text-2xl font-bold text-gray-900">342</p>
        </div>
        <div className="card">
          <p className="text-sm text-gray-500">Campanhas Ativas</p>
          <p className="text-2xl font-bold text-primary-600">3</p>
        </div>
        <div className="card">
          <p className="text-sm text-gray-500">Doses Pendentes</p>
          <p className="text-2xl font-bold text-warning-600">87</p>
        </div>
        <div className="card">
          <p className="text-sm text-gray-500">Carteiras Completas</p>
          <p className="text-2xl font-bold text-success-600">156</p>
        </div>
      </div>

      <div className="card">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Vacinas Disponíveis</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { name: 'COVID-19', doses: 2, interval: '3 meses' },
            { name: 'Influenza (Gripe)', doses: 1, interval: 'Anual' },
            { name: 'Hepatite B', doses: 3, interval: '6 meses' },
            { name: 'Tríplice Viral', doses: 2, interval: '1 mês' },
            { name: 'DTP (Tríplice Bacteriana)', doses: 5, interval: 'Varia' },
            { name: 'HPV', doses: 2, interval: '6 meses' },
          ].map((vaccine) => (
            <div key={vaccine.name} className="p-4 border border-gray-200 rounded-lg hover:border-primary-300 transition-colors">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-gray-900">{vaccine.name}</h3>
                <Syringe className="w-5 h-5 text-primary-600" />
              </div>
              <p className="text-sm text-gray-600">Doses: {vaccine.doses}</p>
              <p className="text-sm text-gray-600">Intervalo: {vaccine.interval}</p>
              <button className="mt-3 text-sm text-primary-600 hover:text-primary-700 font-medium">
                Ver Detalhes →
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
