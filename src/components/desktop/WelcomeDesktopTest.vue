<template>
    <div v-if="$q.platform.is.desktop" class="flex-container">

        <q-page-sticky position="top-left" :offset="[18, 18]">
            <img src="/logo.png" />
         </q-page-sticky>

         <q-page-sticky position="bottom-right" :offset="[18, 18]">
            <q-btn fab icon="add" color="accent" />
         </q-page-sticky>

        <div class="center-button">
             <div>
                 <q-btn color="white" class="full-width" text-color="black" label="Get Started" />
             </div>
             
             <div>
                 <q-btn color="white" class="full-width" text-color="black" label="Access Account Now" />
             </div>

              <div>
                 <q-btn color="white" class="full-width" text-color="black" label="Password Reset" />
             </div>
             
        </div>
        
    </div>
</template>

<script>
export default {
   name: "WelcomeDesktopTest",
   data(){
       return {

       }
   }
}
</script>

<style>

.flex-container{
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
    background: url('/try.jpg');
    background-size: cover;
    background-repeat: no-repeat;
    position: absolute;
}

.center-button{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;

}

.center-button div{
    margin-bottom: 20px;
    width: 400px; 
    display: block
}


@media (min-width: 0px) and (max-width: 600px){
    .center-button{
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: center;
        width: 100%;

    }

    .center-button div{
        margin-bottom: 20px;
        width: 90%; 
        display: block;
        /* margin-left: 2rem;
        margin-right: 2rem; */
    }
}

</style>