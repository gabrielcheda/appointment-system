import { render, screen, fireEvent } from '@testing-library/react'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'

// Mock useRouter
const mockPush = jest.fn()
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
  usePathname: () => '/dashboard',
}))

describe('LanguageSwitcher', () => {
  beforeEach(() => {
    mockPush.mockClear()
  })

  it('renders the current locale flag', () => {
    render(<LanguageSwitcher currentLocale="pt-BR" />)
    expect(screen.getByText('🇧🇷')).toBeInTheDocument()
  })

  it('toggles dropdown when clicked', () => {
    render(<LanguageSwitcher currentLocale="pt-BR" />)
    const button = screen.getByRole('button')

    fireEvent.click(button)
    expect(screen.getByText('Português')).toBeInTheDocument()
    expect(screen.getByText('English')).toBeInTheDocument()
    expect(screen.getByText('Español')).toBeInTheDocument()
  })

  it('changes locale when a language is selected', () => {
    render(<LanguageSwitcher currentLocale="pt-BR" />)
    const button = screen.getByRole('button')

    fireEvent.click(button)
    const englishOption = screen.getByText('English')
    fireEvent.click(englishOption)

    expect(mockPush).toHaveBeenCalledWith('/en/dashboard')
  })

  it('displays correct flag for English locale', () => {
    render(<LanguageSwitcher currentLocale="en" />)
    expect(screen.getByText('🇺🇸')).toBeInTheDocument()
  })

  it('displays correct flag for Spanish locale', () => {
    render(<LanguageSwitcher currentLocale="es" />)
    expect(screen.getByText('🇪🇸')).toBeInTheDocument()
  })
})
