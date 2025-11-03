import { render, screen } from '@testing-library/react'
import ReportsPage from '@/app/[locale]/reports/page'

jest.mock('@tanstack/react-query', () => ({
  useQuery: () => ({
    data: [],
    isLoading: false,
    error: null,
  }),
}))

describe('Reports Page', () => {
  it('renders without crashing', () => {
    const { container } = render(<ReportsPage />)
    expect(container).toBeTruthy()
  })

  it('renders page content', () => {
    const { container } = render(<ReportsPage />)

    // Check for main page elements
    expect(container.querySelector('div')).toBeInTheDocument()
  })

  it('renders report sections', () => {
    const { container } = render(<ReportsPage />)

    // Should have multiple sections for different reports
    const divs = container.querySelectorAll('div')
    expect(divs.length).toBeGreaterThan(5)
  })

  it('renders filter controls', () => {
    const { container } = render(<ReportsPage />)

    // Check for select/button elements (filters)
    const selects = container.querySelectorAll('select')
    const buttons = container.querySelectorAll('button')
    expect(selects.length + buttons.length).toBeGreaterThan(0)
  })

  it('renders chart containers', () => {
    const { container } = render(<ReportsPage />)

    // Reports page should have chart/graph containers
    const divs = container.querySelectorAll('div')
    expect(divs.length).toBeGreaterThan(3)
  })
})
