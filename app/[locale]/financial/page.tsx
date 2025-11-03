'use client'

import { DollarSign, TrendingUp, CreditCard, FileText, Download } from 'lucide-react'
import { mockAppointments } from '@/lib/mockData'

export default function FinancialPage() {
  const totalRevenue = mockAppointments.filter(apt => apt.isPaid).reduce((sum, apt) => sum + apt.price, 0)
  const pendingRevenue = mockAppointments.filter(apt => !apt.isPaid && apt.status !== 'cancelled').reduce((sum, apt) => sum + apt.price, 0)

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Financeiro</h1>
          <p className="text-gray-500 mt-1">Gestão financeira e faturamento</p>
        </div>
        <button className="btn btn-primary flex items-center space-x-2">
          <Download className="w-5 h-5" />
          <span>Exportar Relatório</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Receita Total</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">
                R$ {totalRevenue.toLocaleString('pt-BR')}
              </p>
              <p className="text-sm text-success-600 mt-1 flex items-center">
                <TrendingUp className="w-4 h-4 mr-1" />
                +12.5%
              </p>
            </div>
            <div className="w-12 h-12 bg-success-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-success-600" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">A Receber</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">
                R$ {pendingRevenue.toLocaleString('pt-BR')}
              </p>
              <p className="text-sm text-gray-600 mt-1">Pendente</p>
            </div>
            <div className="w-12 h-12 bg-warning-100 rounded-lg flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-warning-600" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Recebido Hoje</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">R$ 3.250</p>
              <p className="text-sm text-gray-600 mt-1">12 pagamentos</p>
            </div>
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-primary-600" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Inadimplência</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">3.2%</p>
              <p className="text-sm text-success-600 mt-1">Abaixo da meta</p>
            </div>
            <div className="w-12 h-12 bg-danger-100 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-danger-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="card">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Receita por Forma de Pagamento</h2>
          <div className="space-y-4">
            {[
              { method: 'Cartão de Crédito', amount: totalRevenue * 0.45, percentage: 45 },
              { method: 'Convênio', amount: totalRevenue * 0.30, percentage: 30 },
              { method: 'Dinheiro', amount: totalRevenue * 0.15, percentage: 15 },
              { method: 'PIX', amount: totalRevenue * 0.10, percentage: 10 },
            ].map((item) => (
              <div key={item.method}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">{item.method}</span>
                  <span className="text-sm font-semibold text-gray-900">
                    R$ {item.amount.toLocaleString('pt-BR')}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-primary-600 h-2 rounded-full"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Contas a Receber</h2>
          <div className="space-y-3">
            {[
              { patient: 'Ana Maria Silva', amount: 300, dueDate: '2024-01-20', status: 'pending' },
              { patient: 'João Pedro Santos', amount: 450, dueDate: '2024-01-18', status: 'overdue' },
              { patient: 'Maria José Oliveira', amount: 200, dueDate: '2024-01-22', status: 'pending' },
              { patient: 'Carlos Eduardo Souza', amount: 350, dueDate: '2024-01-15', status: 'overdue' },
            ].map((payment, index) => (
              <div key={index} className="p-3 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900">{payment.patient}</h3>
                  <span className={`badge ${
                    payment.status === 'overdue' ? 'badge-danger' : 'badge-warning'
                  }`}>
                    {payment.status === 'overdue' ? 'Atrasado' : 'Pendente'}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">
                    Venc: {new Date(payment.dueDate).toLocaleDateString('pt-BR')}
                  </span>
                  <span className="font-semibold text-gray-900">
                    R$ {payment.amount.toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Últimas Transações</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Data</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Paciente</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Descrição</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Forma de Pag.</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Valor</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {mockAppointments.slice(0, 10).filter(apt => apt.isPaid).map((apt, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {new Date(apt.date).toLocaleDateString('pt-BR')}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">Paciente #{apt.patientId.slice(-4)}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{apt.specialty}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">Cartão</td>
                  <td className="px-4 py-3 text-sm text-gray-900 text-right font-medium">
                    R$ {apt.price.toFixed(2)}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className="badge badge-success">Pago</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
