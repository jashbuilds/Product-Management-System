// const product = {
//   id: 21,
//   name: "SmartPhone",
//   description: "OnePlus Nord CE 3 Lite 5G",
//   price: 20000,
//   category: "Electronics",
//   stock: 200,
// };

// const form = document.getElementById("form")

// form.addEventListener("submit", (e) => {
//   e.preventDefault()

//   const id = document.getElementById("id")
//   const name = document.getElementById("name")
//   const desc = document.getElementById("desc")
//   const price = document.getElementById("price")
//   const category = document.getElementById("category")
//   // console.log(id.value, name.value, desc.value, price.value, category.value);

//   const formObj = {
//     id: id.value,
//     name: name.value,
//     desc: desc.value,
//     price: price.value,
//     category: category.value
//   }
// })

// const myModal = document.getElementById('addProductModal')
// const myInput = document.getElementById('productId')

// myModal.addEventListener('shown.bs.modal', () => {
//   myInput.focus()
// })

{/* <img src="../Icons/delete-icon.svg" alt="delete-icon" class="cursor-pointer delete-icon" data-bs-toggle="modal" data-bs-target="#deleteConfirmationModal" onclick="confirmProductDelete('${product.id}')"> */}


const productId = document.getElementById("productId");
const productName = document.getElementById("productName");
const productDesc = document.getElementById("productDesc");
const productPrice = document.getElementById("productPrice");
const productCategory = document.getElementById("productCategory");
const productStock = document.getElementById("productStock");

const productGrid = document.getElementById("productGrid");
const submitBtn = document.getElementById("submitBtn");
const addOrUpdateProduct = document.getElementById("addOrEditProductModal");

let editingId = null;

const products = [
  {
    id: 1,
    name: "OnePlus",
    description: "OnePlus Nord CE 3 Lite 5G",
    price: 20000,
    category: "Electronics",
    stock: 200,
  },
  {
    id: 2,
    name: "Iphone",
    description: "Iphone 14 pro max with 128GB storage in matte black color.",
    price: 56000,
    category: "Electronics",
    stock: 126,
  },
  {
    id: 3,
    name: "LeeCooper Shoes",
    description: "Branded Shoes wrapped in real Leather.",
    price: 3400,
    category: "Footwear",
    stock: 520,
  },
  {
    id: 4,
    name: "Dumbells",
    description: "Dumbell Set each of 10kg. Rust free metal.",
    price: 1500,
    category: "Fitness",
    stock: 100,
  },
];

// Render Product Cards
const renderProducts = () => {
  productGrid.innerHTML = products
    .map(
      (product) =>
        `
       <div class="col-12 col-lg-3 col-md-6 d-flex justify-content-center align-items-center">
          <div class="card productCard w-100 border rounded-4 h-auto shadow-sm mx-sm-1 mx-2">
            <div class="card-header border-bottom-0 d-flex justify-content-between align-items-center">
              <div class="h5 card-title my-2">${product.name}</div>
              <img src="../Icons/edit-icon.svg" alt="edit-icon" onclick="editProduct('${product.id}')" class="cursor-pointer edit-icon" data-bs-toggle="modal" data-bs-target="#addOrEditProductModal">
            </div>
            <div class="card-body d-flex flex-column gap-1 flex-grow-1 d-flex flex-column gap-2">
              <p class="card-text fs-7 d-flex flex-column text-secondary border border-1 p-3 rounded-2">Description <span class="fs-6 text-dark fw-medium">${product.description}</span></p>
            
              <div class="mt-auto border border-1 p-3 rounded-2">
                <div class="d-flex flex-column gap-3">
                  <div class="d-flex justify-content-between align-items-center">
                    <p class="card-text fs-7 d-flex flex-column text-secondary m-0">Category <span class="fs-6 text-dark fw-medium">${product.category}</span></p>
                    <p class="card-text fs-7 d-flex flex-column text-secondary">Stock <span class="fs-5 fw-medium text-dark">${product.stock}</span></p>
                  </div>
                </div>
              </div>
              <div class="d-flex justify-content-center align-items-center mt-auto border border-1 p-2 rounded-2">
                <p class="card-text fs-7 d-flex flex-column text-secondary m-0">Price <span class="fs-5 text-dark fw-medium">$${product.price}</span> </p>
              </div>
            </div>
            <div class="card-footer text-body-secondary border-top-0 d-flex justify-content-end align-items-center gap-3 p-3">
              <button class="btn px-3 btn-sm btn-outline-danger rounded-3 deleteBtn" data-bs-toggle="modal" data-bs-target="#deleteConfirmationModal" onclick="confirmProductDelete('${product.id}')">Delete</button>
            </div>
          </div>
       </div>`,
    )
    .join("");

  if (products.length === 0) {
    productGrid.classList.add(
      "d-flex",
      "justify-content-center",
      "align-items-center",
      "fw-medium",
      "fs-5",
    );
    productGrid.textContent = "No Products Available!";
  }
};

