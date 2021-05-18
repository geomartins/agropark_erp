<template>
  <q-page class="flex flex-center">
     <p @click.prevent="$router.push('/admin/module_categories')"> Dashboard Page</p>
  </q-page>
</template>

<script>
import AuthService from '../../services/auth_service';
export default {
  name: 'Dashboard',
  meta: {
    titleTemplate: title => `Dashboard - ${title}  `,
  },
  methods: {
    async logout(){
      console.log('hiiii')
      const x = this;
      AuthService.logout().then(() => {
        x.$router.push('/auth/login');
      }).catch(err => console.log(err))
    }
  }
}
</script>
