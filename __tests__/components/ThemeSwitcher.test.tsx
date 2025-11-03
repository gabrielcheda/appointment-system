import { render, screen, fireEvent } from '@testing-library/react'
import { ThemeSwitcher } from '@/components/ThemeSwitcher'

const mockSetTheme = jest.fn()

jest.mock('next-themes', () => ({
  useTheme: () => ({
    theme: 'light',
    setTheme: mockSetTheme,
    resolvedTheme: 'light',
  }),
}))

describe('ThemeSwitcher', () => {
  beforeEach(() => {
    mockSetTheme.mockClear()
  })

  it('renders theme switcher buttons', () => {
    render(<ThemeSwitcher />)

    const buttons = screen.getAllByRole('button')
    expect(buttons).toHaveLength(3) // light, dark, system
  })

  it('calls setTheme with "light" when light button is clicked', () => {
    render(<ThemeSwitcher />)

    const buttons = screen.getAllByRole('button')
    fireEvent.click(buttons[0]) // First button is light

    expect(mockSetTheme).toHaveBeenCalledWith('light')
  })

  it('calls setTheme with "dark" when dark button is clicked', () => {
    render(<ThemeSwitcher />)

    const buttons = screen.getAllByRole('button')
    fireEvent.click(buttons[1]) // Second button is dark

    expect(mockSetTheme).toHaveBeenCalledWith('dark')
  })

  it('calls setTheme with "system" when system button is clicked', () => {
    render(<ThemeSwitcher />)

    const buttons = screen.getAllByRole('button')
    fireEvent.click(buttons[2]) // Third button is system

    expect(mockSetTheme).toHaveBeenCalledWith('system')
  })

  it('renders theme buttons', () => {
    render(<ThemeSwitcher />)

    const buttons = screen.getAllByRole('button')

    // Should have exactly 3 theme buttons
    expect(buttons).toHaveLength(3)
  })
})
