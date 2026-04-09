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


// Select DOM elements for form inputs and UI containers
const productId = document.getElementById("productId");
const productName = document.getElementById("productName");
const productDesc = document.getElementById("productDesc");
const productPrice = document.getElementById("productPrice");
const productCategory = document.getElementById("productCategory");
const productStock = document.getElementById("productStock");

const productGrid = document.getElementById("productGrid");
const submitBtn = document.getElementById("submitBtn");
const addOrUpdateProduct = document.getElementById("addOrEditProductModal");

// Global state to track if we are currently editing an existing product
let editingId = null;

// Initial product data (Sample dataset)
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

/**
 * Render Product Cards:
 * This function clears the productGrid and regenerates the HTML for every product in the array.
 * It uses Bootstrap utility classes combined with custom CSS for the 'Premium' look.
 */
const renderProducts = () => {
  productGrid.innerHTML = products
    .map(
      (product) =>
        `
       <div class="col-12 col-lg-3 col-md-6">
          <!-- Main Card Container: Uses shadow-sm, rounded-4 (1rem), and custom productCard class for hover -->
          <div class="card productCard shadow-sm rounded-4 border overflow-hidden h-100">
            
            <!-- Card Header: Contains category pill and product name -->
            <div class="card-header bg-transparent py-3 px-4 border-bottom border-2 d-flex justify-content-between align-items-start">
              <div>
                <span class="category-badge d-inline-block mb-2">${product.category}</span>
                <h4 class="card-title mb-0">${product.name}</h4>
              </div>
              <!-- Edit Action: Triggers the main modal -->
              <button class="btn btn-link p-0 edit-icon" onclick="editProduct('${product.id}')" data-bs-toggle="modal" data-bs-target="#addOrEditProductModal">
                <img src="../Icons/edit-icon.svg" alt="edit" width="20" height="20">
              </button>
            </div>
            
            <!-- Card Body: Contains description and internal padding (p-4) -->
            <div class="card-body p-4 d-flex flex-column gap-3">
              <!-- Description: Truncated to 3 lines for visual consistency -->
              <p class="card-text text-muted fs-7 mb-0 flex-grow-1" style="display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; min-height: 3.6em;">
                ${product.description}
              </p>
              
              <!-- Info Section: Price and Stock labels -->
              <div class="d-flex justify-content-between align-items-end pt-2">
                <div>
                  <div class="price-tag mb-1">$${product.price.toLocaleString()}</div>
                  <div class="stock-label">Total Price</div>
                </div>
                <div class="text-end">
                  <div class="fw-bold fs-5 ${product.stock < 10 ? 'text-danger' : 'text-dark'}">${product.stock}</div>
                  <div class="stock-label">Stock Available</div>
                </div>
              </div>

              <!-- Delete Action: Centers the button at the bottom -->
              <div class="text-center mt-2">
                <button class="delete-btn-simple rounded-3" 
                        data-bs-toggle="modal" 
                        data-bs-target="#deleteConfirmationModal" 
                        onclick="confirmProductDelete('${product.id}')">
                  Delete Product
                </button>
              </div>
            </div>
          </div>
       </div>`
    )
    .join("");

  // Empty State: Displayed if no products exist in the array
  if (products.length === 0) {
    productGrid.innerHTML = `
      <div class="col-12 text-center py-5">
        <div class="display-1 text-muted opacity-25 mb-3">📦</div>
        <h3 class="text-muted">Inventory Empty</h3>
        <p class="text-muted fs-7">Click the "Add New Product" button above to get started.</p>
      </div>`;
  }
};

/**
 * Initial Render:
 * Populate the UI with initial product data when the script first loads.
 */
renderProducts();

/**
 * Add or Update Product:
 * This function handles the form submission logic. It determines whether to
 * create a new product or update an existing one based on the 'editingId'.
 */
