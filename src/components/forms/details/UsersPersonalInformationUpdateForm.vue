<template>
    
      <q-expansion-item
        expand-separator
        label="Edit Personal Information"
        expand-icon-class="expand"
        header-class="headerClass"
        default-opened
        style="border-bottom: 1px solid #00808057; background: #fafafa"
        class="q-pb-md"
       

      >
       <q-card flat >
              
            <div class="q-mt-md"></div>

              <!-- <q-card-section class="q-pt-none">
                <q-select color="grey-3" outlined :dense="dense"  v-model="name" :options="$store.state.users_details.dependencies.banks" label="Bank Name">
                </q-select>
            </q-card-section> -->

             <q-card-section class="q-pt-none">
                <q-input type="email" outlined v-model="email" label="Email Address" :dense="dense" />
              </q-card-section>



             <q-card-section class="q-pt-none">
                <q-input outlined v-model="firstname" label="FirstName" :dense="dense" />
              </q-card-section>

              <q-card-section class="q-pt-none">
                <q-input outlined v-model="middlename" label="MiddleName" :dense="dense" />
              </q-card-section>

              <q-card-section class="q-pt-none">
                <q-input outlined v-model="lastname" label="LastName" :dense="dense" />
              </q-card-section>

            <div class="splitTwoFlex">
                <q-card-section class="q-pt-none">
                <q-select color="grey-3" outlined :dense="dense"  v-model="role" :options="$store.state.users_details.dependencies.roles" label="Role">
                </q-select>
            </q-card-section>

             <q-card-section class="q-pt-none">
                <q-select color="grey-3" outlined :dense="dense"  v-model="gender" :options="$store.state.users_details.dependencies.genders" label="Gender">
                </q-select>
            </q-card-section>
            </div>
            
           

            <q-card-section class="q-pt-none">
                <q-input outlined v-model="dob" type="date" stack-label label="Date Of Birth" :dense="dense"  />
            </q-card-section>

            <q-card-section class="q-pt-none">
                <q-input outlined v-model="pob" label="Place Of Birth" :dense="dense" />
            </q-card-section>

            <q-card-section class="q-pt-none">
               
                <q-input outlined v-model="telephone" label="Telephone" :dense="dense" mask="(###) ### - #####"
                fill-mask
                unmasked-value
                hint="Mask: (###) ### - ####" />
            </q-card-section>

             <q-card-section class="q-pt-none">
                <q-select color="grey-3" outlined :dense="dense"  v-model="marital_status" :options="$store.state.users_details.dependencies.marital_status" label="Marital Status">
                </q-select>
            </q-card-section>

            <div class="splitTwoFlex">
                <q-card-section class="q-pt-none">
                <q-select color="grey-3" outlined :dense="dense"  v-model="nationality" :options="$store.state.users_details.dependencies.nationalities" label="Nationality">
                </q-select>
            </q-card-section>

            <q-card-section class="q-pt-none">
                <q-select color="grey-3" outlined :dense="dense"  v-model="religion" :options="$store.state.users_details.dependencies.religions" label="Religious Affiliation">
                </q-select>
            </q-card-section>
            </div>
             

             <div class="splitTwoFlex">
                    <q-card-section class="q-pt-none">
                    <q-input outlined v-model="height" label="Height" :dense="dense" />
                </q-card-section>

                <q-card-section class="q-pt-none">
                    <q-input outlined v-model="weight" label="Weight" :dense="dense" />
                </q-card-section>
             </div>

             <q-card-section class="q-pt-none">
                <q-select color="grey-3" outlined :dense="dense"  v-model="blood_type" :options="$store.state.users_details.dependencies.blood_types" label="Blood Type">
                </q-select>
            </q-card-section>





             <q-card-section class="q-pt-none">
                  <div class="editFlex">
                      <q-btn color="primary"   label="Update" @click.prevent="update()" />
                      <q-btn color="primary" outline label="Close" @click.prevent="$store.commit('admin_layout/UPDATE_RIGHT_DRAWER_OPEN',false)" />
                  </div>
              </q-card-section>


              <q-inner-loading :showing="$store.state.users_details.is_loading">
                <q-spinner-gears size="50px" color="primary" />
              </q-inner-loading>

             
            </q-card>
      </q-expansion-item>
</template>


