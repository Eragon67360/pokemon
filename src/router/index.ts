import { supabase } from '@/lib/supabaseClient'
import { createRouter, createWebHistory } from 'vue-router'
import { routeNames, routes } from './routes'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
})
router.beforeEach(async (to) => {
  const { data } = await supabase.auth.getSession()
  if (!data.session && to.name !== routeNames.Auth.Login && to.name !== routeNames.Auth.SignUp) {
    return { name: routeNames.Auth.Login }
  }
})
export default router
