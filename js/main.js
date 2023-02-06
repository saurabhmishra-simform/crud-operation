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
var count = 0;
//defult data show
if(count == 0)
{
    getStoreData(0)
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
            else if (j == 5) {
                cell.innerHTML = "<button class='btn btn-primary' onclick='productUpdate(this.id)' id='" + ser + "'>Update</button> <button class='btn btn-primary' onclick='productDelete(this.id)' id='" + ser + "'>Delete</button>";
            }
            else {
                cell.innerHTML = data[j];  
            }
        }
        var tbodyRowCount = table.rows.length;
        for(let i=0;i<tbodyRowCount;i++)
        {
            if(i>0)
            {
                table.rows[i].style.display = "none";
            }
        }
    }
    else if (dataStore == 'pName') { //search condition by product name
        getVal = btnValueGet();
        for (let i = 0; i < getVal; i++) {
            pro = "productValue" + i;
            var row = table.insertRow(i);
            var data = JSON.parse(localStorage.getItem(pro));
            sortArr.push(data[1]);
        }
        sortArr.sort()
        console.log(sortArr.sort()[0]);
        for (let i = 0; i < getVal; i++) {
            pro = "productValue" + i;
            var row = table.insertRow(i);
            var data = JSON.parse(localStorage.getItem(pro));
            for (let j = 0; j < data.length + 1; j++) {
                var cell = row.insertCell(j);
                var st = sortArr[j];
                if (j == 1) {
                    cell.innerHTML = st;
                }
                else if (j == 2) {
                    cell.innerHTML = "<img src='" + 'img\\' + data[j] + "' width='60em'/>";
                }
                else if (j == 5) {
                    cell.innerHTML = "<button class='btn btn-primary' onclick='productUpdate(this.id)' id='" + pro + "'>Update</button> <button class='btn btn-primary' onclick='productDelete(this.id)' id='" + pro + "'>Delete</button>";
                }
                else {
                    cell.innerHTML = data[j];
                }
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
            sortArr.sort();
            for (let j = 0; j < data.length + 1; j++) {
                var cell = row.insertCell(j);
                if (j == 2) {
                    cell.innerHTML = "<img src='" + 'img\\' + data[j] + "' width='60em'/>";
                }
                else if (j == 3) {
                    cell.innerHTML = sortArr[j]
                }
                else if (j == 5) {
                    cell.innerHTML = "<button class='btn btn-primary' onclick='productUpdate(this.id)' id='" + pro + "'>Update</button> <button class='btn btn-primary' onclick='productDelete(this.id)' id='" + pro + "'>Delete</button>";
                }
                else {
                    cell.innerHTML = data[j];
                }
            }
        }
    }
    else { //defult all local data display
        getVal = btnValueGet(); 
        console.log(count);
        for (let i = 0; i < getVal; i++) {
            pro = "productValue" + i;
            var row = table.insertRow(i);
            if(count == 1)
            {
                row.style.display = "none";
            }
            var data = JSON.parse(localStorage.getItem(pro));
            for (let j = 0; j < data.length + 1; j++) {
                var cell = row.insertCell(j);
                if (j == 2) {
                    cell.innerHTML = "<img src='" + 'img\\' + data[j] + "' width='60em'/>";
                }
                else if (j == 5) {
                    cell.innerHTML = "<button class='btn btn-primary' onclick='productUpdate(this.id)' id='" + pro + "'>Update</button> <button class='btn btn-primary' onclick='productDelete(this.id)' id='" + pro + "'>Delete</button>";
                }
                else {
                    cell.innerHTML = data[j];
                }
            }
        }
    }
    count = 1;
}
//product delete function
function productDelete(pro) {
    if (pro) {
        localStorage.removeItem(pro);
        getVal -= 1;
        btnValueSet(getVal);
        alert("Recorde Deleted!!");
    }
}
//product update function
function productUpdate(pro) {
    if (pro) {
        data = JSON.parse(localStorage.getItem(pro));
    }
    editData();
}
function editData() {
    document.getElementById('editdata').innerHTML = ` <br/><hr/>  <div class="container my-3">
                                                        <h1 class="text-center"><u><i>Edit Product Data</i></u></h1>
                                                        </div>
                                                        <div class="container my-5">
                                                            <form action="#" method="post" class="row g-3">
                                                                <div class="col-md-6">
                                                                    <label for="productId" class="form-label">Product ID</label>
                                                                    <input type="text" class="form-control" name="productId" id="editProId" readonly>
                                                                </div>
                                                                <div class="col-md-6">
                                                                    <label for="ProductName" class="form-label">Product Name</label>
                                                                    <input type="text" class="form-control" name="ProductName" id="editProName" required>
                                                                </div>
                                                                <div class="col-md-6">
                                                                    <label for="selectImage" class="form-label"> Select Image</label>
                                                                    <input class="form-control" type="file" id="editimage" required>
                                                                </div>
                                                                <div class="col-md-6">
                                                                    <label for="Price" class="form-label">Price</label>
                                                                    <input type="text" class="form-control" id="editprice" required>
                                                                </div>
                                                                <div class="col-12">
                                                                    <label for="Description" class="form-label">Description</label>
                                                                    <textarea class="form-control" id="editdescription" rows="3" required></textarea>
                                                                </div>
                                                                <div class="col-12">
                                                                    <button type="button" class="btn btn-primary" onclick="setEditdata()">Submit</button>
                                                                </div>
                                                            </form>
                                                        </div>`;
    getEditData();
}
//get edited data
function getEditData() {
    proId = document.getElementById('editProId').value = data[0];
    proName = document.getElementById('editProName').value = data[1];
    proPrice = document.getElementById('editprice').value = data[3];
    proDecpt = document.getElementById('editdescription').value = data[4];
}
//update edited data
function updatedData() {
    proId = document.getElementById('editProId').value;
    proName = document.getElementById('editProName').value;
    proImage = document.getElementById('editimage').files[0].name;
    proPrice = document.getElementById('editprice').value;
    proDecpt = document.getElementById('editdescription').value;
}
//store edited data
function setEditdata() {
    updatedData();
    createArray();
    if (pro) {
        localStorage.setItem(pro, JSON.stringify(proArray));
        alert("Recorde Updated!!");
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
