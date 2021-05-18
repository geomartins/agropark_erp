<template>
  <q-layout view="hHh lpR fFf" class="bg-grey-1">
   
    <app-header ></app-header>
    <app-drawer></app-drawer>
    <app-drawer-right></app-drawer-right>

    

    <q-page-container>
      <router-view />
    </q-page-container>


  </q-layout>
</template>

<script>
import Drawer from '../components/Drawer';
import DrawerRight from '../components/DrawerRight';
import Header from '../components/Header';
export default {
  name: 'GoogleNewsLayout',
  components: {
    "app-drawer": Drawer,
    "app-drawer-right": DrawerRight,
    "app-header": Header
  },
  data () {
    return {
      right: true
    }
  },
  methods: {
    onClear () {
      this.exactPhrase = ''
      this.hasWords = ''
      this.excludeWords = ''
      this.byWebsite = ''
      this.byDate = 'Any time'
    },
    changeDate (option) {
      this.byDate = option
      this.showDateOptions = false
    }
  },
  created(){
    
  }
}
</script>

<style lang="sass">
.GNL
  &__toolbar
    height: 64px
  &__toolbar-input
    width: 55%
  &__drawer-item
    line-height: 24px
    border-radius: 0 24px 24px 0
    margin-right: 12px
    .q-item__section--avatar
      .q-icon
        color: #5f6368
    .q-item__label
      color: #3c4043
      letter-spacing: .01785714em
      font-size: .875rem
      font-weight: 500
      line-height: 1.25rem
  &__drawer-footer-link
    color: inherit
    text-decoration: none
    font-weight: 500
    font-size: .75rem
    &:hover
      color: #000
</style>