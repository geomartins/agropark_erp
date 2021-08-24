import { snackbar, confirm } from "src/repositories/plugins";
import User from "../../models/user";
import FlexValidators from "src/repositories/flex_validators";

const state = {
  id: "",
  skeleton: false,
  formData: {
    firstname: "",
    middlename: "",
    lastname: "",
    email: "",
    role: ""
  },
  is_loading: false,
  unsubscribe: {},
  loading: false,
  filter: "",
  datas: [],
  dependencies: {
    role: {},
    user: {}
  },
  userDependencyFormData: {
    relationships: "",
    banks: "",
    religions: "",
    blood_types: "",
    nationalities: "",
    marital_status: "",
    genders: "",
    departments: "",
    units: "",
    document_types: "",
    occupations: ""
  }
};
const getters = {
  fetchFilter: state => {
    return state.filter;
  },
  fetchData: state => {
    return state.datas;
  },
  fetchColumns: state => {
    return state.columns;
  }
  //   fetchUserDependency: state => {
  //     return state.formData[key];
  //   }
};
const mutations = {
  //USER
  UPDATE_FORM_DATA(state, payload) {
    const [key, value] = Object.entries(payload)[0];
    state.formData[key] = value.toLowerCase().trim();
  },
  UPDATE_DATA(state, value) {
    state.datas = Object.assign([], value);
  },
  UPDATE_EDIT_FORM_DATA(state, payload) {
    state.formData = {
      firstname: payload.firstname ?? "",
      middlename: payload.middlename ?? "",
      lastname: payload.lastname ?? "",
      role: payload.role ?? "",
      email: payload.email ?? ""
    };
    state.id = payload.id;
  },
  CLEAR_FORM_DATA(state) {
    state.formData = {
      firstname: "",
      middlename: "",
      lastname: "",
      email: "",
      role: ""
    };
    state.id = "";
  },

  //UNSUBSCRIBE
  UPDATE_UNSUBSCRIBE(state, payload) {
    state.unsubscribe[payload.type] = payload.value;
  },
  UPDATE_IS_LOADING(state, value) {
    state.is_loading = value;
  },
  UPDATE_FILTER(state, value) {
    state.filter = value;
  },
  UPDATE_COLUMNS(state, value) {
    state.columns = value;
  },

  UPDATE_SKELETON(state, value) {
    state.skeleton = value;
  },

  //USER DEPENDENCY
  UPDATE_D_USER(state, value) {
    state.dependencies.user = value;
  },
  UPDATE_EDIT_USER_DEPENDENCY_FORM_DATA(state, payload) {
    state.userDependencyFormData = {
      relationships: payload.relationships ?? "",
      banks: payload.banks ?? "",
      religions: payload.religions ?? "",
      blood_types: payload.blood_types ?? "",
      nationalities: payload.nationalities ?? "",
      marital_status: payload.marital_status ?? "",
      genders: payload.genders ?? "",
      departments: payload.departments ?? "",
      units: payload.units ?? "",
      document_types: payload.document_types ?? "",
      occupations: payload.occupations ?? ""
    };
  },
  UPDATE_USER_DEPENDENCY_FORM_DATA(state, payload) {
    const [key, value] = Object.entries(payload)[0];
    state.userDependencyFormData[key] = value.toLowerCase().trim();
  },
  CLEAR_USER_DEPENDENCY_FORM_DATA(state) {
    state.userDependencyFormData = {
      relationships: "",
      banks: "",
      religions: "",
      blood_types: "",
      nationalities: "",
      marital_status: "",
      genders: "",
      departments: "",
      units: "",
      document_types: "",
      occupations: ""
    };
  },

  //ROLE DEPENDENCY
  UPDATE_D_ROLE(state, value) {
    state.dependencies.role = value;
  }
};
const actions = {
  async create({ commit, state }, instance) {
    try {
      commit("UPDATE_IS_LOADING", true);

      new FlexValidators(state.formData).check({
        firstname: "required|notNull",
        middlename: "required|notNull",
        lastname: "required|notNull",
        role: "required|notNull",
        email: "required|notNull|email|emailExtension"
      });

      const { firstname, middlename, lastname, role, email } = state.formData;
      const id = null;

      let user = new User(firstname, middlename, lastname, role, email, id);
      await user.save();

      snackbar("success", "user created successfully");
      commit("CLEAR_FORM_DATA");
      instance.close();
      commit("UPDATE_IS_LOADING", false);
    } catch (err) {
      snackbar("warning", err.message);
      commit("UPDATE_IS_LOADING", false);
    }
  },

  async fetch({ commit, state }, type) {
    if (state.datas.length < 1) {
      commit("UPDATE_SKELETON", true);
    }
    let unsubscribe = new User().fetch(type, (datas, err) => {
      if (err) {
        snackbar("warning", err.message);
        commit("UPDATE_SKELETON", false);
        return;
      }
      commit("UPDATE_DATA", datas);
      commit("UPDATE_SKELETON", false);
    });

    commit("UPDATE_UNSUBSCRIBE", { type: "fetch", value: unsubscribe });
  },

  async search({ commit, dispatch, state }, value) {
    if (value.length < 1) {
      dispatch("fetch", "initial");
      return;
    }

    User.search(value)
      .then(datas => {
        commit("UPDATE_DATA", datas);
      })
      .catch(err => {
        snackbar("warning", err.message);
      });
  },

  async delete({ commit, state }, id) {
    let x = await confirm(
      "Confirm",
      "Would you like to delete the selected user?"
    );
    x.onOk(() => {
      User.deleteById(id)
        .then()
        .catch(err => {
          snackbar("warning", err.message);
        });
    });
  },

  async update({ commit, state }, instance) {
    try {
      commit("UPDATE_IS_LOADING", true);

      const data = state.formData;
      data.id = state.id;

      new FlexValidators(data).check({
        firstname: "required|notNull",
        middlename: "required|notNull",
        lastname: "required|notNull",
        role: "required|notNull",
        email: "required|notNull|email|emailExtension",
        id: "required|notNull"
      });

      const { firstname, middlename, lastname, role, email, id } = data;
      let user = new User(firstname, middlename, lastname, role, email, id);
      await user.save();

      snackbar("success", "user updated successfully");
      commit("CLEAR_FORM_DATA");
      commit("UPDATE_IS_LOADING", false);
      instance.close();
    } catch (err) {
      snackbar("warning", err.message);
      commit("UPDATE_IS_LOADING", false);
    }
  },

  //DEPENDENCY
  async fetchUserDependency({ commit, state }) {
    let unsubscribe = await User.fetchUserDependency((user, err) => {
      if (err) {
        snackbar("warning", err.message);
        return;
      }
      commit("UPDATE_D_USER", user);
      commit("UPDATE_EDIT_USER_DEPENDENCY_FORM_DATA", user);
    });
    commit("UPDATE_UNSUBSCRIBE", {
      type: "fetchUserDependency",
      value: unsubscribe
    });
  },

  async fetchRoleDependency({ commit, state }) {
    try {
      await User.fetchRoleDependency(role => {
        commit("UPDATE_D_ROLE", role);
      });
    } catch (err) {
      snackbar("warning", err.message);
    }
  },

  async updateUserDependency({ commit, state }, instance) {
    let data = state.userDependencyFormData;
    data.id = "users";
    try {
      commit("UPDATE_IS_LOADING", true);

      new FlexValidators(data).check({
        religions: "required|notNull",
        banks: "required|notNull",
        relationships: "required|notNull",
        blood_types: "required|notNull",
        nationalities: "required|notNull",
        marital_status: "required|notNull",
        genders: "required|notNull",
        document_types: "required|notNull",
        id: "required|notNull"
      });

      await User.updateUserDependency(data);

      snackbar("success", "item updated successfully");
      commit("CLEAR_USER_DEPENDENCY_FORM_DATA");
      commit("UPDATE_IS_LOADING", false);
      instance.close();
    } catch (err) {
      snackbar("warning", err.message);
      commit("UPDATE_IS_LOADING", false);
    }
  },

  async clearAll({ commit, state }, instance) {
    commit("CLEAR_FORM_DATA");
    commit("CLEAR_USER_DEPENDENCY_FORM_DATA");
    commit("UPDATE_DATA", []);
    commit("UPDATE_IS_LOADING", false);
    commit("UPDATE_D_USER", {});
    commit("UPDATE_D_ROLE", {});
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
