import {
  mockPatients,
  mockProfessionals,
  mockAppointments,
  mockNotifications,
} from '@/lib/mockData'

describe('mockData', () => {
  describe('mockPatients', () => {
    it('generates exactly 100 patients', () => {
      expect(mockPatients).toHaveLength(100)
    })

    it('generates patients with required fields', () => {
      const patient = mockPatients[0]

      expect(patient).toHaveProperty('id')
      expect(patient).toHaveProperty('firstName')
      expect(patient).toHaveProperty('lastName')
      expect(patient).toHaveProperty('cpf')
      expect(patient).toHaveProperty('email')
      expect(patient).toHaveProperty('phone')
      expect(patient).toHaveProperty('birthDate')
      expect(patient).toHaveProperty('gender')
    })

    it('generates valid CPF format', () => {
      const patient = mockPatients[0]
      expect(patient.cpf).toMatch(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)
    })

    it('generates valid email format', () => {
      const patient = mockPatients[0]
      expect(patient.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
    })

    it('generates valid phone format', () => {
      const patient = mockPatients[0]
      expect(patient.phone).toMatch(/^\(\d{2}\) \d{4,5}-\d{4}$/)
    })

    it('generates patients with medical history', () => {
      const patient = mockPatients[0]

      expect(patient.medicalHistory).toHaveProperty('allergies')
      expect(patient.medicalHistory).toHaveProperty('medications')
      expect(patient.medicalHistory).toHaveProperty('conditions')
      expect(patient.medicalHistory).toHaveProperty('bloodType')

      expect(Array.isArray(patient.medicalHistory.allergies)).toBe(true)
      expect(Array.isArray(patient.medicalHistory.medications)).toBe(true)
      expect(Array.isArray(patient.medicalHistory.conditions)).toBe(true)
    })

    it('generates patients with preferences', () => {
      const patient = mockPatients[0]

      expect(patient.preferences).toHaveProperty('preferredTimes')
      expect(patient.preferences).toHaveProperty('language')
      expect(patient.preferences).toHaveProperty('communicationChannel')

      expect(Array.isArray(patient.preferences.preferredTimes)).toBe(true)
    })

    it('generates valid blood types', () => {
      const validBloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']

      mockPatients.forEach(patient => {
        expect(validBloodTypes).toContain(patient.medicalHistory.bloodType)
      })
    })
  })

  describe('mockProfessionals', () => {
    it('generates exactly 10 professionals', () => {
      expect(mockProfessionals).toHaveLength(10)
    })

    it('generates professionals with required fields', () => {
      const professional = mockProfessionals[0]

      expect(professional).toHaveProperty('id')
      expect(professional).toHaveProperty('name')
      expect(professional).toHaveProperty('specialty')
      expect(professional).toHaveProperty('crm')
      expect(professional).toHaveProperty('email')
      expect(professional).toHaveProperty('phone')
    })

    it('generates valid CRM format', () => {
      const professional = mockProfessionals[0]
      expect(professional.crm).toMatch(/^CRM\/[A-Z]{2} \d{6}$/)
    })

    it('generates professionals with working hours', () => {
      const professional = mockProfessionals[0]

      expect(professional).toHaveProperty('workingHours')
      expect(professional.workingHours).toHaveProperty('monday')
      expect(professional.workingHours).toHaveProperty('tuesday')
    })

    it('generates valid specialties', () => {
      const validSpecialties = [
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

      mockProfessionals.forEach(professional => {
        expect(professional.specialty).toBeDefined()
        expect(Array.isArray(professional.specialty)).toBe(true)
        // Check if at least one specialty is valid
        const hasValidSpecialty = professional.specialty.some(spec =>
          validSpecialties.includes(spec)
        )
        expect(hasValidSpecialty).toBe(true)
      })
    })
  })

  describe('mockAppointments', () => {
    it('generates a large number of appointments', () => {
      // Appointments are generated dynamically based on professionals
      // The exact count may vary but should be substantial
      expect(mockAppointments.length).toBeGreaterThan(500)
    })

    it('generates appointments with required fields', () => {
      const appointment = mockAppointments[0]

      expect(appointment).toHaveProperty('id')
      expect(appointment).toHaveProperty('patientId')
      expect(appointment).toHaveProperty('professionalId')
      expect(appointment).toHaveProperty('date')
      expect(appointment).toHaveProperty('startTime')
      expect(appointment).toHaveProperty('endTime')
      expect(appointment).toHaveProperty('status')
      expect(appointment).toHaveProperty('type')
    })

    it('generates valid appointment statuses', () => {
      const validStatuses = ['scheduled', 'confirmed', 'completed', 'cancelled', 'no-show', 'in-progress']

      mockAppointments.forEach(appointment => {
        expect(validStatuses).toContain(appointment.status)
      })
    })

    it('references existing patients', () => {
      const patientIds = mockPatients.map(p => p.id)

      mockAppointments.forEach(appointment => {
        expect(patientIds).toContain(appointment.patientId)
      })
    })

    it('references existing professionals', () => {
      const professionalIds = mockProfessionals.map(p => p.id)

      mockAppointments.forEach(appointment => {
        expect(professionalIds).toContain(appointment.professionalId)
      })
    })
  })

  describe('mockNotifications', () => {
    it('generates notifications', () => {
      expect(mockNotifications.length).toBeGreaterThan(0)
    })

    it('generates notifications with required fields', () => {
      const notification = mockNotifications[0]

      expect(notification).toHaveProperty('id')
      expect(notification).toHaveProperty('title')
      expect(notification).toHaveProperty('message')
      expect(notification).toHaveProperty('type')
      expect(notification).toHaveProperty('read')
      expect(notification).toHaveProperty('timestamp')
    })

    it('generates valid notification types', () => {
      mockNotifications.forEach(notification => {
        expect(notification.type).toBeTruthy()
        expect(typeof notification.type).toBe('string')
        expect(notification.type.length).toBeGreaterThan(0)
      })
    })
  })
})
