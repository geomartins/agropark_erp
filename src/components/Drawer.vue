<template>
    <q-drawer
     v-model="leftDrawerOpen"
      
      show-if-above
      bordered
      content-class="bg-white"
      :width="280"
      side="left"
    >
      <q-scroll-area class="fit">
        <q-list padding class="text-grey-8">
         
      

      <q-expansion-item
       
        expand-separator
        icon="auto_awesome_mosaic"
        label="Reporting"
        expanded-icon="arrow_circle_up"
        expand-icon="arrow_circle_down"
        
      >
        <q-card>
          <q-card-section style="padding: 0px;" >
          
            <q-item v-ripple v-for="link in $store.state.admin_layout.links3" :key="link.text" clickable>
            <q-item-section style="padding-left: 57px;">
              <q-item-label style="color: #3c4043">{{ link.text }} </q-item-label>
            </q-item-section>
          </q-item>
          </q-card-section>
        </q-card>
      </q-expansion-item>

        <q-expansion-item
       
        expand-separator
        icon="widgets"
        label="Website"
        expanded-icon="arrow_circle_up"
        expand-icon="arrow_circle_down" v-for="x in 5" :key="x"
        
      >
        <q-card>
          <q-card-section style="padding: 0px;" >
          
            <q-item v-ripple v-for="link in $store.state.admin_layout.links3" :key="link.text" clickable>
            <q-item-section style="padding-left: 57px;">
              <q-item-label style="color: #3c4043">{{ link.text }} </q-item-label>
            </q-item-section>
          </q-item>
          </q-card-section>
        </q-card>
      </q-expansion-item>

       <q-expansion-item
       
        expand-separator
        icon="flip"
        label="Farm Outlets"
        expanded-icon="arrow_circle_up"
        expand-icon="arrow_circle_down" v-for="x in 5" :key="x+'cc'"
        
      >
        <q-card>
          <q-card-section style="padding: 0px;" >
          
            <q-item v-ripple v-for="link in $store.state.admin_layout.links3" :key="link.text" clickable>
            <q-item-section style="padding-left: 57px;">
              <q-item-label style="color: #3c4043">{{ link.text }} </q-item-label>
            </q-item-section>
          </q-item>
          </q-card-section>
        </q-card>
      </q-expansion-item>

          <!-- <q-separator inset class="q-my-sm" /> -->

       

          <q-separator inset class="q-my-sm" />

          <q-item class="GNL__drawer-item" v-ripple v-for="link in $store.state.admin_layout.links3" :key="link.text" clickable>
            <q-item-section>
              <q-item-label>{{ link.text }} <q-icon v-if="link.icon" :name="link.icon" /></q-item-label>
            </q-item-section>
        

          </q-item>

          <q-item class="GNL__drawer-item" v-ripple  clickable>
            <q-item-section @click.prevent="logout()">
              <q-item-label> Logout </q-item-label>
            </q-item-section>
        

          </q-item>


 <q-item class="GNL__drawer-item" v-ripple  clickable>
            <q-item-section 
           @click.prevent="$router.push('/admin/users')">
              <q-item-label> Users </q-item-label>
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
export default {
    name: 'Drawer',
    data(){
        return {

        }
    },
    methods: {
       
    },
    computed: {
        leftDrawerOpen:  {
        get() { return this.$store.getters["admin_layout/fetchLeftDrawerOpen"]; },
        set(value){ this.$store.commit('admin_layout/UPDATE_LEFT_DRAWER_OPEN',value); }   
      },
    },
    methods: {
        logout(){
            const x = this;
           AuthService.logout().then(()=> {
               x.$router.replace('/auth/login');
           }).catch(err => console.log(err));
        }
    }
}
</script>