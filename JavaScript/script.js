const productId = document.getElementById("productId");
const productName = document.getElementById("productName");
const productDesc = document.getElementById("productDesc");
const productPrice = document.getElementById("productPrice");
const productCategory = document.getElementById("productCategory");
const productStock = document.getElementById("productStock");

const productGrid = document.getElementById("productGrid");
const submitBtn = document.getElementById("submitBtn");
const cancelBtn = document.getElementById("cancelBtn");
const addOrUpdateProduct = document.getElementById("addOrEditProductModal");

const apiUrl = "https://caabac588c5e7e75d2f7.free.beeceptor.com";

let editingId = null;
let productData = [];

const generateSkeletons = (count) => {
  return Array(count)
    .fill(0)
    .map(
      () => ` 
       <div class="col-12 col-lg-3 col-md-6">
          <div class="card productCard bg-white shadow-sm rounded-4 border overflow-hidden h-100">
            
            <div class="card-header placeholder-glow bg-transparent py-3 px-4 d-flex justify-content-between align-items-start">
              <div class="d-flex flex-column w-100">
                <span class="category-badge placeholder-glow placeholder-lg col-4 rounded-5 fw-semibold text-uppercase d-inline-block mb-3"></span>
                <p class="h4 card-title fw-bolder mb-0 placeholder bg-secondary col-6"></p>
              </div>
              <button class="btn btn-link p-0 placeholder col-2">
              </button>
            </div>
            
            <div class="card-body p-4 d-flex flex-column gap-3 placeholder-glow">
              <p class="card-text text-muted fs-7 mb-0 flex-grow-1 placeholder col-12"></p>
              
              <div class="d-flex justify-content-between align-items-center gap-2 pt-2 mt-3">
                  <div class="placeholder col-4 bg-secondary"></div>
                  <div class="placeholder col-4 bg-secondary"></div>
              </div>

              <div class="text-center mt-4">
                <button class="bg-danger p-3 rounded-3 border-0 fw-medium placeholder col-6"></button>
              </div>
            </div>
          </div>
       </div>`,
    )
    .join("");
};

const renderProducts = () => {
  productGrid.innerHTML = generateSkeletons(8);

  axios
    .get(`${apiUrl}/api/products`)
    .then((res) => {
      productData = res.data;

      renderActualData();

      if (productData.length === 0) {
        productGrid.innerHTML = `
      <div class="col-12 text-center py-5">
        <h3 class="text-muted">Inventory Empty</h3>
        <p class="text-muted fs-7">Click the "Add New Product" button above to get started.</p>
      </div>`;
      }
    })
    .catch((err) => console.log("Error While Rendering Data:", err));
};

renderProducts();

const renderActualData = () => {
  productGrid.innerHTML = productData
    .map(
      (product) =>
        `
       <div class="col-12 col-lg-3 col-md-6">
          <div class="card productCard bg-white shadow-sm rounded-4 border overflow-hidden h-100">
            
            <div class="card-header bg-transparent py-3 px-4 d-flex justify-content-between align-items-start">
              <div>
                <span class="category-badge rounded-5 fw-semibold text-uppercase d-inline-block mb-2">${product.category}</span>
                <p class="h4 card-title fw-bolder mb-0">${product.name}</p>
              </div>
              <button class="btn btn-link p-0 edit-icon onclick="editProduct('${product.id}')" data-bs-toggle="modal" data-bs-target="#addOrEditProductModal">
                <img src="../Icons/edit-icon.svg" alt="edit" width="20" height="20">
              </button>
            </div>
            
            <div class="card-body p-4 d-flex flex-column gap-3">
              <p class="card-text text-muted fs-7 mb-0 flex-grow-1">
                ${product.description}
              </p>
              
              <div class="d-flex justify-content-between align-items-end pt-2">
                <div>
                  <div class="price-tag fw-bolder fs-5 mb-1">$${product.price.toLocaleString()}</div>
                  <div class="stock-label text-muted fw-semibold">Total Price</div>
                </div>
                <div class="text-end">
                  <div class="fw-bold fs-5 ${product.stock < 10 ? "text-danger" : "text-dark"}">${product.stock}</div>
                  <div class="stock-label text-muted fw-semibold">Stock Available</div>
                </div>
              </div>

              <div class="text-center mt-2">
                <button class="delete-btn-simple rounded-3 border-0 fw-medium" 
                        data-bs-toggle="modal" 
                        data-bs-target="#deleteConfirmationModal" 
                        onclick="confirmProductDelete('${product.id}')">
                  Delete Product
                </button>
              </div>
            </div>
          </div>
       </div>`,
    )
    .join("");
};

