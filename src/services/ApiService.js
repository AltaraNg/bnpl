import axios from "axios";
import { handleError } from "../utilities/GlobalFunctions";
import store from "../store";
export class Apiservice {
  constructor() {
    const userdata = JSON.parse(localStorage.getItem("vuex"));
    this.token = userdata?.result?.token
    this.baseUrl = process.env.VUE_APP_API_URL;
    this.requestConfig = {};
    this.api_connector = axios.create({
        baseURL: this.baseUrl,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.token}`,
        },
    });
  }

  setRequestHeaders(header) {
    if (this?.requestConfig.headers) {
      this.requestConfig.headers = { ...this.requestConfig.headers, ...header };
    } else {
      this.requestConfig.headers = header;
    }

    return this;
  }
  async get(url) {
    store.dispatch("loader/show", { root: true });
    try {
      let result = await this.api_connector.get(url, this.requestConfig);
      this.resetRequestConfig();
      store.dispatch("loader/hide", { root: true });
      return result;
    } catch (error) {
      store.dispatch("loader/hide", { root: true });
      handleError(error.response.data.message);
    }
  }

  async post(url, data, isFormData) {
    store.dispatch("loader/show", { root: true });
    // handle content type application/json
    let postData = data;
    if (isFormData) {
      //configure header to be Content-Type = 'multipart/form-data'
      postData = new FormData();
      for (const key in data) {
        postData.append(key, data[key]);
      }

      this.setRequestHeaders({ "Content-Type": "multipart/form-data" });
    }

    try {
      let result = await this.api_connector.post(
        url,
        postData,
        this.requestConfig
      );
      this.resetRequestConfig();
      store.dispatch("loader/hide", { root: true });
      return result.data;
    } catch (error) {
      store.dispatch("loader/hide", { root: true });
       handleError(error.response.data.message);
      this.resetRequestConfig();
    }
  }

  changeBaseURL(url) {
    this.requestConfig.baseURL = url;
    return this;
  }

  resetRequestConfig() {
    this.requestConfig = {};
  }
}
