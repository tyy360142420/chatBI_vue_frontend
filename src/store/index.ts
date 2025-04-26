import type { App } from 'vue'
import { store } from './helper'

export function initStore(app: App) {
  app.use(store)
}

export * from './modules'
