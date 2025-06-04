/// <reference types="vite/client" />

declare global {
  interface Window {
    process?: {
      env: Record<string, string>
    }
  }
}

export {}