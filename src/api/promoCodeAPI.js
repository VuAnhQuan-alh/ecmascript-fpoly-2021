import { axiosClient } from "./axiosClient.js";

const PromoCode = {
  getCode() {
    const url = `/promo-code`;
    return axiosClient.get(url);
  },
  getMoney(id) {
    const url = `/promo-code/${id}`;
    return axiosClient.get(url);
  }
}

export default PromoCode;