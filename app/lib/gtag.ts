export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || ''

// Define gtag argument types
type GtagCommand = 'config' | 'event' | 'js' | 'set'
type GtagConfigParams = {
  page_path?: string
  custom_map?: Record<string, string>
  groups?: string
  send_page_view?: boolean
}
type GtagEventParams = {
  event_category?: string
  event_label?: string
  value?: string | number
  custom_parameter_1?: string | number
  custom_parameter_2?: string | number
}

// Augment window with gtag
declare global {
  interface Window {
    gtag: (
      command: GtagCommand,
      targetId: string,
      config?: GtagConfigParams | GtagEventParams
    ) => void
  }
}

// Check if GA is available
const isGAAvailable = (): boolean =>
  typeof window !== 'undefined' && 
  typeof window.gtag === 'function' && 
  GA_TRACKING_ID !== ''

// Track page views
export const pageview = (url: string) => {
  if (!isGAAvailable()) return
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  })
}

// Track events
export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string
  category: string
  label?: string
  value?: string | number
}) => {
  if (!isGAAvailable()) return
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value,
  })
}
