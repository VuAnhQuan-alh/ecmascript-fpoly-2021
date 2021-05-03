import HeaderHome from "./../components/Header.js";
import ProductAPI from "./../api/productAPI.js";
import { $ } from "./../utils.js";

const Home = {
  async render() {
    try {
      const { data: productWoman } = await ProductAPI.getWithObj(1);
      const { data: productKid } = await ProductAPI.getWithObj(2);
      const { data: productMan } = await ProductAPI.getWithObj(3);
      return /*html*/`
        <section id="hero-slider" style="background-color: rgb(245, 177, 176);" class="">
          <div class="xl:relative max-w-7xl mx-auto">
            <div class="z-10 flex justify-between">
              <button class="absolute top-80 left-10 w-14 h-14 rounded-full bg-white focus:outline-none flex justify-center items-center transition delay-600 duration-300 transform ease-in-out translate-x-3 hover:translate-x-0">
                <i class="fas fa-chevron-left text-xl font-medium text-gray-700 z-10"></i>
              </button>
              <button class="absolute top-80 right-10 w-14 h-14 rounded-full bg-white focus:outline-none flex justify-center items-center transition delay-600 duration-300 transform ease-in-out -translate-x-3 hover:translate-x-0">
                <i class="fas fa-chevron-right text-xl font-medium text-gray-700 z-10"></i>
              </button>
            </div>
            <div class="flex flex-row-reverse overflow-hidden">
              <img class="xl:-mr-56" src="./src/public/image/hero-slider/02.jpg" alt="">
              <div class="z-10 absolute top-48 left-40">
                <h3 class="text-3xl text-gray-100 leading-5 font-sans">Hurry up! Limited time over.</h3>
                <h2 class="mt-10 mb-4 text-5xl font-bold text-gray-50">Women Sportswear Sale</h2>
                <p class="text-xl font-medium text-gray-100">Sneakers, Ked, Sweatshirts, Hoodies & much more...</p>
                <a href="/#/shop">
                  <button class="py-3 px-5 mt-10 rounded text-md bg-red-400 text-gray-100 focus:outline-none">
                    Shop now
                    <i class="fas fa-chevron-right ml-2 text-gray-100"></i>
                  </button>
                </a>
              </div>
            </div>
          </div>
        </section>

        <!-- category -->
        <!-- Women -->
        <section id="category-woman" class="">
          <div class="flex justify-between py-10 px-10">
            <div style="width: 500px;" class="pt-10 px-8 bg-gray-50">
              <div class="">
                <h3 class="text-gray-700 text-3xl font-medium mb-5">For Women</h3>
                <a href="/#/shop/object/1" class="text-red-400 flex items-center">
                  Shop for women
                  <i class="fas fa-chevron-right ml-2 font-thin text-red-400"></i>
                </a>
              </div>
              <div class="mt-16">
                <a href="#" class="">
                  <img src="./src/public/image/categories/cat-lg02.jpg" alt="">
                </a>
              </div>
            </div>
            <div class="flex-1">
              <div class="grid grid-cols-3 py-10">
                ${productWoman.map(product => `
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
                `).join("")}
              </div>
            </div>
          </div>
        </section>
        <!-- Men -->
        <section id="category-man" class="">
          <div class="flex justify-between py-10 px-10">
            <div class="flex-1">
              <div class="grid grid-cols-3">
                ${productMan.map(product => `
                  <div class="w-56 flex flex-col items-end mb-8">
                    <div class="relative">
                      <button class="absolute top-0 right-0 w-10 h-10 bg-gray-10 flex justify-center items-center focus:outline-none rounded-full hover:bg-gray-200 group">
                        <i class="far fa-heart text-gray-400 group-hover:text-red-400" title="wishlist"></i>
                      </button>
                      <a href="/#/shop/product/${product.id}" class="my-1"><img src="${product.image}" alt="" class="w-56 h-56"></a>
                      <div class="absolute bottom-0 left-0 flex justify-between w-full">
                        <a href="/#/shop/product/${product.id}" class="w-8 h-8 flex items-center justify-center text-sm bg-gray-100 text-gray-400 rounded-tr-md hover:text-gray-500 hover:bg-gray-200">
                          <i class="far fa-eye py-3"></i>
                        </a>
                        <button id="btn-to-cart" data-id="${product.id}" class="w-8 h-8 flex items-center justify-center text-sm focus:outline-none bg-red-300 rounded-tl-md text-gray-100 hover:bg-red-500">
                          <i class="fas fa-cart-plus py-3"></i>
                        </button>
                      </div>
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
                `).join("")}
              </div>
            </div>
            <div style="width: 500px;" class="bg-gray-50">
              <div class="flex flex-col items-end">
                <h3 class="text-gray-700 text-3xl font-medium mb-5">For Men</h3>
                <a href="/#/shop/object/3" class="text-red-400 flex items-center">
                  Shop for Men
                  <i class="fas fa-chevron-right ml-2 font-thin text-red-400"></i>
                </a>
              </div>
              <div class="mt-16">
                <a href="#" class="">
                  <img src="./src/public/image/categories/cat-lg01.jpg" alt="">
                </a>
              </div>
            </div>
          </div>
        </section>
        <!-- Kids -->
        <section id="category-kid" class="">
          <div class="flex justify-between py-10 px-10">
            <div style="width: 500px;" class="px-8 bg-gray-50">
              <div class="">
                <h3 class="text-gray-700 text-3xl font-medium mb-5">For Kids</h3>
                <a href="/#/shop/object/2" class="text-red-400 flex items-center">
                  Shop for Kids
                  <i class="fas fa-chevron-right ml-2 font-thin text-red-400"></i>
                </a>
              </div>
              <div class="mt-16">
                <a href="#" class="">
                  <img src="./src/public/image/categories/cat-lg03.jpg" alt="">
                </a>
              </div>
            </div>
            <div class="flex-1">
              <div class="grid grid-cols-3">
                ${productKid.map(product => `
                  <div class="w-56 flex flex-col items-end mb-8">
                    <div class="relative">
                      <button class="absolute top-0 right-0 w-10 h-10 bg-gray-10 flex justify-center items-center focus:outline-none rounded-full hover:bg-gray-200 group">
                        <i class="far fa-heart text-gray-400 group-hover:text-red-400" title="wishlist"></i>
                      </button>
                      <a href="/#/shop/product/${product.id}" class="my-1"><img src="${product.image}" alt="" class="w-56 h-56"></a>
                      <div class="absolute bottom-0 left-0 flex justify-between w-full">
                        <a href="/#/shop/product/${product.id}" class="w-8 h-8 flex items-center justify-center text-sm bg-gray-100 text-gray-400 rounded-tr-md hover:text-gray-500 hover:bg-gray-200">
                          <i class="far fa-eye py-3"></i>
                        </a>
                        <button id="btn-to-cart" data-id="${product.id}" class="w-8 h-8 flex items-center justify-center text-sm focus:outline-none bg-red-300 rounded-tl-md text-gray-100 hover:bg-red-500">
                          <i class="fas fa-cart-plus py-3"></i>
                        </button>
                      </div>
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
                `).join("")}
              </div>
            </div>
        </section>
        <section id="blog-instagram">
          <div class="flex">
            <a href="" class="flex-1 flex flex-col items-center bg-red-100 py-10">
              <i class="far fa-edit text-red-400 text-4xl"></i>
              <h3 class="text-gray-600 text-xl font-medium mt-3 mb-2">Read the blog</h3>
              <p class="text-gray-400 text-sm">Latest store, fashion news and trends</p>
            </a>
            <a href="" class="flex-1 flex flex-col items-center bg-gray-100 py-10">
              <i class="fab fa-instagram text-blue-600 text-4xl"></i>
              <h3 class="text-gray-600 text-xl font-medium mt-3 mb-2">Follow on Instagram</h3>
              <p class="text-gray-400 text-sm">@ShopWithAnLuuHung</p>
            </a>
          </div>
        </section>
      `;
    } catch (error) {
      console.log(error);
    }
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

export default Home;