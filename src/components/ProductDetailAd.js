import ProductAPI from "../api/productAPI.js";
import { parseRequestUrl } from "./../utils.js";

const ProductDetailAd = {
  async render() {
    const { id } = parseRequestUrl();
    const { data: product } = await ProductAPI.getItem(id);
    return /*html*/ `
      <div class="mx-5">
        <div class="h-12 mt-1 border-b border-gray-400">
          <ul class="flex justify-around text-gray-200 text-xl font-medium">
            <li class="border-b-2 border-blue-400 cursor-pointer">Basic Info</li>
            <li class=" cursor-pointer">Product Images</li>
            <li class=" cursor-pointer">Pricing</li>
            <li class=" cursor-pointer">Inventory</li>
            <li class=" cursor-pointer">Shipping</li>
          </ul>
        </div>
        <div class="mt-6 flex px-10">
          <div class="w-80">
            <img src="${product.image}" alt="">
          </div>
          <div class="ml-20">
            <h2 class="text-2xl text-gray-100 font-medium">${product.name}</h2>
            <div class="mt-5 text-3xl text-yellow-400 font-bold font-mono">${product.price} $</div>
          </div>
        </div>
      </div>
    `;
  },
  async afterRender() {
    return ``
  }
};

export default ProductDetailAd;
