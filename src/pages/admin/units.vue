<template>
    <q-page>
          <div class="row">
              <div class="col-lg-1 col-xs-0"></div>
              <div class="col-lg-8 col-xs-12">
                  <app-units-list-view></app-units-list-view>
              </div>
              <div class="col-lg-3 col-xs-0"></div>
          </div>
    </q-page>
</template>

<script>
import UnitsListView from '../../components/listviews/UnitsListView'
export default {
  name: "units",
  components: {
      "app-units-list-view": UnitsListView
  },
  data () {
    return {}
  },
  methods: {
   
  },
  created(){
    this.$store.dispatch('units/fetch', this);
  },
  beforeRouteLeave (to, from , next) {
      this.$store.dispatch('units/unsubscribe', this);
      next();
  }
}
</script>
