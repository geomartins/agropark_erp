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
    <q-card flat>
      <div class="q-mt-md"></div>

      <!-- <q-card-section class="q-pt-none">
                <q-select color="grey-3" outlined :dense="dense"  v-model="name" :options="$store.state.users_details.dependencies.banks" label="Bank Name">
                </q-select>
            </q-card-section> -->

      <q-card-section class="q-pt-none">
        <q-input
          type="email"
          outlined
          v-model="email"
          label="Email Address"
          :dense="dense"
        />
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input
          outlined
          v-model="firstname"
          label="FirstName"
          :dense="dense"
        />
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input
          outlined
          v-model="middlename"
          label="MiddleName"
          :dense="dense"
        />
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input outlined v-model="lastname" label="LastName" :dense="dense" />
      </q-card-section>

      <div class="splitTwoFlex">
        <q-card-section class="q-pt-none">
          <q-select
            color="grey-3"
            outlined
            :dense="dense"
            v-model="role"
            :options="$store.state.users_details.dependencies.role.ids"
            label="Role"
          >
          </q-select>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-select
            color="grey-3"
            outlined
            :dense="dense"
            v-model="gender"
            :options="
              $store.state.users_details.dependencies.user.genders.split(',')
            "
            label="Gender"
          >
          </q-select>
        </q-card-section>
      </div>

      <q-card-section class="q-pt-none">
        <q-input
          outlined
          v-model="dob"
          :dense="dense"
          readonly
          stack-label
          label="Date Of Birth"
        >
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy transition-show="scale" transition-hide="scale">
                <q-date v-model="dob" mask="YYYY-MM-DD">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input outlined v-model="pob" label="Place Of Birth" :dense="dense" />
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input
          outlined
          v-model="telephone"
          label="Telephone"
          :dense="dense"
          mask="(###) ### - ### - ####"
          fill-mask
          unmasked-value
          hint="Mask: (###) ### - ### - ####"
        />
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-select
          color="grey-3"
          outlined
          :dense="dense"
          v-model="marital_status"
          :options="
            $store.state.users_details.dependencies.user.marital_status.split(
              ','
            )
          "
          label="Marital Status"
        >
        </q-select>
      </q-card-section>

      <div class="splitTwoFlex">
        <q-card-section class="q-pt-none">
          <q-select
            color="grey-3"
            outlined
            :dense="dense"
            v-model="nationality"
            :options="
              $store.state.users_details.dependencies.user.nationalities.split(
                ','
              )
            "
            label="Nationality"
          >
          </q-select>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-select
            color="grey-3"
            outlined
            :dense="dense"
            v-model="religion"
            :options="
              $store.state.users_details.dependencies.user.religions.split(',')
            "
            label="Religious Affiliation"
          >
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
        <q-select
          color="grey-3"
          outlined
          :dense="dense"
          v-model="blood_type"
          :options="
            $store.state.users_details.dependencies.user.blood_types.split(',')
          "
          label="Blood Type"
        >
        </q-select>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div class="editFlex">
          <q-btn color="primary" label="Update" @click.prevent="update()" />
          <q-btn
            color="primary"
            outline
            label="Close"
            @click.prevent="
              $store.commit('admin_layout/UPDATE_RIGHT_DRAWER_OPEN', false)
            "
          />
        </div>
      </q-card-section>

      <q-inner-loading :showing="is_loading">
        <q-spinner-gears size="50px" color="primary" />
      </q-inner-loading>
    </q-card>
  </q-expansion-item>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "UsersPersonalInformationUpdateForm",
  data() {
    return {
      dense: true,
      visible: true,
      date: "2019/02/01"
    };
  },
  computed: {
    ...mapState("users_details", ["is_loading", "personalInformationFormData"]),
    email: {
      get() {
        return this.personalInformationFormData.email;
      },
      set(value) {
        this.UPDATE_PERSONAL_INFORMATION_FORM_DATA({ email: value });
      }
    },
    firstname: {
      get() {
        return this.personalInformationFormData.firstname;
      },
      set(value) {
        this.UPDATE_PERSONAL_INFORMATION_FORM_DATA({ firstname: value });
      }
    },
    middlename: {
      get() {
        return this.personalInformationFormData.middlename;
      },
      set(value) {
        this.UPDATE_PERSONAL_INFORMATION_FORM_DATA({ middlename: value });
      }
    },
    lastname: {
      get() {
        return this.personalInformationFormData.lastname;
      },
      set(value) {
        this.UPDATE_PERSONAL_INFORMATION_FORM_DATA({ lastname: value });
      }
    },
    role: {
      get() {
        return this.personalInformationFormData.role;
      },
      set(value) {
        this.UPDATE_PERSONAL_INFORMATION_FORM_DATA({ role: value });
      }
    },
    gender: {
      get() {
        return this.personalInformationFormData.gender;
      },
      set(value) {
        this.UPDATE_PERSONAL_INFORMATION_FORM_DATA({ gender: value });
      }
    },
    pob: {
      get() {
        return this.personalInformationFormData.pob;
      },
      set(value) {
        this.UPDATE_PERSONAL_INFORMATION_FORM_DATA({ pob: value });
      }
    },
    dob: {
      get() {
        return this.personalInformationFormData.dob;
      },
      set(value) {
        this.UPDATE_PERSONAL_INFORMATION_FORM_DATA({ dob: value });
      }
    },
    telephone: {
      get() {
        return this.personalInformationFormData.telephone;
      },
      set(value) {
        this.UPDATE_PERSONAL_INFORMATION_FORM_DATA({ telephone: value });
      }
    },
    marital_status: {
      get() {
        return this.personalInformationFormData.marital_status;
      },
      set(value) {
        this.UPDATE_PERSONAL_INFORMATION_FORM_DATA({ marital_status: value });
      }
    },
    nationality: {
      get() {
        return this.personalInformationFormData.marital_status;
      },
      set(value) {
        this.UPDATE_PERSONAL_INFORMATION_FORM_DATA({ nationality: value });
      }
    },
    religion: {
      get() {
        return this.personalInformationFormData.religion;
      },
      set(value) {
        this.UPDATE_PERSONAL_INFORMATION_FORM_DATA({ religion: value });
      }
    },
    height: {
      get() {
        return this.personalInformationFormData.height;
      },
      set(value) {
        this.UPDATE_PERSONAL_INFORMATION_FORM_DATA({ height: value });
      }
    },
    weight: {
      get() {
        return this.personalInformationFormData.weight;
      },
      set(value) {
        this.UPDATE_PERSONAL_INFORMATION_FORM_DATA({ weight: value });
      }
    },
    blood_type: {
      get() {
        return this.personalInformationFormData.blood_type;
      },
      set(value) {
        this.UPDATE_PERSONAL_INFORMATION_FORM_DATA({ blood_type: value });
      }
    }
  },
  methods: {
    ...mapMutations("users_details", ["UPDATE_PERSONAL_INFORMATION_FORM_DATA"]),
    update() {
      this.$store.dispatch("users_details/updatePersonalInformation", this);
    },
    close() {
      this.$store.commit("admin_layout/UPDATE_RIGHT_DRAWER_OPEN", false);
    }
  }
};
</script>

<style>
.editFlex {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}

.editFlex button {
  margin-right: 10px;
}

.splitTwoFlex {
  display: flex;
  width: 100%;
  max-height: 100%;
}

.splitTwoFlex > .q-card__section {
  width: 50%;
}

.splitTwoFlex > .q-card__section:first-child {
  padding-right: 0px;
}
</style>
