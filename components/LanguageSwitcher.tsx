'use client'

import { useState } from 'react'
import { Globe } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { locales, localeNames, localeFlags, type Locale } from '@/i18n/config'

const languages = locales.map((code) => ({
  code,
  name: localeNames[code],
  flag: localeFlags[code],
}))

export function LanguageSwitcher({ currentLocale }: { currentLocale: string }) {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  const currentLang = languages.find((lang) => lang.code === currentLocale) || languages[0]

  const handleLanguageChange = (langCode: string) => {
    // Remove the current locale from the pathname
    const pathWithoutLocale = pathname.replace(`/${currentLocale}`, '')
    // Navigate to the new locale
    router.push(`/${langCode}${pathWithoutLocale}`)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1 md:space-x-2 px-2 md:px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      >
        <Globe className="w-4 h-4 md:w-5 md:h-5 text-gray-600 dark:text-gray-300" />
        <span className="text-sm md:text-base">{currentLang.flag}</span>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-40 md:w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-20">
            {languages.map((lang, index) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`w-full flex items-center space-x-2 md:space-x-3 px-3 md:px-4 py-2.5 md:py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                  lang.code === currentLocale
                    ? 'bg-primary-50 dark:bg-primary-900/20'
                    : ''
                } ${
                  index === 0 ? 'rounded-t-lg' : ''
                } ${
                  index === languages.length - 1 ? 'rounded-b-lg' : ''
                }`}
              >
                <span className="text-xl md:text-2xl">{lang.flag}</span>
                <span className="text-xs md:text-sm font-medium text-gray-900 dark:text-gray-100">{lang.name}</span>
                {lang.code === currentLocale && (
                  <span className="ml-auto text-primary-600 dark:text-primary-400 text-sm">✓</span>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
