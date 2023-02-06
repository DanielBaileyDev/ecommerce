function searchProducts() {
    var input, filter, txtValue;
    input = document.getElementById('search-input');
    filter = input.value.toUpperCase();
    products = document.getElementsByClassName("product");
  
    for (let i = 0; i < products.length; i++) {
      let productName = products[i].getElementsByClassName('product-name')[0];
      txtValue = productName.textContent || productName.innerText || productName.value;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        products[i].style.display = "";
      } else {
        products[i].style.display = "none";
      }
    }
  }