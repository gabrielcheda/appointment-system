export interface Appointment {
  id: string
  patientId: string
  professionalId: string
  specialty: string
  date: Date
  startTime: string
  endTime: string
  duration: number
  status: 'scheduled' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled' | 'no-show'
  type: 'first-visit' | 'return' | 'exam' | 'procedure' | 'emergency'
  room: string
  notes: string
  insuranceId?: string
  price: number
  isPaid: boolean
  checkedInAt?: Date
  startedAt?: Date
  completedAt?: Date
  cancelReason?: string
  files?: string[]
  prescriptions?: string[]
  followUpDate?: Date
  reminderSent: boolean
}

export interface Patient {
  id: string
  firstName: string
  lastName: string
  cpf: string
  birthDate: Date
  gender: 'male' | 'female' | 'other'
  email: string
  phone: string
  whatsapp: string
  address: {
    street: string
    number: string
    complement?: string
    neighborhood: string
    city: string
    state: string
    zipCode: string
  }
  emergencyContact: {
    name: string
    relationship: string
    phone: string
  }
  insuranceInfo?: {
    provider: string
    planNumber: string
    validity: Date
  }
  medicalHistory: {
    allergies: string[]
    medications: string[]
    conditions: string[]
    bloodType?: string
  }
  preferences: {
    preferredProfessional?: string
    preferredTimes?: string[]
    language: 'pt-BR' | 'en' | 'es'
    communicationChannel: 'email' | 'sms' | 'whatsapp' | 'phone'
  }
  createdAt: Date
  lastVisit?: Date
  totalVisits: number
  noShowCount: number
  notes?: string
}

export interface Professional {
  id: string
  name: string
  specialty: string[]
  crm: string
  email: string
  phone: string
  workingHours: {
    [key: string]: {
      start: string
      end: string
      lunchStart?: string
      lunchEnd?: string
    }
  }
  appointmentDuration: {
    firstVisit: number
    return: number
    procedure: number
  }
  unavailableDates: Date[]
  roomPreference?: string
  acceptedInsurance: string[]
  consultationPrice: {
    firstVisit: number
    return: number
    procedure: number
  }
  color: string
  active: boolean
  photo?: string
  bio?: string
}

export interface Notification {
  id: string
  type: 'appointment-request' | 'cancellation' | 'reschedule' | 'patient-arrived' | 'consultation-finished' | 'payment-received' | 'system-alert'
  title: string
  message: string
  timestamp: Date
  read: boolean
  actionUrl?: string
  relatedId?: string
  priority: 'low' | 'medium' | 'high'
}

export interface Stats {
  totalAppointmentsToday: number
  confirmedToday: number
  pendingToday: number
  cancelledToday: number
  revenueToday: number
  patientsInQueue: number
  avgWaitTime: number
}

export type Specialty =
  | 'Clínica Geral'
  | 'Cardiologia'
  | 'Dermatologia'
  | 'Pediatria'
  | 'Ortopedia'
  | 'Psicologia'
  | 'Nutrição'
  | 'Fisioterapia'
  | 'Odontologia'

export type CalendarView = 'month' | 'week' | 'day' | 'list'

export interface QueueItem {
  id: string
  appointmentId: string
  patientName: string
  professionalName: string
  specialty: string
  checkedInAt: Date
  estimatedWaitTime: number
  status: 'waiting' | 'in-progress' | 'completed'
  position: number
}

export interface Report {
  id: string
  title: string
  type: 'financial' | 'attendance' | 'performance' | 'insurance'
  dateRange: {
    start: Date
    end: Date
  }
  data: any
  generatedAt: Date
  generatedBy: string
}

export interface Prescription {
  id: string
  appointmentId: string
  patientId: string
  professionalId: string
  medications: {
    name: string
    dosage: string
    frequency: string
    duration: string
    instructions: string
  }[]
  cid10: string[]
  date: Date
  validUntil: Date
}

export interface VaccinationRecord {
  id: string
  patientId: string
  vaccineName: string
  date: Date
  dose: number
  nextDose?: Date
  lot: string
  manufacturer: string
  administeredBy: string
}

export interface LabResult {
  id: string
  patientId: string
  appointmentId?: string
  testName: string
  requestDate: Date
  resultDate?: Date
  status: 'pending' | 'completed' | 'cancelled'
  results?: any
  files?: string[]
}
