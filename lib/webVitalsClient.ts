import { onCLS, onINP, onLCP, Metric } from "web-vitals"
import { reportWebVitalsAction } from "@/app/actions/reportWebVitalsAction"

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

  reportWebVitalsAction(payload)
}

export function reportWebVitals() {
  onCLS(sendToAnalytics)
  onINP(sendToAnalytics)
  onLCP(sendToAnalytics)
}
