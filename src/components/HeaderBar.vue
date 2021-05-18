<template>
      <q-bar class="q-electron-drag bg-white text-primary" dark v-if="$q.platform.is.electron">
         <q-avatar>
            <img src="~assets/favicon-96x96.png">
          </q-avatar>
          <div>{{ name }} - {{ version }}</div>

          <q-space />

          <q-btn dense flat icon="minimize" @click.prevent="minimize" />
          <q-btn dense flat icon="crop_square" @click.prevent="maximize" />
          <q-btn dense flat icon="close" @click.prevent="closeApp" />
      </q-bar>
</template>

<script>
export default {
    name: "HeaderBar",
    data(){
        return {
            name: process.env.NAME,
            version: 'v' + process.env.VERSION
        }
    },
    methods: {
          minimize () {
      if (process.env.MODE === 'electron') {
        this.$q.electron.remote.BrowserWindow.getFocusedWindow().minimize()
      }
    },

    maximize () {
      if (process.env.MODE === 'electron') {
        const win = this.$q.electron.remote.BrowserWindow.getFocusedWindow()

        if (win.isMaximized()) {
          win.unmaximize()
        } else {
          win.maximize()
        }
      }
    },

    closeApp () {
      if (process.env.MODE === 'electron') {
        this.$q.electron.remote.BrowserWindow.getFocusedWindow().close()
      }
    }
    }
}
</script>

<style scoped>

</style>