'use client'

import { useState, useEffect } from 'react'
import { mockAppointments, mockPatients, mockProfessionals } from '@/lib/mockData'
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Filter, Plus } from 'lucide-react'
import Link from 'next/link'

type ViewMode = 'month' | 'week' | 'day'

export default function CalendarPage() {
  const [viewMode, setViewMode] = useState<ViewMode>('month')
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [appointments, setAppointments] = useState<any[]>([])

  useEffect(() => {
    const enriched = mockAppointments.map((apt) => ({
      ...apt,
      patient: mockPatients.find((p) => p.id === apt.patientId),
      professional: mockProfessionals.find((p) => p.id === apt.professionalId),
    }))
    setAppointments(enriched)
  }, [])

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []

    // Previous month days
    for (let i = 0; i < startingDayOfWeek; i++) {
      const prevDate = new Date(year, month, -startingDayOfWeek + i + 1)
      days.push({ date: prevDate, isCurrentMonth: false })
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({ date: new Date(year, month, i), isCurrentMonth: true })
    }

    // Next month days
    const remainingDays = 42 - days.length
    for (let i = 1; i <= remainingDays; i++) {
      days.push({ date: new Date(year, month + 1, i), isCurrentMonth: false })
    }

    return days
  }

  const getAppointmentsForDate = (date: Date) => {
    return appointments.filter((apt) => {
      const aptDate = new Date(apt.date)
      return (
        aptDate.getDate() === date.getDate() &&
        aptDate.getMonth() === date.getMonth() &&
        aptDate.getFullYear() === date.getFullYear()
      )
    })
  }

  const handlePrevious = () => {
    if (viewMode === 'month') {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
    } else if (viewMode === 'week') {
      setCurrentDate(new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000))
    } else {
      setCurrentDate(new Date(currentDate.getTime() - 24 * 60 * 60 * 1000))
    }
  }

  const handleNext = () => {
    if (viewMode === 'month') {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
    } else if (viewMode === 'week') {
      setCurrentDate(new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000))
    } else {
      setCurrentDate(new Date(currentDate.getTime() + 24 * 60 * 60 * 1000))
    }
  }

  const handleToday = () => {
    setCurrentDate(new Date())
  }

  const monthName = currentDate.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })

  const days = getDaysInMonth(currentDate)

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Calendário</h1>
          <p className="text-gray-500 mt-1 capitalize">{monthName}</p>
        </div>
        <Link href="/appointments/new" className="btn btn-primary flex items-center space-x-2">
          <Plus className="w-5 h-5" />
          <span>Nova Consulta</span>
        </Link>
      </div>

      {/* Controls */}
      <div className="card mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <button
                onClick={handlePrevious}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button onClick={handleToday} className="btn btn-secondary">
                Hoje
              </button>
              <button onClick={handleNext} className="p-2 hover:bg-gray-100 rounded-lg">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 capitalize">{monthName}</h2>
          </div>

          <div className="flex items-center space-x-3">
            <button className="btn btn-secondary flex items-center space-x-2">
              <Filter className="w-5 h-5" />
              <span>Filtros</span>
            </button>

            <div className="flex items-center bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('month')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'month'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Mês
              </button>
              <button
                onClick={() => setViewMode('week')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'week'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Semana
              </button>
              <button
                onClick={() => setViewMode('day')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'day'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Dia
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Calendar Grid */}
      {viewMode === 'month' && (
        <div className="card">
          {/* Weekday Headers */}
          <div className="grid grid-cols-7 gap-px mb-2 bg-gray-200 rounded-t-lg overflow-hidden">
            {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((day) => (
              <div key={day} className="bg-gray-50 p-3 text-center">
                <span className="text-sm font-semibold text-gray-700">{day}</span>
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7 gap-px bg-gray-200">
            {days.map((day, index) => {
              const dayAppointments = getAppointmentsForDate(day.date)
              const isToday =
                day.date.getDate() === new Date().getDate() &&
                day.date.getMonth() === new Date().getMonth() &&
                day.date.getFullYear() === new Date().getFullYear()

              return (
                <div
                  key={index}
                  className={`bg-white min-h-[120px] p-2 ${
                    !day.isCurrentMonth ? 'opacity-50' : ''
                  } ${isToday ? 'bg-primary-50' : ''} hover:bg-gray-50 cursor-pointer transition-colors`}
                  onClick={() => setSelectedDate(day.date)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`text-sm font-semibold ${
                        isToday
                          ? 'w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center'
                          : day.isCurrentMonth
                          ? 'text-gray-900'
                          : 'text-gray-400'
                      }`}
                    >
                      {day.date.getDate()}
                    </span>
                    {dayAppointments.length > 0 && (
                      <span className="text-xs bg-primary-100 text-primary-700 px-2 py-0.5 rounded-full">
                        {dayAppointments.length}
                      </span>
                    )}
                  </div>

                  <div className="space-y-1">
                    {dayAppointments.slice(0, 3).map((apt) => (
                      <div
                        key={apt.id}
                        className="text-xs p-1 rounded"
                        style={{
                          backgroundColor: apt.professional?.color + '20',
                          borderLeft: `2px solid ${apt.professional?.color}`,
                        }}
                      >
                        <p className="font-medium truncate">
                          {apt.startTime} {apt.patient?.firstName}
                        </p>
                      </div>
                    ))}
                    {dayAppointments.length > 3 && (
                      <p className="text-xs text-gray-500 pl-1">
                        +{dayAppointments.length - 3} mais
                      </p>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Day View */}
      {viewMode === 'day' && (
        <div className="card">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              {currentDate.toLocaleDateString('pt-BR', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </h3>
          </div>

          <div className="space-y-2">
            {Array.from({ length: 14 }, (_, i) => 7 + i).map((hour) => {
              const hourStr = `${hour.toString().padStart(2, '0')}:00`
              const hourAppointments = getAppointmentsForDate(currentDate).filter(
                (apt) => apt.startTime.startsWith(hour.toString().padStart(2, '0'))
              )

              return (
                <div key={hour} className="flex border-b border-gray-200">
                  <div className="w-20 flex-shrink-0 text-sm text-gray-500 py-2">
                    {hourStr}
                  </div>
                  <div className="flex-1 min-h-[60px] p-2">
                    {hourAppointments.map((apt) => (
                      <div
                        key={apt.id}
                        className="p-3 rounded-lg mb-2"
                        style={{
                          backgroundColor: apt.professional?.color + '20',
                          borderLeft: `4px solid ${apt.professional?.color}`,
                        }}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <p className="font-semibold text-gray-900">
                              {apt.patient?.firstName} {apt.patient?.lastName}
                            </p>
                            <p className="text-sm text-gray-600">
                              {apt.professional?.name}
                            </p>
                            <p className="text-sm text-gray-500">
                              {apt.startTime} - {apt.endTime} • {apt.room}
                            </p>
                          </div>
                          <span
                            className={`badge ${
                              apt.status === 'confirmed'
                                ? 'badge-success'
                                : apt.status === 'cancelled'
                                ? 'badge-danger'
                                : 'badge-gray'
                            }`}
                          >
                            {apt.status === 'confirmed'
                              ? 'Confirmado'
                              : apt.status === 'cancelled'
                              ? 'Cancelado'
                              : 'Agendado'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Week View */}
      {viewMode === 'week' && (
        <div className="card">
          <p className="text-center text-gray-500 py-12">
            Visualização de semana em desenvolvimento
          </p>
        </div>
      )}

      {/* Legend */}
      <div className="card mt-6">
        <h3 className="font-semibold text-gray-900 mb-3">Profissionais</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {mockProfessionals.slice(0, 10).map((prof) => (
            <div key={prof.id} className="flex items-center space-x-2">
              <div
                className="w-4 h-4 rounded"
                style={{ backgroundColor: prof.color }}
              />
              <span className="text-sm text-gray-700 truncate">
                {prof.name.split(' ')[0]} {prof.name.split(' ')[prof.name.split(' ').length - 1]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
