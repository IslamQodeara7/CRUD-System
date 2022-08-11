


particlesJS.load('particles-js', 'JS/particlesjs-config.json', function () {
    console.log('callback - particles.js config loaded');
});
var productNameInput = document.getElementById("productName");
var productPriceInput = document.getElementById("productPrice");
var productCategoryInput = document.getElementById("productCategory");
var productDescriptionInput = document.getElementById("productDescription");
var searchInput = document.getElementById("search");
let nAdd = document.querySelector('.no-add');
let yAdd = document.querySelector('.yes-add');
let yUpdate = document.querySelector('.yes-update');
let PrName = document.querySelector('.PrName');
let PrPrice = document.querySelector('.PrPrice');
let PrNameTest = /^[a-zA-Z]{2}([a-zA-Z 0-9!@#%^&*+-_]{1,20})?$/
searchInput.value = '';
var productlist = [];
nAdd.style.display = 'none';
yAdd.style.display = 'none';
yUpdate.style.display = 'none';
PrPrice.style.display = 'none';
PrName.style.display = 'none';
if (localStorage.getItem("productData") != null) {
    productlist = JSON.parse(localStorage.getItem("productData"));
    displayData();
}
else {
    productlist = [];
}
function addproduct() {
    if (productNameInput.value && productPriceInput.value && productCategoryInput.value) {
        
     if(PrNameTest.test(productNameInput.value)){
      if(Number(productPriceInput.value)>=2000&&
      Number(productPriceInput.value)<=50000){
        var product = {
            name: productNameInput.value,
            price: productPriceInput.value,
            category: productCategoryInput.value,
            desc: productDescriptionInput.value,


        }

        productlist.push(product);
        localStorage.setItem("productData", JSON.stringify(productlist));
        yAdd.style.display = "block";
        nAdd.style.display = "none";
        yUpdate.style.display = "none";
        PrPrice.style.display = 'none';
        PrName.style.display = 'none';
        clearForm(); 
      }
      else{
        PrPrice.style.display="block";
      }
     }
     else{
        PrName.style.display = "block";
     }
    }
    else{
        yAdd.style.display = "none";
        nAdd.style.display = "block";
        yUpdate.style.display = "none";
        PrName.style.display = "none";
        PrPrice.style.display = "none";
    }
    displayData()
}

function displayData() {
    var temp = " ";
    for (var i = 0; i < productlist.length; i++) {
        temp += `<tr class="text-center">
<td>${i + 1}</td>
<td>${productlist[i].name}</td>
<td>${productlist[i].price}</td>
<td>${productlist[i].category}</td>
<td>${productlist[i].desc}</td>
<td><button class="buttonTest button2" onclick="updateItem(${i})">Update <i class="fa-solid fa-triangle-exclamation mx-2"></i></button></td>
<td><button class="buttonTest button3" onclick="deleteProduct(${i})">Delete <i class="fa-solid fa-minus mx-2"></i></button></td>
</tr>    `}
    document.getElementById("tableBody").innerHTML = temp;
}

function deleteProduct(index) {
    productlist.splice(index, 1);
    localStorage.setItem("productData", JSON.stringify(productlist));
    displayData();
}
var helper = -1;
function updateItem(index) {
    helper = index;
    productNameInput.value = productlist[index].name;
    productPriceInput.value = productlist[index].price;
    productCategoryInput.value = productlist[index].category;
    productDescriptionInput.value = productlist[index].desc;
    document.getElementById("addButton").style = "display:none;";
    document.getElementById("editButton").style = "display:inline;";
}
function editItem() {
   if(productNameInput.value&&productPriceInput.value&&productCategoryInput.value){
   if(PrNameTest.test(productNameInput.value)){
    if(Number(productPriceInput.value)>=2000&&
    Number(productPriceInput.value)<=50000){
        productlist[helper].name = productNameInput.value;
        productlist[helper].price = productPriceInput.value;
        productlist[helper].category = productCategoryInput.value;
        productlist[helper].desc = productDescriptionInput.value;
        localStorage.setItem("productData", JSON.stringify(productlist));
        document.getElementById("addButton").style = "display:inline;";
        document.getElementById("editButton").style = "display:none;";
        yAdd.style.display = "none";
        nAdd.style.display = "none";
        yUpdate.style.display = "block";
        PrName.style.display = "none";
        PrPrice.style.display = "none";

    }
    else{
        PrPrice.style.display = "block";
    }

   }
   else{
    PrName.style.display = "block";
   }
   }
   else{
    document.getElementById("addButton").style = "display:none;";
    document.getElementById("editButton").style = "display:inline;";
    yAdd.style.display = "none";
    nAdd.style.display = "block";
    yUpdate.style.display = "none";
    PrName.style.display = "none";
    PrPrice.style.display = "none";
   }
    displayData();
   
}

function clearForm() {
    productNameInput.value = "";
    productPriceInput.value = "";
    productCategoryInput.value = "";
    productDescriptionInput.value = "";
}

function search() {
    var searchResult = "";
    var searchValue = searchInput.value;
    for (var i = 0; i < productlist.length; i++) {
        if (productlist[i].name.includes(searchValue)
            || productlist[i].category.includes(searchValue)) {
                var proName = productlist[i].name
                var proCategory = productlist[i].category;

               proName= proName.replace(searchValue,`<span class='text-danger fs-3'>${searchValue}</span>`)
               proCategory = proCategory.replace(searchValue,`<span class='text-danger fs-3'>${searchValue}</span>`)
            searchResult += `<tr class="text-center">
           <td>${i+1}</td>
           <td>${proName}</td>
           <td>${productlist[i].price}</td>
           <td>${proCategory}</td>
           <td>${productlist[i].desc}</td>
           <td><button class="btn btn-outline-warning" onclick="updateItem(${i})">Update</button></td>
           <td><button class="btn btn-outline-danger" onclick="deleteProduct(${i})">Delete</button></td>
           </tr>    `;
        }
    }
    document.getElementById("tableBody").innerHTML = searchResult;
}