import ProductAPI from "./../api/productAPI.js";
import HeaderHome from "./../components/Header.js";
import { $, parseRequestUrl } from "./../utils.js";

const ProductDetailPage = {
  async render() {
    window.scrollTo(0, 40);
    const { id } = parseRequestUrl();
    const { data: product } = await ProductAPI.getItem(id);
    return /*html*/`
      <section id="product-detail" class="">
        <div class="w-full h-40 bg-gray-700 px-10 text-2xl text-red-400 font-bold py-6">
          <i class="fas fa-hand-point-right animate-bounce mr-2 text-gray-100"></i>"Buy it, buy it quickly"
        </div>
        <div class="-mt-20 mx-10 py-10 px-14 flex justify-around rounded-t-xl bg-gray-100">
          <div class="flex-1">
            <img src="${product.image}" alt="">
          </div>
          <div class="px-10 max-w-lg mx-auto w-full">
            <h2 class="text-2xl font-bold text-red-400">${product.name}</h2>
            <div class="flex justify-between my-2 items-center">
              <div class="">
                <span class="text-sm text-yellow-500">
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star-half-alt"></i>
                </span>
                <span class="text-md text-gray-500 ml-2">74 Reviews</span>
              </div>
              <button class="w-10 h-10 rounded-full bg-gray-200 flex justify-center items-center focus:outline-none group">
                <i class="far fa-heart text-gray-400 group-hover:text-red-400"></i>
              </button>
            </div>
            <div class="${product.status ? 'relative' : ''}">
              <span class="text-3xl font-mono text-blue-600">$${product.price}</span>
              ${product.status ? '<span class="absolute top-0 left-32 py-0.5 px-1.5 text-xs text-gray-100 font-medium bg-pink-600 rounded shadow-2xl">Hot</span>' : ''}
            </div>
            <div class="flex justify-between items-center my-2">
              <div class="">
                <span class="text-gray-700 font-medium">Color:</span>
                <span class="text-gray-400 text-sm ml-1">Red/Dark/White</span>
              </div>
              <div class="py-2 px-3 ${product.status ? 'bg-green-400' : 'bg-yellow-400'} text-sm font-medium text-gray-200 relative select-none">
                <span class="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full ${product.status ? 'bg-green-400' : 'bg-yellow-400'} animate-ping"></span>
                ${product.status ? '<i class="fas fa-shield-alt mr-1"></i>Product available' : '<i class="fas fa-shield-virus mr-1"></i>Product out of stock'}
              </div>
            </div>
            <div class="my-3">
              <div class="flex justify-between items-center">
                <div class="text-gray-700 font-medium">Size:</div>
                <div class="text-gray-400 flex justify-end items-end hover:text-red-400 cursor-pointer">
                  <i class="fas fa-ruler-horizontal text-lg"></i>
                  <div class="text-sm ml-2">Size guide</div>
                </div>
              </div>
              <select class="w-full mt-2 py-3 px-4 text-gray-600 bg-gray-200 rounded-md focus:outline-none border-2 border-transparent focus:border-red-200">
                <option value="0" class="">Select size</option>
                <option value="1" class="">XS</option>
                <option value="2" class="">S</option>
                <option value="3" class="">M</option>
                <option value="4" class="">L</option>
                <option value="5" class="">XL</option>
              </select>
            </div>
            <div class="flex my-3">
              <input type="number" value="1" min="1" max="40" id="" class="w-20 py-2 pl-4 pr-2 text-gray-600 bg-gray-200 rounded-md focus:outline-none border-2 border-transparent focus:border-red-200">
              <button id="btn-to-cart" data-id="${product.id}" class="flex-1 ml-4 text-gray-100 bg-red-400 rounded-md focus:outline-none shadow-2xl hover:bg-red-500 hover:shadow-none">
                <i class="fas fa-cart-plus mr-1"></i>
                Add to cart
              </button>
            </div>
            <ul class="my-3 border-2 border-gray-200 rounded-md text-gray-600 font-bold divide-y divide-gray-200">
              <li class="py-3 px-4 divide-y divide-gray-200">
                <div class="flex justify-between cursor-pointer">
                  <div class="">
                    <i class="fas fa-info-circle text-gray-400 mr-2"></i>
                    Product info
                  </div>
                  <i class="fas fa-chevron-down text-gray-500"></i>
                </div>
                <div class="text-gray-600 font-light text-sm mt-2">
                  <div class="font-medium">Composition</div>
                  <ul class="list-disc ml-6">
                    <li>Elastic rib: Cotton 95%, Elastance 5%</li>
                    <li>Lining: Cotton 100%</li>
                    <li>Cotton 80%, Polyester 20%</li>
                  </ul>
                  <div class="font-medium">Art. No.</div>
                  <ul class="list-disc ml-6">
                    <li>183260098</li>
                  </ul>
                </div>
              </li>
              <li class="flex justify-between py-3 px-4 cursor-pointer">
                <div class="">
                  <i class="fas fa-shipping-fast text-gray-400 mr-2"></i>
                  Shipping options
                </div>
                <i class="fas fa-chevron-down text-gray-500"></i>
              </li>
              <li class="flex justify-between py-3 px-4 cursor-pointer">
                <div class="">
                  <i class="fas fa-map-marker-alt text-gray-400 mr-2"></i>
                  Find in local store
                </div>
                <i class="fas fa-chevron-down text-gray-500"></i>
              </li>
            </ul>
            <div class="mt-4">
              <span class="text-gray-600 font-medium">Share:</span>
              <button class="mx-3 text-blue-400 px-3 py-1 rounded hover:bg-blue-400 hover:text-gray-100 transition delay-150 duration-200">
                <i class="fab fa-twitter mr-1"></i>
                Twitter
              </button>
              <button class="text-purple-400 px-3 py-1 rounded hover:bg-purple-400 hover:text-gray-100 transition delay-150 duration-200">
                <i class="fab fa-instagram mr-1"></i>
                Instagram
              </button>
              <button class="mr-3 text-indigo-700 px-3 py-1 rounded hover:bg-indigo-700 hover:text-gray-100 transition delay-150 duration-200">
                <i class="fab fa-facebook-f mr-1"></i>
                Facebook
              </button>
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
      $("#btn-to-cart").addEventListener("click", async function() {
        let cart = localStorage.getItem('cart');
        cart = cart === null ? [] : JSON.parse(cart);
        const existed = cart.map(object => object.id).indexOf(parseInt(this.dataset.id));
        if (existed === -1) {
          const { data: product } = await ProductAPI.getItem(this.dataset.id);
          product.quantity = 1;
          cart.push(product);
        } else {
          cart[existed].quantity += 1;
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        HeaderHome.reRenderCart();
      });
    }
  }
}
export default ProductDetailPage;