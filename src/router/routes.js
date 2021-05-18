const routes = [
  { path: '/', redirect: "/auth/login",},

  {
    path: '/auth',
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      { path: '/auth/login', component: () => import('pages/auth/login.vue') },
      { path: '/auth/password_reset', component: () => import('pages/auth/password_reset.vue') },
      { path: '/auth/password_confirmation', component: () => import('pages/auth/password_confirmation.vue') },
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
      { path: '/admin/module_categories', component: () => import('pages/admin/module_categories.vue') },
      { path: '/admin/module_activities', component: () => import('pages/admin/module_activities.vue') },
      { path: '/admin/modules', component: () => import('pages/admin/modules.vue') },
      { path: '/admin/departments', component: () => import('src/pages/admin/departments.vue') },
      { path: '/admin/units', component: () => import('src/pages/admin/units.vue') },
      { path: '/admin/roles', component: () => import('src/pages/admin/roles.vue') },
      { path: '/admin/users', component: () => import('src/pages/admin/users.vue') },
      { path: '/admin/users/:id', component: () => import('pages/admin/users_details.vue') },
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
