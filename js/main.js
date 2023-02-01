var proArray = [];
var setVal;
var getVal;
var proId;
var proName;
var proImage;
var proPrice;
var proDecpt;
var dataSearch = 0;
if (dataSearch == 0) {
    getStoreData();
}
function formData() {
    getFormValue();
    createArray();
    storeData();
}

function getFormValue() {
    proId = document.getElementById('productId').value;
    proName = document.getElementById('ProductName').value;
    proImage = document.getElementById('image').files[0].name;
    proPrice = document.getElementById('price').value;
    proDecpt = document.getElementById('description').value;
}

function createArray() {
    proArray.push(proId, proName, proImage, proPrice, proDecpt);
}

function storeData() {
    getVal = btnValueGet();
    //console.log(getVal);
    if (getVal == null) {
        localStorage.setItem('productValue0', JSON.stringify(proArray));
        getVal += 1;
        btnValueSet(getVal);
    }
    else {
        let pro = "productValue" + getVal;
        localStorage.setItem(pro, JSON.stringify(proArray));
        getVal += 1;
        btnValueSet(getVal);
    }

}
var pro;
function getStoreData() {
    getVal = btnValueGet();
    var table = document.getElementById("proDetails");
    for (let i = 0; i < getVal; i++) {
        pro = "productValue" + i;
        var row = table.insertRow(i);
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

function productDelete(pro) {
    if (pro) {
        localStorage.removeItem(pro);
        getVal -= 1;
        btnValueSet(getVal);
        alert("Recorde Deleted!!");
    }
}
var data;
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
                                                                    <input type="text" class="form-control" name="productId" id="editProId">
                                                                </div>
                                                                <div class="col-md-6">
                                                                    <label for="ProductName" class="form-label">Product Name</label>
                                                                    <input type="text" class="form-control" name="ProductName" id="editProName">
                                                                </div>
                                                                <div class="col-md-6">
                                                                    <label for="selectImage" class="form-label"> Select Image</label>
                                                                    <input class="form-control" type="file" id="editimage">
                                                                </div>
                                                                <div class="col-md-6">
                                                                    <label for="Price" class="form-label">Price</label>
                                                                    <input type="text" class="form-control" id="editprice">
                                                                </div>
                                                                <div class="col-12">
                                                                    <label for="Description" class="form-label">Description</label>
                                                                    <textarea class="form-control" id="editdescription" rows="3"></textarea>
                                                                </div>
                                                                <div class="col-12">
                                                                    <button type="button" class="btn btn-primary" onclick="setEditdata()">Submit</button>
                                                                </div>
                                                            </form>
                                                        </div>`;
    getEditData();
}

function getEditData() {
    proId = document.getElementById('editProId').value = data[0];
    proName = document.getElementById('editProName').value = data[1];
    proPrice = document.getElementById('editprice').value = data[3];
    proDecpt = document.getElementById('editdescription').value = data[4];

}

function updatedData() {
    proId = document.getElementById('editProId').value;
    proName = document.getElementById('editProName').value;
    proImage = document.getElementById('editimage').files[0].name;
    proPrice = document.getElementById('editprice').value;
    proDecpt = document.getElementById('editdescription').value;
}
function setEditdata() {
    updatedData();
    createArray();
    if (pro) {
        localStorage.setItem(pro, JSON.stringify(proArray));
    }
}
function search() {
    var serData = document.getElementById('dataFilter').value;
    let ser = "productValue" + serData;   
    var table = document.getElementById("proDetails");
    var row = table.insertRow(1);
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
    dataSearch = dataSearch + 1;
}
function btnValueSet(setVal) {
    localStorage.setItem('btnVal', JSON.stringify(setVal));
}

function btnValueGet() {
    var data = JSON.parse(localStorage.getItem('btnVal'));
    return data;
}