<script>
export default {
    name: "UsersPersonalInformationUpdateForm",
     data() {
    return {
       dense: true,
       visible: true,
       xnl:  '2019/02/01'
    };
  },
  computed: {
      email:  {
        get() { return this.$store.getters["users_details/fetchPersonalInformationEmail"]; },
        set(value){ this.$store.commit('users_details/UPDATE_PERSONAL_INFORMATION_EMAIL',value); }   
      },
      firstname:  {
        get() { return this.$store.getters["users_details/fetchPersonalInformationFirstname"]; },
        set(value){ this.$store.commit('users_details/UPDATE_PERSONAL_INFORMATION_FIRSTNAME',value); }   
      },
      middlename:  {
        get() { return this.$store.getters["users_details/fetchPersonalInformationMiddlename"]; },
        set(value){ this.$store.commit('users_details/UPDATE_PERSONAL_INFORMATION_MIDDLENAME',value); }   
      },
      lastname:  {
        get() { return this.$store.getters["users_details/fetchPersonalInformationLastname"]; },
        set(value){ this.$store.commit('users_details/UPDATE_PERSONAL_INFORMATION_LASTNAME',value); }   
      },
      role:  {
        get() { return this.$store.getters["users_details/fetchPersonalInformationRole"]; },
        set(value){ this.$store.commit('users_details/UPDATE_PERSONAL_INFORMATION_ROLE',value); }   
      },
      gender:  {
        get() { return this.$store.getters["users_details/fetchPersonalInformationGender"]; },
        set(value){ this.$store.commit('users_details/UPDATE_PERSONAL_INFORMATION_GENDER',value); }   
      },
      pob:  {
        get() { return this.$store.getters["users_details/fetchPersonalInformationPob"]; },
        set(value){ this.$store.commit('users_details/UPDATE_PERSONAL_INFORMATION_POB',value); }   
      },
      dob:  {
        get() { return this.$store.getters["users_details/fetchPersonalInformationDob"]; },
        set(value){ 
            console.log(value)
            this.$store.commit('users_details/UPDATE_PERSONAL_INFORMATION_DOB',value);
             }   
      },
      telephone:  {
        get() { return this.$store.getters["users_details/fetchPersonalInformationTelephone"]; },
        set(value){ 
            this.$store.commit('users_details/UPDATE_PERSONAL_INFORMATION_TELEPHONE',value); }   
      },
      marital_status:  {
        get() { return this.$store.getters["users_details/fetchPersonalInformationMaritalStatus"]; },
        set(value){ this.$store.commit('users_details/UPDATE_PERSONAL_INFORMATION_MARITAL_STATUS',value); }   
      },
      nationality:  {
        get() { return this.$store.getters["users_details/fetchPersonalInformationNationality"]; },
        set(value){ this.$store.commit('users_details/UPDATE_PERSONAL_INFORMATION_NATIONALITY',value); }   
      },
      religion:  {
        get() { return this.$store.getters["users_details/fetchPersonalInformationReligion"]; },
        set(value){ this.$store.commit('users_details/UPDATE_PERSONAL_INFORMATION_RELIGION',value); }   
      },
      height:  {
        get() { return this.$store.getters["users_details/fetchPersonalInformationHeight"]; },
        set(value){ this.$store.commit('users_details/UPDATE_PERSONAL_INFORMATION_HEIGHT',value); }   
      },
      weight:  {
        get() { return this.$store.getters["users_details/fetchPersonalInformationWeight"]; },
        set(value){ this.$store.commit('users_details/UPDATE_PERSONAL_INFORMATION_WEIGHT',value); }   
      },
      blood_type:  {
        get() { return this.$store.getters["users_details/fetchPersonalInformationBloofType"]; },
        set(value){ this.$store.commit('users_details/UPDATE_PERSONAL_INFORMATION_BLOOD_TYPE',value); }   
      },


     

  },
  methods: {
    update(){ this.$store.dispatch('users_details/updatePersonalInformation',this); },
    close(){ this.$store.commit('admin_layout/UPDATE_RIGHT_DRAWER_OPEN',false) }
  }
}
</script>

<style>
.editFlex{
    display: flex;
flex-direction: row;
justify-content: flex-start;
}

.editFlex button{
    margin-right: 10px;
}

.splitTwoFlex{
    display: flex;
    width: 100%;
    max-height: 100%;

}

.splitTwoFlex > .q-card__section{
    width: 50%;
}

.splitTwoFlex > .q-card__section:first-child{
    padding-right: 0px;
}
</style>