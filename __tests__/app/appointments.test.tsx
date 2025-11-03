import { render, screen } from '@testing-library/react'
import AppointmentsPage from '@/app/[locale]/appointments/page'

jest.mock('@tanstack/react-query', () => ({
  useQuery: () => ({
    data: [],
    isLoading: false,
    error: null,
  }),
}))

describe('Appointments Page', () => {
  it('renders without crashing', () => {
    const { container } = render(<AppointmentsPage />)
    expect(container).toBeTruthy()
  })

  it('renders page content', () => {
    const { container } = render(<AppointmentsPage />)

    // Check for main page elements
    expect(container.querySelector('div')).toBeInTheDocument()
  })

  it('renders filter controls', () => {
    const { container } = render(<AppointmentsPage />)

    // Check for select elements (filters)
    const selects = container.querySelectorAll('select')
    expect(selects.length).toBeGreaterThan(0)
  })
})
