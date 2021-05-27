<template>
  <div id="q-app">
    <transition 
      appear
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
    >
    <router-view />
    </transition>
  </div>
</template>
<script>
export default {
  name: 'App',
  meta: {
    // sets document title
    title: 'AgroPark',
    // optional; sets final title as "Index Page - My Website", useful for multiple level meta
    titleTemplate: title => `${title} - Enterprise Resource Planning`,
    meta: {
      description: { name: 'description', content: '' },
      keywords: { name: 'keywords', content: 'AgroPark Enterprise Resource Planning' },
      equiv: { 'http-equiv': 'Content-Type', content: 'text/html; charset=UTF-8' },
    },
  }
}

//TODO: Work on document upload e.g cv, credentials and download

//TODO: Working on Search with Export
//TODO: Creation of department-module relationship


</script>