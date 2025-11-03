'use client'

import { useState, useEffect } from 'react'
import { Bell, Search, Menu, User, Settings } from 'lucide-react'
import { mockNotifications } from '@/lib/mockData'
import { LanguageSwitcher } from '../LanguageSwitcher'
import { useParams } from 'next/navigation'
import { useMobileMenu } from '../providers/MobileMenuProvider'

export function TopBar() {
  const [unreadCount, setUnreadCount] = useState(0)
  const [currentTime, setCurrentTime] = useState(new Date())
  const params = useParams()
  const locale = params.locale as string
  const { toggle } = useMobileMenu()

  useEffect(() => {
    setUnreadCount(mockNotifications.filter(n => !n.read).length)

    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatDate = (date: Date) => {
    return date.toLocaleDateString(locale, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString(locale, {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    })
  }

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-3 md:px-6 py-3 md:py-4 transition-colors">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 md:space-x-4 flex-1 min-w-0">
          <button
            onClick={toggle}
            className="md:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg flex-shrink-0"
          >
            <Menu className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>

          <div className="min-w-0 flex-1">
            <h2 className="text-sm md:text-lg font-semibold text-gray-900 dark:text-white capitalize truncate">
              {formatDate(currentTime)}
            </h2>
            <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">{formatTime(currentTime)}</p>
          </div>
        </div>

        <div className="flex items-center space-x-1 md:space-x-4 flex-shrink-0">
          <div className="hidden lg:flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg px-4 py-2">
            <Search className="w-5 h-5 text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Buscar..."
              className="bg-transparent border-none outline-none text-sm w-64 text-gray-900 dark:text-gray-100"
            />
          </div>

          <LanguageSwitcher currentLocale={locale} />

          <button className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
            <Bell className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-danger-500 text-white text-xs rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          <button className="hidden sm:block p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
            <Settings className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>

          <div className="hidden sm:flex items-center space-x-2 pl-2 md:pl-4 border-l border-gray-200 dark:border-gray-700">
            <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center flex-shrink-0">
              <User className="w-5 h-5 text-white" />
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-medium text-gray-900 dark:text-white">Admin User</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Administrador</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
