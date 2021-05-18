<template>
    <q-header  class="bg-white text-grey-8" height-hint="64">
      <app-header-bar></app-header-bar>

      <q-toolbar class="GNL__toolbar">
        <q-btn
          flat
          dense
          round
          @click.prevent="toggleLeftDrawer()"
          aria-label="Menu"
          icon="menu"
          class="q-mr-sm"
        />

        <q-toolbar-title v-if="$q.screen.gt.xs" shrink class="row items-center no-wrap">
          <img src="/logo-small.png">
          <span class="q-ml-sm"></span>
        </q-toolbar-title>

        <q-space />

        <q-input class="GNL__toolbar-input" outlined dense v-model="search" color="bg-grey-7 shadow-1" placeholder="Search for modules, categories and task">
          <template v-slot:prepend>
            <q-icon v-if="$store.state.admin_layout.search === ''" name="search" />
            <q-icon v-else name="clear" class="cursor-pointer" @click.prevent="search = ''" />
          </template>
          <template v-slot:append>
            <q-btn
              flat
              dense
              round
              aria-label="Menu"
              icon="arrow_drop_down"
            >
            
            </q-btn>
          </template>
        </q-input>

        <q-space />

        <div class="q-gutter-sm row items-center no-wrap">
          <q-btn v-if="$q.screen.gt.sm" round dense flat color="text-grey-7" icon="apps">
            <q-tooltip>Google Apps</q-tooltip>
          </q-btn>
          <q-btn round dense flat color="grey-8" icon="notifications">
            <q-badge color="red" text-color="white" floating>
              2
            </q-badge>
            <q-tooltip>Notifications</q-tooltip>
          </q-btn>
          <q-btn round flat>
            <q-avatar size="26px">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png">
            </q-avatar>
            <q-tooltip>Account</q-tooltip>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>
</template>

<script>
import HeaderBar from './HeaderBar'
export default {
    name: 'Header',
    components: {
       "app-header-bar": HeaderBar
    },
    data(){
        return {
            
        }
    },
    methods: {
        toggleLeftDrawer(){
            this.$store.commit('admin_layout/TOGGLE_LEFT_DRAWER')
        },
       
    },
    computed: {
      search:  {
        get() { return this.$store.getters["admin_layout/fetchSearch"]; },
        set(value){ this.$store.commit('admin_layout/UPDATE_SEARCH',value); }   
      },
    }
}
</script>