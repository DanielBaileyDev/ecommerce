document.getElementsByClassName('create')[0].addEventListener('click', createProduct);

const saveButtons = document.querySelectorAll('.save');
saveButtons.forEach(button=>button.addEventListener('click', updateProduct));

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