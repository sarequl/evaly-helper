//if the current page belongs to campaign, run function
if (window.location.href.includes('/campaign/')) {
	window.addEventListener('load', preFunc);
}

function preFunc() {
	const start = Date.now();
	const isLoaded = setInterval(() => {
		const products = document.querySelector('.product-grid');
		if (Date.now - start > 10000) clearInterval(isLoaded); //edge case, if no products found clear the interval
		if (products !== null) {
			products.style.gridTemplateColumns = 'repeat(auto-fill,minmax(300px,1fr))'; //increase the width of the products grid
			main(); //call the main function to setup event listeners and insert initial discount string
			const lazyObserver = new MutationObserver(calculateAndInsert);
			lazyObserver.observe(products, { childList: true }); //fire callback if the childlist is mutated
			clearInterval(isLoaded);
		}
	}, 200); //check every 200ms
}

function main() {
	calculateAndInsert();

	if (document.querySelectorAll('.md\\:w-4\\/12.lg\\:w-3\\/12 li') !== null) { //selector for category list items
		const cat = document.querySelectorAll('.md\\:w-4\\/12.lg\\:w-3\\/12 li');
		cat.forEach(category => category.addEventListener('click', () => {
			setTimeout(calculateAndInsert, 1000);
		}));
	}

	document.querySelectorAll('button').forEach(button => { //i am lazy
		if (button.innerText === 'All Products') {
			button.addEventListener('click', () => {
				setTimeout(calculateAndInsert, 500);
			});
		}
	});
}

function calculateAndInsert() { //inserts discounts for all the visible products on the page
	const products = document.querySelector('.product-grid');
	products.style.gridTemplateColumns = 'repeat(auto-fill,minmax(300px,1fr))';
	products.childNodes.forEach(insertDiscount);
}


function insertDiscount(product) { //inserts discounts string to a single product
	if (product.querySelector('.eccce') !== null) { //checking if product already has the discount string
		product.querySelector('.eccce').remove();
	}
	const style = `
	font-size: 0.9rem;
	text-align: left;
	margin-top: 27px;
	font-weight: normal;
	border: 1px solid #cb2b3d;
	border-radius: 5px;
	padding: 5px;
	`;
	const discountStyle = 'color: green; font-weight: bold;';
	const insertLocation = product.querySelector('.text-lg.font-semibold.px-2');
	const cashbackString = product.firstElementChild.innerText.replace(/%\scashback/gi, '');
	const priceString = product.querySelector('.text-lg.font-semibold.px-2').innerText.replace('৳', '');
	const cashback = parseInt(cashbackString);
	const price = parseInt(priceString);
	const cashbackFull = Math.round(calculateFull(price, cashback));
	const toPayPartial = Math.round(calculatePartial(price, cashback));
	const discountedPriceFull = discountPriceFull(price, cashbackFull);
	const discountedPricePartial = Math.round(price - toPayPartial);
	const htmlString = `
		<p style="${style}" class="eccce">
		ফুল পেমেন্ট এ ক্যাশব্যাক: <span style="${discountStyle}">${cashbackFull}</span><br>
		পারশিয়াল পেমেন্ট এমাউন্ট: <span style="${discountStyle}">${toPayPartial}</span> <br>
		<span style="display: block;margin-top: 10px;margin-bottom: 10px;border-bottom: 2px solid #cb2b3d;box-shadow: 1px 0px 3px 0px #00000063;"></span>
		ফুল পেমেন্ট এ প্রোডাক্ট এর দাম: <span style="${discountStyle}">${discountedPriceFull}</span><br>
		পারশিয়াল পেমেন্ট এ ডিসকাউন্ট: <span style="${discountStyle}">${discountedPricePartial}</span><br>
		<span style="font-size:0.7rem; font-style: italic; color: #cb2b3d;">সব ক্যাম্পেইন এ পারশিয়াল পেমেন্ট করা নাও যেতে পারে, অর্ডার করার আগে ইভালি'র সাথে জেনে নিন।</span>
		</p>
	`;
	insertLocation.insertAdjacentHTML('afterend', htmlString);
}

function discountPriceFull(price, cashback) {
	if (price > cashback) {
		return `${Math.round(price - cashback)}`;
	} else if (price === cashback) {
		return 'ফ্রী';
	} else {
		return `ফ্রী + ${Math.round(cashback - price)}`;
	}
}

function calculateFull(price, cashback) {
	const percentage = cashback / 100;
	return price * percentage;
}

function calculatePartial(price, cashback) {
	const percentage = cashback / 100;
	return price / (percentage + 1);
}