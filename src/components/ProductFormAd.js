import ProductAPI from "./../api/productAPI.js";
import CategoryAPI from "./../api/categoryAPI.js";
import { parseRequestUrl, $ } from "./../utils.js";

const ProductFromAd = {
  async render() {
    var checkEdit = false;
    const { data: categories } = await CategoryAPI.getCategories();
    const { data: objects } = await CategoryAPI.getObjects();
    const { id } = parseRequestUrl();
    if (id) {
      checkEdit = true;
      var { data: product } = await ProductAPI.getItem(id);
    };
    return /*html*/`
      <section class="form-product mx-10 h-full">
        <div class="text-center mb-8">
          <div id="progress" class="w-full h-6 bg-gray-300 rounded-full ">
            <div id="progress-done" class="opacity-0 w-0 rounded-full text-gray-100 font-medium shadow-2xl bg-gradient-to-r from-yellow-300 via-red-400 to-pink-400">0%</div>
          </div>
        </div>
        <div class="flex justify-between">
          <form action="" id="form-product-action" class="relative">
            ${checkEdit ? `<input type="hidden" id="product-id" data-id="${product.id}">` : ''}
            <div style="width: 28rem;" class="flex items-center mb-2">
              <label for="" class="flex-1 text-xl font-medium text-gray-100 text-right">Name</label>
              <input type="text" id="product-name" ${checkEdit ? `value="${product.name}"` : ''} class="ml-5 w-80 py-1.5 px-2.5 text-gray-800 focus:outline-none rounded bg-gray-400 focus:bg-gray-300 border-2 border-transparent focus:border-green-500">
            </div>
            <div style="width: 28rem;" class="flex items-center mb-2">
              <label for="" class="flex-1 text-xl font-medium text-gray-100 text-right">Title</label>
              <input type="text" id="product-title" ${checkEdit ? `value="${product.title}"` : ''} class="ml-5 w-80 py-1.5 px-2.5 text-gray-800 focus:outline-none rounded bg-gray-400 focus:bg-gray-300 border-2 border-transparent focus:border-green-500">
            </div>
            <div style="width: 28rem;" class="flex items-center my-2">
              <label for="" class="flex-1 text-xl font-medium text-gray-100 text-right">Price</label>
              <input type="text" id="product-price" ${checkEdit ? `value="${product.price}"` : ''} class="ml-5 w-80 py-1.5 px-2.5 text-gray-800 focus:outline-none rounded bg-gray-400 focus:bg-gray-300 border-2 border-transparent focus:border-green-500">
            </div>
            <div style="width: 28rem;" class="flex items-center my-2">
              <label for="" class="flex-1 text-xl font-medium text-gray-100 text-right">Quantity</label>
              <input type="text" id="product-quantity" ${checkEdit ? `value="${product.quantity}"` : ''} class="ml-5 w-80 py-1.5 px-2.5 text-gray-800 focus:outline-none rounded bg-gray-400 focus:bg-gray-300 border-2 border-transparent focus:border-green-500">
            </div>
            <div style="width: 28rem;" class="flex items-center my-2">
              <label for="" class="flex-1 text-xl font-medium text-gray-100 text-right">Categories</label>
              <select name="" id="product-category" class="ml-5 w-80 py-1.5 px-2.5 focus:outline-none rounded bg-gray-300 border-2 border-transparent focus:border-green-500">
                <option>-- Choose categories --</option>
                ${categories.map(cate => `<option value="${cate.id}" ${(checkEdit && `${cate.id}`===`${product.categoryId}`) ? 'selected' : ''}>${cate.name}</option>`)}
              </select>
            </div>
            <div style="width: 28rem;" class="flex items-center my-2">
              <label for="" class="flex-1 text-xl font-medium text-gray-100 text-right">Object</label>
              <select name="" id="product-object" class="ml-5 w-80 py-1.5 px-2.5 focus:outline-none rounded bg-gray-300 border-2 border-transparent focus:border-green-500">
                <option>-- Choose object --</option>
                ${objects.map(obj => `<option value="${obj.id}" ${(checkEdit && `${obj.id}`===`${product.objectId}`) ? 'selected' : ''}>${obj.name}</option>`)}
              </select>
            </div>
            <div style="width: 28rem;" class="flex items-center mt-2">
              <label for="" class="flex-1 text-xl font-medium text-gray-100 text-right">Status</label>
              <div class="ml-5 w-80 py-1.5 flex justify-around items-center">
                <label class="cursor-pointer">
                  <input type="radio" name="product-status" value="1" class=" ${checkEdit ? (product.status === true ? 'bg-green-500' : 'bg-gray-300') : 'bg-green-500'} appearance-none w-4 h-4 rounded focus:outline-none cursor-pointer">
                  <span class="text-lg font-medium text-gray-300 ml-3">In of stock</span>
                </label>
                <label class="cursor-pointer">
                  <input type="radio" name="product-status" value="0" class=" ${checkEdit ? (product.status === true ? 'bg-gray-300' : 'bg-green-500') : 'bg-gray-300'} appearance-none w-4 h-4 rounded focus:outline-none cursor-pointer">
                  <span class="text-lg font-medium text-gray-300 ml-3">Out of stock</span>
                </label>
              </div>
            </div>
            <div style="width: 28rem;" class="my-8 flex justify-center">
              <button type="submit" class="w-52 text-xl font-bold text-gray-100 py-2 focus:outline-none bg-gradient-to-r from-yellow-300 via-red-400 to-pink-400 rounded-full">${checkEdit ? 'Update' : 'Create'}</button>
            </div>
            <div id="check-circle" class="hidden animate-ping absolute -top-20 left-60 bg-yellow-300 bg-opacity-75 w-72 h-72 rounded-full shadow-2xl flex justify-center items-center">
              <i class="fas fa-check-circle text-9xl text-green-500"></i>
            </div>
          </form>
          <div class="cursor-pointer">
            <div id="text-image" class="mt-24 ml-20 text-gray-300 font-medium text-6xl">Image</div>
            <img alt="" ${checkEdit ? `src="${product.image}"` : ''} class="w-80 h-80 bg-gray-600 bg-opacity-75 -mt-40" id="show-picture">
          </div>
        </div>
      </section>
    `;
  },
  async afterRender() {
    let files = [];
    const { id } = parseRequestUrl();
    var checkPicture = false;
    var status = "1";
    $("input[type='radio']").forEach(item => {
      item.addEventListener("click", () => {
        $("input[type='radio']").forEach(item_ => {
          item_.classList.remove('bg-green-500');
          item_.classList.add('bg-gray-300');
        });
        item.classList.remove('bg-gray-300');
        item.classList.add('bg-green-500');
        status = item.value;
      });
    });
    function checkCircle () {
      $("#check-circle").classList.remove('hidden');
      setTimeout(() => {
        $("#check-circle").classList.add('hidden');
      }, 2000);
    }
    function intervalOBJ () {
      let progress = 0;
      const interval_obj = setInterval(() => {
        ++progress;
        $("#progress-done").style.opacity = 1;
        $("#progress-done").style.width = progress.toFixed(0) + '%';
        $("#progress-done").innerHTML = `${progress.toFixed(0)}%`;
        if (progress === 100) {
          console.log("successfully");
          clearInterval(interval_obj);
          checkCircle();
        }
      }, 15);
    }
    function reloadForm () {}
    function productValue (name, title, price, image, quantity, categoryId, objectId, status) {
      const product = { name: name, title: title, price: price, image: image, quantity: parseInt(quantity), categoryId: categoryId, objectId: objectId, status: status === '1' ? true : false };
      return product;
    }
    $("#show-picture").addEventListener("click", () => {
      const input = document.createElement("input");
      input.type = "file";
      input.onchange = event => {
        files = event.target.files;
        let reader = new FileReader();
        reader.onload = () => {
          $("#show-picture").src = reader.result;
        }
        reader.readAsDataURL(files[0]);
        $("#text-image").innerHTML = "";
        $("#show-picture").classList.remove("-mt-40");
        $("#show-picture").classList.add("-mt-24");
      }
      input.click();
      checkPicture = true;
    });
    $("#form-product-action").addEventListener("submit", (event) => {
      event.preventDefault();
      if (!checkPicture) {
        const product = productValue (
          $("#product-name").value, $("#product-title").value, $("#product-price").value,
          $("#show-picture").src, $("#product-quantity").value, $("#product-category").value,
          $("#product-object").value, status
        );
        ProductAPI.updateItem(product, $("#product-id").dataset.id);
        intervalOBJ();
      } else {
        const ref = firebase.storage().ref();
        const file = files[0];
        const fileName = (new Date()).getMilliseconds() + "-" + file.name;
        const meta = { contentType: file.type }
        const task = ref.child(`Product/${fileName}`).put(file, meta);
        task
          .then(snapshot => snapshot.ref.getDownloadURL())
          .then(url => {
            const product = productValue (
              $("#product-name").value, $("#product-title").value, $("#product-price").value,
              url, $("#product-quantity").value, $("#product-category").value,
              $("#product-object").value, status
            );
            id ? ProductAPI.updateItem(product, $("#product-id").dataset.id) : ProductAPI.addItem(product);
          });
        if (id) {
          intervalOBJ();
        } else {
          task.on("state_changed", (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            $("#progress-done").style.opacity = 1;
            $("#progress-done").style.width = progress.toFixed(0) + '%';
            $("#progress-done").innerHTML = `${progress.toFixed(0)}%`;
            if (progress === 100) {
              console.log("successfully");
              checkCircle();
            }
          });
        }
      }
    });
  }
}

export default ProductFromAd;