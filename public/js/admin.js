document.getElementsByClassName('create')[0].addEventListener('click', createProduct);

const saveButtons = document.querySelectorAll('.save');
saveButtons.forEach(button => button.addEventListener('click', updateProduct));

const deleteButtons = document.querySelectorAll('.delete');
deleteButtons.forEach(button => button.addEventListener('click', deleteProduct));

async function createProduct() {
    try {
        const response = await fetch('admin/createProduct', {
            method: 'post',
        });
        location.reload();
    } catch (err) {
        console.log(err);
    }
}

async function deleteProduct(e) {
    try {
        console.log(e);
        const id = e.srcElement.dataset.id;
        const response = await fetch('admin/deleteProduct', {
            method: 'delete',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                _id: id
            })
        });
        location.reload();
    } catch (err) {
        console.log(err)
    }
}

function updateProduct(e) {
    const id = e.srcElement.dataset.id;
    let form = new FormData(),
        file = document.getElementById('image' + id).files[0],
        request = new XMLHttpRequest();
    form.append("file", file, id);
    form.append("_id", id);
    form.append("name", document.getElementById('name' + id).value);
    form.append("price", document.getElementById('price' + id).value);
    form.append("featured", document.getElementById('featured' + id).checked);
    request.onreadystatechange = function () {
        if (this.readyState != 4) return;
        if (this.status == 200) {
            //var data = JSON.parse(this.responseText);
            //console.log(data);
            // Getting image url out of file source
            //const imageUrl = "https://fileuploadexample.abaanshanid.repl.co/uploads/" + data.filename;
            //document.getElementById("image").src = imageUrl;
        }
    };
    request.open("PUT", "/admin/updateProduct/", true);
    request.send(form);
}