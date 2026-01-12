"use server"

import { headers } from "next/headers"

export async function reportWebVitalsAction(metric: any) {
  try {
    const h = await headers()

    const data = {
      ...metric,
      userAgent: h.get("user-agent"),
      country: h.get("x-vercel-ip-country"),
      city: h.get("x-vercel-ip-city"),
      region: h.get("x-vercel-ip-region"),
      timestamp: Date.now(),
    }

    console.log("[WebVitals]", data) // this is log in Vercel

    // 👉 In real prod:
    // - forward to BigQuery
    // - send to Datadog
    // - or store in DB
  } catch (error) {
    // Silently ignore errors during server shutdown or connection issues
    // This prevents ECONNRESET errors from cluttering logs during test runs
    if (process.env.NODE_ENV !== 'production') {
      // Only log in development if it's not a connection reset
      if (error instanceof Error && !error.message.includes('ECONNRESET') && !error.message.includes('aborted')) {
        console.warn('[WebVitals] Failed to report:', error.message)
      }
    }
  }
}
