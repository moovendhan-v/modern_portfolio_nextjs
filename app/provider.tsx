'use client'
import posthog from 'posthog-js'
import { PostHogProvider as PHProvider } from 'posthog-js/react'
import { useEffect } from 'react'
import { ReactNode } from 'react'

export function PostHogProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (!posthog.__loaded) {
      posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY || '', {
        api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com',
        autocapture: true, // Automatically track clicks, page views, etc.
        capture_pageview: false, // We'll manually track pageviews
      })
    }

    // Capture page visits
    posthog.capture('pageview', {
      url: window.location.href,
      referrer: document.referrer,
    })
  }, [])

  return <PHProvider client={posthog}>{children}</PHProvider>
}
