const FooterHome = {
  render() {
    return `
      <section id="widget" class="bg-gray-600 px-10">
        <div class="flex justify-between">
          <div class="py-10">
            <h4 class="text-lg font-medium text-gray-200">Stay informed</h4>
            <div class="relative mt-5 mb-2">
              <i class="far fa-envelope text-lg text-gray-400 z-10 absolute top-3 left-4"></i>
              <input type="text" class="w-80 px-4 pl-10 py-2 rounded-l border-2 border-transparent focus:outline-none focus:border-red-300" placeholder="Your email">
              <button class="py-2.5 px-8 text-gray-200 rounded-r z-10 absolute top-0 right-68 bg-red-400 focus:outline-none">Subscribe*</button>
            </div>
            <p class="text-gray-400 text-xs">*Subscribe to our newsletter to receive early discount offers, updates and new products info.</p>
          </div>
          <div class="py-10">
            <h3 class="text-lg font-medium text-gray-200">Download our app</h3>
            <div class="flex mt-5">
              <div class="bg-gray-700 flex items-center rounded-lg py-2 w-44 mr-4">
                <i class="fab fa-apple text-3xl text-gray-200 mx-4"></i>
                <div class="flex flex-col">
                  <span class="text-gray-400 text-xs">Download on the</span>
                  <span class="text-gray-200 text-lg font-medium">App Store</span>
                </div>
              </div>
              <div class="bg-gray-700 flex items-center rounded-lg py-2 w-44 ml-4">
                <i class="fab fa-google-play text-3xl text-gray-200 mx-4"></i>
                <div class="flex flex-col">
                  <span class="text-gray-400 text-xs">Download on the</span>
                  <span class="text-gray-200 text-lg font-medium">Google Play</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="darker" class="bg-gray-700 px-10 divide-y divide-gray-500">
        <div class="flex justify-between py-10">
          <div class="flex items-center">
            <i class="fas fa-rocket text-4xl text-red-400"></i>
            <div class="ml-4 flex flex-col">
              <span class="text-gray-200 text-lg font-medium">Fast and free delivery</span>
              <span class="text-gray-400 text-xs">Free delivery for all orders over $200</span>
            </div>
          </div>
          <div class="flex items-center">
            <i class="fab fa-btc text-4xl text-red-400"></i>
            <div class="ml-4 flex flex-col">
              <span class="text-gray-200 text-lg font-medium">Money back guarantee</span>
              <span class="text-gray-400 text-xs">We return money within 30 days</span>
            </div>
          </div>
          <div class="flex items-center">
            <i class="fas fa-headset text-4xl text-red-400"></i>
            <div class="ml-4 flex flex-col">
              <span class="text-gray-200 text-lg font-medium">24/7 customer support</span>
              <span class="text-gray-400 text-xs">Friendly 24/7 customer support</span>
            </div>
          </div>
          <div class="flex items-center">
            <i class="fas fa-credit-card text-4xl text-red-400"></i>
            <div class="ml-4 flex flex-col">
              <span class="text-gray-200 text-lg font-medium">Secure online payment</span>
              <span class="text-gray-400 text-xs">We possess SSL / Secure certificate</span>
            </div>
          </div>
        </div>
        <div class="py-12 flex justify-between">
          <div class="">
            <div class="flex items-center">
              <img class="w-36" src="./src/public/image/home/footer-logo-light.png" alt="">
              <div class="ml-3 py-1 px-2 flex items-center rounded border-2 border-gray-500">
                <img class="w-6" src="./src/public/image/flag/en.png" alt="">
                <span class="ml-3 text-sm text-gray-300">Eng / $</span>
              </div>
            </div>
            <ul class="flex mt-8 text-base text-gray-400">
              <li class="mr-3 cursor-pointer hover:text-gray-200">Outlets</li>
              <li class="mx-3 cursor-pointer hover:text-gray-200">Affiliates</li>
              <li class="mx-3 cursor-pointer hover:text-gray-200">Support</li>
              <li class="mx-3 cursor-pointer hover:text-gray-200">Privacy</li>
              <li class="ml-3 cursor-pointer hover:text-gray-200">Terms of use</li>
            </ul>
          </div>
          <div class="">
            <div class="flex justify-end mb-8">
              <div class="w-10 h-10 mr-1 rounded-lg bg-gray-600 flex justify-center items-center transition delay-150 duration-300 cursor-pointer hover:bg-gray-300 group">
                <i class="text-lg text-gray-300 fab fa-twitter transition delay-150 duration-300 group-hover:text-blue-400"></i>
              </div>
              <div class="w-10 h-10 mx-1 rounded-lg bg-gray-600 flex justify-center items-center transition delay-150 duration-300 cursor-pointer hover:bg-gray-300 group">
                <i class="text-lg text-gray-300 fab fa-facebook-f transition delay-150 duration-300 group-hover:text-blue-800"></i>
              </div>
              <div class="w-10 h-10 mx-1 rounded-lg bg-gray-600 flex justify-center items-center transition delay-150 duration-300 cursor-pointer hover:bg-gray-300 group">
                <i class="text-lg text-gray-300 fab fa-instagram transition delay-150 duration-300 group-hover:text-yellow-400 ml-30"></i>
              </div>
              <div class="w-10 h-10 mx-1 rounded-lg bg-gray-600 flex justify-center items-center transition delay-150 duration-300 cursor-pointer hover:bg-gray-300 group">
                <i class="text-lg text-gray-300 fab fa-pinterest-p transition delay-150 duration-300 group-hover:text-red-400"></i>
              </div>
              <div class="w-10 h-10 ml-1 rounded-lg bg-gray-600 flex justify-center items-center transition delay-150 duration-300 cursor-pointer hover:bg-gray-300 group">
                <i class="text-lg text-gray-300 fab fa-youtube transition delay-150 duration-300 group-hover:text-red-500"></i>
              </div>
            </div>
            <div class="flex justify-end">
              <img class="w-52" src="./src/public/image/home/cards-alt.png" alt="">
            </div>
          </div>
        </div>
        <div class="py-5 text-sm text-gray-400">
          &copy; All right reserved. Made by DatLT
        </div>
      </section>
    `
  }
}

export default FooterHome;