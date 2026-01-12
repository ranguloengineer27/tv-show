import { onCLS, onINP, onLCP, Metric } from "web-vitals"
import { reportWebVitalsAction } from "@/app/actions/reportWebVitals"

function sendToAnalytics(metric: Metric) {
  const payload = {
    name: metric.name,
    value: metric.value,
    rating: metric.rating,
    id: metric.id,
    navigationType: metric.navigationType,
    pathname: window.location.pathname,
    device:
      window.innerWidth < 768 ? "mobile" : "desktop",
    connection:
      (navigator as any).connection?.effectiveType,
  }

  fetch("/actions/reportWebVitalsAction", {
    method: "POST",
    body: JSON.stringify(payload),
    keepalive: true,
  })
}

export function reportWebVitals() {
  onCLS(sendToAnalytics)
  onINP(sendToAnalytics)
  onLCP(sendToAnalytics)
}
