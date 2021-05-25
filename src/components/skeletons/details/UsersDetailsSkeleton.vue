<template>
    <div class="q-pa-sm" >

                <transition-group appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut" v-if="skeleton === true">
                    <q-list bordered class="rounded-borders q-mb-md" dense v-for="x in 6" :key="x" >
                        <q-item clickable v-ripple >
                            <q-item-section avatar >
                            <q-skeleton type="QAvatar" size="40px"  />
                            </q-item-section>

                            <q-item-section>
                                <q-skeleton type="text" style="width: 200px" />
                                <q-skeleton type="text" style="width: 150px" />
                            
                            </q-item-section>
                            <q-item-section side>
                                <q-skeleton type="QAvatar" size="20px"  />
                            </q-item-section>
                        </q-item>
                    </q-list>

                </transition-group>

                    
                <div v-if="skeleton === false">
                    <slot></slot>
                </div>
     

       

        

        
       
    </div>
</template>

<script>
export default {
    name: "UsersDetailsSkeleton",
    props: {
        skeleton: Boolean,
    },
    data(){
        return {
           
        }
    }
}
</script>