'use client'

import Link from 'next/link'
import { usePathname, useParams } from 'next/navigation'
import {
  LayoutDashboard,
  Calendar,
  Users,
  UserCog,
  Bell,
  ClipboardList,
  Video,
  Syringe,
  FileText,
  Package,
  DollarSign,
  Activity,
  X,
} from 'lucide-react'
import { useTranslations } from 'next-intl'
import { ThemeSwitcher } from '../ThemeSwitcher'
import { useMobileMenu } from '../providers/MobileMenuProvider'

export function Sidebar() {
  const pathname = usePathname()
  const params = useParams()
  const locale = params.locale as string
  const t = useTranslations('nav')
  const { isOpen, close } = useMobileMenu()

  const menuItems = [
    { icon: LayoutDashboard, label: t('dashboard'), href: `/${locale}` },
    { icon: Calendar, label: t('calendar'), href: `/${locale}/calendar` },
    { icon: ClipboardList, label: t('appointments'), href: `/${locale}/appointments` },
    { icon: Users, label: t('patients'), href: `/${locale}/patients` },
    { icon: UserCog, label: t('professionals'), href: `/${locale}/professionals` },
    { icon: Bell, label: t('notifications'), href: `/${locale}/notifications` },
    { icon: Activity, label: t('reports'), href: `/${locale}/reports` },
    { icon: Video, label: t('telemedicine'), href: `/${locale}/telemedicine` },
    { icon: Syringe, label: t('vaccination'), href: `/${locale}/vaccination` },
    { icon: FileText, label: t('labResults'), href: `/${locale}/lab-results` },
    { icon: Package, label: t('inventory'), href: `/${locale}/inventory` },
    { icon: DollarSign, label: t('financial'), href: `/${locale}/financial` },
  ]

  const SidebarContent = () => (
    <>
      <div className="p-4 md:p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 md:w-10 md:h-10 bg-primary-600 rounded-lg flex items-center justify-center">
            <Activity className="w-5 h-5 md:w-6 md:h-6 text-white" />
          </div>
          <div>
            <h1 className="text-base md:text-lg font-bold text-gray-900 dark:text-white">Saúde Total</h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">Sistema de Gestão</p>
          </div>
        </div>
        <button
          onClick={close}
          className="md:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto p-3 md:p-4">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={close}
                  className={`flex items-center space-x-3 px-3 md:px-4 py-2.5 md:py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 font-medium'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <span className="text-sm">{item.label}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="p-3 md:p-4 border-t border-gray-200 dark:border-gray-700 space-y-3">
        <ThemeSwitcher />
        <div className="bg-primary-50 dark:bg-primary-900/20 rounded-lg p-3 md:p-4">
          <h3 className="text-sm font-semibold text-primary-900 dark:text-primary-300 mb-1">
            Precisa de ajuda?
          </h3>
          <p className="text-xs text-primary-700 dark:text-primary-400 mb-3">
            Entre em contato com o suporte técnico
          </p>
          <button className="w-full btn btn-primary text-sm py-2">
            Suporte
          </button>
        </div>
      </div>
    </>
  )

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={close}
        />
      )}

      {/* Mobile Sidebar (Drawer) */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-transform duration-300 transform md:hidden ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } flex flex-col`}
      >
        <SidebarContent />
      </aside>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:flex-col w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-colors">
        <SidebarContent />
      </aside>
    </>
  )
}
