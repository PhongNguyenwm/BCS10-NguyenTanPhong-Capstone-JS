var idEdited = null;

function turnOnLoading() {
  document.getElementById("loading").style.display = "block";
}
function turnOffLoading() {
  document.getElementById("loading").style.display = "none";
}

function renderListProducts(productsArr) {
  var contentHTML = [];
  productsArr.forEach(function (item) {
    var trString = `<tr>
                        <td>${item.name}</td>
                        <td>${item.price}</td>
                        <td>${item.screen}</td>
                        <td>${item.backCamera}</td>
                        <td>${item.frontCamera}</td>
                        <td><img style="width:200px" src="${item.img}"/></td>
                        <td>${item.desc}</td>
                        <td>${item.type}</td>
                        <td>
                        <button onclick='deleteProduct(${item.id})' class="btn btn-danger">Delete</button>
                        <button onclick="editProduct(${item.id})" class="btn btn-warning">Edit</button>
                        </td>
                    </tr>`;
    contentHTML += trString;
  });
  document.getElementById("tblDanhSachSP").innerHTML = contentHTML;
}

var QLSP = [];

function fetchListProduct() {
  turnOnLoading();
  axios({
    url: "https://65a5f6b274cf4207b4ef0ee4.mockapi.io/QLSP",
    method: "GET",
  })
    .then(function (res) {
      QLSP = res.data;
      turnOffLoading();
      renderListProducts(QLSP);
    })
    .catch(function (err) {
      turnOffLoading();
      console.log(err);
    });
}

fetchListProduct();

function createProduct() {
  var name = document.getElementById("TenSP").value;
  var price = document.getElementById("GiaSP").value;
  var screen = document.getElementById("ManHinh").value;
  var frontCamera = document.getElementById("frontCam").value;
  var backCamera = document.getElementById("backCam").value;
  var img = document.getElementById("HinhSP").value;
  var desc = document.getElementById("moTaSp").value;
  var type = document.getElementById("LoaiSP").value;

  var product = {
    name: name,
    price: price,
    screen: screen,
    frontCamera: frontCamera,
    backCamera: backCamera,
    img: img,
    desc: desc,
    type: type,
  };
  axios({
    url: "https://65a5f6b274cf4207b4ef0ee4.mockapi.io/QLSP",
    method: "POST",
    data: product,
  })
    .then(function (res) {
      fetchListProduct();
      $("#myModal").modal("hide");
      clearForm();
      turnOffLoading();
    })
    .catch(function (err) {
      console.log(err);
      turnOffLoading();
    });
}

function deleteProduct(id) {
  turnOnLoading();
  console.log("✝️ ~ deleteProduct ~ id:", id);
  axios({
    url: `https://65a5f6b274cf4207b4ef0ee4.mockapi.io/QLSP/${id}`,
    method: "DELETE",
  })
    .then(function (res) {
      fetchListProduct();
    })
    .catch(function (err) {
      console.log(err);
      turnOffLoading();
    });
}

function editProduct(id) {
  idEdited = id;
  axios({
    url: `https://65a5f6b274cf4207b4ef0ee4.mockapi.io/QLSP/${id}`,
    method: "GET",
  })
    .then(function (res) {
      console.log(res);
      var productEdit = res.data;
      document.getElementById("TenSP").value = productEdit.name;
      document.getElementById("GiaSP").value = productEdit.price;
      document.getElementById("ManHinh").value = productEdit.screen;
      document.getElementById("frontCam").value = productEdit.frontCamera;
      document.getElementById("backCam").value = productEdit.backCamera;
      document.getElementById("HinhSP").value = productEdit.img;
      document.getElementById("moTaSp").value = productEdit.desc;
      document.getElementById("LoaiSP").value = productEdit.type;
      $("#myModal").modal("show");
    })
    .catch(function (err) {
      console.log(err);
    });
}

function updateProduct() {
  var name = document.getElementById("TenSP").value;
  var price = document.getElementById("GiaSP").value;
  var screen = document.getElementById("ManHinh").value;
  var frontCamera = document.getElementById("frontCam").value;
  var backCamera = document.getElementById("backCam").value;
  var img = document.getElementById("HinhSP").value;
  var desc = document.getElementById("moTaSp").value;
  var type = document.getElementById("LoaiSP").value;

  var product = {
    name: name,
    price: price,
    screen: screen,
    frontCamera: frontCamera,
    backCamera: backCamera,
    img: img,
    desc: desc,
    type: type,
  };
  axios({
    url: `https://65a5f6b274cf4207b4ef0ee4.mockapi.io/QLSP/${idEdited}`,
    method: "PUT",
    data: product,
  })
    .then(function (res) {
      console.log(res);
      fetchListProduct();
      $("#myModal").modal("hide");
      clearForm();
    })
    .catch(function (err) {
      console.log(err);
    });
}

function searchProducts() {
  var keyword = document.getElementById("searchInput").value.toLowerCase();

  if (keyword === "") {
    renderListProducts(QLSP);
    return;
  }

  var filteredProducts = QLSP.filter(function (item) {
    return item.name.toLowerCase().includes(keyword);
  });

  renderListProducts(filteredProducts);
}

// Gọi hàm searchProducts() khi người dùng thay đổi nội dung input tìm kiếm
document
  .getElementById("searchInput")
  .addEventListener("input", searchProducts);

function clearForm() {
  document.getElementById("TenSP").value = "";
  document.getElementById("GiaSP").value = "";
  document.getElementById("ManHinh").value = "";
  document.getElementById("frontCam").value = "";
  document.getElementById("backCam").value = "";
  document.getElementById("HinhSP").value = "";
  document.getElementById("moTaSp").value = "";
  document.getElementById("LoaiSP").value = "";
}

var isSortedHigh = false;
function sortProducts(sortType) {
  var sortedProducts;
  if (sortType === "asc") {
    sortedProducts = QLSP.slice().sort((a, b) => {
      return a.price - b.price;
    });
    isSortedHigh = true;
  } else if (sortType === "desc") {
    sortedProducts = QLSP.slice().sort((a, b) => {
      return b.price - a.price;
    });
    isSortedHigh = false;
  } else {
    sortedProducts = QLSP.slice();
    isSortedHigh = false;
  }
  renderListProducts(sortedProducts);
}
document.getElementById("koLoc").addEventListener("click", () => {
  sortProducts(null);
});
document.getElementById("locGiaLon").addEventListener("click", () => {
  sortProducts("desc");
});
document.getElementById("locGiaNho").addEventListener("click", () => {
  sortProducts("asc");
});
