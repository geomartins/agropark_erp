<template>
    <q-header  class="bg-white text-grey-8" height-hint="64">
      <app-header-bar></app-header-bar>

      <q-toolbar class="GNL__toolbar">
        <q-btn
          flat
          dense
          round
          @click="toggleLeftDrawer"
          aria-label="Menu"
          icon="menu"
          class="q-mr-sm"
        />

        <q-toolbar-title v-if="$q.screen.gt.xs" shrink class="row items-center no-wrap">
          <img src="/logo-small.png">
          <span class="q-ml-sm"></span>
        </q-toolbar-title>

        <q-space />

        <q-input class="GNL__toolbar-input" style="position: relative" outlined dense color="bg-grey-7 shadow-1" v-model="search" @blur="blur($event)" placeholder="Search for modules, categories and task">
           <div class="checking fit">
            <q-list  style="min-width: 100%;" >
              <q-item style=" background: white"  bordered clickable v-close-popup v-for="(result, index) in searchResult" :key="index+'fff'"  @click="open(result.name)">
                <q-item-section >{{ result.name | removeDash | capitalizer }}</q-item-section>
                <q-item-section side top>
                  <q-item-label caption>{{ result.category | removeDash | capitalizer }}</q-item-label>
                  <q-icon name="travel_explore" color="secondary" />
                </q-item-section>
                <q-separator/>
              </q-item>
            </q-list>
           </div>
        </q-input>

       

        <q-space />

        <div class="q-gutter-sm row items-center no-wrap">
          <q-btn v-if="$q.screen.gt.sm" round dense flat color="text-grey-7" icon="apps">
            <q-tooltip>Apps</q-tooltip>
          </q-btn>
          <!-- <q-btn round dense flat color="grey-8" icon="notifications">
            <q-badge color="red" text-color="white" floating>
              2
            </q-badge>
            <q-tooltip>Notifications</q-tooltip>
          </q-btn> -->
          <q-btn round flat>
            <q-avatar size="26px">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png">
            </q-avatar>
            <q-tooltip>Account</q-tooltip>
          </q-btn>
        </div>

      </q-toolbar>

      <app-internet-connection></app-internet-connection>
      
    </q-header>
</template>

<script>

import { mapGetters, mapState } from 'vuex';
import Vue from 'vue';
import HeaderBar from './HeaderBar'
import filters from '../repositories/filters'
import InternetConnection from './InternetConnection';
export default Vue.extend({
    name: 'Header',
    components: {
       "app-header-bar": HeaderBar,
       "app-internet-connection": InternetConnection
    },
    mixins: [filters],
    data(){
        return {
          onLine: window.navigator.onLine,
        }
    },
    methods: {
        blur(event){
          this.$store.commit('admin_layout/UPDATE_SEARCH','');
        },
        open(url){
          this.$router.push('/admin/'+url);
          this.$store.commit('admin_layout/UPDATE_SEARCH','');
        },
        toggleLeftDrawer(){
            this.$store.commit('admin_layout/TOGGLE_LEFT_DRAWER')
        },

        toggleRightDrawer(){
            this.$store.commit('admin_layout/TOGGLE_RIGHT_DRAWER')
        },
       
    },
    computed: {
      ...mapState('admin_layout',['searchResult']),
      ...mapGetters('admin_layout',['fetchModulesBySearchValue']),
      search:  {
        get() { return this.$store.getters["admin_layout/fetchSearch"]; },
        set(value){ this.$store.commit('admin_layout/UPDATE_SEARCH',value); }   
      },
    },
    

})
</script>


<style>


.checking{
  display: flex;
width: 100%;
position: absolute;
justify-content: center;
/* background: rgb(206, 200, 200); */
top: 40px;
}
</style>