// Service Worker for PWA and Push Notifications
const CACHE_NAME = 'clinica-saude-total-v1'
const urlsToCache = [
  '/',
  '/calendar',
  '/appointments',
  '/patients',
  '/professionals',
  '/notifications',
  '/reports',
]

// Install event - cache resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Opened cache')
      return cache.addAll(urlsToCache)
    })
  )
})

// Fetch event - serve from cache if available
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response
      }
      return fetch(event.request)
    })
  )
})

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME]
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
})

// Push notification event
self.addEventListener('push', (event) => {
  console.log('Push notification received:', event)

  let notificationData = {
    title: 'Clínica Saúde Total',
    body: 'Nova notificação',
    icon: '/icon-192x192.png',
    badge: '/badge-72x72.png',
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1,
    },
  }

  if (event.data) {
    try {
      const data = event.data.json()
      notificationData = {
        title: data.title || notificationData.title,
        body: data.body || notificationData.body,
        icon: data.icon || notificationData.icon,
        badge: data.badge || notificationData.badge,
        data: data.data || notificationData.data,
      }
    } catch (e) {
      notificationData.body = event.data.text()
    }
  }

  const options = {
    body: notificationData.body,
    icon: notificationData.icon,
    badge: notificationData.badge,
    vibrate: [100, 50, 100],
    data: notificationData.data,
    actions: [
      { action: 'view', title: 'Ver Detalhes', icon: '/icons/view.png' },
      { action: 'close', title: 'Fechar', icon: '/icons/close.png' },
    ],
    tag: 'notification-' + Date.now(),
    requireInteraction: false,
  }

  event.waitUntil(
    self.registration.showNotification(notificationData.title, options)
  )
})

// Notification click event
self.addEventListener('notificationclick', (event) => {
  console.log('Notification clicked:', event)
  event.notification.close()

  if (event.action === 'view') {
    event.waitUntil(
      clients.openWindow(event.notification.data?.url || '/')
    )
  } else if (event.action === 'close') {
    // Just close the notification
  } else {
    // Default action - open the app
    event.waitUntil(
      clients.openWindow('/')
    )
  }
})

// Background sync event (for offline actions)
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-appointments') {
    event.waitUntil(syncAppointments())
  }
})

async function syncAppointments() {
  // This would sync offline appointment bookings when connection is restored
  console.log('Syncing appointments...')
  // Implementation would go here
}

// Handle messages from the main thread
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting()
  }
})

// Periodic sync for checking new notifications (if supported)
self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'check-notifications') {
    event.waitUntil(checkForNewNotifications())
  }
})

async function checkForNewNotifications() {
  // This would check for new notifications periodically
  console.log('Checking for new notifications...')
  // Implementation would go here
}
