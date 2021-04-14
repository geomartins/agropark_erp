const routes = [
  { path: '/', redirect: "/auth/login",},

  {
    path: '/auth',
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      { path: '/auth/login', component: () => import('pages/auth/login.vue') },
      { path: '/auth/forget_password', component: () => import('pages/auth/forget_password.vue') },
      { path: '/auth/recovery_password', component: () => import('pages/auth/recovery_password.vue') }
    ]
  },

  {
    path: '/admin',
    component: () => import('src/layouts/AdminLayout.vue'),
    redirect: "/admin/dashboard",
    meta: {
      requiresAuth: true
    },
    children: [
      { path: '/admin/dashboard', component: () => import('pages/admin/dashboard.vue') },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/page_not_found.vue')
  }
]

export default routes
