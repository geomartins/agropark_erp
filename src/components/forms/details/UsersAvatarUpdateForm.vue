<template>
    
      <q-expansion-item
        expand-separator
        label="Update Avatar"
        expand-icon-class="expand"
        header-class="headerClass"
        default-opened
        style="border-bottom: 1px solid #00808057; background: #fafafa"
        class="q-pb-xs"
      >
       <q-card flat >
              
            <div class="q-mt-md"></div>

              
              <vue-dropzone ref="imgDropZone"  id="dropzone" :options="dropzoneOptions" @vdropzone-complete="update" :useCustomSlot='true'>
                 <div class="dropzone-custom-content">
                   <div>
                     <q-icon name="cloud_download" color="teal" style="font-size: 30px"></q-icon>
                   </div>
                   <div class="q-mt-sm"> Drag and drop here</div>
                </div>
              </vue-dropzone>
              
           

             <q-card-section class="q-pt-md bottomFix" >
                  <div class="editFlex">
                      <q-btn color="primary" flat label="Close" @click.prevent="$store.commit('admin_layout/UPDATE_RIGHT_DRAWER_OPEN',false)" />
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
    name: "UsersAvatarUpdateForm",
    components: {
      vueDropzone: vue2Dropzone
    },
     data() {
    return {
       dense: true,
       visible: true,
       images: [],
       dropzoneOptions: {
          url: 'https://httpbin.org/post',
          thumbnailWidth: 150,
          addRemoveLinks: false,
          acceptedFiles: ".jpg, .jpeg, .png",
          maxFilesize: 0.5,
          maxFiles: 1,
      }
    };
  },
  methods: {
    update(file){ this.$store.dispatch('users_details/updateAvatar',{ instance: this, file: file }); },
    close(){ this.$store.commit('admin_layout/UPDATE_RIGHT_DRAWER_OPEN',false) }
  },
}
</script>

<style>




</style>