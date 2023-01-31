var proArray = [];
var setVal;
var getVal;
var proId;
var proName;
var proImage;
var proPrice;
var proDecpt;
getStoreData();
function formData() {
    getFormValue();
    createArray();
    storeData();
}

function getFormValue() {
    proId = document.getElementById('productId').value;
    proName = document.getElementById('ProductName').value;
    proImage = document.getElementById('image').value;
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

function getStoreData(){
    getVal = btnValueGet();
    var table = document.getElementById("proDetails");
    for(let i=0;i<getVal;i++){
        let pro = "productValue" + i;
        var row = table.insertRow(i);
        var data = JSON.parse(localStorage.getItem(pro));
        for (let j = 0 ;j < data.length+1 ;j++ )
        {
            var cell = row.insertCell(j);
            if(j==5)
            {
                cell.innerHTML = "<button>Update</button> <button>Delete</button>";
            }
            else
            {
                cell.innerHTML = data[j];
            } 
        }
        console.log(pro);  
        
    }
    
}

function btnValueSet(setVal) {
    localStorage.setItem('btnVal', JSON.stringify(setVal));
}

function btnValueGet() {
    var data = JSON.parse(localStorage.getItem('btnVal'));
    return data;
}