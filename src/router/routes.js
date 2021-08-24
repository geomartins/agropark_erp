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
      { path: '/admin/dashboard', name: "dashboard", component: () => import('pages/admin/dashboard.vue') },
      { path: '/admin/module_notifiers', name: "module_notifiers", component: () => import('pages/admin/module_notifiers.vue')},
      { path: '/admin/extension_notifiers',  name: "extension_notifiers", component: () => import('pages/admin/extension_notifiers.vue')},
      { path: '/admin/modules',  name: "modules" ,  component: () => import('pages/admin/modules.vue')},
      { path: '/admin/domains' , name: "domains", component: () => import('src/pages/admin/domains.vue') },
      { path: '/admin/seed_banks',  name: "seed_banks", component: () => import('src/pages/admin/seed_banks.vue') },
      { path: '/admin/seed_banks/:id', name: "seed_banks_details", component: () => import('src/pages/admin/seed_bank_details.vue') },
      { path: '/admin/roles',  name: "roles", component: () => import('src/pages/admin/roles.vue') },
      { path: '/admin/roles/:id', name: "roles_details", component: () => import('src/pages/admin/roles_details.vue') },
      { path: '/admin/users',  name: "users", component: () => import('src/pages/admin/users.vue') },
      { path: '/admin/users/:id', name: "users_details", component: () => import('pages/admin/users_details.vue') },
    ]
  },

  // Always leave this as last one,b
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/page_not_found.vue')
  }
]

export default routes
