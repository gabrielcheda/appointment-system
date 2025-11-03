import { getRequestConfig } from 'next-intl/server'

export const locales = ['pt-BR', 'en', 'es'] as const
export type Locale = (typeof locales)[number]

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale

  if (!locale || !locales.includes(locale as Locale)) {
    locale = 'pt-BR'
  }

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
  }
})
