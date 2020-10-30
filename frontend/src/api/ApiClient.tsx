import axios from "axios";

class ApiClient {
  basepath = 'http://localhost:8000/api/'

  get(route: string, opts?: {[key: string]: any}) {
    return axios.get(`${this.basepath}${route}`, opts)
  }

  put(route: string, item: any) {
    return axios.put(`${this.basepath}${route}`, item)
  }

  post(route: string, item: any) {
    return axios.post(`${this.basepath}${route}`, item)
  }

  delete(route: string) {
    return axios.delete(`${this.basepath}${route}`)
  }
}

export const apiClient = new ApiClient()
