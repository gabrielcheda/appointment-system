'use client'

import { Package, AlertTriangle, TrendingDown, Plus } from 'lucide-react'

export default function InventoryPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Estoque de Materiais</h1>
          <p className="text-gray-500 mt-1">Controle de insumos médicos e materiais</p>
        </div>
        <button className="btn btn-primary flex items-center space-x-2">
          <Plus className="w-5 h-5" />
          <span>Adicionar Item</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="card">
          <p className="text-sm text-gray-500">Total de Itens</p>
          <p className="text-2xl font-bold text-gray-900">342</p>
        </div>
        <div className="card">
          <p className="text-sm text-gray-500">Estoque Baixo</p>
          <p className="text-2xl font-bold text-danger-600">18</p>
        </div>
        <div className="card">
          <p className="text-sm text-gray-500">Vencendo em 30 dias</p>
          <p className="text-2xl font-bold text-warning-600">25</p>
        </div>
        <div className="card">
          <p className="text-sm text-gray-500">Valor Total</p>
          <p className="text-2xl font-bold text-success-600">R$ 45.8K</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 card">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Itens em Estoque</h2>
          <div className="space-y-3">
            {[
              { name: 'Luvas Descartáveis (P)', qty: 150, min: 200, unit: 'unid', status: 'low' },
              { name: 'Seringa 5ml', qty: 320, min: 100, unit: 'unid', status: 'ok' },
              { name: 'Máscara Cirúrgica', qty: 50, min: 200, unit: 'unid', status: 'low' },
              { name: 'Álcool 70%', qty: 25, min: 15, unit: 'L', status: 'ok' },
              { name: 'Gaze Estéril', qty: 80, min: 50, unit: 'pct', status: 'ok' },
              { name: 'Esparadrapo', qty: 10, min: 30, unit: 'unid', status: 'low' },
            ].map((item, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Package className="w-5 h-5 text-primary-600" />
                    <div>
                      <h3 className="font-semibold text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-600">
                        Quantidade: {item.qty} {item.unit} • Mínimo: {item.min} {item.unit}
                      </p>
                    </div>
                  </div>
                  {item.status === 'low' && (
                    <span className="badge badge-danger flex items-center space-x-1">
                      <AlertTriangle className="w-3 h-3" />
                      <span>Baixo</span>
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Alertas</h2>
          <div className="space-y-3">
            <div className="p-3 bg-danger-50 border border-danger-200 rounded-lg">
              <div className="flex items-start space-x-2">
                <AlertTriangle className="w-5 h-5 text-danger-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-danger-900">Estoque Crítico</p>
                  <p className="text-xs text-danger-700">18 itens abaixo do mínimo</p>
                </div>
              </div>
            </div>

            <div className="p-3 bg-warning-50 border border-warning-200 rounded-lg">
              <div className="flex items-start space-x-2">
                <TrendingDown className="w-5 h-5 text-warning-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-warning-900">Vencimento Próximo</p>
                  <p className="text-xs text-warning-700">25 itens vencem em 30 dias</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-3">Ações Recomendadas</h3>
              <div className="space-y-2">
                <button className="btn btn-danger w-full text-sm">
                  Solicitar Reposição
                </button>
                <button className="btn btn-secondary w-full text-sm">
                  Gerar Relatório
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
