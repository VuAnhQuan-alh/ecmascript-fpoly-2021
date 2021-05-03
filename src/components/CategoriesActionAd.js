import { $ } from "./../utils.js";
import CategoryAPI from "./../api/categoryAPI.js";

const CategoriesActionAd = {
  async render() {
    const { data: categories } = await CategoryAPI.getCategories();
    return /*html*/`
      <section id="categoryAction" class="w-full">
        <div class="flex justify-around">
          <div class="px-5">
            <table class="table-auto text-center">
              <thead class="text-gray-400 text-xl text-center border-b border-gray-400">
                <tr>
                  <th class="w-16">ID</th>
                  <th class="w-52">Name</th>
                  <th class="w-20">Action</th>
                </tr>
              </thead>
              <tbody id="list-categories" class="text-gray-200 text-lg font-medium divide-y divide-yellow-400 divide-opacity-50">
                ${categories.map(cate => /*htmlc*/`
                  <tr class="py-2">
                    <td class="pt-2 cursor-default">${cate.id}</td>
                    <td class="text-green-300 cursor-default">${cate.name}</td>
                    <td class="h-10 flex justify-end items-center">
                      <button type="submit" id="btn-remove" data-id="${cate.id}" class="focus:outline-none mr-4 hover:text-red-400"><i class="fas fa-trash-alt"></i></button>
                      <button type="submit" id="btn-edit" data-id="${cate.id}" class="focus:outline-none hover:text-blue-400"><i class="fas fa-edit"></i></button>
                    </td>
                  </tr>
                `).join("")}
              </tbody>
            </table>
          </div>
          <div class="text-center">
            <div id="action-name" class="text-2xl text-gray-400 font-medium mb-5">Action of Category</div>
            <form action="" id="form-category-action">
              <div class="flex items-center my-2">
                <input id="category-name" type="text" class="w-80 py-1.5 px-2.5 text-gray-800 focus:outline-none rounded bg-gray-400 focus:bg-gray-300 border-2 border-transparent focus:border-green-500 placeholder-gray-200 focus:placeholder-gray-400" placeholder="Name Category">
              </div>
              <div class="my-8 flex justify-center">
                <button id="btn-action" type="submit" class="w-52 text-xl font-bold text-gray-100 py-2 focus:outline-none bg-gradient-to-r from-yellow-300 via-red-400 to-pink-400 rounded-full">Create Category</button>
              </div>
            </form>
          </div>
        </div>
      </section>
    `
  },
  afterRender() {
    async function reRender() {
      const { data: categories } = await CategoryAPI.getCategories();
      const result = categories.map(cate => /*htmlc*/`
        <tr class="py-2">
          <td class="pt-2 cursor-default">${cate.id}</td>
          <td class="text-green-300 cursor-default">${cate.name}</td>
          <td class="h-10 flex justify-end items-center">
            <button type="submit" id="btn-remove" data-id="${cate.id}" class="focus:outline-none mr-4 hover:text-red-400"><i class="fas fa-trash-alt"></i></button>
            <button type="submit" id="btn-edit" data-id="${cate.id}" class="focus:outline-none hover:text-blue-400"><i class="fas fa-edit"></i></button>
          </td>
        </tr>
      `).join("");
      $("#list-categories").innerHTML = result;
      deleteCategory();
    }
    function actionCategory () {
      var check = true;
      var id = 0;
      clickEdit();
      function clickEdit () {
        $("#btn-edit").forEach(element => {
          element.addEventListener("click", async function() {
            check = false;
            $("#btn-action").innerHTML = "Update Category";
            const { data } = await CategoryAPI.getCategory(this.dataset.id);
            $("#category-name").value = data.name;
            id = data.id;
          });
        });
      }

      $("#form-category-action").addEventListener("submit", async (event) => {
        event.preventDefault();
        const category = { name: $("#category-name").value };
        if (check) {
          await CategoryAPI.addCategory(category);
        } else {
          await CategoryAPI.updateCategory(category, id);
          $("#btn-action").innerHTML = "Create Category";
          check = true;
        }
        $("#category-name").value = "";
        await reRender();
        clickEdit();
      });
    }
    deleteCategory();
    function deleteCategory() {
      $("#btn-remove").forEach(element => {
        element.addEventListener("click", async function() {
          const question = confirm ("Do you want to delete it?");
          if (question) {
            await CategoryAPI.deleteCategory(this.dataset.id);
            reRender();
          }
        })
      })
    }
    actionCategory();
  }
}

export default CategoriesActionAd;