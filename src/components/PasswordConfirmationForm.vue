<template>
 <div class="form">
            <q-card >
              
              <q-card-section>
                  <q-list bordered padding>
                    <q-item>
                      <q-item-section>
                        <q-item-label overline>Reset your account password</q-item-label>
                        <q-item-label>Enter your email to reset password</q-item-label>
                      
                      </q-item-section>
                    </q-item>
                  </q-list>
              </q-card-section>

              <q-card-section class="q-pt-none">
                <q-input type="password" outlined v-model="password" label="Password" :dense="dense" />
              </q-card-section>
               <q-card-section class="q-pt-none">
                <q-input type="password" outlined v-model="confirm_password" label="Confirm Password" :dense="dense" />
              </q-card-section>

             

              <q-separator inset />

              <q-card-section>
                <q-btn color="teal" class="full-width" label="Update Password" @click.prevent="confirm()" />
              </q-card-section>

               <q-card-section class="q-pt-none">
                <div class="text-overline text-weight-regular text-center" style="cursor: pointer" @click="$router.push('/auth/login')">Already have an account?? Login</div>
              </q-card-section>
            </q-card>
          </div>
</template>

<script>
export default {
  name: "PasswordConfirmationForm",
  data() {
    return {
       dense: true,
    };
  },
  computed: {
        password:  {
          get() { return this.$store.getters["password_confirmation/fetchPassword"]; },
          set(value){ this.$store.commit('password_confirmation/UPDATE_PASSWORD',value); }   
        },
        confirm_password:  {
          get() { return this.$store.getters["password_confirmation/fetchConfirmPassword"]; },
          set(value){ this.$store.commit('password_confirmation/UPDATE_CONFIRM_PASSWORD',value); }   
        },
    },
    methods: {
      confirm(){ 
        this.$store.dispatch("password_confirmation/confirm",this); 
      }
    },
    created() {
      let queryCode = this.$route.query.oobCode;
      this.$store.commit('password_confirmation/UPDATE_CODE',queryCode)
    },
};
</script>

<style></style>
