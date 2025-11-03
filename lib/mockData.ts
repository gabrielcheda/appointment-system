import { Appointment, Patient, Professional, Notification, QueueItem, Specialty } from '@/types'

// Helper functions
const generateId = () => Math.random().toString(36).substring(2, 15)

const addDays = (date: Date, days: number) => {
  const result = new Date(date)
  result.setDate(result.getDate() + days)
  return result
}

const addHours = (date: Date, hours: number) => {
  const result = new Date(date)
  result.setHours(result.getHours() + hours)
  return result
}

// Brazilian names
const firstNames = [
  'Ana', 'Maria', 'João', 'Pedro', 'Lucas', 'Mariana', 'Juliana', 'Carlos', 'Fernando', 'Beatriz',
  'Camila', 'Gabriel', 'Rafael', 'Paula', 'Rodrigo', 'Larissa', 'Thiago', 'Fernanda', 'Bruno', 'Amanda',
  'Felipe', 'Isabela', 'Gustavo', 'Carolina', 'Diego', 'Patricia', 'Ricardo', 'Aline', 'Marcos', 'Renata',
  'André', 'Cristina', 'Daniel', 'Vanessa', 'Eduardo', 'Tatiana', 'Fábio', 'Simone', 'Henrique', 'Priscila',
  'Leonardo', 'Adriana', 'Vinícius', 'Luciana', 'Marcelo', 'Sandra', 'Leandro', 'Mônica', 'Alexandre', 'Claudia',
  'Antônio', 'Helena', 'José', 'Silvia', 'Paulo', 'Regina', 'Luiz', 'Denise', 'Roberto', 'Eliane',
  'Sérgio', 'Vera', 'Jorge', 'Rosana', 'Maurício', 'Sônia', 'Francisco', 'Lúcia', 'Alberto', 'Angela',
  'César', 'Andréa', 'Claudio', 'Marta', 'Edson', 'Eliana', 'Flávio', 'Rita', 'Gilberto', 'Teresa',
  'Wilson', 'Vera', 'Aparecido', 'Alice', 'Benedito', 'Célia', 'Osvaldo', 'Dalva', 'Valter', 'Edneia',
  'Igor', 'Bianca', 'Caio', 'Débora', 'Enzo', 'Érica', 'Arthur', 'Fabiana', 'Miguel', 'Giovana', 'Pietro', 'Heloísa'
]

const lastNames = [
  'Silva', 'Santos', 'Oliveira', 'Souza', 'Rodrigues', 'Ferreira', 'Alves', 'Pereira', 'Lima', 'Gomes',
  'Costa', 'Ribeiro', 'Martins', 'Carvalho', 'Rocha', 'Almeida', 'Nascimento', 'Araújo', 'Melo', 'Barbosa',
  'Cardoso', 'Correia', 'Dias', 'Fernandes', 'Freitas', 'Gonçalves', 'Lopes', 'Marques', 'Monteiro', 'Moreira',
  'Nunes', 'Pinto', 'Ramos', 'Reis', 'Rezende', 'Ribeiro', 'Santana', 'Teixeira', 'Vieira', 'Castro'
]

const brazilianCities = [
  { city: 'São Paulo', state: 'SP' },
  { city: 'Rio de Janeiro', state: 'RJ' },
  { city: 'Belo Horizonte', state: 'MG' },
  { city: 'Curitiba', state: 'PR' },
  { city: 'Porto Alegre', state: 'RS' },
  { city: 'Brasília', state: 'DF' },
  { city: 'Salvador', state: 'BA' },
  { city: 'Fortaleza', state: 'CE' },
  { city: 'Recife', state: 'PE' },
  { city: 'Goiânia', state: 'GO' },
]

const neighborhoods = [
  'Centro', 'Jardim América', 'Vila Mariana', 'Perdizes', 'Pinheiros', 'Moema', 'Itaim Bibi',
  'Brooklin', 'Morumbi', 'Tatuapé', 'Santana', 'Ipiranga', 'Lapa', 'Butantã', 'Santo Amaro'
]

const streets = [
  'Rua das Flores', 'Avenida Paulista', 'Rua Augusta', 'Avenida Brasil', 'Rua da Consolação',
  'Avenida Rebouças', 'Rua Oscar Freire', 'Avenida Faria Lima', 'Rua Teodoro Sampaio',
  'Avenida Angélica', 'Rua Haddock Lobo', 'Rua Estados Unidos', 'Avenida Ipiranga'
]

