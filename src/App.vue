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

//TODO: Work on module, module_categories , role, role_module on deletion

//TODO: Working on Search with Export
//TODO: Creation of department-module relationship


/**
 * If you delete a module by mistake, what will happen
 * Go to the roles > modules and delete the module
 * Go to the roles > modules_ref and remove index that contain the deleted module name
 */

/**
 * If you change a module_categories of a module
 * Go to the roles > modules and update the module category
 * Go to roles > modules_ref and update the module category
 */


            /** 
             * new MaskValidator(state.formData)
                .trim('firstname','middlename','lastname','role','email')
                .lower('firstname','middlename','lastname','role','email')
                .val;


            **/
</script>