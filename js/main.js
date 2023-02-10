var productArray = [];
var setVal;
var getVal;
var productId;
var productName;
var productImage;
var productPrice;
var productMessage;
var productKey;
let price;
var sortVal;
var table;
var data;
var row;
var sortArr = [];
//defult data show
getStoreData(0)
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
//store data function
function formData() {
    getFormValue();
    createArray();
    storeData();
    getStoreData(0);
    showTable(0)
}
//get form value function
function getFormValue() {
    productId = document.getElementById('productId').value;
    productName = document.getElementById('ProductName').value;
    productImage = document.getElementById('image').files[0].name;
    productPrice = document.getElementById('price').value;
    productMessage = document.getElementById('description').value;
}
//create array function
function createArray() {
    productArray.push(productId, productName, productImage, productPrice, productMessage);
}
//store data function
function storeData() {
    let arrayJSON = JSON.stringify(productArray);
    getVal = btnValueGet();
    if (getVal == null) {
        localStorage.setItem('productValue0', arrayJSON);
        getVal += 1;
        btnValueSet(getVal);
    }
    else {
        productKey = "productValue" + getVal;
        localStorage.setItem(productKey, arrayJSON);
        getVal += 1;
        btnValueSet(getVal);
    }
}
function validate() { 
    getVal = btnValueGet();
    productId = document.getElementById('productId').value;
    productName = document.getElementById('ProductName').value;
    for (let i = 0; i < getVal; i++) {
        productKey = "productValue" + i;
        var data = JSON.parse(localStorage.getItem(productKey));
        console.log(data[0]);
        if(productId == data[0])
        {
            let msg = "Product ID should be unique"; 
            alert(msg);
            return false; 
        }
        if(productName == data[1])
        {
            let msg = "Product name should be unique"; 
            alert(msg);
            return false; 
        }
    }
}
//store data function
function getStoreData(dataStore) {
    table = document.getElementById("proDetails");
    getVal = btnValueGet();
    sortVal = getVal-1;
    if (dataStore == 'searchById') { //search condition by search button
        var searchData = document.getElementById('dataFilter').value;
        productKey = "productValue" + searchData;
        row = table.insertRow(0);
        showProduct();
        showTable(dataStore);    
    }
    else if (dataStore == 'pName') { //search condition by product name
        sortProduct();
    }
    else if (dataStore == 'pricePro') { //search condition by product price
        sortProduct();
    }
    else { //defult all local data display
        getVal = btnValueGet();
        for (let i = 0; i < getVal; i++) {
            productKey = "productValue" + i;
            row = table.insertRow(i);
            showProduct();
        }
    }
}
function showProduct()
{
    data = JSON.parse(localStorage.getItem(productKey));
    for (let j = 0; j < data.length + 1; j++) {
        var cell = row.insertCell(j);
        if (j == 2) {
            cell.innerHTML = "<img src='" + 'img\\' + data[j] + "' width='60em'/>";
        }
        else if (j == 3) {
            price = Number(data[j]).toFixed(2)
            cell.innerHTML = "₹ " + price;
        }
        else if (j == 5) {
            cell.innerHTML = "<button class='btn btn-primary' onclick='productUpdate(this.id)' id='" + productKey + "'>Edit</button> <button class='btn btn-danger' onclick='productDelete(this.id)' id='" + productKey + "'>Delete</button>";
        }
        else {
            cell.innerHTML = data[j];
        }
    }
}
function sortProduct()
{
    for (let i = 0; i < getVal; i++) {
        productKey = "productValue" + sortVal;
        sortVal--;
        row = table.insertRow(i);
        showProduct();
        showTable(0); 
    }
    
}
function showTable(dataStore)
{
    var tbodyRowCount = table.rows.length;
    for (let i = 0; i < tbodyRowCount; i++) {
        if(dataStore == 'searchById')
        {
            if (i > 0) {
                table.rows[i].style.display = "none";
            }
        }
        else
        {
            if (i > getVal - 1) {
                table.rows[i].style.display = "none";
            }
        } 
    }
}
//product delete function
function productDelete(productKey) {
    if (productKey) {
        if (confirm("You want to delete your data!")) {
            localStorage.removeItem(productKey);
            getVal -= 1;
            btnValueSet(getVal);
        }
        getStoreData(0);
        showTable(0)
    }
}
//product update function
var editProductKey;
function productUpdate(productKey) {
    document.getElementById("btnSubmit").style.display = "none";
    document.getElementById("btnUpdate").style.display = "block";
    document.getElementById("showImage").style.display = "block";
    if (productKey) {
        data = JSON.parse(localStorage.getItem(productKey));
    }
    document.getElementById('productId').readOnly = true;
    editProductKey = productKey;
    getEditData();
}
//get edited data
function getEditData() {
    productId = document.getElementById('productId').value = data[0];
    productName = document.getElementById('ProductName').value = data[1];
    document.getElementById("showImage").innerHTML = "<img src='" + 'img\\' + data[2] + "' width='120em'/>";
    productPrice = document.getElementById('price').value = data[3];
    productDecpt = document.getElementById('description').value = data[4];
}
function changeImage() {
    productImage = document.getElementById('image').files[0].name;
    document.getElementById("showImage").innerHTML = "<img src='" + 'img\\' + productImage + "' width='120em'/>";
}
//store edited data
function setEditdata() {
    getFormValue();
    createArray();
    if (editProductKey) {
        if (confirm("You want to edit your data!")) {
            localStorage.setItem(editProductKey, JSON.stringify(productArray));
        }
        getStoreData(0);
        showTable(0)
    }
}
//set key value
function btnValueSet(setVal) {
    localStorage.setItem('btnVal', JSON.stringify(setVal));
}
//set key value
function btnValueGet() {
    var data = JSON.parse(localStorage.getItem('btnVal'));
    return data;
}
