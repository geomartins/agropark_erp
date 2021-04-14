<template>
  

  <div class="pagenotfound-flex-container">

   

      <div class="button-box">
        <div>
                <q-img
            src="/test4042.png"
            spinner-color="white"
            style="width: 100%"
          />
          
        </div>


        <div class="back-button">
            <q-btn color="teal" class="full-width" text-color="white" label="Go Back"  @click.prevent="$router.go(-1)"/>
        </div>
         <!-- <q-btn fab icon="add" color="accent" /> -->
      </div>
  </div>
  
   

</template>

<script>
export default {
  name: 'Error404',
  data(){
    return {

    }
  }
}
</script>

<style>
  .pagenotfound-flex-container{
    display: flex;
    background: url('/tester.png');
    width: 100%;
    height: 100%;
    position: absolute;
    overflow: hidden
  
  }

  .button-box{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
  }

  .button-box div{
    width: 500px;
    margin-bottom: .5rem;
    
  }

  .button-box div.back-button{
    width: 200px;
  }


  @media (min-width: 0px) and (max-width: 600px){
    .button-box div{
      width: 400px;
    }

    .pagenotfound-flex-container{
     
      background: white;
      position: absolute;
    
    }
  }
</style>
