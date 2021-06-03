<template>
    <q-drawer
     v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-white"
       behavior="default"
      side="left"
    >
      <q-scroll-area class="fit">
        <q-list padding class="text-grey-8">
         
      

      <q-expansion-item v-for="(category, index ) in $store.state.admin_layout.moduleCategories" :key="index+category"
        expand-separator
        icon="flip"
        :label="category | removeDash | capitalizer"
        expanded-icon="arrow_circle_up"
        expand-icon="arrow_circle_down"
        
      >
        <q-card>
          <q-card-section style="padding: 0px;" >
            <q-item v-ripple v-for="(module, index) in fetchModulesByCategory(category)" :key="index+module" clickable>
            <q-item-section style="padding-left: 57px;"  @click="$router.push('/admin/'+module.name)">
              <q-item-label style="color: #3c4043">{{ module.name | removeDash | capitalizer }} </q-item-label>
            </q-item-section>
          </q-item>
          </q-card-section>
        </q-card>
      </q-expansion-item>

          <!-- <q-separator inset class="q-my-sm" /> -->

          <q-item class="GNL__drawer-item" v-ripple  clickable>
            <q-item-section @click.prevent="logout()">
              <q-item-label> Logout </q-item-label>
            </q-item-section>
          </q-item>

          <div class="q-mt-md">
            <div class="flex flex-center q-gutter-xs">
              <a class="GNL__drawer-footer-link" aria-label="Privacy">Privacy</a>
              <span> · </span>
              <a class="GNL__drawer-footer-link" href="javascript:void(0)" aria-label="Terms">Terms</a>
              <span> · </span>
              <a class="GNL__drawer-footer-link" href="javascript:void(0)" aria-label="About">About Google</a>
            </div>
          </div>


        </q-list>
      </q-scroll-area>
    </q-drawer>

</template>


<script>
import AuthService from '../services/auth_service'
import { mapGetters } from 'vuex'
import filters from '../repositories/filters'

export default {
    name: 'Drawer',
    mixins: [filters],
    data(){
        return {
          width: 280,
        }
    },
    watch: {
      leftDrawerOpen: function (newValue, oldValue) {
        this.$store.commit('admin_layout/UPDATE_LEFT_DRAWER_OPEN',newValue);
      
      }
    },
    methods: {
       
    },
    computed: {
         ...mapGetters('admin_layout',[
          'fetchModulesByCategory',
        ]),
        leftDrawerOpen:  {
        get() { return this.$store.getters["admin_layout/fetchLeftDrawerOpen"]; },
        set(value){ this.$store.commit('admin_layout/UPDATE_LEFT_DRAWER_OPEN',value); }   
      },
    },
    methods: {
       show(){
         console.log('yeee')
       }, 
        logout(){
            const x = this;
           AuthService.logout().then(()=> {
               x.$router.replace('/auth/login');
           }).catch(err => console.log(err));
        }
    }
}
</script>