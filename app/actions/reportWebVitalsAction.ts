"use server"

import { headers } from "next/headers"

export async function reportWebVitalsAction(metric: any) {
  const h = await headers()

  const data = {
    ...metric,
    userAgent: h.get("user-agent"),
    country: h.get("x-vercel-ip-country"),
    city: h.get("x-vercel-ip-city"),
    region: h.get("x-vercel-ip-region"),
    timestamp: Date.now(),
  }

  console.log("[WebVitals]", data)

  // 👉 In real prod:
  // - forward a BigQuery
  // - send to Datadog
  // - or store in DB
}
