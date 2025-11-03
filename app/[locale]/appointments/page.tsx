'use client'

import { useState, useEffect } from 'react'
import { mockAppointments, mockPatients, mockProfessionals } from '@/lib/mockData'
import { Calendar, Search, Filter, Plus, Clock, User, MapPin } from 'lucide-react'
import Link from 'next/link'

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<any[]>([])
  const [filteredAppointments, setFilteredAppointments] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [dateFilter, setDateFilter] = useState('all')

  useEffect(() => {
    // Enrich appointments with patient and professional data
    const enriched = mockAppointments.map((apt) => ({
      ...apt,
      patient: mockPatients.find((p) => p.id === apt.patientId),
      professional: mockProfessionals.find((p) => p.id === apt.professionalId),
    }))

    setAppointments(enriched)
    setFilteredAppointments(enriched)
  }, [])

  useEffect(() => {
    let filtered = [...appointments]

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (apt) =>
          apt.patient?.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          apt.patient?.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          apt.professional?.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter((apt) => apt.status === statusFilter)
    }

    // Date filter
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    if (dateFilter === 'today') {
      filtered = filtered.filter((apt) => {
        const aptDate = new Date(apt.date)
        aptDate.setHours(0, 0, 0, 0)
        return aptDate.getTime() === today.getTime()
      })
    } else if (dateFilter === 'upcoming') {
      filtered = filtered.filter((apt) => new Date(apt.date) > today)
    } else if (dateFilter === 'past') {
      filtered = filtered.filter((apt) => new Date(apt.date) < today)
    }

    // Sort by date and time
    filtered.sort((a, b) => {
      const dateCompare = new Date(b.date).getTime() - new Date(a.date).getTime()
      if (dateCompare !== 0) return dateCompare
      return b.startTime.localeCompare(a.startTime)
    })

    setFilteredAppointments(filtered)
  }, [searchTerm, statusFilter, dateFilter, appointments])

  const getStatusBadge = (status: string) => {
    const badges: { [key: string]: { color: string; label: string } } = {
      scheduled: { color: 'badge-gray', label: 'Agendado' },
      confirmed: { color: 'badge-success', label: 'Confirmado' },
      'in-progress': { color: 'badge-primary', label: 'Em Andamento' },
      completed: { color: 'badge-success', label: 'Concluído' },
      cancelled: { color: 'badge-danger', label: 'Cancelado' },
      'no-show': { color: 'badge-warning', label: 'Faltou' },
    }
    const badge = badges[status] || badges.scheduled
    return <span className={`badge ${badge.color}`}>{badge.label}</span>
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Agendamentos</h1>
          <p className="text-gray-500 mt-1">Gerencie todas as consultas</p>
        </div>
        <Link href="/appointments/new" className="btn btn-primary flex items-center space-x-2">
          <Plus className="w-5 h-5" />
          <span>Nova Consulta</span>
        </Link>
      </div>

      {/* Filters */}
      <div className="card mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Buscar
            </label>
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Paciente ou profissional..."
                className="input pl-10"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="input"
            >
              <option value="all">Todos</option>
              <option value="scheduled">Agendado</option>
              <option value="confirmed">Confirmado</option>
              <option value="in-progress">Em Andamento</option>
              <option value="completed">Concluído</option>
              <option value="cancelled">Cancelado</option>
              <option value="no-show">Faltou</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Período
            </label>
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="input"
            >
              <option value="all">Todos</option>
              <option value="today">Hoje</option>
              <option value="upcoming">Próximos</option>
              <option value="past">Passados</option>
            </select>
          </div>

          <div className="flex items-end">
            <button className="btn btn-secondary w-full flex items-center justify-center space-x-2">
              <Filter className="w-5 h-5" />
              <span>Mais Filtros</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="card">
          <p className="text-sm text-gray-500">Total</p>
          <p className="text-2xl font-bold text-gray-900">{filteredAppointments.length}</p>
        </div>
        <div className="card">
          <p className="text-sm text-gray-500">Confirmados</p>
          <p className="text-2xl font-bold text-success-600">
            {filteredAppointments.filter((a) => a.status === 'confirmed').length}
          </p>
        </div>
        <div className="card">
          <p className="text-sm text-gray-500">Pendentes</p>
          <p className="text-2xl font-bold text-warning-600">
            {filteredAppointments.filter((a) => a.status === 'scheduled').length}
          </p>
        </div>
        <div className="card">
          <p className="text-sm text-gray-500">Cancelados</p>
          <p className="text-2xl font-bold text-danger-600">
            {filteredAppointments.filter((a) => a.status === 'cancelled').length}
          </p>
        </div>
      </div>

      {/* Appointments List */}
      <div className="card">
        <div className="space-y-3">
          {filteredAppointments.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500">Nenhum agendamento encontrado</p>
            </div>
          ) : (
            filteredAppointments.map((apt) => (
              <div
                key={apt.id}
                className="p-4 rounded-lg border border-gray-200 hover:border-primary-300 hover:bg-primary-50 transition-all"
              >
                <div className="flex items-start space-x-4">
                  <div
                    className="w-1 h-full rounded"
                    style={{ backgroundColor: apt.professional?.color || '#3B82F6' }}
                  />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {apt.patient?.firstName} {apt.patient?.lastName}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {apt.professional?.name} • {apt.specialty}
                        </p>
                      </div>
                      {getStatusBadge(apt.status)}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-sm text-gray-600">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {new Date(apt.date).toLocaleDateString('pt-BR', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </span>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4" />
                        <span>
                          {apt.startTime} - {apt.endTime}
                        </span>
                      </div>

                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4" />
                        <span>{apt.room}</span>
                      </div>

                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4" />
                        <span>{apt.type === 'first-visit' ? 'Primeira Consulta' : 'Retorno'}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-500">Valor:</span>
                        <span className="text-sm font-semibold text-gray-900">
                          R$ {apt.price.toFixed(2)}
                        </span>
                        {apt.isPaid && (
                          <span className="badge badge-success text-xs">Pago</span>
                        )}
                      </div>

                      <div className="flex space-x-2">
                        <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                          Ver Detalhes
                        </button>
                        {apt.status === 'scheduled' && (
                          <>
                            <span className="text-gray-300">|</span>
                            <button className="text-sm text-success-600 hover:text-success-700 font-medium">
                              Confirmar
                            </button>
                            <span className="text-gray-300">|</span>
                            <button className="text-sm text-danger-600 hover:text-danger-700 font-medium">
                              Cancelar
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
