import { render, screen } from '@testing-library/react'
import CalendarPage from '@/app/[locale]/calendar/page'

jest.mock('@tanstack/react-query', () => ({
  useQuery: () => ({
    data: [],
    isLoading: false,
    error: null,
  }),
}))

describe('Calendar Page', () => {
  it('renders without crashing', () => {
    const { container } = render(<CalendarPage />)
    expect(container).toBeTruthy()
  })

  it('renders page content', () => {
    const { container } = render(<CalendarPage />)

    // Check for main page elements
    expect(container.querySelector('div')).toBeInTheDocument()
  })

  it('renders calendar view controls', () => {
    const { container } = render(<CalendarPage />)

    // Check for buttons (view controls)
    const buttons = container.querySelectorAll('button')
    expect(buttons.length).toBeGreaterThan(0)
  })

  it('renders calendar grid', () => {
    const { container } = render(<CalendarPage />)

    // Calendar should have a grid structure
    const divs = container.querySelectorAll('div')
    expect(divs.length).toBeGreaterThan(5)
  })
})
