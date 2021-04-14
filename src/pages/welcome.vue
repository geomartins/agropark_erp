<template>
  <q-page>
    <app-welcome-desktop-test></app-welcome-desktop-test>
    <app-welcome-electron></app-welcome-electron>
  </q-page>
</template>

<script>
import WelcomeDesktopTest from '../components/desktop/WelcomeDesktopTest'
import WelcomeElectron from '../components/electron/WelcomeElectron'
export default {
  components: {
    'app-welcome-desktop-test': WelcomeDesktopTest,
    'app-welcome-electron': WelcomeElectron
  }
};
</script>

<style></style>
