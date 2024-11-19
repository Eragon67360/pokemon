import { createRouter, createWebHistory } from 'vue-router'
import { routeNames, routes } from './routes'
import { useUserStore } from '@/stores/user'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
})
router.beforeEach(async (to, from) => {
  const userStore = useUserStore()
  if (!userStore.isLoggedIn() && to.name !== routeNames.Auth.Login) {
    return { name: routeNames.Auth.Login }
  }
})
export default router
