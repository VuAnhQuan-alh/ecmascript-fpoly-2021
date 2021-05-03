import { axiosClient } from "./axiosClient.js";

const CategoryAPI = {
  getCategory(id) {
    const url = `/categories/${id}`;
    return axiosClient.get(url);
  },
  getCategories() {
    const url = `/categories`;
    return axiosClient.get(url);
  },
  getObjects() {
    const url = `/objects`;
    return axiosClient.get(url);
  },
  addCategory(data) {
    const url = `/categories`;
    return axiosClient.post(url, data);
  },
  updateCategory(data, id) {
    const url = `/categories/${id}`;
    return axiosClient.put(url, data);
  },
  deleteCategory(id) {
    const url = `categories/${id}`;
    return axiosClient.delete(url);
  }
}

export default CategoryAPI;