## Architecture

The architectural approach chosen for this application is based on a clear separation between **domain logic** and **UI concerns**.

- The `/api` folder contains all domain-related logic, including the `ShowsService`, the `Show` entity, and server actions.
- The `ui` folder groups all UI-related code such as components, hooks, and global stores.
- The `app` folder defines the application routes, following the structure imposed by Next.js.

Overall, the application follows the **Next.js App Router architecture**, leveraging both **Server Components** and **Client Components** to achieve an optimal balance between performance, scalability, and developer experience.

---

## Framework

Next.js was chosen as the main framework due to its strong support for **server-side rendering**, **data fetching**, and **caching at the server level**.

Key benefits include:
- Rendering components and fetching data on the server
- Built-in caching and revalidation mechanisms
- Support for static rendering where applicable
- Integrated routing and layout system

These features make Next.js a solid and scalable choice for this type of application.

---

## Data Fetching and Caching

To fetch data from the external API, **TanStack Query** was selected due to its robust data-fetching capabilities and built-in handling of loading and error states.

The application combines:
- **Server-side data caching** using Next.js revalidation strategies
- **Client-side caching** via TanStack Query to avoid unnecessary round trips to the server

This layered approach results in an efficient and resilient caching strategy that improves both performance and user experience.

---

## Global State Management

For global state management, **Zustand** was chosen to store user favorites.

Zustand offers several advantages:
- Better performance compared to React Context by minimizing unnecessary re-renders
- A lightweight and simple API
- Reduced boilerplate and overall complexity
- Built-in support for persistence

The user's search state is **not stored globally**, as there is no real benefit in sharing this state across routes. Keeping it local avoids unnecessary global re-renders and reduces performance overhead.

---

## Pagination

From a UX perspective, in the context of a TV shows search application, users tend to spend time reading show details such as titles, ratings, and summaries rather than continuously scrolling.

Because of this:
- Infinite scrolling was discarded, as it would introduce additional complexity (list virtualization, lazy loading) and performance considerations
- A classic pagination control was chosen instead, providing a simpler, more predictable, and performant user experience

This approach offers the best balance between usability, simplicity, and performance for the application’s use case.

---

## Theme Switching

In real-world production applications, it is common to respect the user’s **system preferences** or a previously selected theme to ensure a consistent and expected experience across sessions.

For this application:
- The selected theme is persisted in `localStorage`
- **next-themes** was chosen to handle theme switching in a server-rendered environment

Because the application uses SSR, a potential issue arises when the server renders the UI with a default theme, while the client later resolves a different theme based on system preferences or stored values. This can lead to **hydration mismatches** and visible flashing during hydration.

`next-themes` addresses this problem in a reliable and well-tested way, ensuring consistent rendering between server and client.

---

## Testing

The application includes two testing layers:

### Unit Tests
- Implemented using **Jest** and **React Testing Library**
- Focused on testing behavior rather than implementation details
- Cover components, hooks, and utility functions
- Achieve over **90% code coverage**
- Can be executed using:
  ```bash
  pnpm test:coverage

### End-to-End Tests

- Implemented using **Playwright**
- Focused on validating complete user flows
- Can be executed using:

  ```bash
  pnpm test:e2e

## Performance and Web Vitals

The application demonstrates excellent performance, validated through:

- Lighthouse audits in production
- WebPageTest (https://www.webpagetest.org/)
- Integration of the `web-vitals` package

Core Web Vitals metrics are logged and monitored in **Vercel**, where the application is deployed.
