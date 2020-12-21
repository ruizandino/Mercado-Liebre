const fs = require('fs');
let productos = JSON.parse(fs.readFileSync('./data/productsDataBase.json', 'utf-8'))
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

//funciones Auxiliares
function searchProd(req, res) {
	let product = productos.find(product => product.id == req.params.id);
	return product;
}

function detail(toRenderize, req, res) {
	let product = searchProd(req, res)
	if (product) {
		res.render(toRenderize, { product, toThousand });
	} else {
		res.send('No encontrado');
	}
}

function writeFile(prods) {
	fs.writeFileSync(__dirname + "/../data/productsDataBase.json", JSON.stringify(prods));
}

const controller = {
	showIndex: function (req, res) {
		res.render('index', { productos, toThousand });
	},
	productDetail: function (req, res) {
		detail('productDetail', req, res);

	},	
	index: function (req, res) {
		res.render('products', { productos, toThousand });
	},
	create: (req, res) => {
		res.render('productCreate');
	},
	store: (req, res) => {
		let newProduct = req.body;
		newProduct.id = Date.now();
		productos.push(newProduct);
		writeFile(productos);
		res.redirect("/products");

	},
	edit: (req, res) => {
		detail('productEdit', req, res);
	},
	update: (req, res, next) => {

		productos.forEach(function (product) {
			if (product.id == req.params.id) {
				product.name = req.body.name;
				product.description = req.body.description;
				product.price = Number(req.body.price);
				product.discount = Number(req.body.discount);
				//product.product_image = req.body.image;
				product.category = req.body.category;
			}
		});
		writeFile(productos);
		res.redirect("/products");
	},
	destroy: (req, res) => {

		let newProducts = productos.filter(function(product){
            return product.id != req.params.id;
		});
		
		writeFile(newProducts);
		res.render('products', { productos, toThousand });
	},
}

module.exports = controller;