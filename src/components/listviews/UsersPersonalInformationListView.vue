<template>
    <div class="q-pa-sm">
       <q-list padding bordered class="rounded-borders">
      <q-expansion-item
        expand-separator
        label="Personal Information"
        expand-icon-class="expand"
        header-class="headerClass"
       default-opened
        dense
       
        icon="widgets"
      >
      <q-card>
          <q-card-section style="padding: 0px">
             <div class="pflex">
                  
                 <div class="left">
                    <q-avatar size="100px" font-size="100px" color="teal" icon="person" text-color="white"></q-avatar>
                    <div class="title">{{ $store.state.users_details.personalInformationFormData.firstname | capitalize }} {{ $store.state.users_details.personalInformationFormData.lastname | capitalize}}</div>
                    <div class="subtitle">{{ $store.state.users_details.personalInformationFormData.role | capitalize }}</div>
                     <div class="action q-mt-sm">
                        <q-btn  label="Edit Profile" flat style="text-transform: none; background: #deebe0; font-weight: normal" @click.prevent="editItem()" />
                     </div>
                 
                 </div>
                 <div class="right">
                     <div class="right__flex">
                         <div class="right__flex__tile">
                             <div class="right__flex__tile__left">
                                 First Name
                             </div>

                             <div class="right__flex__tile__right">
                                 {{ $store.state.users_details.personalInformationFormData.firstname | capitalize}}
                             </div>

                         </div>

                         <div class="right__flex__tile">
                             <div class="right__flex__tile__left">
                                 Middlename

                             </div>

                             <div class="right__flex__tile__right">
                                 {{ $store.state.users_details.personalInformationFormData.middlename | capitalize }}
                             </div>

                         </div>

                         <div class="right__flex__tile">
                             <div class="right__flex__tile__left">
                                 Lastname
                             </div>

                             <div class="right__flex__tile__right">
                                 {{ $store.state.users_details.personalInformationFormData.lastname | capitalize }}
                             </div>

                         </div>

                          <div class="right__flex__tile">
                             <div class="right__flex__tile__left">
                                 Email Address
                             </div>

                             <div class="right__flex__tile__right">
                                {{ $store.state.users_details.personalInformationFormData.email }}
                             </div>

                         </div>

                         <div class="right__flex__tile">
                             <div class="right__flex__tile__left">
                                 Role
                             </div>

                             <div class="right__flex__tile__right">
                                 {{ $store.state.users_details.personalInformationFormData.role | capitalize }}
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
import filters from '../../repositories/filters'
export default {
    name: "UsersPersonalInformationListView",
    mixins: [filters],
    data(){
        return {

        }
    },
    methods: {
        editItem(){
          this.$store.commit('admin_layout/UPDATE_COMPONENT_NAME','app-users-personal-information-update-form'); 
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
    height: 250px;
}

.pflex > .left{
    width: 30%;
    border-right: 1px solid #00808057;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.pflex > .right{
    width: 70%;
    
    padding: 10px;
}

.left > .q-avatar > .q-avatar__content > i {
    margin-top: 20px;
    
}

.left > .title{
    font-size: 17px;
    margin-top: .6rem;
}

.left > .subtitle{
    font-size: 13px;
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
</style>