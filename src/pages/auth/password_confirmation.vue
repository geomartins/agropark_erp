<template>
  <q-page>
     <div class="password-confirmation-flex-container">  <!-- row -->
      <div class="left-section"></div> 

      <div class="right-section">
        <div class="right-section__login-card"> <!-- column -->
          <div class="right-section-logo">
            <img src="/logo.png" />
          </div>

          <app-password-confirmation-form></app-password-confirmation-form>

        </div>
      </div>

    </div>
   
  </q-page>
</template>

<script>
import PasswordConfirmationForm from "../../components/PasswordConfirmationForm"
export default {
  components: {
    "app-password-confirmation-form": PasswordConfirmationForm
  },
  data(){
    return {
     
    }
  }
};
</script>

<style>
.password-confirmation-flex-container{
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  background: grey;
  position: absolute;
}
.password-confirmation-flex-container div.left-section{
  width: 60%;
  height: 100%;
  background: url('/login-left.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
}

.password-confirmation-flex-container div.right-section{
  width: 40%;
  height: 100%;
  background: url('/illustration.png');
  background-size: cover;
  background-position: center;
   padding-left: 3rem;
  padding-right: 3rem;
  padding-top: 7rem;
  padding-bottom: 1rem;
  /* border: 1px solid blue; */

}

.right-section__login-card{
   height: 100%;
}

  .q-card{
    box-shadow: 0px 0px white!important;
    
  }


@media (min-width: 0px) and (max-width: 600px){
  .password-confirmation-flex-container div.left-section{
    display: none;
  }

  .password-confirmation-flex-container div.right-section{
    width: 100%;
    padding: 0px;
    padding-top: 7rem;
  }

 

  .q-card--bordered{
    border: 1px solid white;
  }

  .q-card{
    box-shadow: 0px 0px white!important;
    
    background: #fff;
  }

  
}


@media (min-width: 601px) and (max-width: 1100px){
  .password-confirmation-flex-container div.left-section{
     width: 50%;
  }

  .password-confirmation-flex-container div.right-section{
     width: 50%;
  }
}
</style>
