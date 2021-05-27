<template>
    <div class="q-pa-sm" >
    <q-list padding bordered class="rounded-borders">
      <q-expansion-item
        expand-separator
        label="Next Of Kin"
        expand-icon-class="expand"
        header-class="headerClass"
        @show="showKins()"
        dense
        icon="widgets"
      >
      
        <q-card>
          <q-card-section>
             <q-table
      :loading="loading"
      :data="datas"
      :columns="columns"
      flat
      row-key="name"
    >

    <template v-slot:top>
          <div class="headerFlex">
              <q-icon name="add" size="sm" class="q-pr-md" @click.prevent="showCreateForm()">
                   <q-tooltip>Add</q-tooltip>
              </q-icon>
          </div>
    </template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="id" :props="props">
            {{ props.pageIndex+1 }} 
          </q-td>
          <q-td key="fullname" :props="props">
            {{ props.row.fullname }}
          </q-td>
          <q-td key="telephone" :props="props">
              {{ props.row.telephone }}
          </q-td>
         
          
          <q-td key="createdAt" :props="props">
            <q-btn flat  icon="mode" padding="xs" class="editIcon"  @click.prevent="editItem(props.row)">
                    <q-tooltip>
                    Edit
                </q-tooltip>
            </q-btn>
            <q-btn flat  icon="delete_outline" padding="xs" class="deleteIcon" @click.prevent="deleteItem(props.row.id)" >
                    <q-tooltip>
                    Delete 
                </q-tooltip>
            </q-btn>
          </q-td>
        </q-tr>
      </template>
    </q-table>
          </q-card-section>
        </q-card>
      </q-expansion-item>

      
    </q-list>
  </div>
</template>

<script>
export default {
    name: "UsersKinListView",
    props: {
      datas: Array,
      loading: Boolean,
    },
    data(){
         return {
            columns: [
                 { name: 'id', label: 'S/N',  align: 'left', field: 'id', sortable: true, style:"width: 40px" },
                {
                name: 'fullname',
                required: true,
                label: 'Kin Name',
                align: 'left',
                field: row => row.fullname,
                format: val => `${val}`,
                sortable: true
                },
                {
                name: 'telephone',
                required: true,
                label: 'Telephone',
                align: 'left',
                field: row => row.telephone,
                format: val => `${val}`,
                sortable: true
                },
    
                { name: 'createdAt', label: '',  align: 'right', field: 'createdAt', sortable: true }
            ],

     
    }
    },
    methods: {
        async deleteItem(id){
         this.$store.dispatch('users_details/deleteKinById',id);
        },
        editItem(payload){
          this.$store.commit('users_details/CLEAR_KIN_FORM_DATA');
          this.$store.commit('users_details/UPDATE_KIN_FORM_DATA', payload);
          this.$store.commit('admin_layout/UPDATE_COMPONENT_NAME','app-users-kin-update-form'); 
          this.$store.commit('admin_layout/UPDATE_RIGHT_DRAWER_OPEN',true)

        },
        showCreateForm(){
          this.$store.commit('users_details/CLEAR_KIN_FORM_DATA');
          this.$store.commit('admin_layout/UPDATE_COMPONENT_NAME','app-users-kin-create-form');
          this.$store.commit('admin_layout/UPDATE_RIGHT_DRAWER_OPEN',true);
       },
      async showKins(){
          this.$store.dispatch('users_details/fetchKins',this).then(() => {
              this.$store.dispatch('users_details/fetchKinDependencies', this);
          })

      }
    }
}
</script>

<style>


</style>