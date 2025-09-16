import { incrementLoading, decrementLoading } from '../features/ui/uiSlice'

function mergeHeaders(existing, extra) {
  const result = new Headers(existing || {})
  Object.entries(extra || {}).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      result.set(key, String(value))
    }
  })
  return result
}

export function installFetchInterceptor(store) {
  if (typeof globalThis.fetch !== 'function') return
  if (globalThis.__FETCH_INTERCEPTOR_INSTALLED__) return

  const originalFetch = globalThis.fetch.bind(globalThis)

  globalThis.fetch = async (input, init = {}) => {
    const bypass = init?.headers instanceof Headers
      ? init.headers.get('x-bypass-interceptor')
      : (init?.headers && (init.headers['x-bypass-interceptor'] || init.headers['X-Bypass-Interceptor']))

    const shouldBypass = String(bypass || '').toLowerCase() === 'true'
    if (!shouldBypass) {
      store.dispatch(incrementLoading())
    }

    try {
      const token = localStorage.getItem('auth_token')
      const defaultHeaders = {
        'x-app-name': import.meta.env.VITE_APP_NAME || 'mui-rtk-template',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      }

      const mergedHeaders = mergeHeaders(init?.headers, defaultHeaders)

      const nextInit = { ...init, headers: mergedHeaders }
      const response = await originalFetch(input, nextInit)

      if (response.status === 401) {
        // Hook: global auth handling can go here
      }

      return response
    } catch (error) {
      // Optional: global error logging
      throw error
    } finally {
      if (!shouldBypass) {
        store.dispatch(decrementLoading())
      }
    }
  }

  globalThis.__FETCH_INTERCEPTOR_INSTALLED__ = true
}

