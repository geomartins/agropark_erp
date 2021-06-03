import Vue from 'vue'
import axios from 'axios'

// we add it to Vue prototype
// so we can reference it in Vue files as this.$axios
// without the need to import axios or use vue-axios
Vue.prototype.$axios = axios

// can also create an axios instance specifically for the backend API
const api = axios.create({ baseURL: 'http://localhost:5001/agropark-erp/us-central1/default-webApi'})
Vue.prototype.$api = api

export { axios, api }