const addProduct = (e) => {
  e.preventDefault(); // Prevents the default form submission page reload

  // Gather form values into a single object
  const formObj = {
    id: Number(productId.value), // Convert string input to number
    name: productName.value,
    description: productDesc.value,
    price: Number(productPrice.value),
    category: productCategory.value,
    stock: Number(productStock.value),
  };

  if (editingId === null) {
    // Mode: Add New Product
    products.push(formObj);
  } else {
    // Mode: Update Existing Product
    const index = products.findIndex((p) => p.id === editingId);
    products[index] = formObj;
    editingId = null; // Reset edit state after update
  }

  // Clear the form fields after successful submission
  document.getElementById("productForm").reset();

  // Refresh the UI to show updated product list
  renderProducts();
};

/**
 * Delete product:
 * Removes a specific product from the array based on its ID.
 */
const deleteProduct = (id) => {
  const numberId = Number(id);

  // Find the product and its index, then remove using splice
  const prodId = products.find((p) => p.id === numberId);
  const position = products.indexOf(prodId);

  products.splice(position, 1);
  renderProducts(); // Refresh UI
};

/**
 * Delete product confirmation:
 * Prepares the confirmation message and injects the 'confirm' button
 * into the deleteConfirmationModal.
 */
const confirmProductDelete = (id) => {
  const numberId = Number(id);
  const prodId = products.find((p) => p.id === numberId);

  // Set warning text with product name
  document.getElementById("deleteConfirmation").textContent =
    `Are you sure, You want to delete Product '${prodId.name}' ?`;

  // Inject the confirmation actions
  document.getElementById("deleteConfirm").innerHTML =
    `<button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">No</button>
     <button type="button" class="btn btn-danger" data-bs-dismiss="modal" onclick="deleteProduct('${id}')">Yes</button>`;
};

/**
 * Edit Product:
 * Populates the modal fields with the data of the product being edited
 * and switches the modal UI to 'Update' mode.
 */
const editProduct = (id) => {
  // Update UI indicators to 'Update' mode
  document.getElementById("modalHeader").src = "../Images/edit-product.png";
  document.getElementById("formModalLabel").textContent = "Update Product";

  const numberId = Number(id);
  const prodId = products.find((p) => p.id === numberId);

  editingId = numberId; // Set global state to the current product being edited

  // Sync data to form inputs
  productId.value = prodId.id;
  productName.value = prodId.name;
  productDesc.value = prodId.description;
  productPrice.value = prodId.price;
  productCategory.value = prodId.category;
  productStock.value = prodId.stock;

  // Enable the update button immediately
  submitBtn.disabled = false;
  submitBtn.textContent = "Update";
};

/**
 * Validate Number Input:
 * Prevents non-numeric characters like "e", "E", or subtraction symbols
 * from being entered into number-based input fields.
 */
const validateNumberInput = (e) => {
  if (e.key === "-" || e.key === "e" || e.key === "+") e.preventDefault();
};

/**
 * Validate ID:
 * A real-time check to ensure the Product ID entered is unique.
 * Adds a red border (Bootstrap 'is-invalid' class) if a duplicate is found.
 */
const validateId = () => {
  const isDuplicateId = products.find(
    (val) => val.id === Number(productId.value),
  );

  // Allow blank input (let HTML5 required handle it), but block duplicates
  if (!isDuplicateId || productId.value.trim() === "") {
    productId.classList.remove("is-invalid");
  } else {
    productId.classList.add("is-invalid");
    submitBtn.disabled = true;
  }
};

/**
 * Validate Modal Form Values:
 * Comprehensive check that runs on every input change. 
 * Enables the Submit/Update button only when all fields are valid.
 */
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

  // Enable/Disable Submit button based on form validity
  submitBtn.disabled = !isFormValid;
};

/**
 * Reset Values of Form Modal:
 * A lifecycle event listener that clears all data when the modal is closed.
 * Ensures the next time it opens, it is clean and in 'Add New' mode.
 */
addOrUpdateProduct.addEventListener("hidden.bs.modal", () => {
  // Clear all values
  productId.value = "";
  productName.value = "";
  productDesc.value = "";
  productPrice.value = "";
  productCategory.value = "";
  productStock.value = "";

  // Restore default UI headers/buttons
  document.getElementById("modalHeader").src = "../Images/add-product.png";
  document.getElementById("formModalLabel").textContent = "Add New Product";

  submitBtn.textContent = "Submit";
  submitBtn.disabled = true;
  editingId = null; // Clear edit tracking
});
