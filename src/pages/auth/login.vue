<template>
  <q-page>
     <div class="login-flex-container">  <!-- row -->
      <div class="left-section"></div> 

      <div class="right-section">
        <div class="right-section__login-card"> <!-- column -->
          <div class="right-section-logo">
            <img src="/logo.png" />
          </div>

          <div class="form">
            <q-card   class="my-card">
              
              <q-card-section>
                  <q-list bordered padding>
                    <q-item>
                      <q-item-section>
                        <q-item-label overline>Sign In to your account</q-item-label>
                        <q-item-label>Enter your email & password to login</q-item-label>
                      
                      </q-item-section>
                    </q-item>
                  </q-list>
              </q-card-section>

              <q-card-section class="q-pt-none">
                <q-input outlined v-model="text" label="Email Address" :dense="dense" />
              </q-card-section>

              <q-card-section class="q-pt-none">
                <q-input outlined v-model="text" label="Password" :dense="dense" />
              </q-card-section>

              <q-separator inset />

              <q-card-section>
                <q-btn color="teal" class="full-width" label="Sign In" />
              </q-card-section>

               <q-card-section class="q-pt-none">
                <div class="text-overline text-weight-regular text-center" style="cursor: pointer" @click="$router.push('/auth/password_reset')">Forget password?? Reset Now</div>
              </q-card-section>
            </q-card>
          </div>

        </div>
      </div>

    </div>
   
  </q-page>
</template>

<script>
export default {
  components: {
    
  },
  data(){
    return {
      text: '',
      dense: true,
    }
  }
};
</script>

<style>
.login-flex-container{
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  background: grey;
  position: absolute;
}
.login-flex-container div.left-section{
  width: 60%;
  height: 100%;
  background: url('/login-left.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
}

.login-flex-container div.right-section{
  width: 40%;
  height: 100%;
  background: url('/page_not_found.jpg');
  background-position: center;
   padding-left: 3rem;
  padding-right: 3rem;
  padding-top: 7rem;
  padding-bottom: 1rem;
  /* border: 1px solid blue; */

}

/* .login-flex-container div.right-section div{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
} */


.right-section__login-card{
  
  
   height: 100%;
 
}

.form-card{
    margin: 8px 8px;
    padding: 24px 24px;
    border: 1px solid rgba(0, 0, 0, 0.12);
  }
  .q-card{
    box-shadow: 0px 0px white!important;
    
  }


@media (min-width: 0px) and (max-width: 600px){
  .login-flex-container div.left-section{
    display: none;
  }

  .login-flex-container div.right-section{
    width: 100%;
    padding: 0px;
    padding-top: 7rem;
  }

  .form-card{
    margin: 0px;
    padding: 0px;
    box-shadow: 0 ;
    border: 1px solid rgba(0, 0, 0, 0.12);
  }

  .q-card--bordered{
    border: 1px solid white;
  }

  .q-card{
    box-shadow: 0px 0px white!important;
    background: transparent;
  }

  
}


@media (min-width: 601px) and (max-width: 1100px){
  .login-flex-container div.left-section{
     width: 50%;
  }

  .login-flex-container div.right-section{
     width: 50%;
  }
}
</style>
