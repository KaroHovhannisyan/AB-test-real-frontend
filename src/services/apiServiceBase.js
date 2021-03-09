/* eslint-disable max-classes-per-file */
import axios from "axios";
import { API_URL } from "../constants/configs";

const errorTypes = {
  SERVER_ERROR: "SERVER_ERROR",
  NETWORK_ERROR: "NETWORK_ERROR",
  CONNECTION_ABORTED: "CONNECTION_ABORTED",
  CONNECTION_ERROR: "CONNECTION_ERROR",
  CLIENT_ERROR: "CLIENT_ERROR",
  REQUEST_CANCELLED: "REQUEST_CANCELLED",
};

const DEFAULT_TIMEOUT = 20000;

class ServiceResponse {
  constructor() {
    this.errors = [];
    this.payload = null;
  }

  get hasError() {
    return this.errors.length > 0;
  }

  addError(message) {
    this.errors.push(message);
  }
}

class ApiServiceBase {
  constructor() {
    this.apiUrl = API_URL;
  }

  async get(url, config = {}) {
    try {
      const response = await axios.get(url, { timeout: DEFAULT_TIMEOUT, ...config });
      return this.adaptResult(response.data);
    } catch (error) {
      return this.adaptError(error);
    }
  }

  async post(url, data, config = {}) {
    try {
      const response = await axios.post(url, data, { timeout: DEFAULT_TIMEOUT, ...config });
      return this.adaptResult(response.data);
    } catch (error) {
      return this.adaptError(error);
    }
  }

  async delete(url, config = {}) {
    try {
      const response = await axios.delete(url, { timeout: DEFAULT_TIMEOUT, ...config });
      return this.adaptResult(response.data);
    } catch (error) {
      return this.adaptError(error);
    }
  }

  adaptResult(result) {
    const response = new ServiceResponse();

    if (result.errors && result.errors.length > 0) {
      return this.adaptApiError(result.errors);
    }

    if (result && Array.isArray(result) && result.some((r) => r.errors)) {
      const errors = result.filter((r) => r.errors).reduce((acc, e) => acc.concat(e.errors), []);
      return this.adaptApiError(errors);
    }

    response.payload = result;
    return response;
  }

  adaptError(error) {
    const response = new ServiceResponse();
    response.statusCode = error.response?.data?.statusCode;
    if (axios.isCancel(error)) {
      response.addError(errorTypes.REQUEST_CANCELLED);
    }

    if (error.response) {
      if (error.response?.data?.statusCode && error.response?.data?.message) {
        response.addError(error.response?.data?.message);
      } else if (error.response.data && error.response.data.errors) {
        error.response.data.errors.forEach((e) => response.addError(e.message));
      } else if (error.code === "ECONNABORTED") {
        response.addError(errorTypes.CONNECTION_ABORTED);
      } else {
        switch (error.response.status) {
          case 404:
          case 422:
            response.addError(errorTypes.CLIENT_ERROR);
            break;
          case 403:
            response.addError(error.response?.data?.message);
            break;
          case 500:
            response.addError(errorTypes.SERVER_ERROR);
            break;
          default:
            response.addError(errorTypes.CONNECTION_ERROR);
        }
      }
    } else if (error.message === "Network Error") {
      response.addError(errorTypes.NETWORK_ERROR);
    }

    return response;
  }

  adaptApiError(errors) {
    const response = new ServiceResponse();
    errors.forEach((error) => {
      response.addError(error.message);
    });
    return response;
  }
}

export default ApiServiceBase;
