<template>
       <q-card flat >
              
              <q-card-section>
                  <q-list bordered padding style="background: #cccccc52">
                    <q-item>
                      <q-item-section>
                           <q-item-label>Users Form</q-item-label>
                        <q-item-label overline>Fill in the form to create new user</q-item-label>
                       
                      </q-item-section>
                    </q-item>
                  </q-list>
              </q-card-section>

              <q-card-section class="q-pt-none">
                <q-input outlined v-model="firstname" label="Firstname" :dense="dense" />
              </q-card-section>

               <q-card-section class="q-pt-none">
                <q-input outlined v-model="middlename" label="Middlename" :dense="dense" />
              </q-card-section>

               <q-card-section class="q-pt-none">
                <q-input outlined v-model="lastname" label="Lastname" :dense="dense" />
              </q-card-section>

               <q-card-section class="q-pt-none">
                <q-input outlined v-model="email" label="email" :dense="dense" />
              </q-card-section>

              <q-card-section class="q-pt-none">
                <q-select color="grey-3" outlined :dense="dense"  v-model="role" :options="$store.state.users.dependencies.roles" label="Role">
                </q-select>
              </q-card-section>

              

              <q-card-section class="q-pt-none">
                  <div class="editFlex">
                      <q-btn color="primary" outline  label="Create" @click.prevent="create()" />
                      <q-btn color="negative" outline label="Close" @click.prevent="$store.commit('admin_layout/UPDATE_RIGHT_DRAWER_OPEN',false)" />
                  </div>
              </q-card-section>

              <q-inner-loading :showing="$store.state.users.is_loading">
                <q-spinner-gears size="50px" color="primary" />
              </q-inner-loading>

             
            </q-card>
</template>


<script>
export default {
    name: "UsersCreateForm",
     data() {
    return {
       dense: true,
       visible: true,
    };
  },
  computed: {
      firstname:  {
        get() { return this.$store.getters["users/fetchFirstname"]; },
        set(value){ this.$store.commit('users/UPDATE_FIRSTNAME',value); }   
      },
      middlename: {
        get(){ return this.$store.getters["users/fetchMiddlename"]; },
        set(value){ this.$store.commit('users/UPDATE_MIDDLENAME',value); }   
      },
      lastname: {
        get(){ return this.$store.getters["users/fetchLastname"]; },
        set(value){ this.$store.commit('users/UPDATE_LASTNAME',value); }   
      },
      email: {
        get(){ return this.$store.getters["users/fetchEmail"]; },
        set(value){ this.$store.commit('users/UPDATE_EMAIL',value); }   
      },
      role: {
        get(){ return this.$store.getters["users/fetchRole"]; },
        set(value){ this.$store.commit('users/UPDATE_ROLE',value); }   
      },
  },
  methods: {
    create(){ this.$store.dispatch('users/create',this); },
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
</style>