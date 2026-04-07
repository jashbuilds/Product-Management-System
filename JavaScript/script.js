// async function addData() {
//   const response = await fetch(
//     "https://ca3fa17a8f3d3f536b1a.free.beeceptor.com/api/products",
//     {
//         method: "POST",
//         body: JSON.stringify({
//             id: 1,
//             name: "Smart_Phone",
//             description: "OnePlus Nord CE 3 Lite 5G",
//             price: 20000,
//             category: "Electronics",
//             stock: 200,
//         }),
//         headers: {
//             "Content-type": "application/json; charset=UTF-8"
//         }
//     }
//   );
//   console.log(response);
// }
// addData()

// async function getData() {
//   const response = await fetch(
//     "https://ca3fa17a8f3d3f536b1a.free.beeceptor.com/api/products",
//   ).then(response => {
//       console.log(response);
//   })
// }
// getData()

// fetch("https://fakestoreapi.com/products/2")
//   .then((res) => res.json())
//   .then((json) => console.log(json));

// axios
//   .delete("https://fakestoreapi.com/products/1")
//   .then((response) => console.log("Deleted Data:", response.data));

const product = {
  id: 21,
  name: "SmartPhone",
  description: "OnePlus Nord CE 3 Lite 5G",
  price: 20000,
  category: "Electronics",
  stock: 200,
};

// axios.post("https://fakestoreapi.com/products", product).then((response) => {
//   console.log("Product Added:", response.data);
// });

// axios
//   .get("https://fakestoreapi.com/products")
//   .then((response) => {
//     const data = response.data
//     console.log(data);

//     data.forEach(p => {
//       document.getElementById("dummyImg").setAttribute("src", p.image)
//       console.log(p.image);
//     })
//   })

axios
  .get("https://jsonplaceholder.typicode.com/users")
  .then((res) => console.log(res.data));
axios
  .post("https://jsonplaceholder.typicode.com/users", product)
  .then((res) => console.log(res.data));
axios
  .put("https://jsonplaceholder.typicode.com/users", {
    data: {
      id: 21,
      name: "SmartPhone",
      description: "OnePlus Nord CE 3 Lite 5G",
      price: 20000,
      category: "Electronics",
      stock: 200,
    },
  })
  .then((res) => console.log(res.data));
// axios.delete("https://jsonplaceholder.typicode.com/users/1").then(res => console.log(res.data))
