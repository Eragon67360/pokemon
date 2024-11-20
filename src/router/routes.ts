import HomeView from '../views/HomeView.vue'
export const routeNames = {
  Home: 'home',
  Auth: {
    Login: 'login',
    SignUp: 'signup',
  },
  Loading: 'loading'
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
  {
    path: '/loading',
    name: routeNames.Loading,
    component: () => import('../views/LoadingView.vue'),
  },
]
