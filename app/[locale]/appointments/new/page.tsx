'use client'

import { useState } from 'react'
import { mockProfessionals, mockPatients } from '@/lib/mockData'
import { ChevronRight, ChevronLeft, Check, Calendar, User, Clock, FileText } from 'lucide-react'
import { Specialty } from '@/types'
import Link from 'next/link'

const specialties: Specialty[] = [
  'Clínica Geral',
  'Cardiologia',
  'Dermatologia',
  'Pediatria',
  'Ortopedia',
  'Psicologia',
  'Nutrição',
  'Fisioterapia',
  'Odontologia',
]

const appointmentTypes = [
  { value: 'first-visit', label: 'Primeira Consulta', duration: 45 },
  { value: 'return', label: 'Retorno', duration: 30 },
  { value: 'exam', label: 'Exame', duration: 30 },
  { value: 'procedure', label: 'Procedimento', duration: 60 },
]

const timeSlots = [
  '07:00', '07:30', '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
  '11:00', '11:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
  '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30',
]

export default function NewAppointmentPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    specialty: '',
    professionalId: '',
    type: 'return',
    date: '',
    time: '',
    patientId: '',
    notes: '',
  })

  const steps = [
    { number: 1, title: 'Especialidade', icon: FileText },
    { number: 2, title: 'Profissional', icon: User },
    { number: 3, title: 'Data e Horário', icon: Calendar },
    { number: 4, title: 'Paciente', icon: User },
    { number: 5, title: 'Confirmação', icon: Check },
  ]

  const filteredProfessionals = formData.specialty
    ? mockProfessionals.filter((p) => p.specialty.includes(formData.specialty as Specialty))
    : mockProfessionals

  const selectedProfessional = mockProfessionals.find((p) => p.id === formData.professionalId)
  const selectedPatient = mockPatients.find((p) => p.id === formData.patientId)

  const handleNext = () => {
    if (step < 5) setStep(step + 1)
  }

  const handleBack = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleSubmit = () => {
    console.log('Creating appointment:', formData)
    alert('Consulta agendada com sucesso!')
    window.location.href = '/'
  }

  const generateNextDays = (days: number) => {
    const dates = []
    const today = new Date()
    for (let i = 0; i < days; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)
      dates.push(date)
    }
    return dates
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <Link href="/appointments" className="text-primary-600 hover:text-primary-700 text-sm mb-4 inline-block">
          ← Voltar para Agendamentos
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Nova Consulta</h1>
        <p className="text-gray-500 mt-1">Agende uma consulta em poucos passos</p>
      </div>

      {/* Steps Indicator */}
      <div className="card mb-8">
        <div className="flex items-center justify-between">
          {steps.map((s, index) => {
            const Icon = s.icon
            const isActive = s.number === step
            const isCompleted = s.number < step

            return (
              <div key={s.number} className="flex items-center flex-1">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center border-2 ${
                      isActive
                        ? 'bg-primary-600 border-primary-600 text-white'
                        : isCompleted
                        ? 'bg-success-600 border-success-600 text-white'
                        : 'bg-white border-gray-300 text-gray-400'
                    }`}
                  >
                    {isCompleted ? <Check className="w-6 h-6" /> : <Icon className="w-6 h-6" />}
                  </div>
                  <p
                    className={`text-xs mt-2 text-center ${
                      isActive || isCompleted ? 'text-gray-900 font-medium' : 'text-gray-400'
                    }`}
                  >
                    {s.title}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`flex-1 h-0.5 mx-2 ${
                      isCompleted ? 'bg-success-600' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Step Content */}
      <div className="card min-h-[400px]">
        {step === 1 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Selecione a Especialidade
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {specialties.map((specialty) => (
                <button
                  key={specialty}
                  onClick={() => setFormData({ ...formData, specialty, professionalId: '' })}
                  className={`p-4 rounded-lg border-2 text-left transition-all ${
                    formData.specialty === specialty
                      ? 'border-primary-600 bg-primary-50'
                      : 'border-gray-200 hover:border-primary-300'
                  }`}
                >
                  <p className="font-semibold text-gray-900">{specialty}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    {mockProfessionals.filter((p) => p.specialty.includes(specialty)).length}{' '}
                    profissionais
                  </p>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Escolha o Profissional
            </h2>
            <p className="text-gray-500 mb-6">
              Especialidade: <span className="font-semibold">{formData.specialty || 'Todas'}</span>
            </p>
            <div className="grid gap-4">
              {filteredProfessionals.map((prof) => (
                <button
                  key={prof.id}
                  onClick={() => setFormData({ ...formData, professionalId: prof.id })}
                  className={`p-4 rounded-lg border-2 text-left transition-all ${
                    formData.professionalId === prof.id
                      ? 'border-primary-600 bg-primary-50'
                      : 'border-gray-200 hover:border-primary-300'
                  }`}
                >
                  <div className="flex items-start space-x-4">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold"
                      style={{ backgroundColor: prof.color }}
                    >
                      {prof.name.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">{prof.name}</p>
                      <p className="text-sm text-gray-600">{prof.crm}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        {prof.specialty.join(', ')}
                      </p>
                      {prof.bio && (
                        <p className="text-xs text-gray-500 mt-2">{prof.bio}</p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-gray-900">
                        R$ {prof.consultationPrice.return}
                      </p>
                      <p className="text-xs text-gray-500">consulta</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Escolha Data e Horário
            </h2>

            {/* Appointment Type */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipo de Consulta
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {appointmentTypes.map((type) => (
                  <button
                    key={type.value}
                    onClick={() => setFormData({ ...formData, type: type.value })}
                    className={`p-3 rounded-lg border-2 ${
                      formData.type === type.value
                        ? 'border-primary-600 bg-primary-50'
                        : 'border-gray-200 hover:border-primary-300'
                    }`}
                  >
                    <p className="font-semibold text-sm">{type.label}</p>
                    <p className="text-xs text-gray-500">{type.duration} min</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Date Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Selecione a Data
              </label>
              <div className="grid grid-cols-4 md:grid-cols-7 gap-2">
                {generateNextDays(14).map((date) => {
                  const dateStr = date.toISOString().split('T')[0]
                  return (
                    <button
                      key={dateStr}
                      onClick={() => setFormData({ ...formData, date: dateStr })}
                      className={`p-3 rounded-lg border-2 ${
                        formData.date === dateStr
                          ? 'border-primary-600 bg-primary-50'
                          : 'border-gray-200 hover:border-primary-300'
                      }`}
                    >
                      <p className="text-xs text-gray-500">
                        {date.toLocaleDateString('pt-BR', { weekday: 'short' })}
                      </p>
                      <p className="text-lg font-semibold">{date.getDate()}</p>
                      <p className="text-xs text-gray-500">
                        {date.toLocaleDateString('pt-BR', { month: 'short' })}
                      </p>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Time Selection */}
            {formData.date && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Selecione o Horário
                </label>
                <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      onClick={() => setFormData({ ...formData, time })}
                      className={`p-2 rounded-lg border-2 ${
                        formData.time === time
                          ? 'border-primary-600 bg-primary-50'
                          : 'border-gray-200 hover:border-primary-300'
                      }`}
                    >
                      <Clock className="w-4 h-4 mx-auto mb-1" />
                      <p className="text-sm font-medium">{time}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {step === 4 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Selecione o Paciente
            </h2>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Buscar paciente por nome ou CPF..."
                className="input"
              />
            </div>
            <div className="grid gap-3 max-h-[400px] overflow-y-auto">
              {mockPatients.slice(0, 20).map((patient) => (
                <button
                  key={patient.id}
                  onClick={() => setFormData({ ...formData, patientId: patient.id })}
                  className={`p-4 rounded-lg border-2 text-left transition-all ${
                    formData.patientId === patient.id
                      ? 'border-primary-600 bg-primary-50'
                      : 'border-gray-200 hover:border-primary-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-gray-900">
                        {patient.firstName} {patient.lastName}
                      </p>
                      <p className="text-sm text-gray-600">{patient.cpf}</p>
                      <p className="text-sm text-gray-500">
                        {patient.phone} • {patient.email}
                      </p>
                    </div>
                    {patient.insuranceInfo && (
                      <span className="badge badge-primary">
                        {patient.insuranceInfo.provider}
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 5 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Confirme os Dados
            </h2>
            <div className="space-y-6">
              <div className="p-4 rounded-lg bg-gray-50">
                <h3 className="font-semibold text-gray-900 mb-3">Paciente</h3>
                <p className="text-gray-700">
                  {selectedPatient?.firstName} {selectedPatient?.lastName}
                </p>
                <p className="text-sm text-gray-600">{selectedPatient?.cpf}</p>
                <p className="text-sm text-gray-600">{selectedPatient?.phone}</p>
              </div>

              <div className="p-4 rounded-lg bg-gray-50">
                <h3 className="font-semibold text-gray-900 mb-3">Profissional</h3>
                <p className="text-gray-700">{selectedProfessional?.name}</p>
                <p className="text-sm text-gray-600">{formData.specialty}</p>
                <p className="text-sm text-gray-600">{selectedProfessional?.crm}</p>
              </div>

              <div className="p-4 rounded-lg bg-gray-50">
                <h3 className="font-semibold text-gray-900 mb-3">Data e Horário</h3>
                <p className="text-gray-700">
                  {formData.date &&
                    new Date(formData.date).toLocaleDateString('pt-BR', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                </p>
                <p className="text-sm text-gray-600">Horário: {formData.time}</p>
                <p className="text-sm text-gray-600">
                  Tipo:{' '}
                  {appointmentTypes.find((t) => t.value === formData.type)?.label}
                </p>
              </div>

              <div className="p-4 rounded-lg bg-gray-50">
                <h3 className="font-semibold text-gray-900 mb-3">Valor</h3>
                <p className="text-2xl font-bold text-primary-600">
                  R$ {selectedProfessional?.consultationPrice.return.toFixed(2)}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Observações (opcional)
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="input min-h-[100px]"
                  placeholder="Adicione observações sobre a consulta..."
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between mt-6">
        <button
          onClick={handleBack}
          disabled={step === 1}
          className="btn btn-secondary flex items-center space-x-2 disabled:opacity-50"
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Voltar</span>
        </button>

        {step < 5 ? (
          <button
            onClick={handleNext}
            disabled={
              (step === 1 && !formData.specialty) ||
              (step === 2 && !formData.professionalId) ||
              (step === 3 && (!formData.date || !formData.time)) ||
              (step === 4 && !formData.patientId)
            }
            className="btn btn-primary flex items-center space-x-2 disabled:opacity-50"
          >
            <span>Próximo</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        ) : (
          <button onClick={handleSubmit} className="btn btn-success flex items-center space-x-2">
            <Check className="w-5 h-5" />
            <span>Confirmar Agendamento</span>
          </button>
        )}
      </div>
    </div>
  )
}
