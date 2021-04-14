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
                <q-input outlined v-model="text" label="Email Address" :dense="dense" />
              </q-card-section>

             

              <q-separator inset />

              <q-card-section>
                <q-btn color="teal" class="full-width" label="Generate Password Reset Link" />
              </q-card-section>

               <q-card-section class="q-pt-none">
                <div class="text-overline text-weight-regular text-center" style="cursor: pointer" @click="$router.push('/auth/login')">Already have an account?? Login</div>
              </q-card-section>
            </q-card>
          </div>
</template>

<script>
export default {
  name: "PasswordResetForm",
  data() {
    return {
       text: '',
       dense: true,
    };
  }
};
</script>

<style></style>
