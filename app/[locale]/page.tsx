'use client'

import { useState, useEffect } from 'react'
import { mockAppointments, mockPatients, mockProfessionals, mockQueue } from '@/lib/mockData'
import {
  Calendar,
  Clock,
  DollarSign,
  Users,
  AlertCircle,
  TrendingUp,
  Activity,
} from 'lucide-react'
import Link from 'next/link'

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalToday: 0,
    confirmed: 0,
    pending: 0,
    cancelled: 0,
    revenue: 0,
    inQueue: 0,
  })

  const [todayAppointments, setTodayAppointments] = useState<any[]>([])
  const [upcomingAppointments, setUpcomingAppointments] = useState<any[]>([])

  useEffect(() => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const todayEnd = new Date(today)
    todayEnd.setHours(23, 59, 59, 999)

    // Filter today's appointments
    const todayAppts = mockAppointments.filter((apt) => {
      const aptDate = new Date(apt.date)
      return aptDate >= today && aptDate <= todayEnd
    })

    // Calculate stats
    const confirmed = todayAppts.filter((a) => a.status === 'confirmed').length
    const pending = todayAppts.filter((a) => a.status === 'scheduled').length
    const cancelled = todayAppts.filter((a) => a.status === 'cancelled').length
    const revenue = todayAppts
      .filter((a) => a.isPaid)
      .reduce((sum, a) => sum + a.price, 0)

    setStats({
      totalToday: todayAppts.length,
      confirmed,
      pending,
      cancelled,
      revenue,
      inQueue: mockQueue.filter((q) => q.status === 'waiting').length,
    })

    // Enrich appointments with patient and professional data
    const enrichedToday = todayAppts
      .map((apt) => ({
        ...apt,
        patient: mockPatients.find((p) => p.id === apt.patientId),
        professional: mockProfessionals.find((p) => p.id === apt.professionalId),
      }))
      .sort((a, b) => a.startTime.localeCompare(b.startTime))

    setTodayAppointments(enrichedToday)

    // Get upcoming appointments (next 7 days, excluding today)
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)
    const nextWeek = new Date(today)
    nextWeek.setDate(nextWeek.getDate() + 7)

    const upcoming = mockAppointments
      .filter((apt) => {
        const aptDate = new Date(apt.date)
        return aptDate >= tomorrow && aptDate <= nextWeek && apt.status !== 'cancelled'
      })
      .map((apt) => ({
        ...apt,
        patient: mockPatients.find((p) => p.id === apt.patientId),
        professional: mockProfessionals.find((p) => p.id === apt.professionalId),
      }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(0, 5)

    setUpcomingAppointments(upcoming)
  }, [])

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
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm md:text-base">Visão geral da clínica</p>
        </div>
        <Link
          href="/appointments/new"
          className="btn btn-primary flex items-center justify-center space-x-2 w-full sm:w-auto"
        >
          <Calendar className="w-4 h-4 md:w-5 md:h-5" />
          <span className="text-sm md:text-base">Nova Consulta</span>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
        <div className="card">
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <p className="text-xs md:text-sm font-medium text-gray-500 dark:text-gray-400">Consultas Hoje</p>
              <p className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mt-1 md:mt-2">{stats.totalToday}</p>
              <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mt-1">
                {stats.confirmed} confirmadas
              </p>
            </div>
            <div className="w-10 h-10 md:w-12 md:h-12 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
              <Calendar className="w-5 h-5 md:w-6 md:h-6 text-primary-600 dark:text-primary-400" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <p className="text-xs md:text-sm font-medium text-gray-500 dark:text-gray-400">Fila de Espera</p>
              <p className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mt-1 md:mt-2">{stats.inQueue}</p>
              <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mt-1">pacientes aguardando</p>
            </div>
            <div className="w-10 h-10 md:w-12 md:h-12 bg-warning-100 dark:bg-warning-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
              <Users className="w-5 h-5 md:w-6 md:h-6 text-warning-600 dark:text-warning-400" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <p className="text-xs md:text-sm font-medium text-gray-500 dark:text-gray-400">Receita Hoje</p>
              <p className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mt-1 md:mt-2">
                R$ {stats.revenue.toLocaleString('pt-BR')}
              </p>
              <p className="text-xs md:text-sm text-success-600 dark:text-success-400 mt-1 flex items-center">
                <TrendingUp className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                +12% vs ontem
              </p>
            </div>
            <div className="w-10 h-10 md:w-12 md:h-12 bg-success-100 dark:bg-success-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
              <DollarSign className="w-5 h-5 md:w-6 md:h-6 text-success-600 dark:text-success-400" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <p className="text-xs md:text-sm font-medium text-gray-500 dark:text-gray-400">Pendentes</p>
              <p className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mt-1 md:mt-2">{stats.pending}</p>
              <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mt-1">
                {stats.cancelled} canceladas
              </p>
            </div>
            <div className="w-10 h-10 md:w-12 md:h-12 bg-danger-100 dark:bg-danger-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
              <AlertCircle className="w-5 h-5 md:w-6 md:h-6 text-danger-600 dark:text-danger-400" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 md:gap-6">
        {/* Today's Timeline */}
        <div className="lg:col-span-2 card">
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <h2 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">Agenda de Hoje</h2>
            <Link href="/calendar" className="text-xs md:text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300">
              Ver Calendário
            </Link>
          </div>

          <div className="space-y-3 max-h-[500px] overflow-y-auto">
            {todayAppointments.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <Calendar className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p>Nenhuma consulta agendada para hoje</p>
              </div>
            ) : (
              todayAppointments.map((apt) => (
                <div
                  key={apt.id}
                  className="flex items-center space-x-4 p-4 rounded-lg border border-gray-200 hover:border-primary-300 hover:bg-primary-50 transition-colors"
                >
                  <div className="text-center min-w-[80px]">
                    <p className="text-sm font-semibold text-gray-900">
                      {apt.startTime}
                    </p>
                    <p className="text-xs text-gray-500">{apt.duration} min</p>
                  </div>

                  <div
                    className="w-1 h-12 rounded"
                    style={{ backgroundColor: apt.professional?.color || '#3B82F6' }}
                  />

                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900">
                      {apt.patient?.firstName} {apt.patient?.lastName}
                    </p>
                    <p className="text-sm text-gray-600">
                      {apt.professional?.name} • {apt.specialty}
                    </p>
                    <p className="text-xs text-gray-500">{apt.room}</p>
                  </div>

                  <div className="text-right">
                    {getStatusBadge(apt.status)}
                    <p className="text-sm text-gray-500 mt-1">
                      R$ {apt.price.toFixed(2)}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Upcoming Appointments & Queue */}
        <div className="space-y-6">
          {/* Queue */}
          <div className="card">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Fila de Atendimento</h2>
            <div className="space-y-3">
              {mockQueue.filter((q) => q.status === 'waiting').length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Activity className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                  <p className="text-sm">Nenhum paciente na fila</p>
                </div>
              ) : (
                mockQueue
                  .filter((q) => q.status === 'waiting')
                  .map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center space-x-3 p-3 rounded-lg bg-warning-50 border border-warning-200"
                    >
                      <div className="w-8 h-8 bg-warning-600 rounded-full flex items-center justify-center text-white font-bold">
                        {item.position}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 text-sm">
                          {item.patientName}
                        </p>
                        <p className="text-xs text-gray-600">
                          {item.professionalName}
                        </p>
                      </div>
                      <div className="text-xs text-gray-500">
                        <Clock className="w-4 h-4 inline mr-1" />
                        {item.estimatedWaitTime} min
                      </div>
                    </div>
                  ))
              )}
            </div>
          </div>

          {/* Upcoming Appointments */}
          <div className="card">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Próximas Consultas
            </h2>
            <div className="space-y-3">
              {upcomingAppointments.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Calendar className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                  <p className="text-sm">Nenhuma consulta próxima</p>
                </div>
              ) : (
                upcomingAppointments.map((apt) => (
                  <div
                    key={apt.id}
                    className="p-3 rounded-lg border border-gray-200 hover:border-primary-300 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-semibold text-gray-900">
                        {new Date(apt.date).toLocaleDateString('pt-BR', {
                          day: '2-digit',
                          month: 'short',
                        })}
                      </p>
                      <p className="text-sm text-gray-600">{apt.startTime}</p>
                    </div>
                    <p className="text-sm text-gray-900">
                      {apt.patient?.firstName} {apt.patient?.lastName}
                    </p>
                    <p className="text-xs text-gray-500">
                      {apt.professional?.name}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Doctor Availability */}
          <div className="card">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Profissionais Disponíveis
            </h2>
            <div className="space-y-2">
              {mockProfessionals.slice(0, 5).map((prof) => (
                <div
                  key={prof.id}
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50"
                >
                  <div className="flex items-center space-x-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: prof.color }}
                    />
                    <p className="text-sm font-medium text-gray-900">
                      {prof.name.split(' ')[0]} {prof.name.split(' ')[prof.name.split(' ').length - 1]}
                    </p>
                  </div>
                  <span className="badge badge-success text-xs">Disponível</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
