import { type UserProps } from '@/service/api.service'
import { defineStore } from 'pinia'

interface State {
  user?: UserProps
}
export const useUserStore = defineStore('user', {
  state: (): State => ({
    user: undefined,
  }),
  actions: {
    setUser(user: UserProps) {
      this.user = user
    },
  },
  getters: {
    //
  },
})
