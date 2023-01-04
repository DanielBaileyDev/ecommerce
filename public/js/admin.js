document.getElementsByClassName('create')[0].addEventListener('click', createProduct);

const saveButtons = document.querySelectorAll('.save');
saveButtons.forEach(button=>button.addEventListener('click', /*updateProduct*/uploadImage));

const deleteButtons = document.querySelectorAll('.delete');
deleteButtons.forEach(button=>button.addEventListener('click', deleteProduct));

async function createProduct(){
    try{
        const response = await fetch('admin/createProduct', {
            method: 'post',
        });
        location.reload();
    }catch(err){
        console.log(err)
    }
}

async function updateProduct(e){
    try{
        const id = e.srcElement.dataset.id;
        const response = await fetch('admin/updateProduct', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                _id: id,
                name: document.getElementById('name'+id).value,
                price: document.getElementById('price'+id).value,
                featured: document.getElementById('featured'+id).checked
            })
        });
        location.reload();
    }catch(err){
        console.log(err)
    }
}

async function deleteProduct(e){
    try{
        console.log(e);
        const id = e.srcElement.dataset.id;
        const response = await fetch('admin/deleteProduct', {
            method: 'delete',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                _id: id
            })
        });
        location.reload();
    }catch(err){
        console.log(err)
    }
}

// Multer
function uploadImage(e) {
    //  Uploading image, this does all the magic!, the file variable can also be a blob file
    const id = e.srcElement.dataset.id;
    let form = new FormData(),
        file = document.getElementById('image'+id).files[0],
        request = new XMLHttpRequest();
    form.append("file", file, id);
    form.append("_id", id);
    form.append("name", document.getElementById('name'+id).value);
    form.append("price", document.getElementById('price'+id).value);
    form.append("featured", document.getElementById('featured'+id).checked);
    //form.append();
    request.onreadystatechange = function() {
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