renderProducts();

// add Product
const addProduct = (e) => {
  e.preventDefault();

  const formObj = {
    id: Number(productId.value),
    name: productName.value,
    description: productDesc.value,
    price: Number(productPrice.value),
    category: productCategory.value,
    stock: Number(productStock.value),
  };

  if (editingId === null) {
    products.push(formObj);
  } else {
    const index = products.findIndex((p) => p.id === editingId);
    products[index] = formObj;
    editingId = null;
  }
  document.getElementById("productForm").reset();

  renderProducts();
};

// delete product
const deleteProduct = (id) => {
  const numberId = Number(id);

  const prodId = products.find((p) => p.id === numberId);
  const position = products.indexOf(prodId);

  products.splice(position, 1);
  renderProducts();
};

// Delete product confirmation
const confirmProductDelete = (id) => {
  const numberId = Number(id);
  const prodId = products.find((p) => p.id === numberId);

  document.getElementById("deleteConfirmation").textContent =
    `Are you sure, You want to delete Product '${prodId.name}' ?`;

  document.getElementById("deleteConfirm").innerHTML =
    `<button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">No</button>
     <button type="button" class="btn btn-danger" data-bs-dismiss="modal" onclick="deleteProduct('${id}')">Yes</button>`;
};

// Edit Product
const editProduct = (id) => {
  // addOrUpdateProduct.textContent = "Update Product"
  document.querySelector(".modal-header").innerHTML = `<h1
                                class="modal-title fs-5 d-flex align-items-center justify-content-start gap-2 px-2"><img
                                    src="../Images/edit-product.png" id="modalHeader"
                                    alt="add-product" width="30" height="30">
                                Update Product</h1>`;
  const numberId = Number(id);
  const prodId = products.find((p) => p.id === numberId);
  console.log(numberId);
  console.log(prodId);

  editingId = numberId;

  productId.value = prodId.id;
  productName.value = prodId.name;
  productDesc.value = prodId.description;
  productPrice.value = prodId.price;
  productCategory.value = prodId.category;
  productStock.value = prodId.stock;

  submitBtn.disabled = false;
  submitBtn.textContent = "Update";

  // const editModal = new bootstrap.Modal(addProductModal);
  // editModal.show();
};

// Validate Number Input (no "dash", "e", "+" allowed)
const validateNumberInput = (e) => {
  if (e.key === "-" || e.key === "e" || e.key === "+") e.preventDefault();
};

// Validate ID
const validateId = () => {
  const isDuplicateId = products.find(
    (val) => val.id === Number(productId.value),
  );

  if (!isDuplicateId || productId.value.trim() === "") {
    productId.classList.remove("is-invalid");
  } else {
    productId.classList.add("is-invalid");
    submitBtn.disabled = true;
  }
};

// Validate modal Form Values
const validateFormInput = () => {
  const isDuplicateId = products.find(
    (val) => val.id === Number(productId.value) && val.id !== editingId,
  );

  const isFormValid =
    !isDuplicateId &&
    productId.value.trim() !== "" &&
    productName.value.trim() !== "" &&
    productDesc.value.trim() !== "" &&
    productPrice.value.trim() !== "" &&
    productCategory.value.trim() !== "" &&
    productStock.value.trim() !== "";

  submitBtn.disabled = !isFormValid;
};

// Reset values of Form Modal
addOrUpdateProduct.addEventListener("hidden.bs.modal", () => {
  productId.value = "";
  productName.value = "";
  productDesc.value = "";
  productPrice.value = "";
  productCategory.value = "";
  productStock.value = "";

  document.querySelector(".modal-header").innerHTML = `<h1
                                class="modal-title fs-5 d-flex align-items-center justify-content-start gap-2 px-2"><img
                                    src="../Images/add-product.png" id="modalHeader"
                                    alt="add-product" width="30" height="30">
                                Add New Product</h1>`;

  submitBtn.textContent = "Submit";
  submitBtn.disabled = true;
  editingId = null;
});
