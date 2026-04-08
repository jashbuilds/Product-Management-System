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

const productGrid = document.getElementById("productGrid");

productGrid.innerHTML = products
  .map(
    (product) =>
      `
       <div class="col-12 col-lg-3 col-md-6 d-flex justify-content-center align-items-center">
          <div class="card w-100 border rounded-4 h-auto">
            <div class="card-body">
              <div class="h5 card-title mb-3">${product.name}</div>

              <p class="card-text">Description: ${product.description}</p>
              
              <p class="card-text">Category: ${product.category}</p>

              <div class="d-flex justify-content-between">
                <p class="card-text">Price: <span>$${product.price.toFixed(2)}</span> </p>
                <p class="card-text">Stock: ${product.stock}</p>
              </div>
              <div class="d-flex justify-content-end align-items-center gap-2">
                <button class="btn btn btn-primary border border-0 rounded-2">Edit</button>
                <button class="btn btn btn-danger border border-0 rounded-2">Delete</button>
              </div>
            </div>
          </div>
       </div>`,
  )
  .join("");
