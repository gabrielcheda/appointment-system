import { getRequestConfig } from 'next-intl/server'

export const locales = ['pt-BR', 'en', 'es'] as const
export type Locale = (typeof locales)[number]

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming locale parameter is valid
  if (!locale || !locales.includes(locale as Locale)) {
    locale = 'pt-BR'
  }

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
  }
})
