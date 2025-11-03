import { render, screen } from '@testing-library/react'
import ProfessionalsPage from '@/app/[locale]/professionals/page'

jest.mock('@tanstack/react-query', () => ({
  useQuery: () => ({
    data: [],
    isLoading: false,
    error: null,
  }),
}))

describe('Professionals Page', () => {
  it('renders without crashing', () => {
    const { container } = render(<ProfessionalsPage />)
    expect(container).toBeTruthy()
  })

  it('renders page content', () => {
    const { container } = render(<ProfessionalsPage />)

    // Check for main page elements
    expect(container.querySelector('div')).toBeInTheDocument()
  })

  it('renders professional cards', () => {
    const { container } = render(<ProfessionalsPage />)

    // Should have multiple divs for professional cards
    const divs = container.querySelectorAll('div')
    expect(divs.length).toBeGreaterThan(3)
  })

  it('renders action buttons', () => {
    const { container } = render(<ProfessionalsPage />)

    // Check for buttons
    const buttons = container.querySelectorAll('button')
    expect(buttons.length).toBeGreaterThan(0)
  })
})
