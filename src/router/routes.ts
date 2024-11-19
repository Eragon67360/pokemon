import HomeView from '../views/HomeView.vue'

export const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView,
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/LoginView.vue'),
    },
    {
        path: '/sign-up',
        name: 'signup',
        component: () => import('../views/SignUpView.vue'),
    },
]