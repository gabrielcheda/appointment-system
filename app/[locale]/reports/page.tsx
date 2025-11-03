'use client'

import { mockAppointments, mockPatients, mockProfessionals } from '@/lib/mockData'
import { TrendingUp, DollarSign, Users, Calendar, Download, FileText } from 'lucide-react'

export default function ReportsPage() {
  const totalRevenue = mockAppointments
    .filter(apt => apt.isPaid)
    .reduce((sum, apt) => sum + apt.price, 0)

  const thisMonthRevenue = mockAppointments
    .filter(apt => {
      const aptDate = new Date(apt.date)
      const now = new Date()
      return apt.isPaid &&
        aptDate.getMonth() === now.getMonth() &&
        aptDate.getFullYear() === now.getFullYear()
    })
    .reduce((sum, apt) => sum + apt.price, 0)

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Relatórios e Análises</h1>
          <p className="text-gray-500 mt-1">Visão completa do desempenho da clínica</p>
        </div>
        <button className="btn btn-primary flex items-center space-x-2">
          <Download className="w-5 h-5" />
          <span>Exportar Relatório</span>
        </button>
      </div>

      {/* Key Metrics */}
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
                +15% vs mês passado
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
              <p className="text-sm font-medium text-gray-500">Total Pacientes</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{mockPatients.length}</p>
              <p className="text-sm text-primary-600 mt-1">Cadastrados</p>
            </div>
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-primary-600" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Consultas Realizadas</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">
                {mockAppointments.filter(a => a.status === 'completed').length}
              </p>
              <p className="text-sm text-gray-600 mt-1">Total</p>
            </div>
            <div className="w-12 h-12 bg-warning-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-warning-600" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Taxa de No-Show</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">
                {((mockAppointments.filter(a => a.status === 'no-show').length / mockAppointments.length) * 100).toFixed(1)}%
              </p>
              <p className="text-sm text-danger-600 mt-1">Precisa atenção</p>
            </div>
            <div className="w-12 h-12 bg-danger-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-danger-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue by Specialty */}
        <div className="card">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Receita por Especialidade</h2>
          <div className="space-y-3">
            {['Clínica Geral', 'Cardiologia', 'Dermatologia', 'Pediatria', 'Ortopedia'].map((spec) => {
              const revenue = mockAppointments
                .filter(apt => apt.specialty === spec && apt.isPaid)
                .reduce((sum, apt) => sum + apt.price, 0)
              const percentage = (revenue / totalRevenue) * 100

              return (
                <div key={spec}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">{spec}</span>
                    <span className="text-sm font-semibold text-gray-900">
                      R$ {revenue.toLocaleString('pt-BR')}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary-600 h-2 rounded-full"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Top Professionals */}
        <div className="card">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Profissionais Mais Ativos</h2>
          <div className="space-y-3">
            {mockProfessionals.slice(0, 5).map((prof) => {
              const appointments = mockAppointments.filter(apt => apt.professionalId === prof.id).length
              return (
                <div key={prof.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                      style={{ backgroundColor: prof.color }}
                    >
                      {prof.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{prof.name}</p>
                      <p className="text-xs text-gray-500">{prof.specialty.join(', ')}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">{appointments}</p>
                    <p className="text-xs text-gray-500">consultas</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Quick Reports */}
        <div className="card lg:col-span-2">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Relatórios Disponíveis</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { title: 'Relatório Financeiro', desc: 'Receitas e despesas detalhadas', icon: DollarSign },
              { title: 'Relatório de Atendimento', desc: 'Consultas e procedimentos', icon: Calendar },
              { title: 'Relatório de Pacientes', desc: 'Dados e estatísticas', icon: Users },
              { title: 'Performance dos Profissionais', desc: 'Produtividade e avaliações', icon: TrendingUp },
              { title: 'Utilização de Salas', desc: 'Ocupação e disponibilidade', icon: FileText },
              { title: 'Convênios', desc: 'Atendimentos por plano de saúde', icon: FileText },
            ].map((report) => {
              const Icon = report.icon
              return (
                <button
                  key={report.title}
                  className="p-4 border-2 border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-all text-left"
                >
                  <Icon className="w-8 h-8 text-primary-600 mb-2" />
                  <h3 className="font-semibold text-gray-900 mb-1">{report.title}</h3>
                  <p className="text-sm text-gray-600">{report.desc}</p>
                  <p className="text-sm text-primary-600 mt-2 font-medium">Gerar Relatório →</p>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
