import { axiosClient } from "./axiosClient.js";

const ProductAPI = {
  getSearch(search) {
    const url = `/products/?name_like=${search}`;
    return axiosClient.get(url);
  },
  getLimit(page = 1, limit = 15) {
    const url = `/products?_page=${page}&_limit=${limit}`;
    return axiosClient.get(url);
  },
  getAll() {
    const url = `/products`;
    return axiosClient.get(url);
  },
  getWithObj(objId, page = 1, limit = 6) {
    const url = `/products?objectId=${objId}&_page=${page}&_limit=${limit}`;
    return axiosClient.get(url);
  },
  getWithObjAll(objId) {
    const url = `/products?objectId=${objId}`;
    return axiosClient.get(url);
  },
  getWithCate(cateId, page = 1, limit = 15) {
    const url = `/products?categoryId=${cateId}&_page=${page}&_limit=${limit}`;
    return axiosClient.get(url);
  },
  getWithCateAll(cateId) {
    const url = `/products?categoryId=${cateId}`;
    return axiosClient.get(url);
  },
  getItem(id) {
    const url = `/products/${id}`;
    return axiosClient.get(url);
  },
  addItem(data) {
    const url = `/products`;
    return axiosClient.post(url, data);
  },
  updateItem(data, id) {
    const url = `/products/${id}`;
    return axiosClient.put(url, data);
  },
  deleteItem(id) {
    const url = `/products/${id}`;
    return axiosClient.delete(url);
  },
  deleteAllItem(array_id) {
    array_id.forEach(id => axiosClient.delete(`/products/${id}`));
  }
}

export default ProductAPI;