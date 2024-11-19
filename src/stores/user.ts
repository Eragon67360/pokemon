import ApiService from '@/service/api.service'
import type { User } from '@supabase/supabase-js'
import { defineStore } from 'pinia'

interface State {
  user?: User
}
export const useUserStore = defineStore('user', {
  state: (): State => ({
    user: undefined,
  }),
  actions: {
    setUser(user: User) {
      this.user = user
    },
    async isLoggedIn() {
      try {
        this.setUser(await ApiService.user.lookup())
        return true
      } catch {
        return false
      }
    },
  },
  getters: {
    //
  },
})