const addProduct = (e) => {
  e.preventDefault();

  const modal = bootstrap.Modal.getInstance(addOrUpdateProduct);

  const formObj = {
    id: Number(productId.value),
    name: productName.value,
    description: productDesc.value,
    price: Number(productPrice.value),
    category: productCategory.value,
    stock: Number(productStock.value),
  };

  const spinner = document.createElement("span");
  spinner.classList.add("spinner-border", "spinner-border-sm");

  submitBtn.appendChild(spinner);
  submitBtn.classList.add(
    "d-flex",
    "justify-content-center",
    "align-items-center",
    "gap-2",
  );
  submitBtn.disabled = true;
  cancelBtn.disabled = true;

  if (editingId === null) {
    axios
      .post(`${apiUrl}/api/products`, formObj)
      .then((res) => {
        productData.push(res.data);
        document.getElementById("productForm").reset();
        renderProducts();

        submitBtn.removeChild(spinner);
        modal.hide();
      })
      .catch((err) => console.log("Error Adding Product: ", err));
  } else {
    axios
      .put(`${apiUrl}/api/products/${editingId}`, formObj)
      .then(() => {
        renderProducts();
        submitBtn.removeChild(spinner);
        modal.hide();
      })
      .catch((err) => console.log("Error while Editing:", err));
    editingId = null;
  }
};

const editProduct = (id) => {
  document.getElementById("modalHeader").src = "../Images/edit-product.png";
  document.getElementById("formModalLabel").textContent = "Update Product";
  submitBtn.textContent = "Update";

  const numberId = Number(id);
  const prodId = productData.find((p) => p.id === numberId);

  if (!prodId) {
    console.error(`Product with ID ${numberId} not found.`);
    return;
  }

  editingId = numberId;

  productId.value = prodId.id;
  productName.value = prodId.name;
  productDesc.value = prodId.description;
  productPrice.value = prodId.price;
  productCategory.value = prodId.category;
  productStock.value = prodId.stock;

  submitBtn.disabled = false;
};

const deleteProduct = (id) => {
  const numberId = Number(id);

  const prodId = productData.find((p) => p.id === numberId);
  const productId = prodId.id;

  axios
    .delete(`${apiUrl}/api/products/${productId}`)
    .then((res) => {
      console.log("Data Deleted Successfully: ", res.data);
      renderProducts();
    })
    .catch((err) => console.log("Error Deleting Data:", err));
};

const confirmProductDelete = (id) => {
  const numberId = Number(id);
  const prodId = productData.find((p) => p.id === numberId);

  document.getElementById("deleteConfirmation").textContent =
    `Are you sure, You want to delete Product '${prodId.name}' ?`;

  document.getElementById("deleteConfirm").innerHTML =
    `<button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">No</button>
     <button type="button" class="btn btn-danger" data-bs-dismiss="modal" onclick="deleteProduct('${id}')">Yes</button>`;
};

const validateNumberInput = (e) => {
  if (e.key === "-" || e.key === "e" || e.key === "+") e.preventDefault();
};

const validateId = () => {
  const isDuplicateId = productData.find(
    (val) => val.id === Number(productId.value),
  );

  if (!isDuplicateId || productId.value.trim() === "") {
    productId.classList.remove("is-invalid");
  } else {
    productId.classList.add("is-invalid");
    submitBtn.disabled = true;
  }
};

const validateFormInput = () => {
  const isDuplicateId = productData.find(
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

addOrUpdateProduct.addEventListener("hidden.bs.modal", () => {
  productId.value = "";
  productName.value = "";
  productDesc.value = "";
  productPrice.value = "";
  productCategory.value = "";
  productStock.value = "";

  document.getElementById("modalHeader").src = "../Images/add-product.png";
  document.getElementById("formModalLabel").textContent = "Add New Product";

  submitBtn.textContent = "Submit";
  submitBtn.disabled = true;
  cancelBtn.disabled = false;
  editingId = null;
});
