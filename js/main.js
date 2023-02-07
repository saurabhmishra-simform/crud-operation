var proArray = [];
var setVal;
var getVal;
var proId;
var proName;
var proImage;
var proPrice;
var proDecpt;
var pro;
var data;
var sortArr = [];
//defult data show
getStoreData(0)

function validateform(id) {
    getFormValue();
    var allowedExtensions = /(\.jpg|\.jpeg|\.png|\.jfif|\.gif)$/i;
    if (isNaN(proId) || proId < 1) {
        document.getElementById('errorMessageId').innerText = "Please input a number only!!";
    }
    else if (proName == null || proName == "") {
        document.getElementById('errorMessageName').innerText = "Please input a product name!!";
    }
    else if(!allowedExtensions.exec(proImage))
    {
        document.getElementById('errorMessageImage').innerText = "File type is not allowed!!";
        proImage.value = '';
        return false;
    }
    else if (isNaN(proPrice) || proPrice < 1) {
        document.getElementById('errorMessagePrice').innerText = "Please input a number only!!";
    }
    else {
        if(id=='add')
        {
            formData();
        }
        else
        {
            setEditdata(); 
        }
    }
}
//store data function
function formData() {
    getFormValue();
    createArray();
    storeData();
}
//get form value function
function getFormValue() {
    proId = document.getElementById('productId').value;
    proName = document.getElementById('ProductName').value;
    proImage = document.getElementById('image').files[0].name;
    proPrice = document.getElementById('price').value;
    proDecpt = document.getElementById('description').value;
}
//create array function
function createArray() {
    proArray.push(proId, proName, proImage, proPrice, proDecpt);
}
//store data function
function storeData() {
    let arrayJSON = JSON.stringify(proArray);
    getVal = btnValueGet();
    if (getVal == null) {
        localStorage.setItem('productValue0', arrayJSON);
        getVal += 1;
        btnValueSet(getVal);
    }
    else {
        let pro = "productValue" + getVal;
        localStorage.setItem(pro, arrayJSON);
        getVal += 1;
        btnValueSet(getVal);
    }
}
//store data function
function getStoreData(dataStore) {
    var table = document.getElementById("proDetails");
    if (dataStore == 'ser') { //search condition by search button
        var serData = document.getElementById('dataFilter').value;
        let ser = "productValue" + serData;
        var row = table.insertRow(0);
        var data = JSON.parse(localStorage.getItem(ser));
        for (let j = 0; j < data.length + 1; j++) {
            var cell = row.insertCell(j);
            if (j == 2) {
                cell.innerHTML = "<img src='" + 'img\\' + data[j] + "' width='60em'/>";
            }
            else if (j == 3) {
                cell.innerHTML = "₹ " + data[j];
            }
            else if (j == 5) {
                cell.innerHTML = "<button class='btn btn-primary' onclick='productUpdate(this.id)' id='" + ser + "'>Edit</button> <button class='btn btn-dander' onclick='productDelete(this.id)' id='" + ser + "'>Delete</button>";
            }
            else {
                cell.innerHTML = data[j];
            }
        }
        var tbodyRowCount = table.rows.length;
        for (let i = 0; i < tbodyRowCount; i++) {
            if (i > 0) {
                table.rows[i].style.display = "none";
            }
        }
    }
    else if (dataStore == 'pName') { //search condition by product name
        getVal = btnValueGet();
        for (let i = 0; i < getVal; i++) {
            pro = "productValue" + i;
            var data = JSON.parse(localStorage.getItem(pro));
            sortArr.push(data[1]);
        }
        sortArr.sort()
        console.log(sortArr.sort());
        var sortIndex = 0;
        for (let i = 0; i < getVal; i++) {
            pro = "productValue" + i;
            var row = table.insertRow(i);
            var data = JSON.parse(localStorage.getItem(pro));
            for (let j = 0; j < data.length + 1; j++) {
                var cell = row.insertCell(j);
                if (j == 1) {
                    cell.innerHTML = sortArr[sortIndex];
                    sortIndex++;
                }
                else if (j == 2) {
                    cell.innerHTML = "<img src='" + 'img\\' + data[j] + "' width='60em'/>";
                }
                else if (j == 3) {
                    cell.innerHTML = "₹ " + data[j];
                }
                else if (j == 5) {
                    cell.innerHTML = "<button class='btn btn-primary' onclick='productUpdate(this.id)' id='" + pro + "'>Edit</button> <button class='btn btn-danger' onclick='productDelete(this.id)' id='" + pro + "'>Delete</button>";
                }
                else {
                    cell.innerHTML = data[j];
                }
            }
        }
        var tbodyRowCount = table.rows.length;
        for (let i = 0; i < tbodyRowCount; i++) {
            if (i > 2) {
                table.rows[i].style.display = "none";
            }
        }
    }
    else if (dataStore == 'pricePro') { //search condition by product price
        getVal = btnValueGet();
        for (let i = 0; i < getVal; i++) {
            pro = "productValue" + i;
            var row = table.insertRow(i);
            var data = JSON.parse(localStorage.getItem(pro));
            sortArr.push(data[3]);
        }
        sortArr.sort()
        console.log(sortArr.sort());
        var sortIndex = 0;
        for (let i = 0; i < getVal; i++) {
            pro = "productValue" + i;
            var row = table.insertRow(i);
            var data = JSON.parse(localStorage.getItem(pro));
            for (let j = 0; j < data.length + 1; j++) {
                var cell = row.insertCell(j);
                if (j == 3) {
                    cell.innerHTML = sortArr[sortIndex];
                    sortIndex++;
                }
                else if (j == 2) {
                    cell.innerHTML = "<img src='" + 'img\\' + data[j] + "' width='60em'/>";
                }
                else if (j == 3) {
                    cell.innerHTML = "₹ " + data[j];
                }
                else if (j == 5) {
                    cell.innerHTML = "<button class='btn btn-primary' onclick='productUpdate(this.id)' id='" + pro + "'>Edit</button> <button class='btn btn-danger' onclick='productDelete(this.id)' id='" + pro + "'>Delete</button>";
                }
                else {
                    cell.innerHTML = data[j];
                }
            }
        }
        var tbodyRowCount = table.rows.length;
        for (let i = 0; i < tbodyRowCount; i++) {
            if (i > 2) {
                table.rows[i].style.display = "none";
            }
        }
    }
    else { //defult all local data display
        getVal = btnValueGet();
        for (let i = 0; i < getVal; i++) {
            pro = "productValue" + i;
            var row = table.insertRow(i);
            var data = JSON.parse(localStorage.getItem(pro));
            for (let j = 0; j < data.length + 1; j++) {
                var cell = row.insertCell(j);
                if (j == 2) {
                    cell.innerHTML = "<img src='" + 'img\\' + data[j] + "' width='60em'/>";
                }
                else if (j == 3) {
                    cell.innerHTML = "₹ " + data[j];
                }
                else if (j == 5) {
                    cell.innerHTML = "<button class='btn btn-primary' onclick='productUpdate(this.id)' id='" + pro + "'>Edit</button> <button class='btn btn-danger' onclick='productDelete(this.id)' id='" + pro + "'>Delete</button>";
                }
                else {
                    cell.innerHTML = data[j];
                }
            }
        }
    }
}
//product delete function
function productDelete(pro) {
    if (pro) {
        if (confirm("You want to delete your data!")) {
            localStorage.removeItem(pro);
            getVal -= 1;
            btnValueSet(getVal);
        }
    }
}
//product update function
function productUpdate(pro) {
    document.getElementById("btnSubmit").style.display = "none";
    document.getElementById("btnUpdate").style.display = "block";
    document.getElementById("showImage").style.display = "block";
    if (pro) {
        data = JSON.parse(localStorage.getItem(pro));
    }
    document.getElementById('productId').readOnly = true;
    editData();
}
function editData() {
    getEditData();
}
//get edited data
function getEditData() {
    proId = document.getElementById('productId').value = data[0];
    proName = document.getElementById('ProductName').value = data[1];
    document.getElementById("showImage").innerHTML = "<img src='" + 'img\\' + data[2] + "' width='120em'/>";
    proPrice = document.getElementById('price').value = data[3];
    proDecpt = document.getElementById('description').value = data[4];
}
function changeImage()
{
    proImage = document.getElementById('image').files[0].name;
    document.getElementById("showImage").innerHTML = "<img src='" + 'img\\' + proImage + "' width='120em'/>";
}
//update edited data
function updatedData() {
    proId = document.getElementById('productId').value;
    proName = document.getElementById('ProductName').value;
    proImage = document.getElementById('image').files[0].name;
    proPrice = document.getElementById('price').value;
    proDecpt = document.getElementById('description').value;
}
//store edited data
function setEditdata() {
    updatedData();
    createArray();
    if (pro) {
        if (confirm("You want to edit your data!")) {
            localStorage.setItem(pro, JSON.stringify(proArray));
        }
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
