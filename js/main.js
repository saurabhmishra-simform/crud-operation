var newProduct;
var productId;
var productName;
var productImage;
var productPrice;
var productMessage;
var productKey;
var data;
var product;
//defult data show
document.onload = showProduct();

//form validation
function validateform(id) {
    getFormValue();
    var allowedExtensions = /(\.jpg|\.jpeg|\.png|\.jfif|\.gif)$/i;
    if (isNaN(productId) || productId < 1) {
        document.getElementById('errorMessageId').innerText = "Please input a number only!!";
    }
    else if (productName == null || productName == "") {
        document.getElementById('errorMessageName').innerText = "Please input a product name!!";
    }
    else if (!allowedExtensions.exec(productImage)) {
        document.getElementById('errorMessageImage').innerText = "File type is not allowed!!";
        proImage.value = '';
        return false;
    }
    else if (isNaN(productPrice) || productPrice < 1) {
        document.getElementById('errorMessagePrice').innerText = "Please input a number only!!";
    }
    else {
        if (id == 'add') {
            formData();
            alert('Product added successfull!!');
        }
        else {
            setEditdata();
        }
    }
}

function validate() {
    productId = document.getElementById('productId').value;
    productName = document.getElementById('ProductName').value;
    product = JSON.parse(localStorage.getItem("productDetail"));
    product.forEach(function (element){
        if(element.id==productId)
        {
            let msg = "Product ID should be unique";
            alert(msg);
            return false;
        }
        if(element.name == productName)
        {
            let msg = "Product name should be unique";
            alert(msg);
            return false;
        }
    })
}
//store data function
function formData() {
    getProduct();
    createProduct();
    storeProduct();
    showProduct();
}
//get form value function
function getProduct() {
    productId = document.getElementById('productId').value;
    productName = document.getElementById('ProductName').value;
    productImage = document.getElementById('image').files[0].name;
    productPrice = document.getElementById('price').value;
    productMessage = document.getElementById('description').value;
}
//create array function
function createProduct() {
    newProduct = {
        id: productId,
        name: productName,
        price: productPrice,
        image: productImage,
        message: productMessage,
    };
}
//store data function
function storeProduct() {
    product = JSON.parse(localStorage.getItem('productDetail')) ?? [];
    product.push(newProduct)
    localStorage.setItem('productDetail', JSON.stringify(product));
}

function showProduct(ProductID) {
    let table = "";
    product = (ProductID) ? ProductID :  JSON.parse(localStorage.getItem("productDetail")) ?? [];
    product.forEach( function (element,i){
        table += `<tr>
                    <td>${element.id}</td>
                    <td>${element.name}</td>
                    <td><img src="img\\${element.image}" width="60em"/></td>
                    <td>${element.price} </td>
                    <td>${element.message}</td>
                    <td><button class='btn btn-primary' onclick='productUpdate(this.id)' id='${i}'>Edit</button> <button class='btn btn-danger' onclick='productDelete(this.id)' id='${i}'>Delete</button></td>
                  </tr>`;
    });
    document.getElementById("proDetails").innerHTML = table;
}

//product delete function
function productDelete(productKey) {
    product = JSON.parse(localStorage.getItem("productDetail")) ?? [] ;
    if (productKey) {
        if (confirm("You want to delete your data!")) {
            product.splice(productKey, 1);
            localStorage.setItem("productDetail", JSON.stringify(product));
        }
    }
    showProduct();
}

//product update function
var editProductKey;
function productUpdate(productKey) {
    document.getElementById("btnSubmit").style.display = "none";
    document.getElementById("btnUpdate").style.display = "block";
    document.getElementById("showImage").style.display = "block";
    if (productKey) {
        product = JSON.parse(localStorage.getItem("productDetail")) ?? [];
    }
    productId = document.getElementById('productId').value = product[productKey].id;
    productName = document.getElementById('ProductName').value = product[productKey].name;
    document.getElementById("showImage").innerHTML = "<img src='" + 'img\\' + product[productKey].image + "' width='120em'/>";
    productPrice = document.getElementById('price').value = product[productKey].price;
    productDecpt = document.getElementById('description').value = product[productKey].message;
    document.getElementById('productId').readOnly = true;
    editProductKey = productKey;
}
//get edited 
function changeImage() {
    productImage = document.getElementById('image').files[0].name;
    document.getElementById("showImage").innerHTML = "<img src='" + 'img\\' + productImage + "' width='120em'/>";
}
//store edited data
function setEditdata() {
    product[editProductKey].name = document.getElementById('ProductName').value;
    product[editProductKey].price = document.getElementById('price').value;
    product[editProductKey].image = document.getElementById('image').files[0].name
    product[editProductKey].message = document.getElementById('description').value
    if (confirm("You want to edit your data!")) {
        localStorage.setItem('productDetail', JSON.stringify(product));
    }
    showProduct();
}

// // sorting Function
function sortPrice(id)
{
    let lowPrice = document.getElementById('sortHighToLow');
    let highPrice = document.getElementById('sortLowToHigh');
    lowPrice.style.display = (id=='sortLowToHigh') ? 'block' : 'none';
    highPrice.style.display = (id=='sortLowToHigh') ? 'none' : 'block';
}
function sortProduct(id)
{
    data = JSON.parse(localStorage["productDetail"]);
    switch(id)
    {
        case 'sortLowToHigh':
            sortPrice(id);
            data.sort((a, b) => { return a.price - b.price; });
            break;
        case 'sortHighToLow':
            sortPrice(id);
            data.sort((a, b) => { return b.price - a.price; });
            break;
        case 'sortId':
            data.sort((a, b) => { return a.id - b.id; });
            break;
        case 'sortName':
            data.sort((a, b) => { return a.name.toString().localeCompare(b.name.toString());});
            break;
    }
    localStorage.setItem('productDetail', JSON.stringify(data));
    showProduct();
}

function searchId()
{
    var ProductID;
    product = JSON.parse(localStorage.getItem("productDetail"));
    var searchData = document.getElementById('dataFilter').value;
    ProductID=product.filter((productSearch) => productSearch['id'].toLowerCase().includes(searchData.toLowerCase()));
    showProduct(ProductID);
}

