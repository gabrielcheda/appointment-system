import { render, screen } from '@testing-library/react'
import PatientsPage from '@/app/[locale]/patients/page'

jest.mock('@tanstack/react-query', () => ({
  useQuery: () => ({
    data: [],
    isLoading: false,
    error: null,
  }),
}))

describe('Patients Page', () => {
  it('renders without crashing', () => {
    const { container } = render(<PatientsPage />)
    expect(container).toBeTruthy()
  })

  it('renders page content', () => {
    const { container } = render(<PatientsPage />)

    // Check for main page elements
    expect(container.querySelector('div')).toBeInTheDocument()
  })

  it('renders search functionality', () => {
    const { container } = render(<PatientsPage />)

    // Check for input element (search)
    const inputs = container.querySelectorAll('input')
    expect(inputs.length).toBeGreaterThan(0)
  })
})
