document.getElementsByClassName('create')[0].addEventListener('click', createProduct);

const saveButtons = document.querySelectorAll('.save');
saveButtons.forEach(button => button.addEventListener('click', updateProduct));

const deleteButtons = document.querySelectorAll('.delete');
deleteButtons.forEach(button => button.addEventListener('click', deleteProduct));

async function createProduct() {
    try {
        await fetch('admin/createProduct', {
            method: 'post',
        }).then(res => location.reload());
    } catch (err) {
        console.log(err);
    }
}

async function deleteProduct(e) {
    try {
        const id = e.srcElement.dataset.id;
        await fetch('admin/deleteProduct', {
            method: 'delete',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                _id: id
            })
        }).then(res => location.reload());
    } catch (err) {
        console.log(err)
    }
}

function updateProduct(e) {
    const id = e.srcElement.dataset.id;
    let form = new FormData(),
        file = document.getElementById('image' + id).files[0],
        request = new XMLHttpRequest();
    if (file)
        form.append("file", file, id);
    form.append("_id", id);
    form.append("name", document.getElementById('name' + id).value);
    form.append("price", document.getElementById('price' + id).value);
    form.append("description", document.getElementById('description' + id).value);
    form.append("featured", document.getElementById('featured' + id).checked);
    request.open("PUT", "/admin/updateProduct", true);
    request.onreadystatechange = function () {
        location.reload();
    };
    request.send(form);
}

function changeImage(id) {
    document.getElementById("image" + id).click();
}

function previewFile(input, id) {
    let reader = new FileReader();
    reader.onload = function (e) {
        document.getElementById('output' + id).src = e.target.result;
    }
    reader.readAsDataURL(input.files[0]);
}

var currencyInput = document.querySelectorAll('input[type="currency"]');
var currency = 'AUD';

for (let i = 0; i < currencyInput.length; i++) {
    onBlur({ target: currencyInput[i] });
    currencyInput[i].addEventListener('focus', onFocus);
    currencyInput[i].addEventListener('blur', onBlur);
}

function localStringToNumber(s) {
    return Number(String(s).replace(/[^0-9.]+/g, ""));
}

function onFocus(e) {
    var value = e.target.value;
    e.target.value = value ? localStringToNumber(value) : '';
}

function onBlur(e) {
    var value = e.target.value;

    var options = {
        maximumFractionDigits: 2,
        currency: currency,
        style: "currency",
        currencyDisplay: "symbol"
    }

    e.target.value = (value || value === 0)
        ? localStringToNumber(value).toLocaleString(undefined, options)
        : '';
}