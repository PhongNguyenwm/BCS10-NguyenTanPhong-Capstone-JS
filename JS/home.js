//? GET : lấy danh sách , lấy chi tiếc
//? POST: tạo mới
//? PUSH : Thêm
//? DELETE: xoá

var idEditTed = null;

// ? bật loading
function turnOnLoading() {
  document.getElementById("loading").style.display = "block";
}

// ? ẩn loading
function turnOffLoading() {
  document.getElementById("loading").style.display = "none";
}

function renderListProduct(productArr) {
  var contentHTML = "";
  // ? hàm reverse giúp đảo ngược array (1,2,3=>3,2,1)
  var reverseProductArr = productArr.reverse();
  // ? render product
  reverseProductArr.forEach(function (item, index) {
    var trString = `
    <tr>
    <td>${index + 1}</td>
    <td>${item.name}</td>
    <td>${item.price}</td>
    <td><img width=100 src="${item.img}" alt=""></td>
    <td>${item.desc}</td>
    <td>
        <button onclick="deleteProduct('${
          item.id
        }')" class="btn btn-danger">Delete</button>
        <button onclick="editProduct('${
          item.id
        }')" class="btn btn-primary">Edit</button>
    </td>
    </tr>
    `;
    contentHTML += trString;
  });
  document.getElementById("tblDanhSachSP").innerHTML = contentHTML;
}
function fetchListProduct() {
  turnOnLoading();
  axios({
    url: "https://65a5f6bf74cf4207b4ef0f1c.mockapi.io/product",
    method: "GET",
  })
    .then(function (res) {
      console.log("res", res);
      turnOffLoading();
      renderListProduct(res.data);
    })
    .catch(function (err) {
      console.log("error", err);
      turnOffLoading();
    });
}
fetchListProduct();
function deleteProduct(id) {
  turnOnLoading();
  console.log("id", id);
  axios({
    url: `https://65a5f6bf74cf4207b4ef0f1c.mockapi.io/product/${id}`,
    method: "DELETE",
  })
    .then(function (res) {
      fetchListProduct();
      console.log("res", res);
    })
    .catch(function (err) {
      console.log("error", err);
      turnOffLoading();
    });
}

function addProduct() {
  var name = document.getElementById("TenSP").value;
  var price = document.getElementById("GiaSP").value;
  var image = document.getElementById("HinhSP").value;
  var desc = document.getElementById("moTaSp").value;

  var product = {
    name: name,
    price: price,
    img: image,
    desc: desc,
  };
  // ? khi thêm sp (POST) sẽ thêm trường data(lưu ý key phải giống trên mockapi)
  console.log({ product });
  axios({
    url: "https://65a5f6bf74cf4207b4ef0f1c.mockapi.io/product",
    method: "POST",
    data: product,
  })
    .then(function (res) {
      console.log({ res });
      //? Jquery của Js giúp tắt modal
      $("#myModal").modal("hide");
      fetchListProduct();
    })
    .catch(function (err) {
      console.log({ err });
    });
}

function editProduct(id) {
  idEditTed = id;
  axios({
    url: `https://65a5f6bf74cf4207b4ef0f1c.mockapi.io/product/${id}`,
    method: "GET",
  })
    .then(function (res) {
      var productEdit = res.data;
      document.getElementById("TenSP").value = productEdit.name;
      document.getElementById("GiaSP").value = productEdit.price;
      document.getElementById("HinhSP").value = productEdit.img;
      document.getElementById("moTaSp").value = productEdit.desc;
      $("#myModal").modal("show");
      console.log({ productEdit });
    })
    .catch(function (err) {
      console.log("error", err);
    });
}

function updateProduct() {
  var name = document.getElementById("TenSP").value;
  var price = document.getElementById("GiaSP").value;
  var image = document.getElementById("HinhSP").value;
  var desc = document.getElementById("moTaSp").value;

  var product = {
    name: name,
    price: price,
    img: image,
    desc: desc,
  };
  // ? khi cập nhật product cần :id (product cần update),data(cần updatenhuwxng thông tin nào)
  axios({
    url: `https://65a5f6bf74cf4207b4ef0f1c.mockapi.io/product/${idEditTed}`,
    method: "PUT",
    data: product,
  })
    .then(function (res) {
      console.log("res", res);
      $("#myModal").modal("hide");
      fetchListProduct();
    })
    .catch(function (err) {
      console.log("error", err);
    });
}


axios({
  url: "",
  method: "",
})
  .then(function (res) {
    console.log(res);
  })
  .catch(function (err) {
    console.log(err);
  });
