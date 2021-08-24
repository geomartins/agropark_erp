import UserDetail from "../../models/user_detail";
import { snackbar, confirm } from "src/repositories/plugins";
import ChainValidators from "../../repositories/chain_validators";
import FlexValidators from "../../repositories/flex_validators";
import { passwordMatchValidator } from "../../repositories/validators";
import StorageService from "src/services/storage_service";

const state = {
  userId: "",
  is_loading: false,
  skeleton: false,
  unsubscribe: {},

  //DOCUMENT
  document_is_loading: false,
  documentFormData: {
    type: "",
    description: ""
  },
  documentDatas: [],

  //RESET
  resetFormData: {
    password: "",
    confirm_password: ""
  },

  

  //PERSONAL
  personal_information_is_loading: false,
  personalInformationFormData: {
    id: "",
    email: "",
    firstname: "",
    middlename: "",
    lastname: "",
    role: "",
    gender: "",
    dob: "",
    pob: "",
    telephone: "",
    marital_status: "",
    nationality: "",
    religion: "",
    height: "",
    weight: "",
    blood_type: "",
    avatar: ""
  },

  //DEPARTMENT
  department_is_loading: false,
  departmentFormData: {
    id: "",
    name: ""
  },
  departmentDatas: [],

  //KIN
  kin_is_loading: false,
  kinFormData: {
    id: "",
    fullname: "",
    relationship: "",
    occupation: "",
    address: "",
    telephone: ""
  },
  kinDatas: [],

  //BANK
  bank_is_loading: false,
  bankFormData: {
    id: "",
    name: "",
    account_number: "",
    account_holder_name: ""
  },
  bankDatas: [],

  //OTHERS
  dependencies: {
    role: {},
    user: {}
  }
};
const getters = {
  //DEPARTMENT
  fetchDepartmentName: state => {
    return state.departmentFormData.name;
  },

  //DOCUMENT
  fetchDocumentType: state => {
    return state.documentFormData.type;
  },
  fetchDocumentDescription: state => {
    return state.documentFormData.description;
  },
  fetchDocumentFiles: state => {
    return state.documentFormData.files;
  },

  //RESET
  fetchResetPassword: state => {
    return state.resetFormData.password;
  },
  fetchResetConfirmPassword: state => {
    return state.resetFormData.confirm_password;
  },

};
const mutations = {
  UPDATE_USER_ID(state, value) {
    state.userId = value;
  },
  //PERSONAL INFORMATION
  UPDATE_PERSONAL_INFORMATION_FORM_DATA(state, payload) {
    const [key, value] = Object.entries(payload)[0];
    state.personalInformationFormData[key] = value.toLowerCase().trim();
  },

  UPDATE_EDIT_PERSONAL_INFORMATION_FORM_DATA(state, value) {
    state.personalInformationFormData.id = value.id ?? "";
    state.personalInformationFormData.email = value.email ?? "";
    state.personalInformationFormData.firstname = value.firstname ?? "";
    state.personalInformationFormData.middlename = value.middlename ?? "";
    state.personalInformationFormData.lastname = value.lastname ?? "";
    state.personalInformationFormData.gender = value.gender ?? "";
    state.personalInformationFormData.dob = value.dob ?? "";
    state.personalInformationFormData.pob = value.pob ?? "";
    state.personalInformationFormData.telephone = value.telephone ?? "";
    state.personalInformationFormData.marital_status =
      value.marital_status ?? "";
    state.personalInformationFormData.nationality = value.nationality ?? "";
    state.personalInformationFormData.religion = value.religion ?? "";
    state.personalInformationFormData.height = value.height ?? "";
    state.personalInformationFormData.weight = value.weight ?? "";
    state.personalInformationFormData.blood_type = value.blood_type ?? "";
    state.personalInformationFormData.role = value.role ?? "";
    state.personalInformationFormData.avatar = value.avatar ?? "";
  },

  CLEAR_PERSONAL_INFORMATION_FORM_DATA(state) {
    state.personalInformationFormData = Object.assign({
      id: "",
      email: "",
      firstname: "",
      middlename: "",
      lastname: "",
      role: "",
      gender: "",
      dob: "",
      pob: "",
      telephone: "",
      marital_status: "",
      nationality: "",
      religion: "",
      height: "",
      weight: "",
      blood_type: "",
      avatar: ""
    });
  },

  //DEPARTMENT
  UPDATE_DEPARTMENT_FORM_DATA(state, value) {
    state.departmentFormData.id = value.id;
    state.departmentFormData.name = value.name;
  },
  UPDATE_DEPARTMENT_DATAS(state, value) {
    state.departmentDatas = Object.assign([], value);
  },
  UPDATE_DEPARTMENT_NAME(state, value) {
    state.departmentFormData.name = value;
  },
  UPDATE_DEPARTMENT_IS_LOADING(state, value) {
    state.department_is_loading = value;
  },
  CLEAR_DEPARTMENT_FORM_DATA(state) {
    state.departmentFormData = Object.assign({
      id: "",
      name: ""
    });
  },

  //KIN
  UPDATE_KIN_FORM_DATA(state, payload) {
    const [key, value] = Object.entries(payload)[0];
    state.kinFormData[key] = value.toLowerCase().trim();
  },
  UPDATE_EDIT_KIN_FORM_DATA(state, value) {
    state.kinFormData.id = value.id;
    state.kinFormData.fullname = value.fullname;
    state.kinFormData.occupation = value.occupation;
    state.kinFormData.address = value.address;
    state.kinFormData.relationship = value.relationship;
    state.kinFormData.telephone = value.telephone;
  },
  UPDATE_KIN_DATAS(state, value) {
    state.kinDatas = Object.assign([], value);
  },
  UPDATE_KIN_IS_LOADING(state, value) {
    state.kin_is_loading = value;
  },
  CLEAR_KIN_FORM_DATA(state) {
    state.kinFormData = Object.assign({
      id: "",
      fullname: "",
      relationship: "",
      occupation: "",
      address: "",
      telephone: ""
    });
  },

  //BANK
  UPDATE_BANK_FORM_DATA(state, payload) {
    const [key, value] = Object.entries(payload)[0];
    state.bankFormData[key] = value.toLowerCase().trim();
  },
  UPDATE_EDIT_BANK_FORM_DATA(state, value) {
    state.bankFormData.id = value.id;
    state.bankFormData.name = value.name;
    state.bankFormData.account_number = value.account_number;
    state.bankFormData.account_holder_name = value.account_holder_name;
  },
  UPDATE_BANK_DATAS(state, value) {
    state.bankDatas = Object.assign([], value);
  },
  UPDATE_BANK_IS_LOADING(state, value) {
    state.bank_is_loading = value;
  },
  CLEAR_BANK_FORM_DATA(state) {
    state.bankFormData = Object.assign({
      id: "",
      name: "",
      account_number: "",
      account_holder_name: ""
    });
  },

  //DOCUMENT
  UPDATE_DOCUMENT_IS_LOADING(state, value) {
    state.document_is_loading = value;
  },
  UPDATE_DOCUMENT_DATAS(state, value) {
    state.documentDatas = Object.assign([], value);
  },
  UPDATE_DOCUMENT_TYPE(state, value) {
    state.documentFormData.type = value;
  },
  UPDATE_DOCUMENT_DESCRIPTION(state, value) {
    state.documentFormData.description = value;
  },
  UPDATE_DOCUMENT_FILES(state, value) {
    state.documentFormData.files.push(value);
  },
  CLEAR_DOCUMENT_FORM_DATA(state) {
    state.documentFormData = Object.assign({
      type: "",
      description: "",
      images: []
    });
  },

  //RESET
  UPDATE_RESET_PASSWORD(state, value) {
    state.resetFormData.password = value;
  },
  UPDATE_RESET_CONFIRM_PASSWORD(state, value) {
    state.resetFormData.confirm_password = value;
  },
  CLEAR_RESET_FORM_DATA(state) {
    state.resetFormData = Object.assign({
      password: "",
      confirm_password: ""
    });
  },

 

  //OTHERS
  UPDATE_IS_LOADING(state, value) {
    state.is_loading = value;
  },
  UPDATE_UNSUBSCRIBE(state, payload) {
    state.unsubscribe[payload.type] = payload.value;
  },

  //DEPENDENCY
  UPDATE_D_ROLE(state, value) {
    state.dependencies.role = value;
  },
  UPDATE_D_USER(state, value) {
    state.dependencies.user = value;
  },

  //
  UPDATE_SKELETON(state, value) {
    state.skeleton = value;
  }
};
const actions = {
  //PERSONALINFORMATION
  async fetchPersonalInformation({ commit, state }) {
    commit("UPDATE_SKELETON", true);
    let unsubscribe = new UserDetail(state.userId).fetchPersonalInformation(
      (data, err) => {
        if (err) {
          snackbar("warning", err.message);
          commit("UPDATE_SKELETON", false);
          return;
        }
        commit("UPDATE_EDIT_PERSONAL_INFORMATION_FORM_DATA", data);
        commit("UPDATE_SKELETON", false);
      }
    );
    commit("UPDATE_UNSUBSCRIBE", {
      type: "fetchPersonalInformation",
      value: unsubscribe
    });
  },

  async fetchUserDependency({ commit, state }) {
    let unsubscribe = await UserDetail.fetchUserDependency((user, err) => {
      if (err) {
        snackbar("warning", err.message);
        return;
      }
      commit("UPDATE_D_USER", user);
    });
    commit("UPDATE_UNSUBSCRIBE", {
      type: "fetchUserDependency",
      value: unsubscribe
    });
  },

  async fetchRoleDependency({ commit, state }) {
    let unsubscribe = await UserDetail.fetchRoleDependency((user, err) => {
      if (err) {
        snackbar("warning", err.message);
        return;
      }
      commit("UPDATE_D_ROLE", user);
    });
    commit("UPDATE_UNSUBSCRIBE", {
      type: "fetchRoleDependency",
      value: unsubscribe
    });
  },

  async updatePersonalInformation({ commit, state }, instance) {
    const personalInformationId = state.personalInformationFormData.id;
    const data = state.personalInformationFormData;
    delete data.id;

    try {
      commit("UPDATE_IS_LOADING", true);
      new FlexValidators(data).check({
        firstname: "required|notNull",
        middlename: "required|notNull",
        lastname: "required|notNull",
        telephone: "required|notNull|validTelephone",
        email: "required|notNull|email|emailExtension"
      });
      let userDetail = new UserDetail(state.userId);
      await userDetail.savePersonalInformation(data, personalInformationId);

      snackbar("success", "item updated successfully");
      commit("UPDATE_IS_LOADING", false);
      instance.close();
    } catch (err) {
      snackbar("warning", err.message);
      commit("UPDATE_IS_LOADING", false);
    }
  },

  //DOCUMENT
  async fetchDocuments({ commit, state }) {
    commit("UPDATE_DOCUMENT_IS_LOADING", true);
    let unsubscribe = new UserDetail(state.userId).fetchDocuments(
      (datas, err) => {
        if (err) {
          snackbar("warning", err.message);
          commit("UPDATE_DOCUMENT_IS_LOADING", false);
          return;
        }
        commit("UPDATE_DOCUMENT_DATAS", datas);
        commit("UPDATE_DOCUMENT_IS_LOADING", false);
      }
    );
    commit("UPDATE_UNSUBSCRIBE", {
      type: "fetchDocuments",
      value: unsubscribe
    });
  },

  async createDocument({ commit, state }, payload) {
    let instance = payload.instance;
    const data = state.documentFormData;
    data.files = payload.files;

    try {
      new FlexValidators(data).check({
        type: "required|notNull",
        description: "required|notNull"
      });

      commit("UPDATE_IS_LOADING", true);

      new StorageService().uploads("documents", data.files, async urls => {
        delete data.files;
        let userDetail = new UserDetail(state.userId);
        await userDetail.saveDocument(data, urls);

        snackbar("success", "item created successfully");
        commit("CLEAR_DOCUMENT_FORM_DATA");
        commit("UPDATE_IS_LOADING", false);
        instance.close();
      });
    } catch (err) {
      snackbar("warning", err.message);
      commit("UPDATE_IS_LOADING", false);
    }
  },

  async deleteDocumentById({ commit, state }, payload) {
    let docId = payload.docId;
    let url = payload.url;

    let x = await confirm(
      "Confirm",
      "Would you like to delete the selected item?"
    );
    x.onOk(() => {
      new UserDetail(state.userId)
        .deleteDocumentById(docId, url)
        .then()
        .catch(err => {
          snackbar("warning", err.message);
        });
    });
  },

  //DEPARTMENT
  async fetchDepartments({ commit, state }) {
    commit("UPDATE_DEPARTMENT_IS_LOADING", true);
    let unsubscribe = new UserDetail(state.userId).fetchDepartments(
      (datas, err) => {
        if (err) {
          snackbar("warning", err.message);
          commit("UPDATE_DEPARTMENT_IS_LOADING", false);
          return;
        }
        commit("UPDATE_DEPARTMENT_DATAS", datas);
        commit("UPDATE_DEPARTMENT_IS_LOADING", false);
      }
    );
    commit("UPDATE_UNSUBSCRIBE", {
      type: "fetchDepartments",
      value: unsubscribe
    });
  },

  async createDepartment({ commit, state }, instance) {
    const data = state.departmentFormData;
    delete data.id;

    const name = new ChainValidators(data.name).trim().lower().val;
    data.name = name;

    const name_validator = new ChainValidators(name, "name").notNull().validate;
    if (name_validator == false) {
      return "";
    }

    try {
      commit("UPDATE_IS_LOADING", true);
      let userDetail = new UserDetail(state.userId);
      await userDetail.saveDepartment(data);

      snackbar("success", "item created successfully");
      commit("CLEAR_DEPARTMENT_FORM_DATA");
      commit("UPDATE_IS_LOADING", false);
      instance.close();
    } catch (err) {
      snackbar("warning", err.message);
      commit("UPDATE_IS_LOADING", false);
    }
  },

  async updateDepartment({ commit, state }, instance) {
    const deptId = state.departmentFormData.id;
    const data = state.departmentFormData;
    delete data.id;

    try {
      commit("UPDATE_IS_LOADING", true);
      let userDetail = new UserDetail(state.userId);
      await userDetail.saveDepartment(data, deptId);

      snackbar("success", "item updated successfully");
      commit("CLEAR_DEPARTMENT_FORM_DATA");
      commit("UPDATE_IS_LOADING", false);
      instance.close();
    } catch (err) {
      snackbar("warning", err.message);
      commit("UPDATE_IS_LOADING", false);
    }
  },

  async deleteDepartmentById({ commit, state }, deptId) {
    let x = await confirm(
      "Confirm",
      "Would you like to delete the selected item?"
    );
    x.onOk(() => {
      new UserDetail(state.userId)
        .deleteDepartmentById(deptId)
        .then()
        .catch(err => {
          snackbar("warning", err.message);
        });
    });
  },

  //KIN
  async fetchKins({ commit, state }) {
    commit("UPDATE_KIN_IS_LOADING", true);
    let unsubscribe = new UserDetail(state.userId).fetchKins((datas, err) => {
      if (err) {
        snackbar("warning", err.message);
        commit("UPDATE_KIN_IS_LOADING", false);
        return;
      }
      commit("UPDATE_KIN_IS_LOADING", false);
      commit("UPDATE_KIN_DATAS", datas);
    });
    commit("UPDATE_UNSUBSCRIBE", { type: "fetchKins", value: unsubscribe });
  },

  async createKin({ commit, state }, instance) {
    const data = state.kinFormData;
    delete data.id;

    try {
      commit("UPDATE_IS_LOADING", true);
      new FlexValidators(data).check({
        fullname: "required|notNull",
        relationship: "required|notNull",
        occupation: "required|notNull",
        address: "required|notNull",
        telephone: "required|notNull|validTelephone"
      });
      let userDetail = new UserDetail(state.userId);
      await userDetail.saveKin(data);

      snackbar("success", "item created successfully");
      commit("CLEAR_KIN_FORM_DATA");
      commit("UPDATE_IS_LOADING", false);
      instance.close();
    } catch (err) {
      snackbar("warning", err.message);
      commit("UPDATE_IS_LOADING", false);
    }
  },

  async updateKin({ commit, state }, instance) {
    const kinId = state.kinFormData.id;
    const data = state.kinFormData;
    delete data.id;

    try {
      commit("UPDATE_IS_LOADING", true);
      new FlexValidators(data).check({
        fullname: "required|notNull",
        relationship: "required|notNull",
        occupation: "required|notNull",
        address: "required|notNull",
        telephone: "required|notNull|validTelephone"
      });
      let userDetail = new UserDetail(state.userId);
      await userDetail.saveKin(data, kinId);

      snackbar("success", "item updated successfully");
      commit("CLEAR_KIN_FORM_DATA");
      commit("UPDATE_IS_LOADING", false);
      instance.close();
    } catch (err) {
      snackbar("warning", err.message);
      commit("UPDATE_IS_LOADING", false);
    }
  },
  async deleteKinById({ commit, state }, kinId) {
    let x = await confirm(
      "Confirm",
      "Would you like to delete the selected item?"
    );
    x.onOk(() => {
      new UserDetail(state.userId)
        .deleteKinById(kinId)
        .then()
        .catch(err => {
          snackbar("warning", err.message);
        });
    });
  },

  //BANK
  async fetchBanks({ commit, state }) {
    commit("UPDATE_BANK_IS_LOADING", true);
    let unsubscribe = new UserDetail(state.userId).fetchBanks((datas, err) => {
      if (err) {
        snackbar("warning", err.message);
        commit("UPDATE_BANK_IS_LOADING", false);
        return;
      }
      commit("UPDATE_BANK_DATAS", datas);
      commit("UPDATE_BANK_IS_LOADING", false);
    });
    commit("UPDATE_UNSUBSCRIBE", { type: "fetchBanks", value: unsubscribe });
  },
  async createBank({ commit, state }, instance) {
    const data = state.bankFormData;
    delete data.id;

    const account_holder_name = new ChainValidators(data.account_holder_name)
      .trim()
      .lower().val;
    data.account_holder_name = account_holder_name;

    try {
      commit("UPDATE_IS_LOADING", true);
      let userDetail = new UserDetail(state.userId);
      await userDetail.saveBank(data);

      snackbar("success", "item created successfully");
      commit("CLEAR_BANK_FORM_DATA");
      commit("UPDATE_IS_LOADING", false);
      instance.close();
    } catch (err) {
      snackbar("warning", err.message);
      commit("UPDATE_IS_LOADING", false);
    }
  },
  async updateBank({ commit, state }, instance) {
    const bankId = state.bankFormData.id;
    const data = state.bankFormData;
    delete data.id;

    try {
      commit("UPDATE_IS_LOADING", true);
      let userDetail = new UserDetail(state.userId);
      await userDetail.saveBank(data, bankId);

      snackbar("success", "item updated successfully");
      commit("CLEAR_BANK_FORM_DATA");
      commit("UPDATE_IS_LOADING", false);
      instance.close();
    } catch (err) {
      snackbar("warning", err.message);
      commit("UPDATE_IS_LOADING", false);
    }
  },
  async deleteBankById({ commit, state }, bankId) {
    let x = await confirm(
      "Confirm",
      "Would you like to delete the selected item?"
    );
    x.onOk(() => {
      new UserDetail(state.userId)
        .deleteBankById(bankId)
        .then()
        .catch(err => {
          snackbar("warning", err.message);
        });
    });
  },

  //RESET
  async createReset({ commit, state }, instance) {
    const data = state.resetFormData;

    const checkMatch = await passwordMatchValidator(
      data.password,
      data.confirm_password
    );
    if (checkMatch == false) {
      return;
    }

    try {
      commit("UPDATE_IS_LOADING", true);
      let userDetail = new UserDetail(state.userId);
      await userDetail.saveReset(data);

      snackbar("success", "item updated successfully");
      commit("CLEAR_RESET_FORM_DATA");
      commit("UPDATE_IS_LOADING", false);
      instance.close();
    } catch (err) {
      snackbar("warning", err.message);
      commit("UPDATE_IS_LOADING", false);
    }
  },

  

  //
  async updateAvatar({ commit, state }, instance) {
    const file = instance.file;
    const vueInstance = instance.instance;

    try {
      commit("UPDATE_IS_LOADING", true);

      new StorageService().upload(file, async downloadURL => {
        const data = { avatar: downloadURL };

        await new UserDetail(state.userId).saveAvatar(data);
        snackbar("success", "item updated successfully");

        commit("UPDATE_IS_LOADING", false);
        vueInstance.close();
      });
    } catch (err) {
      snackbar("warning", err.message);
      commit("UPDATE_IS_LOADING", false);
    }
  },

  async clearAll({ commit, state }, instance) {
    commit("CLEAR_PERSONAL_INFORMATION_FORM_DATA");
    commit("CLEAR_DEPARTMENT_FORM_DATA");
    commit("CLEAR_KIN_FORM_DATA");
    commit("CLEAR_BANK_FORM_DATA");
    commit("CLEAR_DOCUMENT_FORM_DATA");
    commit("CLEAR_RESET_FORM_DATA");
    commit("UPDATE_IS_LOADING", false);

    commit("UPDATE_KIN_IS_LOADING", false);
    commit("UPDATE_DEPARTMENT_IS_LOADING", false);
    commit("UPDATE_BANK_IS_LOADING", false);
  },

  async unsubscribe({ commit, state }, instance) {
    for (let x in state.unsubscribe) {
      let endListener = await state.unsubscribe[x];
      endListener();
    }
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