const insuranceProviders = [
  'Unimed', 'Bradesco Saúde', 'Amil', 'SulAmérica', 'NotreDame Intermédica',
  'Porto Seguro Saúde', 'Prevent Senior', 'Hapvida', 'São Francisco Saúde', 'Golden Cross'
]

// Generate CPF (simplified - not validated)
const generateCPF = () => {
  const nums = Array.from({ length: 9 }, () => Math.floor(Math.random() * 10))
  return `${nums.slice(0, 3).join('')}.${nums.slice(3, 6).join('')}.${nums.slice(6, 9).join('')}-${Math.floor(Math.random() * 100).toString().padStart(2, '0')}`
}

// Generate Brazilian phone
const generatePhone = () => {
  const ddd = ['11', '21', '31', '41', '51', '61', '71', '81', '85', '48'][Math.floor(Math.random() * 10)]
  const num = Math.floor(900000000 + Math.random() * 100000000)
  return `(${ddd}) 9${num.toString().substring(0, 4)}-${num.toString().substring(4, 8)}`
}

// Generate ZIP code
const generateZipCode = () => {
  return `${Math.floor(10000 + Math.random() * 90000)}-${Math.floor(100 + Math.random() * 900)}`
}

// Mock Professionals
export const mockProfessionals: Professional[] = [
  {
    id: 'prof-1',
    name: 'Dra. Ana Paula Silveira',
    specialty: ['Clínica Geral'],
    crm: 'CRM/SP 123456',
    email: 'ana.silveira@clinica.com',
    phone: '(11) 98765-4321',
    workingHours: {
      monday: { start: '08:00', end: '18:00', lunchStart: '12:00', lunchEnd: '13:00' },
      tuesday: { start: '08:00', end: '18:00', lunchStart: '12:00', lunchEnd: '13:00' },
      wednesday: { start: '08:00', end: '18:00', lunchStart: '12:00', lunchEnd: '13:00' },
      thursday: { start: '08:00', end: '18:00', lunchStart: '12:00', lunchEnd: '13:00' },
      friday: { start: '08:00', end: '17:00', lunchStart: '12:00', lunchEnd: '13:00' },
    },
    appointmentDuration: { firstVisit: 45, return: 30, procedure: 60 },
    unavailableDates: [],
    roomPreference: 'Consultório 1',
    acceptedInsurance: ['Unimed', 'Bradesco Saúde', 'Amil', 'SulAmérica'],
    consultationPrice: { firstVisit: 300, return: 200, procedure: 450 },
    color: '#3B82F6',
    active: true,
    bio: 'Especialista em Clínica Geral com 15 anos de experiência',
  },
  {
    id: 'prof-2',
    name: 'Dr. Carlos Eduardo Mendes',
    specialty: ['Cardiologia'],
    crm: 'CRM/SP 234567',
    email: 'carlos.mendes@clinica.com',
    phone: '(11) 98765-4322',
    workingHours: {
      monday: { start: '09:00', end: '17:00', lunchStart: '13:00', lunchEnd: '14:00' },
      wednesday: { start: '09:00', end: '17:00', lunchStart: '13:00', lunchEnd: '14:00' },
      friday: { start: '09:00', end: '17:00', lunchStart: '13:00', lunchEnd: '14:00' },
    },
    appointmentDuration: { firstVisit: 60, return: 40, procedure: 90 },
    unavailableDates: [],
    roomPreference: 'Consultório 2',
    acceptedInsurance: ['Unimed', 'SulAmérica', 'NotreDame Intermédica'],
    consultationPrice: { firstVisit: 450, return: 350, procedure: 650 },
    color: '#EF4444',
    active: true,
    bio: 'Cardiologista com especialização em arritmias cardíacas',
  },
  {
    id: 'prof-3',
    name: 'Dra. Mariana Costa Rodrigues',
    specialty: ['Dermatologia'],
    crm: 'CRM/SP 345678',
    email: 'mariana.rodrigues@clinica.com',
    phone: '(11) 98765-4323',
    workingHours: {
      tuesday: { start: '08:00', end: '16:00', lunchStart: '12:00', lunchEnd: '13:00' },
      thursday: { start: '08:00', end: '16:00', lunchStart: '12:00', lunchEnd: '13:00' },
      saturday: { start: '08:00', end: '12:00' },
    },
    appointmentDuration: { firstVisit: 50, return: 30, procedure: 120 },
    unavailableDates: [],
    roomPreference: 'Consultório 3',
    acceptedInsurance: ['Unimed', 'Bradesco Saúde', 'Amil', 'Porto Seguro Saúde'],
    consultationPrice: { firstVisit: 400, return: 280, procedure: 800 },
    color: '#F59E0B',
    active: true,
    bio: 'Dermatologista especializada em estética e tratamentos a laser',
  },
  {
    id: 'prof-4',
    name: 'Dr. Pedro Henrique Alves',
    specialty: ['Pediatria'],
    crm: 'CRM/SP 456789',
    email: 'pedro.alves@clinica.com',
    phone: '(11) 98765-4324',
    workingHours: {
      monday: { start: '07:00', end: '15:00', lunchStart: '11:00', lunchEnd: '12:00' },
      tuesday: { start: '07:00', end: '15:00', lunchStart: '11:00', lunchEnd: '12:00' },
      wednesday: { start: '07:00', end: '15:00', lunchStart: '11:00', lunchEnd: '12:00' },
      thursday: { start: '07:00', end: '15:00', lunchStart: '11:00', lunchEnd: '12:00' },
      friday: { start: '07:00', end: '13:00' },
    },
    appointmentDuration: { firstVisit: 40, return: 25, procedure: 50 },
    unavailableDates: [],
    roomPreference: 'Consultório 4',
    acceptedInsurance: ['Unimed', 'Amil', 'SulAmérica', 'Hapvida'],
    consultationPrice: { firstVisit: 320, return: 220, procedure: 400 },
    color: '#10B981',
    active: true,
    bio: 'Pediatra com 20 anos de experiência em cuidados infantis',
  },
  {
    id: 'prof-5',
    name: 'Dr. Ricardo Fernandes Lima',
    specialty: ['Ortopedia'],
    crm: 'CRM/SP 567890',
    email: 'ricardo.lima@clinica.com',
    phone: '(11) 98765-4325',
    workingHours: {
      monday: { start: '10:00', end: '18:00', lunchStart: '13:00', lunchEnd: '14:00' },
      wednesday: { start: '10:00', end: '18:00', lunchStart: '13:00', lunchEnd: '14:00' },
      friday: { start: '10:00', end: '18:00', lunchStart: '13:00', lunchEnd: '14:00' },
    },
    appointmentDuration: { firstVisit: 50, return: 35, procedure: 90 },
    unavailableDates: [],
    roomPreference: 'Consultório 5',
    acceptedInsurance: ['Unimed', 'Bradesco Saúde', 'NotreDame Intermédica'],
    consultationPrice: { firstVisit: 420, return: 320, procedure: 700 },
    color: '#8B5CF6',
    active: true,
    bio: 'Ortopedista especializado em medicina esportiva',
  },
  {
    id: 'prof-6',
    name: 'Dra. Juliana Martins Santos',
    specialty: ['Psicologia'],
    crm: 'CRP/SP 06/123456',
    email: 'juliana.santos@clinica.com',
    phone: '(11) 98765-4326',
    workingHours: {
      monday: { start: '13:00', end: '21:00' },
      tuesday: { start: '13:00', end: '21:00' },
      wednesday: { start: '13:00', end: '21:00' },
      thursday: { start: '13:00', end: '21:00' },
    },
    appointmentDuration: { firstVisit: 60, return: 50, procedure: 90 },
    unavailableDates: [],
    roomPreference: 'Consultório 6',
    acceptedInsurance: ['Unimed', 'SulAmérica', 'Amil'],
    consultationPrice: { firstVisit: 250, return: 200, procedure: 350 },
    color: '#EC4899',
    active: true,
    bio: 'Psicóloga clínica com abordagem cognitivo-comportamental',
  },
  {
    id: 'prof-7',
    name: 'Dra. Beatriz Oliveira Souza',
    specialty: ['Nutrição'],
    crm: 'CRN/SP 12345',
    email: 'beatriz.souza@clinica.com',
    phone: '(11) 98765-4327',
    workingHours: {
      tuesday: { start: '09:00', end: '17:00', lunchStart: '12:00', lunchEnd: '13:00' },
      thursday: { start: '09:00', end: '17:00', lunchStart: '12:00', lunchEnd: '13:00' },
      saturday: { start: '08:00', end: '14:00' },
    },
    appointmentDuration: { firstVisit: 60, return: 45, procedure: 90 },
    unavailableDates: [],
    roomPreference: 'Consultório 7',
    acceptedInsurance: ['Unimed', 'Bradesco Saúde', 'SulAmérica'],
    consultationPrice: { firstVisit: 280, return: 200, procedure: 400 },
    color: '#22C55E',
    active: true,
    bio: 'Nutricionista especializada em nutrição esportiva e emagrecimento',
  },
  {
    id: 'prof-8',
    name: 'Dr. Fernando Pereira Costa',
    specialty: ['Fisioterapia'],
    crm: 'CREFITO/SP 123456',
    email: 'fernando.costa@clinica.com',
    phone: '(11) 98765-4328',
    workingHours: {
      monday: { start: '08:00', end: '18:00', lunchStart: '12:00', lunchEnd: '13:00' },
      tuesday: { start: '08:00', end: '18:00', lunchStart: '12:00', lunchEnd: '13:00' },
      wednesday: { start: '08:00', end: '18:00', lunchStart: '12:00', lunchEnd: '13:00' },
      thursday: { start: '08:00', end: '18:00', lunchStart: '12:00', lunchEnd: '13:00' },
      friday: { start: '08:00', end: '18:00', lunchStart: '12:00', lunchEnd: '13:00' },
    },
    appointmentDuration: { firstVisit: 50, return: 40, procedure: 60 },
    unavailableDates: [],
    roomPreference: 'Sala de Fisioterapia 1',
    acceptedInsurance: ['Unimed', 'Amil', 'Hapvida', 'Porto Seguro Saúde'],
    consultationPrice: { firstVisit: 200, return: 150, procedure: 250 },
    color: '#06B6D4',
    active: true,
    bio: 'Fisioterapeuta especializado em reabilitação ortopédica',
  },
  {
    id: 'prof-9',
    name: 'Dr. Gabriel Rodrigues Almeida',
    specialty: ['Odontologia'],
    crm: 'CRO/SP 98765',
    email: 'gabriel.almeida@clinica.com',
    phone: '(11) 98765-4329',
    workingHours: {
      monday: { start: '09:00', end: '19:00', lunchStart: '13:00', lunchEnd: '14:00' },
      tuesday: { start: '09:00', end: '19:00', lunchStart: '13:00', lunchEnd: '14:00' },
      thursday: { start: '09:00', end: '19:00', lunchStart: '13:00', lunchEnd: '14:00' },
      friday: { start: '09:00', end: '19:00', lunchStart: '13:00', lunchEnd: '14:00' },
    },
    appointmentDuration: { firstVisit: 60, return: 40, procedure: 120 },
    unavailableDates: [],
    roomPreference: 'Consultório Odontológico',
    acceptedInsurance: ['Unimed', 'Bradesco Dental', 'MetLife', 'SulAmérica Odonto'],
    consultationPrice: { firstVisit: 250, return: 180, procedure: 600 },
    color: '#14B8A6',
    active: true,
    bio: 'Dentista especializado em implantodontia e estética dental',
  },
  {
    id: 'prof-10',
    name: 'Dra. Camila Fernandes Ribeiro',
    specialty: ['Clínica Geral', 'Cardiologia'],
    crm: 'CRM/SP 678901',
    email: 'camila.ribeiro@clinica.com',
    phone: '(11) 98765-4330',
    workingHours: {
      monday: { start: '08:00', end: '16:00', lunchStart: '12:00', lunchEnd: '13:00' },
      wednesday: { start: '08:00', end: '16:00', lunchStart: '12:00', lunchEnd: '13:00' },
      friday: { start: '08:00', end: '16:00', lunchStart: '12:00', lunchEnd: '13:00' },
    },
    appointmentDuration: { firstVisit: 50, return: 35, procedure: 80 },
    unavailableDates: [],
    roomPreference: 'Consultório 8',
    acceptedInsurance: ['Unimed', 'Bradesco Saúde', 'Amil', 'SulAmérica', 'NotreDame Intermédica'],
    consultationPrice: { firstVisit: 380, return: 280, procedure: 550 },
    color: '#6366F1',
    active: true,
    bio: 'Médica clínica geral com especialização em cardiologia preventiva',
  },
]

