import CategoryAPI from "./../api/categoryAPI.js";
import ProductAPI from "./../api/productAPI.js";
import { $, reRender } from "./../utils.js";

const ListProductAd = {
  async render() {
    const { data: product_all } = await ProductAPI.getAll();
    const total_items = product_all.length;
    const { data: categories } = await CategoryAPI.getCategories();
    const { data: product_limit } = await ProductAPI.getLimit(1, 5);
    return /*html-*/`
      <table class="table-auto mx-5">
        <thead class="text-gray-400 text-center border-b border-gray-400">
          <tr>
            <th class="w-10 cursor-pointer">
              <i id="select-delete-all" class="far fa-square"></i>
              <!-- <i class="fas fa-minus-square"></i> -->
              <!-- <i class="fas fa-check-square"></i> -->
            </th>
            <th class="w-16">ID</th>
            <th class="w-24"></th>
            <th class="w-64">Name</th>
            <th class="w-36">Category</th>
            <th class="w-32">Price</th>
            <th class="w-20">Quantity</th>
            <th class="w-20"></th>
          </tr>
        </thead>

        <tbody id="list-product-limit" class="divide-y divide-gray-500 divide-opacity-50">
          ${product_limit.map(product => /*html*/`
            <tr class="text-center py-2 text-gray-200">
              <th class="cursor-pointer">
                <i id="select-delete" data-id="${product.id}" class="far fa-square"></i>
              </th>
              <td>${product.id}</td>
              <td class="pt-2">
                <a href="/#/admin/product/detail/${product.id}" class="focus:outline-none"><img src="${product.image}" alt="" class="w-16 h-16"></a>
              </td>
              <td><a href="/#/admin/product/detail/${product.id}" class="focus:outline-none">${product.name}</a></td>
              <td class="">${categories.map(category => (category.id === product.categoryId) ? category.name : "").join("")}</td>
              <td>$${product.price}</td>
              <td>${product.quantity}</td>
              <td class="h-16 flex justify-end items-center">
                <button type="submit" id="btn-remove" data-id="${product.id}" class="focus:outline-none mr-4 hover:text-red-400"><i class="fas fa-trash-alt"></i></button>
                <a href="/#/admin/product/edit/${product.id}" class="focus:outline-none hover:text-blue-400"><i class="fas fa-edit"></i></a>
              </td>
            </tr>
          `).join("")}
        </tbody>

        <tfoot class="border-t border-gray-400">
          <tr class="text-gray-400 text-sm text-right">
            <th colspan="6" class="py-5 relative">
              <button id="btn-delete-all" class="hidden cursor-pointer focus:outline-none">
                <i class="fas fa-trash animate-bounce absolute top-5 left-1.5 text-3xl text-red-400"></i>
              </button>
              <span class="">Items per page:</span>
              <select name="" id="amount-items" class="mx-1 bg-gray-600 text-gray-300 px-2 focus:outline-none cursor-pointer">
                <option value="5" selected>5</option>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
              </select>
              <span class="">of</span>
              <span id="total-items">${total_items}</span>
            </th>
            <th colspan="3" class="w-40">
              <button id="prev-page" class="ml-3 py-2 px-3 rounded cursor-pointer focus:outline-none hover:bg-gray-500"><i class="fas fa-angle-left"></i></button>
              <span id="current-page"></span>
              <button id="next-page" class="py-2 px-3 rounded cursor-pointer focus:outline-none hover:bg-gray-500"><i class="fas fa-angle-right cursor-pointer"></i></button>
            </th>
          </tr>
        </tfoot>
      </table>`;
  },
  async afterRender() {
    var current_page = 1;
    $("#current-page").innerHTML = current_page;
    async function reRenderTotalProducts () {
      const { data: product_all } = await ProductAPI.getAll();
      $("#total-items").innerHTML = product_all.length;
    }
    async function getTotalPage () {
      const { data: product_all } = await ProductAPI.getAll();
      const total_page = Math.ceil(product_all.length / 5);
      return total_page;
    }
    const { data: categories } = await CategoryAPI.getCategories();
    async function getProductsPage (page) {
      const { data: product_limit } = await ProductAPI.getLimit(page, 5);
      return product_limit;
    }
    function renderProductsPage (list_product_page, categories) {
      const list_product_limit = list_product_page.map(product => /*html*/`
        <tr class="text-center py-2 text-gray-200">
          <th class="cursor-pointer">
            <i id="select-delete" data-id="${product.id}" class="far fa-square"></i>
          </th>
          <td>${product.id}</td>
          <td class="pt-2">
            <a href="/#/admin/product/detail/${product.id}" class="focus:outline-none"><img src="${product.image}" alt="" class="w-16 h-16"></a>
          </td>
          <td><a href="/#/admin/product/detail/${product.id}" class="focus:outline-none">${product.name}</a></td>
          <td class="">${categories.map(category => (category.id === product.categoryId) ? category.name : "").join("")}</td>
          <td>$${product.price}</td>
          <td>${product.quantity}</td>
          <td class="h-16 flex justify-end items-center">
            <button type="submit" id="btn-remove" data-id="${product.id}" class="focus:outline-none mr-4 hover:text-red-400"><i class="fas fa-trash-alt"></i></button>
            <a href="/#/admin/product/edit/${product.id}" class="focus:outline-none hover:text-blue-400"><i class="fas fa-edit"></i></a>
          </td>
        </tr>
      `).join("");
      return list_product_limit;
    }
    function hiddenIconDelete () {
      if ($("#select-delete-all").classList.contains("fa-minus-square")) {
        $("#select-delete-all").classList.remove("fas", "fa-minus-square");
        $("#select-delete-all").classList.add("far", "fa-square");
      } else if ($("#select-delete-all").classList.contains("fa-check-square")) {
        $("#select-delete-all").classList.remove("fas", "fa-check-square");
        $("#select-delete-all").classList.add("far", "fa-square");
      }
      if (!$("#btn-delete-all").classList.contains("hidden")) $("#btn-delete-all").classList.add("hidden");
    }
    async function reRenderPage (current_page) {
      const products_current_page = await getProductsPage(current_page);
      $("#list-product-limit").innerHTML = renderProductsPage(products_current_page, categories);
      $("#current-page").innerHTML = current_page;
      deleteLittle();
      hiddenIconDelete();
      selectProductToDelete();
    }
    async function paginationCurrent () {
      $("#next-page").addEventListener("click", async () => {
        const total_page = await getTotalPage();
        current_page = current_page < total_page ? current_page + 1 : 1;
        reRenderPage(current_page);
      });
      $("#prev-page").addEventListener("click", async () => {
        const total_page = await getTotalPage();
        current_page = current_page > 1 ? current_page - 1 : total_page;
        reRenderPage(current_page);
      });
    }
    paginationCurrent();
    selectProductToDelete();
    selectAllProductsToDelete();
    async function checkIconDeleteProduct () {
      const products_current_page = await getProductsPage(current_page);
      const check_square = Array.from($("#select-delete")).filter(_item => _item.classList.contains("fa-check-square")).length;
      if (check_square === products_current_page.length) {
          $("#select-delete-all").classList.remove("fas", "fa-minus-square", "far", "fa-square");
          $("#select-delete-all").classList.add("fas", "fa-check-square");
      } else if (check_square === 0) {
          $("#select-delete-all").classList.remove("fas", "fa-minus-square", "fas", "fa-check-square", "far", "fa-square");
          $("#select-delete-all").classList.add("far", "fa-square");
      } else {
          $("#select-delete-all").classList.remove("fas", "fa-check-square", "far", "fa-square");
          $("#select-delete-all").classList.add("fas", "fa-minus-square");
      }
      if (check_square !== 0 && $("#btn-delete-all").classList.contains("hidden")) {
        $("#btn-delete-all").classList.remove("hidden");
      } else if (check_square === 0 && !$("#btn-delete-all").classList.contains("hidden")) {
        $("#btn-delete-all").classList.add("hidden");
      }
    }
    async function selectProductToDelete () {
      const products_current_page = await getProductsPage(current_page);
      if (products_current_page.length !== 1) {
        $("#select-delete").forEach(item => {
          item.addEventListener("click", function() {
            this.classList.toggle("far");
            this.classList.toggle("fa-square");
            this.classList.toggle("fas");
            this.classList.toggle("fa-check-square");
            checkIconDeleteProduct();
          });
        });
      } else {
        $("#select-delete").addEventListener("click", function () {
          $("#select-delete").classList.toggle("far");
          $("#select-delete").classList.toggle("fa-square");
          $("#select-delete").classList.toggle("fas");
          $("#select-delete").classList.toggle("fa-check-square");
          if ($("#btn-delete-all").classList.contains("hidden")) {
            $("#select-delete-all").classList.remove("far", "fa-square");
            $("#select-delete-all").classList.add("fas", "fa-check-square");
            $("#btn-delete-all").classList.remove("hidden");
          } else {
            $("#select-delete-all").classList.remove("fas", "fa-check-square");
            $("#select-delete-all").classList.add("far", "fa-square");
            $("#btn-delete-all").classList.add("hidden");
          }
        })
      }
    }
    function selectAllProductsToDelete () {
      $("#select-delete-all").addEventListener("click", async function() {
        const products_current_page = await getProductsPage(current_page);
        if (products_current_page.length !== 1) {
          if (this.classList.contains("fa-check-square")) {
            this.classList.remove("fas", "fa-check-square");
            this.classList.add("far", "fa-square");
            $("#select-delete").forEach(item => {
              item.classList.remove("fas", "fa-check-square");
              item.classList.add("far", "fa-square");
            });
            if (!$("#btn-delete-all").classList.contains("hidden")) $("#btn-delete-all").classList.add("hidden");
          } else {
            if (!this.classList.contains("fa-check-square")) this.classList.remove("far", "fa-minus-square", "far", "fa-square");
            this.classList.add("fas", "fa-check-square");
            $("#select-delete").forEach(item => {
              item.classList.remove("far", "fa-square");
              item.classList.add("fas", "fa-check-square");
            });
            if ($("#btn-delete-all").classList.contains("hidden")) $("#btn-delete-all").classList.remove("hidden");
          }
          checkIconDeleteProduct();
        } else {
          if (!this.classList.contains("fa-check-square")) {
            if (!this.classList.contains("fa-check-square")) this.classList.remove("far", "fa-minus-square", "far", "fa-square");
            this.classList.add("fas", "fa-check-square");
            $("#select-delete").classList.remove("far", "fa-square");
            $("#select-delete").classList.add("fas", "fa-check-square");
            $("#btn-delete-all").classList.remove("hidden");
          } else {
            this.classList.remove("fas", "fa-check-square");
            this.classList.add("far", "fa-square");
            $("#select-delete").classList.remove("fas", "fa-check-square");
            $("#select-delete").classList.add("far", "fa-square");
            $("#btn-delete-all").classList.add("hidden");
          }
        }
      });
    }
    async function arrayProductsToDelete () {
      const products_current_page = await getProductsPage(current_page);
      const array_id = [];
      if (products_current_page.length !== 1) {
        $("#select-delete").forEach(item => {
          item.classList.contains("fa-check-square") ? array_id.push(item.dataset.id) : null;
        })
      } else {
        array_id.push($("#select-delete").dataset.id)
      }
      return array_id;
    }
    deleteProducts();
    deleteLittle();
    function deleteProducts () {
      $("#btn-delete-all").addEventListener("click", async () => {
        const question = confirm ("Do you want to delete it?");
        if (question) {
          const products_current_page = await getProductsPage(current_page);
          const array_id = await arrayProductsToDelete();
          array_id.length !== 1 ? ProductAPI.deleteAllItem(array_id) : ProductAPI.deleteItem(array_id[0]);
          current_page = (current_page === 1 || (products_current_page.length !== 1 && array_id.length !== products_current_page.length)) ? current_page : current_page - 1;
          reRenderPage(current_page);
          reRenderTotalProducts();
        }
      })
    }
    async function deleteLittle () {
      const products_current_page = await getProductsPage(current_page);
      if (products_current_page.length !== 1) {
        $("#btn-remove").forEach(item => {
          item.addEventListener("click", async function() {
            const question = confirm ("Do you want to delete it?");
            if (question) {
              await ProductAPI.deleteItem(this.dataset.id);
              reRenderPage(current_page);
              reRenderTotalProducts();
            }
          })
        });
      } else {
        $("#btn-remove").addEventListener("click", async function() {
          const question = confirm ("Do you want to delete it?");
            if (question) {
              await ProductAPI.deleteItem(this.dataset.id);
              current_page -= 1;
              reRenderPage(current_page);
              reRenderTotalProducts();
            }
        });
      }
    }
    // function deleteFileInFireBase(firebase_id_arr) {
    //   var arr = [];
    //   firebase_id_arr.forEach(async id => {
    //     const { data: product } = await ProductAPI.getItem(parseInt(id));
    //     const image_product = await product.image;
    //     const index_1 = await image_product.indexOf("2F") + 2;
    //     const index_2 = await image_product.indexOf("?");
    //     const image_name = await image_product.slice(index_1, index_2);
    //     console.log(image_name);
    //     arr.push(id);
    //     // const storageRef = firebase.storage().ref();
    //     // var desertRef = storageRef.child(`images/${image_name}`).delete();
    //   });
    //   console.log(arr);
    //   return arr;
    // }
  }
}


export default ListProductAd;