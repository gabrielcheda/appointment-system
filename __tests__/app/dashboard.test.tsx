import { render, screen } from '@testing-library/react'
import DashboardPage from '@/app/[locale]/page'

// Mock the QueryClientProvider
jest.mock('@tanstack/react-query', () => ({
  useQuery: () => ({
    data: [],
    isLoading: false,
    error: null,
  }),
}))

describe('Dashboard Page', () => {
  it('renders without crashing', () => {
    const { container } = render(<DashboardPage />)
    expect(container).toBeTruthy()
  })

  it('renders page content', () => {
    const { container } = render(<DashboardPage />)

    // Check for main page elements
    expect(container.querySelector('div')).toBeInTheDocument()
  })

  it('renders statistics cards', () => {
    const { container } = render(<DashboardPage />)

    // Dashboard should have multiple sections/cards
    const divs = container.querySelectorAll('div')
    expect(divs.length).toBeGreaterThan(5)
  })
})