// Generate Mock Patients
export const mockPatients: Patient[] = Array.from({ length: 100 }, (_, i) => {
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)]
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)]
  const location = brazilianCities[Math.floor(Math.random() * brazilianCities.length)]
  const birthYear = 1940 + Math.floor(Math.random() * 70)

  return {
    id: `patient-${i + 1}`,
    firstName,
    lastName,
    cpf: generateCPF(),
    birthDate: new Date(birthYear, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1),
    gender: ['male', 'female', 'other'][Math.floor(Math.random() * 3)] as 'male' | 'female' | 'other',
    email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@email.com`,
    phone: generatePhone(),
    whatsapp: generatePhone(),
    address: {
      street: streets[Math.floor(Math.random() * streets.length)],
      number: (Math.floor(Math.random() * 2000) + 1).toString(),
      complement: Math.random() > 0.5 ? `Apto ${Math.floor(Math.random() * 200) + 1}` : undefined,
      neighborhood: neighborhoods[Math.floor(Math.random() * neighborhoods.length)],
      city: location.city,
      state: location.state,
      zipCode: generateZipCode(),
    },
    emergencyContact: {
      name: firstNames[Math.floor(Math.random() * firstNames.length)] + ' ' + lastNames[Math.floor(Math.random() * lastNames.length)],
      relationship: ['Cônjuge', 'Filho(a)', 'Pai/Mãe', 'Irmão(ã)', 'Amigo(a)'][Math.floor(Math.random() * 5)],
      phone: generatePhone(),
    },
    insuranceInfo: Math.random() > 0.3 ? {
      provider: insuranceProviders[Math.floor(Math.random() * insuranceProviders.length)],
      planNumber: Math.floor(1000000000 + Math.random() * 9000000000).toString(),
      validity: new Date(2025, 11, 31),
    } : undefined,
    medicalHistory: {
      allergies: Math.random() > 0.7 ? [['Penicilina', 'Dipirona'][Math.floor(Math.random() * 2)]] : [],
      medications: Math.random() > 0.6 ? [['Losartana 50mg', 'Sinvastatina 20mg'][Math.floor(Math.random() * 2)]] : [],
      conditions: Math.random() > 0.5 ? [['Hipertensão', 'Diabetes Tipo 2', 'Asma'][Math.floor(Math.random() * 3)]] : [],
      bloodType: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'][Math.floor(Math.random() * 8)],
    },
    preferences: {
      preferredProfessional: Math.random() > 0.5 ? mockProfessionals[Math.floor(Math.random() * mockProfessionals.length)].id : undefined,
      preferredTimes: [['08:00-12:00', '14:00-18:00'][Math.random() > 0.5 ? 0 : 1]],
      language: 'pt-BR',
      communicationChannel: ['email', 'sms', 'whatsapp', 'phone'][Math.floor(Math.random() * 4)] as any,
    },
    createdAt: new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1),
    lastVisit: Math.random() > 0.3 ? addDays(new Date(), -Math.floor(Math.random() * 90)) : undefined,
    totalVisits: Math.floor(Math.random() * 50),
    noShowCount: Math.floor(Math.random() * 3),
    notes: Math.random() > 0.8 ? 'Paciente pontual e colaborativo' : undefined,
  }
})

// Generate Mock Appointments
export const mockAppointments: Appointment[] = []

// Generate today's appointments
const today = new Date()
const hours = ['07:00', '08:00', '09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00', '18:00']

// Today's appointments
mockProfessionals.forEach((prof, profIndex) => {
  const numAppointments = 3 + Math.floor(Math.random() * 5)
  for (let i = 0; i < numAppointments; i++) {
    const patient = mockPatients[Math.floor(Math.random() * mockPatients.length)]
    const startTime = hours[Math.floor(Math.random() * hours.length)]
    const duration = prof.appointmentDuration.return
    const endHour = parseInt(startTime.split(':')[0]) + Math.floor(duration / 60)
    const endMinute = duration % 60
    const endTime = `${endHour.toString().padStart(2, '0')}:${endMinute.toString().padStart(2, '0')}`

    mockAppointments.push({
      id: generateId(),
      patientId: patient.id,
      professionalId: prof.id,
      specialty: prof.specialty[0],
      date: today,
      startTime,
      endTime,
      duration,
      status: ['scheduled', 'confirmed', 'in-progress', 'completed'][Math.floor(Math.random() * 4)] as any,
      type: ['first-visit', 'return', 'exam'][Math.floor(Math.random() * 3)] as any,
      room: prof.roomPreference || 'Consultório 1',
      notes: '',
      price: prof.consultationPrice.return,
      isPaid: Math.random() > 0.3,
      reminderSent: true,
    })
  }
})

// Future appointments
for (let day = 1; day <= 30; day++) {
  const appointmentDate = addDays(today, day)
  const numAppointments = 5 + Math.floor(Math.random() * 15)

  for (let i = 0; i < numAppointments; i++) {
    const prof = mockProfessionals[Math.floor(Math.random() * mockProfessionals.length)]
    const patient = mockPatients[Math.floor(Math.random() * mockPatients.length)]
    const startTime = hours[Math.floor(Math.random() * hours.length)]
    const duration = prof.appointmentDuration.return
    const endHour = parseInt(startTime.split(':')[0]) + Math.floor(duration / 60)
    const endMinute = duration % 60
    const endTime = `${endHour.toString().padStart(2, '0')}:${endMinute.toString().padStart(2, '0')}`

    mockAppointments.push({
      id: generateId(),
      patientId: patient.id,
      professionalId: prof.id,
      specialty: prof.specialty[0],
      date: appointmentDate,
      startTime,
      endTime,
      duration,
      status: ['scheduled', 'confirmed'][Math.floor(Math.random() * 2)] as any,
      type: ['first-visit', 'return', 'exam'][Math.floor(Math.random() * 3)] as any,
      room: prof.roomPreference || 'Consultório 1',
      notes: '',
      price: prof.consultationPrice.return,
      isPaid: false,
      reminderSent: false,
    })
  }
}

// Past appointments
for (let day = 1; day <= 90; day++) {
  const appointmentDate = addDays(today, -day)
  const numAppointments = 5 + Math.floor(Math.random() * 15)

  for (let i = 0; i < numAppointments; i++) {
    const prof = mockProfessionals[Math.floor(Math.random() * mockProfessionals.length)]
    const patient = mockPatients[Math.floor(Math.random() * mockPatients.length)]
    const startTime = hours[Math.floor(Math.random() * hours.length)]
    const duration = prof.appointmentDuration.return
    const endHour = parseInt(startTime.split(':')[0]) + Math.floor(duration / 60)
    const endMinute = duration % 60
    const endTime = `${endHour.toString().padStart(2, '0')}:${endMinute.toString().padStart(2, '0')}`

    mockAppointments.push({
      id: generateId(),
      patientId: patient.id,
      professionalId: prof.id,
      specialty: prof.specialty[0],
      date: appointmentDate,
      startTime,
      endTime,
      duration,
      status: ['completed', 'no-show', 'cancelled'][Math.floor(Math.random() * 10) < 7 ? 0 : Math.floor(Math.random() * 2) + 1] as any,
      type: ['first-visit', 'return', 'exam'][Math.floor(Math.random() * 3)] as any,
      room: prof.roomPreference || 'Consultório 1',
      notes: '',
      price: prof.consultationPrice.return,
      isPaid: true,
      reminderSent: true,
      completedAt: new Date(appointmentDate),
    })
  }
}

// Mock Notifications
export const mockNotifications: Notification[] = [
  {
    id: 'notif-1',
    type: 'appointment-request',
    title: 'Nova Solicitação de Consulta',
    message: 'Maria Silva solicitou consulta com Dr. Carlos Eduardo Mendes',
    timestamp: addHours(new Date(), -2),
    read: false,
    priority: 'high',
  },
  {
    id: 'notif-2',
    type: 'patient-arrived',
    title: 'Paciente Chegou',
    message: 'João Santos fez check-in para consulta das 14:00',
    timestamp: addHours(new Date(), -1),
    read: false,
    priority: 'medium',
  },
  {
    id: 'notif-3',
    type: 'cancellation',
    title: 'Consulta Cancelada',
    message: 'Pedro Oliveira cancelou consulta de amanhã às 10:00',
    timestamp: addHours(new Date(), -3),
    read: true,
    priority: 'medium',
  },
  {
    id: 'notif-4',
    type: 'payment-received',
    title: 'Pagamento Confirmado',
    message: 'Pagamento de R$ 300,00 de Ana Costa foi confirmado',
    timestamp: addHours(new Date(), -5),
    read: true,
    priority: 'low',
  },
]

// Mock Queue
export const mockQueue: QueueItem[] = [
  {
    id: 'queue-1',
    appointmentId: mockAppointments[0]?.id || 'apt-1',
    patientName: 'Ana Maria Silva',
    professionalName: 'Dra. Ana Paula Silveira',
    specialty: 'Clínica Geral',
    checkedInAt: addHours(new Date(), -0.5),
    estimatedWaitTime: 15,
    status: 'waiting',
    position: 1,
  },
  {
    id: 'queue-2',
    appointmentId: mockAppointments[1]?.id || 'apt-2',
    patientName: 'João Pedro Santos',
    professionalName: 'Dr. Carlos Eduardo Mendes',
    specialty: 'Cardiologia',
    checkedInAt: addHours(new Date(), -0.25),
    estimatedWaitTime: 30,
    status: 'waiting',
    position: 2,
  },
]
