import HomeView from '../views/HomeView.vue'
export const routeNames = {
  Home: 'home',
  Auth: {
    Login: 'login',
    SignUp: 'signup',
  },
}

export const routes = [
  {
    path: '/',
    name: routeNames.Home,
    component: HomeView,
  },
  {
    path: '/login',
    name: routeNames.Auth.Login,
    component: () => import('../views/LoginView.vue'),
  },
  {
    path: '/sign-up',
    name: routeNames.Auth.SignUp,
    component: () => import('../views/SignUpView.vue'),
  },
]
