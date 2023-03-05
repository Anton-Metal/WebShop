
//get cart 
function displayCart() {
	let cartCost = localStorage.getItem('totalCost')
	let cartItems = localStorage.getItem("productsInCart");
	//göra om till js objekt från json objekt 
	cartItems = JSON.parse(cartItems);




	let productContainer = document.getElementById("product");

	//check if cartItems exists and if productContainer exist on the page
	if (cartItems && productContainer) {
		// om det redan finns något på sidan så ska det vara empty
		productContainer.innerHTML = '';

		//loop through all of the cartItems 
		Object.values(cartItems).map(item => {
			productContainer.innerHTML += 
			`
			<div class="product">
			<ion-icon name="close-circle-outline"></ion-icon>
			<img src="${item.img}">
			<span>${item.name}</span>
			</div>
			<div class="price">${item.price}</div>
			<div class="quantity">
			<ion-icon name="arrow-back-circle-outline"></ion-icon>
			<span>${item.count}</span>
			<ion-icon name="arrow-forward-circle-outline"></ion-icon>
			</div>
			<div class="total">$${item.count * item.price},00</div>
		
			`
		})}
		productContainer.innerHTML +=
		`
		<div class="cartTotalContainer">
		<h4 class="cartTotalContainer">
		Basket Total
		</h4>

		<h4 class="cartTotal">
		$${cartCost}
		</h4>
		</div>
		
		`	
	
}
displayCart()