<template>
    <div class="q-pa-sm" >
    <q-list padding >
      <q-expansion-item
        expand-separator
        label="Modules"
        expand-icon-class="expand"
        header-class="headerClass"
        dense
        icon="widgets"
        default-opened
      >
     
      
        <q-card>
          <q-card-section>
             <q-table :loading="loading" :data="datas" :columns="columns" flat row-key="name"
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
          <q-td key="name" :props="props">
            {{ props.row.name }}
          </q-td>

           <q-td key="primary_access" :props="props">
            <span v-for="permission in props.row.primary_access" :key="permission">
              <q-badge color="primary" v-if="permission === 'create'" >C</q-badge>
              <q-badge color="primary" v-if="permission === 'read'" >R</q-badge>
              <q-badge color="primary" v-if="permission === 'edit'" >E</q-badge>
               <q-badge color="primary" v-if="permission === 'delete'" >D</q-badge>
            </span>
            
          </q-td>

           <q-td key="secondary_access" :props="props">
            <span v-for="permission in props.row.secondary_access" :key="permission">
              <q-badge color="secondary" v-if="permission === 'create'" >C</q-badge>
              <q-badge color="secondary" v-if="permission === 'read'" >R</q-badge>
              <q-badge color="secondary" v-if="permission === 'edit'" >E</q-badge>
               <q-badge color="secondary" v-if="permission === 'delete'" >D</q-badge>
            </span>
            
          </q-td>

           <q-td key="tertiary_access" :props="props">
            <span v-for="permission in props.row.tertiary_access" :key="permission">
              <q-badge color="info" v-if="permission === 'create'" >C</q-badge>
              <q-badge color="info" v-if="permission === 'read'" >R</q-badge>
              <q-badge color="info" v-if="permission === 'edit'" >E</q-badge>
               <q-badge color="info" v-if="permission === 'delete'" >D</q-badge>
            </span>
            
          </q-td>


          <q-td key="calories" :props="props">
            <q-badge color="green">
              {{ props.row.calories }}
            </q-badge>
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
    name: "RolesModuleListView",
    props: {
      loading: Boolean,
      datas: Array,
    },
    data(){
         return {
            columns: [
                 { name: 'id', label: 'S/N',  align: 'left', field: 'id', sortable: true, style:"width: 40px" },
                {
                name: 'name',
                required: true,
                label: 'Module Name',
                align: 'left',
                field: row => row.name,
                format: val => `${val}`,
                sortable: true
                },
                 {
                name: 'primary_access',
                required: true,
                label: 'Primary Access',
                align: 'left',
                field: row => row.primary_access,
                format: val => `${val}`,
                sortable: true
                },
                 {
                name: 'secondary_access',
                required: true,
                label: 'Secondary Access',
                align: 'left',
                field: row => row.secondary_access,
                format: val => `${val}`,
                sortable: true
                },
                 {
                name: 'tertiary_access',
                required: true,
                label: 'Tertiary Access',
                align: 'left',
                field: row => row.tertiary_access,
                format: val => `${val}`,
                sortable: true
                },
    
                { name: 'createdAt', label: '',  align: 'right', field: 'createdAt', sortable: true }
            ],

      
      }
    },
    methods: {
        async deleteItem(id){
         this.$store.dispatch('roles_details/deleteModuleById',id);
        },
        editItem(payload){
          this.$store.commit('roles_details/CLEAR_MODULE_FORM_DATA');
          this.$store.commit('roles_details/UPDATE_MODULE_FORM_DATA', payload);
          this.$store.commit('admin_layout/UPDATE_COMPONENT_NAME','app-roles-module-update-form'); 
          this.$store.commit('admin_layout/UPDATE_RIGHT_DRAWER_OPEN',true)

        },
        showCreateForm(){
          this.$store.commit('roles_details/CLEAR_MODULE_FORM_DATA');
          this.$store.commit('admin_layout/UPDATE_COMPONENT_NAME','app-roles-module-create-form');
          this.$store.commit('admin_layout/UPDATE_RIGHT_DRAWER_OPEN',true);
       },
      async showModules(){
          this.$store.dispatch('roles_details/fetchModules',this).then(() => {
              this.$store.dispatch('roles_details/fetchModuleDependencies', this);
          })

      }
    }
}
</script>

<style>


</style>