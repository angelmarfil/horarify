import { createRouter, createWebHistory } from 'vue-router'
import TimetableView from '@/views/TimetableView.vue'
import TasksView from '@/views/TasksView.vue'
import ConfigView from '@/views/ConfigView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import AboutView from '@/views/AboutView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'timetable',
      component: TimetableView,
      meta: {
        Auth: true
      }
    },
    {
      path: '/tasks',
      name: 'tasks',
      component: TasksView,
      meta: {
        Auth: true
      }
    },
    {
      path: '/config',
      name: 'config',
      component: ConfigView,
      meta: {
        Auth: true
      }
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
      meta: {
        Auth: false
      }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: {
        Auth: false
      }
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      meta: {
        Auth: false
      }
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  const auth = localStorage.getItem('token') ? true : false
  const NeedAuth = to.meta.Auth || false

  if (NeedAuth && !auth) {
    next({ name: 'login' })
  } else if (auth && to.name?.toString() == 'login') {
    next({ name: 'timetable' })
  } else {
    next()
  }
})

export default router
