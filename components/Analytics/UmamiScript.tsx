'use client'

import Script from 'next/script'

export default function UmamiScript() {
  const websiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID
  const umamiUrl = process.env.NEXT_PUBLIC_UMAMI_URL

  // Skip if not configured
  if (!websiteId || !umamiUrl) {
    if (process.env.NODE_ENV === 'development') {
      console.log('Umami Analytics: Not configured (missing NEXT_PUBLIC_UMAMI_WEBSITE_ID or NEXT_PUBLIC_UMAMI_URL)')
    }
    return null
  }

  return (
    <Script
      async
      defer
      data-website-id={websiteId}
      src={`${umamiUrl}/script.js`}
      data-domains={process.env.NEXT_PUBLIC_UMAMI_DOMAINS}
      strategy="afterInteractive"
      onLoad={() => {
        console.log('Umami Analytics loaded successfully')
      }}
    />
  )
}