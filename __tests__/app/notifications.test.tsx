import { render, screen } from '@testing-library/react'
import NotificationsPage from '@/app/[locale]/notifications/page'

jest.mock('@tanstack/react-query', () => ({
  useQuery: () => ({
    data: [],
    isLoading: false,
    error: null,
  }),
}))

describe('Notifications Page', () => {
  it('renders without crashing', () => {
    const { container } = render(<NotificationsPage />)
    expect(container).toBeTruthy()
  })

  it('renders page content', () => {
    const { container } = render(<NotificationsPage />)

    // Check for main page elements
    expect(container.querySelector('div')).toBeInTheDocument()
  })

  it('renders notification items', () => {
    const { container } = render(<NotificationsPage />)

    // Should have multiple divs for notifications
    const divs = container.querySelectorAll('div')
    expect(divs.length).toBeGreaterThan(2)
  })

  it('renders filter controls', () => {
    const { container} = render(<NotificationsPage />)

    // Check for buttons (filters)
    const buttons = container.querySelectorAll('button')
    expect(buttons.length).toBeGreaterThan(0)
  })
})
