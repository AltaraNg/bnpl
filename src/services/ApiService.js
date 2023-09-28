import axios from "axios";
import { handleError } from "../utilities/GlobalFunctions";
import store from "../store";
export class Apiservice {
    constructor() {
        const userdata = JSON.parse(localStorage.getItem("vuex"));
        this.token = userdata?.result?.token;
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
            handleError(error?.response?.data?.message);
        }
    }

    async post(url, data, isFormData, binary, allowLoader = true) {
        if (allowLoader) {
            store.dispatch("loader/show", { root: true });
        }
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
        if (binary) {
            this.setRequestHeaders({ "Content-Type": "text/html; charset=UTF-8" });
        }

        try {
            let result = await this.api_connector.post(url, postData, this.requestConfig);
            this.resetRequestConfig();
            store.dispatch("loader/hide", { root: true });
            return result.data;
        } catch (error) {
            store.dispatch("loader/hide", { root: true });
            handleError(error.response.data.message);
            this.resetRequestConfig();
        }
    }

    async ArrayFormData(url, data) {
        let documents = {};
        store.dispatch("loader/show", { root: true });
        let newArr = data.map((obj) => {
            delete obj.display;
            delete obj.status;
            return obj; // return the new object without "bar" property
        });
        documents = { documents: newArr };

        this.setRequestHeaders({ "Content-Type": "multipart/form-data" });
        try {
            let result = await this.api_connector.post(url, documents, this.requestConfig);
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
    async getWithoutLoader(url) {
        try {
            let result = await this.api_connector.get(url, this.requestConfig);
            this.resetRequestConfig();
            return result;
        } catch (error) {
            handleError(error?.response?.data?.message);
        }
    }
}
