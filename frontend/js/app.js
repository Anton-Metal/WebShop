// "use strict";

let productsEL = document.getElementById("products");


let apiARRAY = [];

fetch('https://fakestoreapi.com/products/')
            .then(res=>res.json())
            .then(json=>getAPI(json))

function getAPI(output) {
				
	apiARRAY = (output)

	//loopa igenom arrayen
	for(let i = 0; i < apiARRAY.length; i++)




	productsEL.innerHTML += 
	`

	<div onclcik class="product-card">
	<a href="productpage.html">
	<div class="product-image">
		<img src="${apiARRAY[i].image}">
		</div>
		<div class="product-info">
		<h5>${apiARRAY[i].title}</h5>
		<h6>${apiARRAY[i].price}</h6>
	</a>
	<br>
	<input type='button' id=${apiARRAY[i].id} value='Add to cart' onclick='addToCart(this.id)'>
	</div>

		`

}


//POST spara användare 


let cartArray = [

];


function saveCountToCart() {
	//kollar om det finns något i localStorage 
	let productNumbers = localStorage.getItem('cartNumbers')

	if(productNumbers) {
		//tar id till mitt span element och tar det lika med antal värden i local storage
		document.getElementById("spanCount").textContent = productNumbers;
	}

}


//ska skappa en funtion som gör post anropet med fetc funktionen
function addToCart(clicked_id) {


	//tar från localStorage
	let productNumbers = localStorage.getItem('cartNumbers')
	

	productNumbers = parseInt(productNumbers);

	// om det inte finns något så kommer värdet bli NaN

//därför sätter jag cartNumbers till 1. Sen andra gången kommer jag få 1 från localStorage,
// då kommer cartNumbers = 1 blir  cartNumbers + 1 = 2
	if(productNumbers) {
		// kollar hur mycket det finns i localStorage och plusar på 1
	localStorage.setItem('cartNumbers', productNumbers + 1)
	document.getElementById("spanCount").textContent = productNumbers + 1;

	} else {
		// om det inte finns något värde så sätter jag 1
		localStorage.setItem('cartNumbers', 1)
		document.getElementById("spanCount").textContent = 1;

	}

	fetch('https://fakestoreapi.com/products/' + clicked_id)
	.then(res => res.json())
	.then(data => setItem(data));
	
}


function setItem(data) {
	let cartItems = localStorage.getItem('productsInCart');
	cartItems = cartItems ? JSON.parse(cartItems) : {};
  
	if (cartItems[data.id]) {
	  cartItems[data.id].count++;
	} else {
	  cartItems[data.id] = {
		id: data.id,
		name: data.title,
		price: data.price,
		img: data.image,
		count: 1
	  };
	}
  
	
	localStorage.setItem('productsInCart', JSON.stringify(cartItems));
	totalCost(cartItems[data.id].price);
  }
  
//total cost function
function totalCost(product) {
	//when we click the first time we add the first cost value to the localStorage
	//but to click the second time/ to increase and att more cost, i need to check if there is something in localStoragen first 
	let cartCost = localStorage.getItem('totalCost')
	
	
	console.log("cost", cartCost);
	console.log(typeof cartCost);

	//check if totalCost is null or not. if it is null i want to add the clicked cost
	// but if it is not null i want to add the cost. Current cost + new cost = totalcost
	if(cartCost != null) {
		//när man får något tillbaka från localStorage så är det en sträng 
		//men jag vill ha nummer -- konverterar  number från string
		//vi vill bara converrta cartCost när cartCost inte är null
		cartCost = parseInt(cartCost);

		localStorage.setItem("totalCost", cartCost + product);
	}else {
		//first time i click i do this to add the first cost
		localStorage.setItem("totalCost", product);
	}

	
}

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
		<h4 class="cartTotalTitle">
		Basket Total
		</h4>

		<h4 class="cartTotal">
		$${cartCost}
		</h4>
		</div>
		
		`	
	
}



//run when i load page
saveCountToCart()
displayCart()

