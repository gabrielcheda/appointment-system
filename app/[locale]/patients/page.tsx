'use client'

import { useState, useEffect } from 'react'
import { mockPatients, mockAppointments } from '@/lib/mockData'
import { Search, UserPlus, Phone, Mail, Calendar, FileText, Filter } from 'lucide-react'
import Link from 'next/link'

export default function PatientsPage() {
  const [patients, setPatients] = useState<any[]>([])
  const [filteredPatients, setFilteredPatients] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedPatient, setSelectedPatient] = useState<any | null>(null)

  useEffect(() => {
    // Enrich patients with appointment count
    const enriched = mockPatients.map((patient) => ({
      ...patient,
      appointmentCount: mockAppointments.filter(
        (apt) => apt.patientId === patient.id
      ).length,
    }))

    setPatients(enriched)
    setFilteredPatients(enriched)
  }, [])

  useEffect(() => {
    if (searchTerm) {
      const filtered = patients.filter(
        (patient) =>
          patient.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          patient.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          patient.cpf.includes(searchTerm) ||
          patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          patient.phone.includes(searchTerm)
      )
      setFilteredPatients(filtered)
    } else {
      setFilteredPatients(patients)
    }
  }, [searchTerm, patients])

  const calculateAge = (birthDate: Date) => {
    const today = new Date()
    const birth = new Date(birthDate)
    let age = today.getFullYear() - birth.getFullYear()
    const monthDiff = today.getMonth() - birth.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--
    }
    return age
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Pacientes</h1>
          <p className="text-gray-500 mt-1">
            {filteredPatients.length} paciente(s) cadastrado(s)
          </p>
        </div>
        <button className="btn btn-primary flex items-center space-x-2">
          <UserPlus className="w-5 h-5" />
          <span>Novo Paciente</span>
        </button>
      </div>

      {/* Filters */}
      <div className="card mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Buscar Paciente
            </label>
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Nome, CPF, email ou telefone..."
                className="input pl-10"
              />
            </div>
          </div>

          <div className="flex items-end">
            <button className="btn btn-secondary w-full flex items-center justify-center space-x-2">
              <Filter className="w-5 h-5" />
              <span>Filtros Avançados</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="card">
          <p className="text-sm text-gray-500">Total de Pacientes</p>
          <p className="text-2xl font-bold text-gray-900">{patients.length}</p>
        </div>
        <div className="card">
          <p className="text-sm text-gray-500">Novos Este Mês</p>
          <p className="text-2xl font-bold text-primary-600">
            {
              patients.filter((p) => {
                const createdDate = new Date(p.createdAt)
                const now = new Date()
                return (
                  createdDate.getMonth() === now.getMonth() &&
                  createdDate.getFullYear() === now.getFullYear()
                )
              }).length
            }
          </p>
        </div>
        <div className="card">
          <p className="text-sm text-gray-500">Com Convênio</p>
          <p className="text-2xl font-bold text-success-600">
            {patients.filter((p) => p.insuranceInfo).length}
          </p>
        </div>
        <div className="card">
          <p className="text-sm text-gray-500">Ativos</p>
          <p className="text-2xl font-bold text-gray-900">
            {patients.filter((p) => p.lastVisit).length}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Patients List */}
        <div className="lg:col-span-2">
          <div className="card">
            <div className="space-y-3 max-h-[700px] overflow-y-auto">
              {filteredPatients.length === 0 ? (
                <div className="text-center py-12">
                  <UserPlus className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                  <p className="text-gray-500">Nenhum paciente encontrado</p>
                </div>
              ) : (
                filteredPatients.map((patient) => (
                  <div
                    key={patient.id}
                    onClick={() => setSelectedPatient(patient)}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedPatient?.id === patient.id
                        ? 'border-primary-600 bg-primary-50'
                        : 'border-gray-200 hover:border-primary-300'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">
                          {patient.firstName} {patient.lastName}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {calculateAge(patient.birthDate)} anos •{' '}
                          {patient.gender === 'male' ? 'Masculino' : patient.gender === 'female' ? 'Feminino' : 'Outro'}
                        </p>
                      </div>
                      {patient.insuranceInfo && (
                        <span className="badge badge-primary text-xs">
                          {patient.insuranceInfo.provider}
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
                      <div className="flex items-center space-x-2">
                        <FileText className="w-4 h-4" />
                        <span>{patient.cpf}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="w-4 h-4" />
                        <span>{patient.phone}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Mail className="w-4 h-4" />
                        <span className="truncate">{patient.email}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4" />
                        <span>{patient.appointmentCount} consultas</span>
                      </div>
                    </div>

                    {Array.isArray(patient.medicalHistory.conditions) && patient.medicalHistory.conditions.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-gray-200">
                        <div className="flex flex-wrap gap-1">
                          {patient.medicalHistory.conditions.slice(0, 3).map((condition: string) => (
                            <span
                              key={condition}
                              className="badge badge-warning text-xs"
                            >
                              {condition}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Patient Details */}
        <div>
          <div className="card sticky top-6">
            {selectedPatient ? (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">
                    Detalhes do Paciente
                  </h2>
                  <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                    Editar
                  </button>
                </div>

                <div className="space-y-4">
                  {/* Personal Info */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Informações Pessoais
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Nome Completo:</span>
                        <span className="text-gray-900 font-medium">
                          {selectedPatient.firstName} {selectedPatient.lastName}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">CPF:</span>
                        <span className="text-gray-900 font-medium">
                          {selectedPatient.cpf}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Data de Nasc.:</span>
                        <span className="text-gray-900 font-medium">
                          {new Date(selectedPatient.birthDate).toLocaleDateString('pt-BR')}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Idade:</span>
                        <span className="text-gray-900 font-medium">
                          {calculateAge(selectedPatient.birthDate)} anos
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Tipo Sanguíneo:</span>
                        <span className="text-gray-900 font-medium">
                          {selectedPatient.medicalHistory.bloodType || 'N/A'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="pt-4 border-t border-gray-200">
                    <h3 className="font-semibold text-gray-900 mb-2">Contato</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-900">{selectedPatient.phone}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-900">{selectedPatient.email}</span>
                      </div>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="pt-4 border-t border-gray-200">
                    <h3 className="font-semibold text-gray-900 mb-2">Endereço</h3>
                    <p className="text-sm text-gray-600">
                      {selectedPatient.address.street}, {selectedPatient.address.number}
                      {selectedPatient.address.complement && `, ${selectedPatient.address.complement}`}
                      <br />
                      {selectedPatient.address.neighborhood} - {selectedPatient.address.city}/{selectedPatient.address.state}
                      <br />
                      CEP: {selectedPatient.address.zipCode}
                    </p>
                  </div>

                  {/* Insurance */}
                  {selectedPatient.insuranceInfo && (
                    <div className="pt-4 border-t border-gray-200">
                      <h3 className="font-semibold text-gray-900 mb-2">Convênio</h3>
                      <div className="space-y-1 text-sm">
                        <p className="text-gray-900 font-medium">
                          {selectedPatient.insuranceInfo.provider}
                        </p>
                        <p className="text-gray-600">
                          Nº: {selectedPatient.insuranceInfo.planNumber}
                        </p>
                        <p className="text-gray-600">
                          Validade:{' '}
                          {new Date(selectedPatient.insuranceInfo.validity).toLocaleDateString('pt-BR')}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Medical History */}
                  <div className="pt-4 border-t border-gray-200">
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Histórico Médico
                    </h3>
                    <div className="space-y-3 text-sm">
                      {Array.isArray(selectedPatient.medicalHistory.allergies) && selectedPatient.medicalHistory.allergies.length > 0 && (
                        <div>
                          <p className="text-gray-500 mb-1">Alergias:</p>
                          <div className="flex flex-wrap gap-1">
                            {selectedPatient.medicalHistory.allergies.map((allergy: string) => (
                              <span key={allergy} className="badge badge-danger text-xs">
                                {allergy}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      {Array.isArray(selectedPatient.medicalHistory.conditions) && selectedPatient.medicalHistory.conditions.length > 0 && (
                        <div>
                          <p className="text-gray-500 mb-1">Condições:</p>
                          <div className="flex flex-wrap gap-1">
                            {selectedPatient.medicalHistory.conditions.map((condition: string) => (
                              <span key={condition} className="badge badge-warning text-xs">
                                {condition}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      {Array.isArray(selectedPatient.medicalHistory.medications) && selectedPatient.medicalHistory.medications.length > 0 && (
                        <div>
                          <p className="text-gray-500 mb-1">Medicamentos:</p>
                          <div className="flex flex-wrap gap-1">
                            {selectedPatient.medicalHistory.medications.map((med: string) => (
                              <span key={med} className="badge badge-primary text-xs">
                                {med}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="pt-4 border-t border-gray-200">
                    <h3 className="font-semibold text-gray-900 mb-2">Estatísticas</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <p className="text-2xl font-bold text-primary-600">
                          {selectedPatient.totalVisits}
                        </p>
                        <p className="text-xs text-gray-600">Consultas</p>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <p className="text-2xl font-bold text-danger-600">
                          {selectedPatient.noShowCount}
                        </p>
                        <p className="text-xs text-gray-600">Faltas</p>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-gray-200 space-y-2">
                    <Link
                      href="/appointments/new"
                      className="btn btn-primary w-full flex items-center justify-center space-x-2"
                    >
                      <Calendar className="w-5 h-5" />
                      <span>Agendar Consulta</span>
                    </Link>
                    <button className="btn btn-secondary w-full">
                      Ver Histórico Completo
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <UserPlus className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500">
                  Selecione um paciente para ver os detalhes
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
