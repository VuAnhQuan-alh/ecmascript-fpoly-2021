const CategoryAd = {
  render() {
    return /*html*/`
      <div class="bg-gray-700">
        <div class="w-full h-48 px-10 pb-20 text-gray-100 max-w-5xl flex justify-between items-center">
          <div class="text-2xl font-medium">
            <i class="fas fa-crown mr-2"></i>
            Category
          </div>
          <div class="relative">
            <i class="fas fa-search absolute top-3 left-4 text-xl"></i>
            <input type="text" class="bg-gray-500 py-2.5 pl-12 pr-6 w-96 rounded-full focus:outline-none" placeholder="Search for a category">
          </div>
          <div class="text-4xl">
            <a href="/#/admin/category/action" class="focus:outline-none"><i class="fas fa-calendar-day mr-6 cursor-pointer hover:text-green-400" title="action"></i></a>
          </div>
        </div>
      </div>
      <div class="-mt-20 max-w-5xl">
        <div class="bg-gray-400 mx-10 px-1 pt-1 rounded-t-2xl">
          <div id="action-admin" class="bg-black bg-opacity-70 rounded-t-2xl shadow-2xl pt-6"></div>
        </div>
      </div>
    `
  },
  afterRender() {
    return ``
  }
}

export default CategoryAd;