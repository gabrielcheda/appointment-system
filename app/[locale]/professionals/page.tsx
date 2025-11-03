'use client'

import { useState } from 'react'
import { mockProfessionals, mockAppointments } from '@/lib/mockData'
import { UserCog, Mail, Phone, Calendar, DollarSign, Clock, Award } from 'lucide-react'

export default function ProfessionalsPage() {
  const [selectedProfessional, setSelectedProfessional] = useState<any | null>(null)

  const professionalsWithStats = mockProfessionals.map((prof) => ({
    ...prof,
    totalAppointments: mockAppointments.filter((apt) => apt.professionalId === prof.id).length,
    todayAppointments: mockAppointments.filter((apt) => {
      const today = new Date()
      const aptDate = new Date(apt.date)
      return (
        apt.professionalId === prof.id &&
        aptDate.getDate() === today.getDate() &&
        aptDate.getMonth() === today.getMonth() &&
        aptDate.getFullYear() === today.getFullYear()
      )
    }).length,
  }))

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Profissionais de Saúde</h1>
          <p className="text-gray-500 mt-1">
            {mockProfessionals.length} profissional(is) cadastrado(s)
          </p>
        </div>
        <button className="btn btn-primary flex items-center space-x-2">
          <UserCog className="w-5 h-5" />
          <span>Novo Profissional</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="card">
          <p className="text-sm text-gray-500">Total de Profissionais</p>
          <p className="text-2xl font-bold text-gray-900">{mockProfessionals.length}</p>
        </div>
        <div className="card">
          <p className="text-sm text-gray-500">Ativos Hoje</p>
          <p className="text-2xl font-bold text-success-600">
            {professionalsWithStats.filter((p) => p.todayAppointments > 0).length}
          </p>
        </div>
        <div className="card">
          <p className="text-sm text-gray-500">Especialidades</p>
          <p className="text-2xl font-bold text-primary-600">
            {new Set(mockProfessionals.flatMap((p) => p.specialty)).size}
          </p>
        </div>
        <div className="card">
          <p className="text-sm text-gray-500">Disponíveis</p>
          <p className="text-2xl font-bold text-gray-900">
            {mockProfessionals.filter((p) => p.active).length}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Professionals List */}
        <div className="lg:col-span-2">
          <div className="card">
            <div className="grid gap-4">
              {professionalsWithStats.map((prof) => (
                <div
                  key={prof.id}
                  onClick={() => setSelectedProfessional(prof)}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedProfessional?.id === prof.id
                      ? 'border-primary-600 bg-primary-50'
                      : 'border-gray-200 hover:border-primary-300'
                  }`}
                >
                  <div className="flex items-start space-x-4">
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl font-bold flex-shrink-0"
                      style={{ backgroundColor: prof.color }}
                    >
                      {prof.name.charAt(0)}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-gray-900">{prof.name}</h3>
                          <p className="text-sm text-gray-600">{prof.crm}</p>
                        </div>
                        {prof.active && (
                          <span className="badge badge-success">Ativo</span>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-1 mb-3">
                        {prof.specialty.map((spec) => (
                          <span key={spec} className="badge badge-primary text-xs">
                            {spec}
                          </span>
                        ))}
                      </div>

                      <div className="grid grid-cols-2 gap-3 text-sm text-gray-600">
                        <div className="flex items-center space-x-2">
                          <Phone className="w-4 h-4" />
                          <span>{prof.phone}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4" />
                          <span>{prof.todayAppointments} consultas hoje</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Professional Details */}
        <div>
          <div className="card sticky top-6">
            {selectedProfessional ? (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Detalhes</h2>
                  <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                    Editar
                  </button>
                </div>

                <div className="space-y-4">
                  {/* Header */}
                  <div className="text-center pb-4 border-b border-gray-200">
                    <div
                      className="w-20 h-20 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-3"
                      style={{ backgroundColor: selectedProfessional.color }}
                    >
                      {selectedProfessional.name.charAt(0)}
                    </div>
                    <h3 className="font-semibold text-gray-900 text-lg">
                      {selectedProfessional.name}
                    </h3>
                    <p className="text-sm text-gray-600">{selectedProfessional.crm}</p>
                    <div className="flex flex-wrap justify-center gap-1 mt-2">
                      {selectedProfessional.specialty.map((spec: string) => (
                        <span key={spec} className="badge badge-primary text-xs">
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bio */}
                  {selectedProfessional.bio && (
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Sobre</h3>
                      <p className="text-sm text-gray-600">{selectedProfessional.bio}</p>
                    </div>
                  )}

                  {/* Contact */}
                  <div className="pt-4 border-t border-gray-200">
                    <h3 className="font-semibold text-gray-900 mb-2">Contato</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-900">{selectedProfessional.email}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-900">{selectedProfessional.phone}</span>
                      </div>
                    </div>
                  </div>

                  {/* Consultation Prices */}
                  <div className="pt-4 border-t border-gray-200">
                    <h3 className="font-semibold text-gray-900 mb-3">Valores de Consulta</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="text-sm text-gray-600">Primeira Consulta</span>
                        <span className="text-sm font-semibold text-gray-900">
                          R$ {selectedProfessional.consultationPrice.firstVisit.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="text-sm text-gray-600">Retorno</span>
                        <span className="text-sm font-semibold text-gray-900">
                          R$ {selectedProfessional.consultationPrice.return.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="text-sm text-gray-600">Procedimento</span>
                        <span className="text-sm font-semibold text-gray-900">
                          R$ {selectedProfessional.consultationPrice.procedure.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Working Hours */}
                  <div className="pt-4 border-t border-gray-200">
                    <h3 className="font-semibold text-gray-900 mb-3">Horários de Trabalho</h3>
                    <div className="space-y-2 text-sm">
                      {Object.entries(selectedProfessional.workingHours).map(([day, hours]: [string, any]) => (
                        <div key={day} className="flex justify-between">
                          <span className="text-gray-600 capitalize">
                            {day === 'monday' && 'Segunda'}
                            {day === 'tuesday' && 'Terça'}
                            {day === 'wednesday' && 'Quarta'}
                            {day === 'thursday' && 'Quinta'}
                            {day === 'friday' && 'Sexta'}
                            {day === 'saturday' && 'Sábado'}
                            {day === 'sunday' && 'Domingo'}:
                          </span>
                          <span className="text-gray-900 font-medium">
                            {hours.start} - {hours.end}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Accepted Insurance */}
                  <div className="pt-4 border-t border-gray-200">
                    <h3 className="font-semibold text-gray-900 mb-2">Convênios Aceitos</h3>
                    <div className="flex flex-wrap gap-1">
                      {selectedProfessional.acceptedInsurance.map((insurance: string) => (
                        <span key={insurance} className="badge badge-gray text-xs">
                          {insurance}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="pt-4 border-t border-gray-200">
                    <h3 className="font-semibold text-gray-900 mb-3">Estatísticas</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <p className="text-2xl font-bold text-primary-600">
                          {selectedProfessional.totalAppointments}
                        </p>
                        <p className="text-xs text-gray-600">Total Consultas</p>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <p className="text-2xl font-bold text-success-600">
                          {selectedProfessional.todayAppointments}
                        </p>
                        <p className="text-xs text-gray-600">Hoje</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <UserCog className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500">
                  Selecione um profissional para ver os detalhes
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
