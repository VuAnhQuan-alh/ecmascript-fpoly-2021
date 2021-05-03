const AdminPage = {
  render() {
    return /*html*/`
      <section class="bg-gray-800">
        <div class="flex justify-between max-w-7xl mx-auto">
          <section id="slide-bar" class="w-72 min-h-screen pt-4 bg-gray-800 text-gray-100 shadow-2xl">
            <div class="px-5 flex items-center">
              <a href="/" class="focus:outline-none"><img class="h-8" src="./src/public/image/home/logo-admin.png" alt=""></a>
              <h4 class="ml-4 text-lg text-gray-100 font-thin">Cart</h3>
            </div>
            <div class="mt-10 flex flex-col items-center">
              <h3 class="text-md text-gray-50 font-medium">An Luu Hung</h4>
              <div class="text-sm text-gray-400">quanvaph11537@fpt.edu.vn</div>
              <div class="w-20 mt-4 h-20 rounded-full bg-gray-600"></div>
              <img style="margin-top: -72px;" class="w-16 h-16 rounded-full" src="./src/public/image/users/admin.png" alt="">
            </div>
            <div class="-mt-8 pt-12 bg-gray-600">
              <div class="px-5">
                <a href="/#/admin" class="flex items-center focus:outline-none">
                    <i class="fas fa-home mr-4"></i>
                    Dashboards
                </a>
                <div class="flex items-center justify-between mt-3">
                  <div class="flex items-center">
                    <i class="fas fa-cart-plus mr-4"></i>
                    E-Commerce
                  </div>
                  <i class="fas fa-angle-down"></i>
                </div>
              </div>
              <div class="mt-4 pr-5 bg-gray-700">
                <!-- (list, create, edit, delete, detail) -->
                <a href="/#/admin/product" class="w-full h-10 pl-14 rounded-r-full flex items-center hover:bg-gray-800 focus:outline-none">Products</a>
                <!-- (list, create, edit, delete) -->
                <a href="/#/admin/category" class="w-full h-10 pl-14 rounded-r-full flex items-center hover:bg-gray-800 focus:outline-none">Categories</a>
                <!-- (list, edit, delete, detail) -->
                <a href="/#/admin/order" class="w-full h-10 pl-14 rounded-r-full flex items-center hover:bg-gray-800 focus:outline-none">Orders</a>
                <!-- (list, create, edit, delete, detail, cart) -->
                <a href="/#/admin/customer" class="w-full h-10 pl-14 rounded-r-full flex items-center hover:bg-gray-800 focus:outline-none">Customers</a>
              </div>
            </div>
          </section>
          <section id="container" class="flex-1 flex flex-col bg-white">
            <section id="top-bar" class="bg-black bg-opacity-75">
              <div class="max-w-5xl h-16 flex justify-between text-gray-100 shadow-2xl">
                <div class="text-lg flex items-center text-gray-300">
                  <i class="fas fa-calendar-day ml-6 cursor-pointer" title="Calendar"></i>
                  <i class="fas fa-envelope mx-6 cursor-pointer" title="Mail"></i>
                  <i class="fas fa-address-card cursor-pointer" title="Contacts"></i>
                  <i class="fas fa-check-square mx-6 cursor-pointer" title="To-Do"></i>
                  <i class="fas fa-star text-yellow-400 cursor-pointer"></i>
                </div>
                <div class="flex items-center">
                  <a href="#" class="focus:outline-none">My Profile</a>
                  <button class="mx-6 focus:outline-none">
                    <i class="fas fa-sign-out-alt"></i>
                    Logout
                  </button>
                </div>
              </div>
            </section>
            <section id="admin-content" class="bg-black bg-opacity-75 h-full"></section>
          </section>
        </div>
      </section>
    `;
  },
  afterRender() { return `` }
}

export default AdminPage;