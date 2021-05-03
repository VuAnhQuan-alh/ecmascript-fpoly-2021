import ProductAPI from "./../../api/productAPI.js";
import { $ } from "./../../utils.js";

const ProductAd = {
  render() {
    return /*html*/`
      <div class="bg-gray-700">
        <div class="w-full h-48 px-10 pb-20 text-gray-100 max-w-5xl flex justify-between items-center">
          <div class="text-2xl font-medium">
            <i class="fas fa-crown mr-2"></i>
            Products
          </div>
          <div class="relative">
            <i class="fas fa-search absolute top-3 left-4 text-xl"></i>
            <input id="q-search" type="text" class="bg-gray-500 py-2.5 pl-12 pr-6 w-96 rounded-full focus:outline-none" placeholder="Search for a product">

            <div id="list-search" class="opacity-0 absolute top-12 left-0 overflow-y-auto max-h-48 w-96 bg-gray-100 text-gray-600 py-2.5 px-2 rounded"></div>

            </div>
          <div class="text-4xl">
            <a href="/#/admin/product/creat" class="focus:outline-none"><i class="fas fa-plus-square mr-6 cursor-pointer hover:text-green-400" title="Add"></i></a>
            <a href="/#/admin/product/list" class="focus:outline-none"><i class="fas fa-th-list cursor-pointer hover:text-yellow-300" title="List"></i></a>
          </div>
        </div>
      </div>
      <div class="-mt-20 max-w-5xl">
        <div class="bg-gray-400 mx-10 px-1 pt-1 rounded-t-2xl ">
          <div id="action-admin" class="bg-black bg-opacity-70 rounded-t-2xl shadow-2xl pt-6"></div>
        </div>
      </div>
    `
  },
  afterRender() {
    $("#q-search").onkeyup = async () => {
      if ($("#q-search").value.length !== 0) {
        $("#list-search").classList.remove("opacity-0");
        const { data: product_search } = await ProductAPI.getSearch($("#q-search").value);
        const result = await product_search.map(item => 
          `<a href="/#/admin/product/detail/${item.id}" class="flex justify-between items-center bg-gray-200 hover:bg-gray-300 px-2.5 py-1.5 rounded cursor-pointer">
            <img src="${item.image}" class="w-10 h-10" alt="">
            <div class="font-medium">${item.name}</div>
            <div class="text-red-500">$ ${item.price}</div>
          </a>`
        ).join("");
        $("#list-search").innerHTML = result;
      } else {
        if (!$("#list-search").classList.contains("opacity-0")) $("#list-search").classList.add("opacity-0");
      }
    };
    $("#list-search").addEventListener("blur", function() {
      console.log("blur");
      if (!$("#list-search").classList.contains("opacity-0")) $("#list-search").classList.add("opacity-0");
    });
  }
}

export default ProductAd;