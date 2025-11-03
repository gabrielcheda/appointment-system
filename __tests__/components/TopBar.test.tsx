import { render, screen } from '@testing-library/react'
import { TopBar } from '@/components/layout/TopBar'

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
  usePathname: () => '/pt-BR/dashboard',
  useParams: () => ({ locale: 'pt-BR' }),
}))

describe('TopBar', () => {
  it('renders without crashing', () => {
    const { container } = render(<TopBar />)
    expect(container).toBeTruthy()
  })

  it('renders the search input', () => {
    render(<TopBar />)

    const searchInput = screen.getByPlaceholderText('Buscar...')
    expect(searchInput).toBeInTheDocument()
  })

  it('renders action buttons', () => {
    render(<TopBar />)

    const buttons = screen.getAllByRole('button')
    expect(buttons.length).toBeGreaterThan(0)
  })

  it('renders user profile section', () => {
    render(<TopBar />)

    expect(screen.getByText('Admin User')).toBeInTheDocument()
    expect(screen.getByText('Administrador')).toBeInTheDocument()
  })

  it('renders language switcher', () => {
    render(<TopBar />)

    // Language switcher should show current locale flag
    expect(screen.getByText('🇧🇷')).toBeInTheDocument()
  })
})
