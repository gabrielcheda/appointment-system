import { render, screen } from '@testing-library/react'
import { Sidebar } from '@/components/layout/Sidebar'

// Mock usePathname to return a specific path
jest.mock('next/navigation', () => ({
  usePathname: () => '/pt-BR/dashboard',
  useParams: () => ({ locale: 'pt-BR' }),
}))

describe('Sidebar', () => {
  it('renders without crashing', () => {
    const { container } = render(<Sidebar />)
    expect(container).toBeTruthy()
  })

  it('renders the clinic branding', () => {
    const { container } = render(<Sidebar />)

    // Check for branding elements
    expect(container.querySelector('svg')).toBeInTheDocument()
  })

  it('renders navigation links', () => {
    const { container } = render(<Sidebar />)

    // Check for navigation links
    const links = container.querySelectorAll('a')
    expect(links.length).toBeGreaterThan(5)
  })

  it('renders the theme switcher', () => {
    render(<Sidebar />)

    // Theme switcher should have 3 buttons (light, dark, system)
    const buttons = screen.getAllByRole('button')
    expect(buttons.length).toBeGreaterThanOrEqual(3)
  })
})
