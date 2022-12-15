let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");

//Open Cart
cartIcon.onclick = () =>{
    cart.classList.add('active')
}
  
// Close Cart
closeCart.onclick = () =>{
    cart.classList.remove("active");
};

//check working cart
if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

//make cart fuction
function ready() {
  //remove items
  var removeCartButtons = document.getElementsByClassName("cart-remove");
  for (var i = 0; i < removeCartButtons.length; i++) {
    var button = removeCartButtons[i];
    button.addEventListener("click", removeCartItem);
  }

  // Quantity changes step1
  var quantityInputs = document.getElementsByClassName("cart-quantity");
  for (var i = 0; i < quantityInputs.length; i++) {
    var input = quantityInputs[i];
    input.addEventListener("change", quantityChanged);
  }

  // Add To Cart
  var addCart = document.getElementsByClassName("add-cart");
  for (var i = 0; i < addCart.length; i++) {
    var button = addCart[i];
    button.addEventListener("click", addCartClicked);
  }

  // buy button work
  document
    .getElementsByClassName("btn-buy")[0]
    .addEventListener("click", buyButtonClicked);
}

// buy button
function buyButtonClicked() {
  alert("Your Order is placed");
  var carContent = document.getElementsByClassName("cart-content")[0];
  while (carContent.hasChildNodes()) {
    carContent.removeChild(carContent.firstChild);
    
  }
  updateTotal();
}

//remove  item from cart
const removeCartItem = (e) => {
  let buttonClicked = e.target;
  buttonClicked.parentElement.remove();
  updateTotal();
};

// Quantity change tep2
function quantityChanged(e) {
  var input = e.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateTotal();
}

// Add To cart
function addCartClicked(event) {
  var button = event.target;
  var shopitem = button.parentElement;
  var title = shopitem.getElementsByClassName("product-title")[0].innerText;
  var price = shopitem.getElementsByClassName("price")[0].innerText;
  var productImg = shopitem.getElementsByClassName("product-img")[0].src;
  addProductToCart(title, price, productImg);
  updateTotal();
}
function addProductToCart(title, price, productImg) {
  var cartShopBox = document.createElement("div");
  cartShopBox.classList.add("cart-box");
  var cartItems = document.getElementsByClassName("cart-content")[0];
  var cartItemNames = cartItems.getElementsByClassName("cart-product-title");
  for (var i = 0; i < cartItemNames.length; i++) {
    if (cartItemNames[i].innerText == title) {
      alert("This item is already in cart");
      return;
    }
  }


var cartBoxContent = `<img src="${productImg}" alt="" class="cart-img">
                <div class="detail-box">
              <div class="cart-product-title">${title}</div>
               <div class="cart-price">${price}</div>
    <input type="number" value="1" class="cart-quantity">
</div>
<!---remove cart---->
<i class='bx bxs-trash-alt cart-remove'></i>`;

cartShopBox.innerHTML = cartBoxContent;
cartItems.append(cartShopBox);
cartShopBox
  .getElementsByClassName("cart-remove")[0]
  .addEventListener("click", removeCartItem);
cartShopBox
  .getElementsByClassName("cart-quantity")[0]
  .addEventListener("change", quantityChanged);
}


//update Total
function updateTotal() {
  var cartContent = document.getElementsByClassName("cart-content")[0];
  var cartBoxes = cartContent.getElementsByClassName("cart-box");
  var total = 0;
  for (var i = 0; i < cartBoxes.length; i++) {
    var cartBox = cartBoxes[i];
    var priceElement = cartBox.getElementsByClassName("cart-price")[0];
    var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
    var price = parseFloat(priceElement.innerText.replace("$", ""));
    var quantity = quantityElement.value;
    total = total + price * quantity;
  }
    //if price is in decimal
    total = Math.round(total * 100) / 100;

    document.getElementsByClassName("total-price")[0].innerText = "$" + total;
  
}
