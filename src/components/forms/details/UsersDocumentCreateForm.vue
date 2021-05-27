<template>
    
      <q-expansion-item
        expand-separator
        label="Add Document"
        expand-icon-class="expand"
        header-class="headerClass"
        default-opened
        style="border-bottom: 1px solid #00808057; background: #fafafa"
        class="q-pb-md"
       

      >
       <q-card flat >
              
            <div class="q-mt-md"></div>

            <q-card-section class="q-pt-none">
              <q-select color="grey-3" outlined :dense="dense"  v-model="type" :options="$store.state.users_details.dependencies.document_types" label="Document Types">
                </q-select>
              </q-card-section>

               <q-card-section class="q-pt-none">
                    
                <q-input outlined v-model="description" label="Description" :dense="dense" />
              </q-card-section>
               

                <vue-dropzone ref="imgDropZone"  id="dropzone" :options="dropzoneOptions" @vdropzone-complete="updater" :useCustomSlot='true'>
                 <div class="dropzone-custom-content">
                   <div>
                     <q-icon name="cloud_download" color="teal" style="font-size: 30px"></q-icon>
                   </div>
                   <div class="q-mt-sm"> Drag and drop here</div>
                </div>
              </vue-dropzone>




              <q-card-section class="q-pt-lg">
                  <div class="editFlex">
                      <q-btn color="primary"   label="Save" @click.prevent="create()" />
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
import vue2Dropzone from 'vue2-dropzone';
import 'vue2-dropzone/dist/vue2Dropzone.min.css'
export default {
    name: "UsersDocumentCreateForm",
    components: {
      vueDropzone: vue2Dropzone
    },
     data() {
    return {
       dense: true,
       visible: true,
       files: [],
       dropzoneOptions: {
          url: 'https://httpbin.org/post',
          thumbnailWidth: 150,
          addRemoveLinks: false,
          acceptedFiles: ".pdf",
          maxFilesize: 0.5,
        //   maxFiles: 1,
      }
    };
  },
  computed: {
      type:  {
        get() { return this.$store.getters["users_details/fetchDocumentType"]; },
        set(value){ this.$store.commit('users_details/UPDATE_DOCUMENT_TYPE',value); }   
      },
      description:  {
        get() { return this.$store.getters["users_details/fetchDocumentDescription"]; },
        set(value){ this.$store.commit('users_details/UPDATE_DOCUMENT_DESCRIPTION',value); }   
      },
     
    
     
  },
  methods: {
    updater(file){ this.files.push(file); },
    async create(){ 
        this.$store.dispatch('users_details/createDocument', { instance: this, files: this.files}).then(()=>{
            this.files = [];
        })
    },
    close(){ this.$store.commit('admin_layout/UPDATE_RIGHT_DRAWER_OPEN',false) }
  },
  beforeDestroy(){
      console.log('Am destroying this')
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