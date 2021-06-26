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
           <q-list v-if="role" style="background: rgba(224, 224, 224, 0.43) none repeat scroll 0% 0%">
             <q-separator></q-separator>
            <q-item   class="text-weight-regular text-grey-10" >
              <q-item-section avatar>
                 <q-avatar style="background: #b9b9b9 none repeat scroll 0% 0%" text-color="white" icon="person_outline" />
                
              </q-item-section>
              <q-item-section>
                 <q-item-label caption>Signed in as {{ role  | removeDash | capitalizer}}</q-item-label>
                  {{ displayName | removeDash | capitalizer  }}
              </q-item-section>
            </q-item>
           <q-separator  />
          </q-list>

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
                  <a class="GNL__drawer-footer-link" aria-label="Privacy" @click.prevent="open('https://agropark.ng/privacy')">Privacy</a>
                  <span> · </span>
                  <a class="GNL__drawer-footer-link" href="javascript:void(0)" @click.prevent="open('https://agropark.ng/terms')" aria-label="Terms">Terms</a>
                  <span> · </span>
                  <a class="GNL__drawer-footer-link" href="javascript:void(0)" @click.prevent="open('https://agropark.ng/about')"  aria-label="About">About Us</a>
                </div>
              </div>


            </q-list>


              
      </q-scroll-area>
    </q-drawer>

</template>


<script>
import AuthService from '../services/auth_service'
import { mapGetters, mapState } from 'vuex'
import filters from '../repositories/filters'
import { openURL } from 'quasar'

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
         ...mapState('admin_layout', ['avatar','role','displayName']),
         ...mapGetters('admin_layout',[
          'fetchModulesByCategory',
        ]),
        leftDrawerOpen:  {
        get() { return this.$store.getters["admin_layout/fetchLeftDrawerOpen"]; },
        set(value){ this.$store.commit('admin_layout/UPDATE_LEFT_DRAWER_OPEN',value); }   
      },
    },
    methods: {
       open(url){
         openURL(url);
       },
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