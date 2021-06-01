<template>
    <div class="q-pa-sm">
       <q-list padding bordered class="rounded-borders">
      <q-expansion-item
        expand-separator
        label="Role Information"
        expand-icon-class="expand"
        header-class="headerClass"
       default-opened
        dense
       
        icon="widgets"
      >
      <q-card>
          
          <div class="row justify-end q-mx-lg q-my-sm" >
              <q-icon name="mode_edit" size="sm" class="q-pr-md" @click.prevent="editItem()" >
                   <q-tooltip>Edit</q-tooltip>
              </q-icon>
          </div>
   
          <q-card-section style="padding: 0px">
             <div class="pflex">
                  
                 <div class="left">
                 </div>

                 <div class="right">
                     <div class="right__flex">
                         <div class="right__flex__tile">
                             <div class="right__flex__tile__left">
                                 Name
                             </div>

                             <div class="right__flex__tile__right">
                                 {{ data.name | capitalize}}
                             </div>

                         </div>

                         <div class="right__flex__tile">
                             <div class="right__flex__tile__left">
                                 Description
                             </div>

                             <div class="right__flex__tile__right">
                                 {{ data.description | capitalize }}
                             </div>

                         </div>

                      
                         

                      
                     </div>
                 </div>
                
             </div>
          </q-card-section>
      </q-card>
      </q-expansion-item>
       </q-list>
        
    </div>

</template>

<script>
import filters from '../../../repositories/filters'
export default {
    name: "RoleInformationListView",
    mixins: [filters],
    props: {
        data: Object,
    },
    data(){
        return {

        }
    },
    methods: {
        editItem(){
          this.$store.commit('admin_layout/UPDATE_COMPONENT_NAME','app-role-information-update-form'); 
          this.$store.commit('admin_layout/UPDATE_RIGHT_DRAWER_OPEN',true)
        },
    }
}
</script>

<style >
.pflex{
    display: flex;
    flex-direction: row;
    width: 100%;
    max-height: 100%;
}

.pflex > .left{
    width: 0%;
    border-right: 1px solid #00808057;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.pflex > .right{
    width: 100%;
    
    padding: 10px;
}

.left > .q-avatar > .q-avatar__content > i {
    margin-top: 20px;
    
}

.left > .title{
    font-size: 1rem;
    margin-top: .6rem;
}

.left > .subtitle{
    font-size: 0.9rem;
    font-weight: lighter;
}

.right__flex{
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
   
    border: 1px solid #00808057;
    border-radius: 10px;
}

.right__flex__tile{
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    height: 45px;
    border-bottom: 1px solid #00808057;
}

.right__flex__tile:last-child{
     border-bottom: 1px solid transparent;

}

.right__flex__tile__left{
    width: 25%;
    padding-left: 1rem;
    font-size: 15px;
    
}

.right__flex__tile__right{
    width: 70%;
    font-size: 14px;
    font-weight: lighter;
    
}



@media (min-width: 0px) and (max-width: 600px){
    .pflex > .left{
        visibility: hidden;
        width: 0%;
    }

    .pflex > .right{
        width: 100%;
    }

    .right__flex__tile__left {
        width: 40%;
        padding-left: 1rem;
        font-size: 0.9rem;
    }

    .right__flex__tile__right {
        width: 60%;
        font-size: 0.9rem;
        font-weight: lighter;
    }
}


@media (min-width: 601px) and (max-width: 900px){
  
    .right__flex__tile__left {
        width: 40%;
        padding-left: 1rem;
        font-size: 0.9rem;
    }

    .right__flex__tile__right {
        width: 60%;
        font-size: 0.9rem;
        font-weight: lighter;
    }
}
</style>