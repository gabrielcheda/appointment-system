'use client'

import { useState } from 'react'
import { mockNotifications } from '@/lib/mockData'
import { Bell, Check, Trash2, Settings } from 'lucide-react'

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(mockNotifications)
  const [filter, setFilter] = useState<'all' | 'unread'>('all')

  const filteredNotifications = filter === 'unread'
    ? notifications.filter(n => !n.read)
    : notifications

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n =>
      n.id === id ? { ...n, read: true } : n
    ))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })))
  }

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id))
  }

  const getNotificationIcon = (type: string) => {
    const icons: { [key: string]: string } = {
      'appointment-request': '📅',
      'cancellation': '❌',
      'reschedule': '🔄',
      'patient-arrived': '👤',
      'consultation-finished': '✅',
      'payment-received': '💰',
      'system-alert': '⚠️',
    }
    return icons[type] || '🔔'
  }

  const getPriorityColor = (priority: string) => {
    return priority === 'high' ? 'border-danger-500 bg-danger-50' :
           priority === 'medium' ? 'border-warning-500 bg-warning-50' :
           'border-gray-300 bg-white'
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Notificações</h1>
          <p className="text-gray-500 mt-1">
            {notifications.filter(n => !n.read).length} não lida(s)
          </p>
        </div>
        <button className="btn btn-secondary flex items-center space-x-2">
          <Settings className="w-5 h-5" />
          <span>Preferências</span>
        </button>
      </div>

      {/* Filters */}
      <div className="card mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === 'all'
                  ? 'bg-primary-600 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Todas ({notifications.length})
            </button>
            <button
              onClick={() => setFilter('unread')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === 'unread'
                  ? 'bg-primary-600 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Não Lidas ({notifications.filter(n => !n.read).length})
            </button>
          </div>

          <button
            onClick={markAllAsRead}
            className="text-sm text-primary-600 hover:text-primary-700 font-medium"
          >
            Marcar todas como lidas
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filteredNotifications.length === 0 ? (
          <div className="card text-center py-12">
            <Bell className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500">Nenhuma notificação encontrada</p>
          </div>
        ) : (
          filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`card border-l-4 ${getPriorityColor(notification.priority)} ${
                !notification.read ? 'shadow-md' : 'opacity-75'
              }`}
            >
              <div className="flex items-start space-x-4">
                <div className="text-3xl">{getNotificationIcon(notification.type)}</div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-1">
                    <h3 className={`font-semibold ${!notification.read ? 'text-gray-900' : 'text-gray-600'}`}>
                      {notification.title}
                    </h3>
                    {!notification.read && (
                      <span className="w-2 h-2 bg-primary-600 rounded-full"></span>
                    )}
                  </div>

                  <p className="text-sm text-gray-600 mb-2">{notification.message}</p>

                  <div className="flex items-center justify-between">
                    <p className="text-xs text-gray-500">
                      {new Date(notification.timestamp).toLocaleString('pt-BR', {
                        day: '2-digit',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>

                    <div className="flex items-center space-x-2">
                      {!notification.read && (
                        <button
                          onClick={() => markAsRead(notification.id)}
                          className="text-xs text-primary-600 hover:text-primary-700 font-medium flex items-center space-x-1"
                        >
                          <Check className="w-4 h-4" />
                          <span>Marcar como lida</span>
                        </button>
                      )}
                      <button
                        onClick={() => deleteNotification(notification.id)}
                        className="text-xs text-danger-600 hover:text-danger-700 font-medium flex items-center space-x-1"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span>Excluir</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
