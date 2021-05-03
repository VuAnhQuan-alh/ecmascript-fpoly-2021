import CategoryAPI from "./../api/categoryAPI.js";
import { $, parseRequestUrl } from "./../utils.js";
import ProductAPI from "./../api/productAPI.js";
import HeaderHome from "./../components/Header.js";

const ShopPage = {
  async render() {
    window.scrollTo(0, 10);
    const { data: categories } = await CategoryAPI.getCategories();
    const { data: objects } = await CategoryAPI.getObjects();
    const { less, id } = parseRequestUrl();
    const { data: productAll } = await ProductAPI.getLimit();
    const { data: productCate } = await ProductAPI.getWithCate(id);
    const { data: productObj } = await ProductAPI.getWithObj(id, 1, 15);
    const products = (obj) => (id === undefined) ? productAll : (less === "object") ? productObj : obj;
    return /*html*/`
      <section id="Shop-page" class="">
        <div class="w-full h-40 bg-gray-700 px-10 text-2xl text-red-400 font-bold py-6">
          <i class="fas fa-hand-point-right animate-bounce mr-2 text-gray-100"></i>"Chooses it, buy it quickly"
        </div>
        <div class="-mt-20 mx-10 flex">
          <div style="width: 370px;" class="bg-gray-50 rounded-lg p-8">
            <a href="/#/shop" class="text-xl font-bold text-gray-700 hover:text-red-400">Categories All</a>
            <div class="my-5">
              ${categories.map(cate => `
                <a href="/#/shop/category/${cate.id}">
                  <div class="flex justify-between items-center mb-2 group cursor-pointer transition delay-150 duration-700">
                    <div class="text-md text-gray-600 group-hover:text-red-400">${cate.name}</div>
                    <div class="w-8 h-8 rounded-full flex justify-center items-center bg-gray-100 text-gray-600 group-hover:bg-red-100 group-hover:text-red-400">
                      <i class="fas fa-angle-right"></i>
                    </div>
                  </div>
                </a>
              `).join("")}
              ${objects.map(obj => `
                <a href="/#/shop/object/${obj.id}">
                  <div class="flex justify-between items-center mb-2 group cursor-pointer transition delay-150 duration-700">
                    <div class="text-md text-gray-600 group-hover:text-red-400">${obj.name}</div>
                    <div class="w-8 h-8 rounded-full flex justify-center items-center bg-gray-100 text-gray-600 group-hover:bg-red-100 group-hover:text-red-400">
                      <i class="fas fa-angle-right"></i>
                    </div>
                  </div>
                </a>
              `).join("")}
            </div>
          </div>
          <div class="flex-1 max-w-3xl mx-auto">
            <div class="flex justify-between items-center my-4">
              <div class="text-gray-200 text-sm">
                Sort by:
                <select id="" class="py-2 px-3 text-gray-600 rounded-md focus:outline-none border-2 border-transparent focus:border-red-300 mx-2 bg-gray-100">
                  <option value="0">Popularity</option>
                  <option value="1">Low - Hight Price</option>
                  <option value="2">Hight - Low Price</option>
                  <option value="3">Average Rating</option>
                  <option value="4">A - Z Order</option>
                  <option value="5">Z - A Order</option>
                </select>
                of 287 products
              </div>
              <div class="text-gray-400 text-2xl flex items-center">
                <i class="fas fa-chevron-left hover:cursor-pointer"></i>
                <span class="text-gray-100 px-2 text-lg">1 / 5</span>
                <i class="fas fa-chevron-right hover:cursor-pointer"></i>
              </div>
              <div class="flex justify-between items-center">
                <div class="w-10 h-10 text-gray-600 bg-gray-100 rounded flex justify-center items-center cursor-pointer">
                  <i class="fas fa-th-large"></i>
                </div>
                <div class="w-10 h-10 text-gray-200 rounded flex justify-center items-center ml-2 cursor-pointer">
                  <i class="fas fa-list-ul"></i>
                </div>
              </div>
            </div>

            <!-- List products -->

            <div class="grid grid-cols-3 py-10">
              ${products(productCate).map((product, index) => `
                <div class="w-56 flex flex-col items-end mb-8">
                  <div class="relative">
                    <div class="absolute bottom-0 left-0 flex justify-between w-full">
                      <a href="/#/shop/product/${product.id}" class="w-8 h-8 flex items-center justify-center text-sm bg-gray-100 text-gray-400 rounded-tr-md hover:text-gray-500 hover:bg-gray-200">
                        <i class="far fa-eye py-3"></i>
                      </a>
                      <button id="btn-to-cart" data-id="${product.id}" class="w-8 h-8 flex items-center justify-center text-sm focus:outline-none bg-red-300 rounded-tl-md text-gray-100 hover:bg-red-500">
                        <i class="fas fa-cart-plus py-3"></i>
                      </button>
                    </div>
                    <button class="absolute top-0 right-0 w-10 h-10 bg-gray-10 flex justify-center items-center focus:outline-none rounded-full hover:bg-gray-200 group">
                      <i class="far fa-heart text-gray-400 group-hover:text-red-400" title="wishlist"></i>
                    </button>
                    <a href="/#/shop/product/${product.id}" class="my-1"><img src="${product.image}" alt="" class="w-56 h-56"></a>
                  </div>
                  <div class="w-full flex flex-col mt-2">
                    <a href="#" class="text-xs text-gray-400 hover:text-gray-500">${product.title}</a>
                    <a href="/#/shop/product/${product.id}" class="mb-3 text-md font-medium text-gray-700 hover:text-red-400">${product.name}</a>
                    <div class="flex justify-between items-center cursor-default">
                      ${product.status ? '<span class="text-md font-medium text-blue-600 font-mono">$' + product.price + '</span>' : '<span class="text-md text-gray-400">Out in stock</span>'}
                      <span class="text-yellow-600 text-opacity-0.75 text-sm">
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star-half-alt"></i>
                      </span>
                    </div>
                  </div>
                </div>
                ${((index + 1) == 6) || (index + 1) % 21 == 0 ? `
                  </div>
                    <div class="my-10 flex justify-between bg-gray-50 rounded-lg">
                      <div class="my-10 ml-10 text-gray-600">
                        <div class="font-light text-xl">Converse All Star</div>
                        <div class="font-bold text-2xl mt-2 mb-3">Make Your Day Comfortable</div>
                        <button class="px-3 py-2 bg-red-400 text-sm text-gray-50 rounded shadow-xl">Shop Now</button>
                      </div>
                      <img class="rounded-r-lg" src="./src/public/image/shop/banner.jpg" alt="Banner">
                    </div>
                  <div class="grid grid-cols-3 py-10">
                ` : ``}
              `).join("")}
            </div>

            <!-- End list products -->

            <div class="flex justify-between items-center mb-10 border-t-2 pt-8">
              <div class="text-gray-600 flex items-center cursor-pointer">
                <i class="fas fa-chevron-left mr-2 text-xl"></i>
                Prev
              </div>
              <div class="flex justify-between items-center">
                <button class="w-8 h-8 rounded bg-red-400 text-lg text-gray-100 flex justify-center items-center mr-1 shadow-xl">1</button>
                <button class="w-8 h-8 rounded hover:bg-gray-100 text-lg text-gray-600 flex justify-center items-center mx-1 shadow-xl">2</button>
                <button class="w-8 h-8 rounded hover:bg-gray-100 text-lg text-gray-600 flex justify-center items-center mx-1 shadow-xl">3</button>
                <button class="w-8 h-8 rounded hover:bg-gray-100 text-lg text-gray-600 flex justify-center items-center mx-1 shadow-xl">4</button>
                <button class="w-8 h-8 rounded hover:bg-gray-100 text-lg text-gray-600 flex justify-center items-center ml-1 shadow-xl">5</button>
              </div>
              <div class="text-gray-600 flex items-center cursor-pointer">
                Next
                <i class="fas fa-chevron-right ml-2 text-xl"></i>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  },
  afterRender() {
    HeaderHome.reRenderCart();
    addToCart();
    function addToCart () {
      $("#btn-to-cart").forEach(item => {
        item.addEventListener("click", async () => {
          let cart = localStorage.getItem('cart');
          cart = cart === null ? [] : JSON.parse(cart);
          const existed = cart.map(object => object.id).indexOf(parseInt(item.dataset.id));
          if (existed === -1) {
            const { data: product } = await ProductAPI.getItem(item.dataset.id);
            product.quantity = 1;
            cart.push(product);
          } else {
            cart[existed].quantity += 1;
          }
          localStorage.setItem('cart', JSON.stringify(cart));
          HeaderHome.reRenderCart();
        });
      });
    }
  }
}

export default ShopPage;