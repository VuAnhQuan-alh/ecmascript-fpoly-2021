import { axiosClient } from "./axiosClient.js";

const OrderAPI = {
  getAllOrders() {
    const url = `/orders`;
    return axiosClient.get(url);
  },
  getOrder(id) {
    const url = `/orders/${id}`;
    return axiosClient.get(url);
  },
  updateOrder(id, data) {
    const url = `/orders/${id}`;
    return axiosClient.put(url, data);
  },
  addOrder(data) {
    const url = `/orders`;
    return axiosClient.post(url, data);
  },
  deleteOrder(id) {
    const url = `/orders/${id}`;
    return axiosClient.delete(url);
  }
}

export default OrderAPI;