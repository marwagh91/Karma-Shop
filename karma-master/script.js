// fonction qui permet d'envoyer les donnees de html vers JSON
function signup() {
    var firstName = document.getElementById("firstName").value;
    var verifFirstName = verifLength(firstName, 5);
    if (verifFirstName) {
        document.getElementById("firstNameError").innerHTML = "";
    }
    else {
        document.getElementById("firstNameError").innerHTML = "First Name have at least 5 characters";
        document.getElementById("firstNameError").style.color = "red";


    }
    var lastName = document.getElementById("lastName").value;
    //controle de saisi pour longeur de lastName
    var verifLastName = verifLength(lastName, 5);
    if (verifLastName) {
        document.getElementById("lastNameError").innerHTML = "";
    }
    else {
        document.getElementById("lastNameError").innerHTML = "Last Name have at least 5 characters";
        document.getElementById("lastNameError").style.color = "red";

    }
    var email = document.getElementById("email").value;
    //controle de saisi pour validite de email

    var verifEmail = validateEmail(email);
    if (verifEmail) {
        document.getElementById("emailError").innerHTML = "";
    }
    else {
        document.getElementById("emailError").innerHTML = "Invalid Email";
        document.getElementById("emailError").style.color = "red";

    }
    var pwd = document.getElementById("pwd").value;
    var verifPwd = verifLength(pwd, 8);
    if (verifPwd) {
        document.getElementById("pwdError").innerHTML = "";
    }
    else {
        document.getElementById("pwdError").innerHTML = "Password must have at least 8 characters";
        document.getElementById("pwdError").style.color = "red";

    }
    var confirmPwd = document.getElementById("confirmPwd").value;
    if (pwd == confirmPwd) {
        document.getElementById("confirmPwdError").innerHTML = "";
    }
    else {
        document.getElementById("confirmPwdError").innerHTML = "confirmPwd invalid";
        document.getElementById("confirmPwdError").style.color = "red";

    }
    var tel = document.getElementById('tel').value;
    if (tel.length == 8) {
        document.getElementById("telError").innerHTML = "";
    }
    else {
        document.getElementById("telError").innerHTML = "Tel invalid";
        document.getElementById("telError").style.color = "red";

    }
    if (verifFirstName && verifLastName && verifEmail && verifPwd && pwd == confirmPwd && tel.length == 8) {
        // recuperation de tableau users du localStorage 
        var users = JSON.parse(localStorage.getItem("users") || "[]"); // (ya3ni valeur eli bech tjini m localstorge bech n7awalha m chaine de caractere l objet)
        var idUser = JSON.parse(localStorage.getItem("idUser") || "10");
        // regrouper les donnees dans un objet user
        var user = {
            id: idUser,
            firstName: firstName,
            lastName: lastName,
            email: email,
            pwd: pwd,
            confirmPwd: confirmPwd,
            tel: tel,
            role: "user" //user ou bien admin
        };

        // push(user) : ajouter l'objet user dans le tableau users 
        users.push(user);
        //9bal manraja3 tableau avec setItem(cle, valeur) lazem nconvertih l chaine de caractere avec JSON.stringify(cle)
        localStorage.setItem("users", JSON.stringify(users));
        // donner l'id suivant 
        localStorage.setItem("idUser", idUser + 1);

    }
}
function AddProduct() {
    var productName = document.getElementById("productName").value;
    var price = document.getElementById("price").value;
    var stock = document.getElementById("stock").value;
    var category = document.getElementById("category").value;
    var products = JSON.parse(localStorage.getItem("products") || "[]");
    var product = {
        productName: productName,
        price: price,
        stock: stock,
        category: category
    };
    products.push(product);
    localStorage.setItem("products", JSON.stringify(products));


}


// Function AddProduct()
function addProduct() {
    // recuperation les donnees de html vers JSON
    var productName = document.getElementById("productName").value;
    var verifProductName = verifLength(productName, 4);
    if (verifProductName) {
        document.getElementById("productNameError").innerHTML = "";
    }
    else {
        document.getElementById("productNameError").innerHTML = "product Name must have at least 4 characters";
        document.getElementById("productNameError").style.color = "red";

    }
    var prodExist = searchProduct(productName);
    console.log('exist', prodExist);
    if (prodExist) {
        document.getElementById("ProdExistError").innerHTML = "Product already exists";
        document.getElementById("ProdExistError").style.color = "red";

    }
    else {
        document.getElementById("ProdExistError").innerHTML = "";

    }

    var price = document.getElementById("price").value;
    if (price > 0) {
        document.getElementById("priceError").innerHTML = "";
    }
    else {
        document.getElementById("priceError").innerHTML = "price invalid";
        document.getElementById("priceError").style.color = "red";

    }
    var stock = document.getElementById("stock").value;
    if (stock > 10) {
        document.getElementById("stockError").innerHTML = "";
    }
    else {
        document.getElementById("stockError").innerHTML = "stock invalid";
        document.getElementById("stockError").style.color = "red";

    }

    var category = document.getElementById("category").value;
    if (category.length != 0) {
        document.getElementById("categoryError").innerHTML = "";
    }
    else {
        document.getElementById("categoryError").innerHTML = "category invalid";
        document.getElementById("categoryError").style.color = "red";

    }
    if (verifProductName && price > 0 && stock > 10 && category.length != 0 && !prodExist) {
        // recuperation de tableau products du localStorage   
        var products = JSON.parse(localStorage.getItem("products") || "[]");
        var idProduct = JSON.parse(localStorage.getItem("idProduct") || "1");
        // regrouper les donnees dans un objet user
        var product = {
            id: idProduct,
            productName: productName,
            price: price,
            stock: stock,
            category: category
        };
        // push(product) : ajouter l'objet product dans le tableau products 
        products.push(product);
        //9bal manraja3 tableau avec setItem(cle, valeur) lazem nconvertih l chaine de caractere avec JSON.strinify(cle)
        localStorage.setItem("products", JSON.stringify(products));
        // donner l'id suivant
        localStorage.setItem("idProduct", idProduct + 1);

    }




}
//verifier longueur de la chaine ch.length >= 8
function verifLength(ch, number) {
    return ch.length >= number;

}
// fonction verifier validite d'un email
function validateEmail(email) {
    const regExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regExp.test(String(email).toLowerCase());
}
//fonction qui permet de chercher un Produit dans une table dans localstorage
function searchProduct(name) {
    var products = JSON.parse(localStorage.getItem("products") || "[]");
    var productExist = false;
    for (var i = 0; i < products.length; i++) {
        if (products[i].productName === name) {
            productExist = true;
        }

    }
    return productExist;



}
//fonction 
function displayProducts() {
    // bech njib les donnees mta3i m localstorage
    var products = JSON.parse(localStorage.getItem("products") || "[]");
    // on a declarer une variable bech n7otou fiha code mta3 tableau w ba3d bech nab3athha m js l html
    // n7otou m loul entete mta3 tableau wa7adha 5ater man7ibhech tet3awed akther m mara
    var prTable = ` <table class ="table table-hover">
        <tr>
            <th> Product Name </th>
            <th>price</th>
            <th>stock</th>
            <th>category</th>
            <th>Actions</th>
        </tr>`;
    //boucler sur le tableau
    for (let i = 0; i < products.length; i++) {
        // boucler sur attributs mta3i 
        prTable = prTable + `
        <tr>
            <td>${products[i].productName}</td>
            <td>${products[i].price}</td>
            <td>${products[i].stock}</td>
            <td>${products[i].category}</td>
            <td>
            <button type="button" class="btn btn-primary" onclick="displayProduct(${products[i].id})">Display</button>
            <button type="button" class="btn btn-warning" onclick="editProduct(${products[i].id})">Edit</button>
            <button type="button" class="btn btn-danger" onclick="deleteObject(${i},'products')">Delete</button>

            </td>
            </tr>`;
        //pour declaration d'une variable on utilise ${}

    }
    // prTable 9dima + prTable jdida
    prTable = prTable + `</table>  `;
    //ab3athli prTable eli hiya fiha code html mta3 tableau ab3athha l element 3andou prTable
    document.getElementById('prTable').innerHTML = prTable;



}
function displayUsers() {
    var users = JSON.parse(localStorage.getItem("users") || "[]");
    var userTable = ` <table class ="table table-hover">
        <tr>
            <th> firstName </th>
            <th>lastName</th>
            <th>Email</th>
            <th>Tel</th>
            <th>Actions</th>
        </tr>`;
    for (let i = 0; i < users.length; i++) {
        userTable = userTable + `
            <tr>
            <td>${users[i].firstName}</td>
            <td>${users[i].lastName}</td>
            <td>${users[i].email}</td>
            <td>${users[i].tel}</td>
            <td>
            <button type="button" class="btn btn-primary" onclick="displayUser(${users[i].id})">Display</button>
            <button type="button" class="btn btn-warning" onclick="editUser(${users[i].id})">Edit</button>
            <button type="button" class="btn btn-danger" onclick="deleteObject(${i},'users')">Delete</button>

            </td>
            </tr>`;

    }
    userTable = userTable + `</table>  `;
    document.getElementById('userTable').innerHTML = userTable;



}
// fonction qui permet lorsqu'on clique sur le bouton display  bech thizna m page admin l page displayProduct
function displayProduct(id) {
    // bech njib les donnes m localStorage
    localStorage.setItem("idPr", JSON.stringify(id));
    location.replace('displayProduct.html');

}
// <!-- la fonction qui permet d'afficher les donnees de products  eli ne5tarouh wa9t on clique sur le bouton display de la page admin  (table products) -->
function displayProductDetails() {
    var idPr = localStorage.getItem('idPr');
    var searchedPr = searchById(Number(idPr), "products");
    console.log('my object', searchedPr);
    document.getElementById("productName").innerHTML = searchedPr.productName;
    document.getElementById("price").innerHTML = searchedPr.price;
    document.getElementById("stock").innerHTML = searchedPr.stock;
    document.getElementById("category").innerHTML = searchedPr.category;

}
// pour rechercher productName par Id
function searchById(x, T) {
    var objects = JSON.parse(localStorage.getItem(T) || "[]");
    var obj;
    for (let i = 0; i < objects.length; i++) {
        if (objects[i].id == x) {
            obj = objects[i];
        }

    }
    return obj;

}
// fonction qui permet lorsqu'on clique sur le bouton display  bech thizna m page admin l page displayUser
function displayUser(id) {
    // bech njib les donnes m localStorage
    localStorage.setItem("idUsr", JSON.stringify(id));
    location.replace('displayUser.html');

}
// <!-- la fonction qui permet d'afficher les donnees de products  eli ne5tarouh wa9t on clique sur le bouton display de la page admin  (table users) -->

function displayUserDetails() {
    var idUsr = localStorage.getItem('idUsr');
    var searchedUsr = searchById(Number(idUsr), "users");
    console.log('my object', searchedUsr);
    // document.getElementById("firstName").innerHTML = searchedUsr.firstName; 
    //document.getElementById("lastName").innerHTML = searchedUsr.lastName; ou bien ken n7ib firstName w lastName m3a b3athhom

    document.getElementById("userName").innerHTML = searchedUsr.firstName + " " + searchedUsr.lastName;
    document.getElementById("email").innerHTML = searchedUsr.email;
    document.getElementById("tel").innerHTML = searchedUsr.tel;

}
//fonction sur le bouton Edit de la page admin(table products) qui permet d'afficher les donnees de products  eli ne5tarouh wa9t on clique sur le bouton Edit  
function editProduct(id) {
    var searchedPr = searchById(id, "products");
    //  console.log(searchedPr);
    //declarer une variable editPr eli bech n7otou fiha les input price et stock
    var editPr = `
    <div class="col-md-12 form-group">
    <input type="text" class="form-control" id="newPrice" name="name" placeholder="Price" value=${searchedPr.price} >
    </div>
    <span id="newPriceError"></span>

<div class="col-md-12 form-group">
    <input type="text" class="form-control" id="newStock" name="name" placeholder="Stock" value=${searchedPr.stock} >
    </div>
    <span id="newStockError"></span>
    <div class="col-md-12 form-group">
	<button type="submit" value="submit" class="primary-btn" onclick="validateEditProduct(${searchedPr.id})" >Validate</button>
	</div>


    `;
    document.getElementById("editPr").innerHTML = editPr;

}
// foction validateEditProduct 
function validateEditProduct(id) {
    var newPrice = document.getElementById("newPrice").value;
    var verifPrice = newPrice > 0;
    if (verifPrice) {
        document.getElementById("newPrice").innerHTML = "";
    }
    else {
        document.getElementById("newPriceError").innerHTML = "price invalid";
        document.getElementById("newPriceError").style.color = "red";

    }
    var newStock = document.getElementById("newStock").value;
    var verifStock = newStock > 10;

    if (verifStock) {
        document.getElementById("newStock").innerHTML = "";
    }
    else {
        document.getElementById("newStockError").innerHTML = "stock invalid";
        document.getElementById("newStockError").style.color = "red";

    }
    if (verifPrice && verifStock) {
        var products = JSON.parse(localStorage.getItem("products") || "[]");
        for (let i = 0; i < products.length; i++) {
            if (products[i].id == id) {
                products[i].price = newPrice;
                products[i].stock = newStock;

            }

        }
        localStorage.setItem("products", JSON.stringify(products));
        location.reload();
    }

}
function deleteObject(pos, T) {
    var objects = JSON.parse(localStorage.getItem(T) || "[]");
    objects.splice(pos, 1);
    localStorage.setItem(T, JSON.stringify(objects));
    location.reload();
}
//fonction sur le bouton Edit de la page admin(table products) qui permet d'afficher les donnees de products  eli ne5tarouh wa9t on clique sur le bouton Edit  
function editUser(id) {
    var searchedUsr = searchById(id, "users");
    //console.log(searchedUsr);
    //declarer une variable editPr eli bech n7otou fiha les input price et stock
    var editUsr = `
  
<div class="col-md-12 form-group">
	<input type="password" class="form-control" id="newPwd" name="name" placeholder="Password" value=${searchedUsr.pwd}>
    </div>
	<span id="newPwdError"></span>
    <div class="col-md-12 form-group">
    <input type="tel" class="form-control" id="newTel" name="name" placeholder="Tel" value=${searchedUsr.tel}>
    </div>
    <span id="newTelError"></span>
    <div class="col-md-12 form-group">
	<button type="submit" value="submit" class="primary-btn" onclick="validateEditUser(${searchedUsr.id})">Validate</button>
	</div>
							


    `;
    document.getElementById("editUsr").innerHTML = editUsr;


}
// foction validateEditUser 
function validateEditUser(id) {
    var newPwd = document.getElementById("newPwd").value;
    var verifPwd = verifLength(newPwd, 8);

    if (verifPwd) {
        document.getElementById("newPwd").innerHTML = "";
    }
    else {
        document.getElementById("newPwdError").innerHTML = "pwd invalid";
        document.getElementById("newPwdError").style.color = "red";

    }
    var newTel = document.getElementById("newTel").value;
    var verifTel = (newTel.length == 8);
    if (verifTel) {
        document.getElementById("newTel").innerHTML = "";
    }
    else {
        document.getElementById("newTelError").innerHTML = "tel invalid";
        document.getElementById("newTelError").style.color = "red";

    }

    if (verifTel && verifPwd) {
        var users = JSON.parse(localStorage.getItem("users") || "[]");
        for (let i = 0; i < users.length; i++) {
            if (users[i].id == id) {
                users[i].pwd = newPwd;
                users[i].confirmPwd = newPwd;
                users[i].tel = newTel;

            }

        }
        localStorage.setItem("users", JSON.stringify(users));
        location.reload();
    }

}
// declaration d'une fonction
function insertSuperAdmin() {

    var users = JSON.parse(localStorage.getItem("users") || "[]");

    var superAdmin = {
        id: 1,
        firstName: "Marwa",
        lastName: "Ghanmy",
        email: "marwaghanmi20@gmail.com",
        pwd: "superadmin2020",
        tel: "20202692",
        role: "super admin"
    };

    users.push(superAdmin);

    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("addedSuperAdmin", "true");
}


function addAdmin() {
    var firstNameAdmin = document.getElementById('firstNameAdmin').value;
    var lastNameAdmin = document.getElementById('lastNameAdmin').value;
    var emailAdmin = document.getElementById('emailAdmin').value;
    var pwdAdmin = document.getElementById('pwdAdmin').value;
    var telAdmin = document.getElementById('telAdmin').value;

    // récupération des données du tableau déjà stocké auparavant(JSON parse: string=>objet)
    var users = JSON.parse(localStorage.getItem("users") || "[]");
    // récupération de l'id de l'utilisateur (user)
    var idAdmin = JSON.parse(localStorage.getItem("idAdmin") || "2");
    // regrouper les données de l'utilisateur dans un objet (classe) user
    var admin = {
        id: idAdmin,
        firstName: firstNameAdmin,
        lastName: lastNameAdmin,
        email: emailAdmin,
        pwd: pwdAdmin,
        tel: telAdmin,
        //  différencier un utilisateur normal à un utilisateur admin, ici admin
        role: "admin"
    };

    // Ajout du nouveau utilisateur (objet admin) dans le tableau users
    users.push(admin);
    //stocker les élements dans le tableau users (JSON stringify: conversion string=>objet)
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("idAdmin", idAdmin + 1);
    location.reload();

}


function login() {

    var emailLogin = document.getElementById("emailLogin").value;
    var pwdLogin = document.getElementById("pwdLogin").value;

    var users = JSON.parse(localStorage.getItem("users") || "[]");

    for (let i = 0; i < users.length; i++) {
        if (users[i].email == emailLogin && users[i].pwd == pwdLogin) {
            var findedUser = users[i];
            console.log(findedUser);
        }

    }

    switch (findedUser.role) {
        case "super admin":
            location.replace('admin.html');
            localStorage.setItem("connectedUser", JSON.stringify(findedUser));
            break;

        case "admin":
            location.replace('admin2.html');
            localStorage.setItem("connectedUser", JSON.stringify(findedUser));
            break;

        case "user":
            location.replace('index.html');
            localStorage.setItem("connectedUser", JSON.stringify(findedUser));
            break;

        default:
            break;
    }

}
function displayShopProducts() {
    var products = JSON.parse(localStorage.getItem("products") || "");
    var shopProducts = ``;
    for (let i = 0; i < products.length; i++) {
        shopProducts = shopProducts + `
      <div class="col-lg-4 col-md-6">
                  <div class="single-product">
               <img class="img-fluid" src="img/product/p1.jpg" alt="">
               <div class="product-details">
              <h6>${products[i].productName}</h6>
                </div>  
          <div class="price">
                <h6>${products[i].price} DT</h6>
            </div>
            <button class="primary-btn" style="margin-left: 50px;" onclick="goToReservation(${products[i].id})">Reserve</button>
                          
            </div>
          </div>
      `;


    }

    document.getElementById("shopProducts").innerHTML = shopProducts;

}
function goToReservation(id) {
    localStorage.setItem("idPrToReserve", id);
    location.replace("reservation.html");

}
function displayProductsToReserve() {
    var idPrToReserve = localStorage.getItem('idPrToReserve');
    var searchedPr = searchById(Number(idPrToReserve), "products");
    console.log('my object', searchedPr);
    document.getElementById("productNameToReserve").innerHTML = searchedPr.productName;
    document.getElementById("priceToReserve").innerHTML = searchedPr.price + " DT ";
    document.getElementById("stockToReserve").innerHTML = searchedPr.stock + " pieces ";
    document.getElementById("categoryToReserve").innerHTML = searchedPr.category;


}
// function sur qty de stock
function validateReservation() {
    var qty = document.getElementById("qtyToReserve").value;
    var idPrToReserve = localStorage.getItem("idPrToReserve");
    console.log("idPrToReserve", idPrToReserve);

    // lawejt 3 produit b searchedPr
    var searchedPr = searchById(idPrToReserve, "products");
    console.log("product", searchedPr);
    var connectedUser = JSON.parse(localStorage.getItem("connectedUser"));
    console.log("connectedUser", connectedUser);


    if ((Number(qty) > 0) && (Number(qty) <= searchedPr.stock)) {
        document.getElementById("qtyError").innerHTML = "";
        var orders = JSON.parse(localStorage.getItem("orders") || "[]");
        var idOrder = JSON.parse(localStorage.getItem("idOrder") || "1");
        var order = {
            id: idOrder,
            qty: qty,
            idPr: searchedPr.id,
            idUser: connectedUser.id
        };
        orders.push(order);
        localStorage.setItem("orders", JSON.stringify(orders));
        localStorage.setItem("idOrder", idOrder + 1);
        //Partie de mise a jour sur stock
        // njib tableau m localalstorage
        var products = JSON.parse(localStorage.getItem("products") || "[]");
        // nboucli 3 tableau
        for (let i = 0; i < products.length; i++) {
            //si id de product == idPrToReserve
            if (products[i].id == idPrToReserve) {
                //si id de product == idPrToReserve new stock na5ou stock 9dim na9sou menou qty
                products[i].stock = products[i].stock - qty;

            }
            // nkamel n3aweb nraja3 tableau l localstorage
            localStorage.setItem("products", JSON.stringify(products));
        }
        location.replace("panier.html");

    } else {

        document.getElementById("qtyError").innerHTML = "Quantity not available";
        document.getElementById("qtyError").style.color = "red";
    }
}
function panier() {
    // bech njib m localstorage les users connecte
    var connectedUser = JSON.parse(localStorage.getItem("connectedUser"));
    //bech njib les orders kol w n7othom fi tableau myorders
    var orders = JSON.parse(localStorage.getItem("orders") || "[]");
    console.log(orders);
    // nboukli 3 orders
    var myOrders = [];
    for (let i = 0; i < orders.length; i++) {
        if (orders[i].idUser == connectedUser.id) {
            // ou bien myOrders[j] = orders[i];
            //j = j+1;
            myOrders.push(orders[i]);
        }

    }

    console.log(myOrders);
    var cartTable = ` 
    <table class="table">
    <thead>
        <tr>
            <th scope="col">Product</th>
            <th scope="col">Price</th>
            <th scope="col">Quantity</th>
            <th scope="col">Total</th>
            <th scope="col">Actions</th>

        </tr>
    </thead>
    <tbody> `;

    var subtotal = 0;
    for (let j = 0; j < myOrders.length; j++) {
        var pr = searchById(Number(myOrders[j].idPr), "products");
        var total = Number(pr.price) * Number(myOrders[j].qty);
        subtotal = subtotal + total;
        cartTable = cartTable + `
       <tr>
      <td>
          <div class="media">
              <div class="d-flex">
                  <img src="img/cart.jpg" alt="">
              </div>
              <div class="media-body">
                  <p>${pr.productName}</p>
              </div>
          </div>
      </td>
      <td>
          <h5>${pr.price} DT</h5>
      </td>
      <td>
          <h5>${myOrders[j].qty} pieces</h5>
      </td>
      <td>
          <h5>${total} Dt</h5>
      </td>
      <td>
      <button class="btn btn-danger" onclick="deleteOrder(${searchObjectPosition(myOrders[j].id, 'orders')},${myOrders[j].id})">Delete</button>
      <button class="btn btn-warning" onclick="editOrder(${myOrders[j].id})" >Edit</button>




      </td>

  </tr> `;
    }
    cartTable = cartTable + ` 
  <tr>
  <td>
  
  </td>
  <td>
  
  </td>
  <td>
      <h5>subtotal</h5>
  </td>
  <td>
      <h5>${subtotal} DT</h5>
  </td>
  </tr>
  </tbody>
  </table>`;
    document.getElementById('cartTable').innerHTML = cartTable;
}

function searchObjectPosition(id, T) {
    // T=cle
    var Tab = JSON.parse(localStorage.getItem(T) || "[]");
    var pos;
    for (let i = 0; i < Tab.length; i++) {
        if (Tab[i].id == id) {
            pos = i;
        }
    }
    return pos;
}
function deleteOrder(pos, id) {
    var order = searchById(id, "orders");
    var qty = order.qty;
    //mise a jour du stock dans le tableau products
    var products = JSON.parse(localStorage.getItem("products") || "[]");
    for (let i = 0; i < products.length; i++) {
        if (products[i].id == order.idPr) {
            products[i].stock = Number(products[i].stock) + Number(qty);

        }

    }
    localStorage.setItem("products", JSON.stringify(products));
    //suppression du order dans le tableau orders
    deleteObject(pos, "orders");


}
function editOrder(id) {
    var order = searchById(id, "orders");
    // declarer une variable n7otou fiha html 
    var editOrder = `
        <h3> Edit Order</h3>
        <div class="col-md-12 form-group">
        <input type="number" class="form-control" id="editQtyOrder" name="name" value=${order.qty} >
        <span id="editOrderError"></span>

    </div>
    
    
    <div class="col-md-12 form-group" style="margin-left:40%">
        <button type="submit" value="submit" class="primary-btn" style="margin-top:20px" onclick="validateEditOrder(${order.id})">Validate</button>
    </div>`;
    document.getElementById("editOrder").innerHTML = editOrder
}
// function eli bech ta3mli edit lorsqu'on clique sur bouton validate
function validateEditOrder(id) {
    var newQty = document.getElementById("editQtyOrder").value;
    //console.log(newQty);
    var order = searchById(id, "orders");

    var product = searchById(order.idPr, "products");
    //console.log(product);

    var diff = Number(newQty) - Number(order.qty);
    //console.log(diff);
    //conditon si stock inf 3 diff 
    if (product.stock < diff) {
        document.getElementById("editOrderError").innerHTML = "Qty not available";
        document.getElementById("editOrderError").style.color = "red";

        //conditon si newQty < 0  

    } else if (newQty < 0) {
        document.getElementById("editOrderError").innerHTML = "invalid Qty";
        document.getElementById("editOrderError").style.color = "red";
        //conditon si newQty == 0  
    } else if (newQty == 0) {
        // deleteOrder tfassa5 w ta3ml mise a jour en meme temps
        deleteOrder(searchObjectPosition(order.id, 'orders'), order.id);

    } else {
        // Mise a jour order
        var orders = JSON.parse(localStorage.getItem("orders") || "[]");
        for (let i = 0; i < orders.length; i++) {
            if (orders[i].id == order.id) {
                orders[i].qty = Number(orders[i].qty) + Number(diff);

            }

        }
        localStorage.setItem("orders", JSON.stringify(orders));
        // Mise a jour du stock
        var products = JSON.parse(localStorage.getItem("products") || "[]");
        for (let i = 0; i < products.length; i++) {
            if (products[i].id == order.idPr) {
                products[i].stock = Number(products[i].stock) - Number(diff);

            }



        }
        localStorage.setItem("products", JSON.stringify(products));
        location.reload();



    }


}
function sendMessage() {
    // recupere l

    var name = document.getElementById("name").value;
    var verifName = verifLength(name, 5);
    if (verifName) {
        document.getElementById("nameError").innerHTML = "";
    }
    else {
        document.getElementById("nameError").innerHTML = "Name have at least 5 characters";
        document.getElementById("nameError").style.color = "red";


    }

    var email = document.getElementById("email").value;
    var verifEmail = validateEmail(email);
    if (verifEmail) {
        document.getElementById("emailError").innerHTML = "";
    }
    else {
        document.getElementById("emailError").innerHTML = "Invalid Email";
        document.getElementById("emailError").style.color = "red";

    }
    var subject = document.getElementById("subject").value;
    if (subject.length != 0) {
        document.getElementById("subjectError").innerHTML = "";
    }
    else {
        document.getElementById("subjectError").innerHTML = "subject is required";
        document.getElementById("subjectError").style.color = "red";

    }

    var msg = document.getElementById("msg").value;
    if (msg.length != 0) {
        document.getElementById("msgError").innerHTML = "";
    }
    else {
        document.getElementById("msgError").innerHTML = "Message is required";
        document.getElementById("msgError").style.color = "red";

    }
    if (verifName && verifEmail && (subject.length != 0) && (msg.length != 0)) {
        var messages = JSON.parse(localStorage.getItem("messages") || "[]");
        var idMsg = JSON.parse(localStorage.getItem("idMsg") || "1");
        var users = JSON.parse(localStorage.getItem("users") || "[]");
        // houni ntastiw 3 email 
        var idUser = 0;
        for (let i = 0; i < users.length; i++) {
            if (users[i].email == email) {
                idUser = user[i].id;
            }

        }
        //var connectedUser = JSON.parse(localStorage.getItem("connectedUser"));
        // if(connectedUser){
        //     //ken l9it valeur fi connecteUser a3tini
        //      idUser = connectedUser.id;
        // }


        var message = {
            id: idMsg,
            idUser: idUser,
            subject: subject,
            name: name,
            emailEmet: email,
            emailRec: "marwaghanmi18@gmail.com",
            message: msg
        };


        messages.push(message);
        localStorage.setItem("messages", JSON.stringify(messages));
        localStorage.setItem("idMsg", idMsg + 1);

        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your message has been send',
            showConfirmButton: false,
            timer: 3000,
          })


    }
}
function displayMessages() {
    var messages = JSON.parse(localStorage.getItem("messages") || "[]");
    var MsgTable = ` <table class ="table table-hover">
        <tr>
            <th> Name </th>
            <th>subject</th>
            <th>Messages</th>
            <th>Actions</th>
        </tr>`;
    for (let i = 0; i < messages.length; i++) {
        MsgTable = MsgTable + `
            <tr>
            <td>${messages[i].name}</td>
            <td>${messages[i].subject}</td>
            <td>${messages[i].message}</td>
            <td>
            <button type="button" class="btn btn-primary" onclick="answerMessage(${messages[i].id})" >Answer</button>

            </td>
            </tr>`;

    }
    MsgTable = MsgTable + `</table>  `;
    document.getElementById('MsgTable').innerHTML = MsgTable;



}
function answerMessage(id) {
    var searchedMsg = searchById(id, "messages");
    // declarer une variable n7otou fiha html 
    var answerMsg = `
        
    <div class="col-md-12 form-group">
    <input type="text" class="form-control" id="subject" name="name" value=${searchedMsg.subject} disabled=true>
   

</div>
<div class="col-md-12 form-group">
        <input type="text" class="form-control" id="emailRec" name="name" value=${searchedMsg.emailEmet} disabled=true  >
      

    </div>
    <div class="col-md-12 form-group">
	    <textarea class="form-control" name="message" id="newMsg"  name="name" ></textarea>
    <span id="newMsgError"></span>
    </div>

    <div class="col-md-12 form-group" >
        <button type="submit" value="submit" class="primary-btn" style="margin-left:30px" onclick="validateSendMessage(${searchedMsg.id})">Send</button>
    </div>`;
    document.getElementById("answerMsg").innerHTML = answerMsg;
}
function validateSendMessage(id) {
    var searchedMsg = searchById(id, "messages");
    var newMsg = document.getElementById("newMsg").value;
    if (newMsg.length != 0) {
        document.getElementById("newMsgError").innerHTML = "";
    }
    else {
        document.getElementById("newMsgError").innerHTML = "Message is required";
        document.getElementById("newMsgError").style.color = "red";

    }

    if (newMsg.length != 0) {
        var messages = JSON.parse(localStorage.getItem("messages") || "[]");
        var idMsg = JSON.parse(localStorage.getItem("idMsg") || "1");
        var message = {
            id: idMsg,
            subject: searchedMsg.subject,
            emailRec: searchedMsg.emailEmet,
            message: newMsg,
            emailEmet: "marwaghanmi18@gmail.com",
            idUser: 1,
            name: "Marwa"

        };

        messages.push(message);
        localStorage.setItem("messages", JSON.stringify(messages));
        localStorage.setItem("idMsg", idMsg + 1);
        location.reload();


    }
}
function setHeader() {

    var connectedUser = JSON.parse(localStorage.getItem("connectedUser"));
    var header = ``;
    var cartSearch = ``;
    if (connectedUser) {
        //super Admin
        if (connectedUser.role == "super admin") {
            header = `
    <li class="nav-item active"><a class="nav-link" href="index.html">Home</a></li>
	<li class="nav-item "><a class="nav-link" href="shop.html">Shop</a></li>
	<li class="nav-item"><a class="nav-link" href="admin.html">Dashboard</a></li>
	<li class="nav-item "><a class="nav-link" >${connectedUser.firstName + ' ' + connectedUser.lastName}</a></li>
	<li class="nav-item "><a class="nav-link" onclick="logout()">Logout</a></li>
    `;
        }
        // Admin
        else if (connectedUser.role == "admin") {
            header = `
   <li class="nav-item active"><a class="nav-link" href="index.html">Home</a></li>
   <li class="nav-item "><a class="nav-link" href="shop.html">Shop</a></li>
   <li class="nav-item"><a class="nav-link" href="admin2.html">Dashboard</a></li>
   <li class="nav-item "><a class="nav-link" >${connectedUser.firstName + ' ' + connectedUser.lastName}</a></li>
   <li class="nav-item "><a class="nav-link" onclick="logout()">Logout</a></li>
   `;
        }
        // user
        else {
            header = `
   <li class="nav-item active"><a class="nav-link" href="index.html">Home</a></li>
   <li class="nav-item "><a class="nav-link" href="shop.html">Shop</a></li>
   <li class="nav-item"><a class="nav-link" href="contact.html">Contact</a></li>
   <li class="nav-item "><a class="nav-link" >${connectedUser.firstName + ' ' + connectedUser.lastName}</a></li>
   <li class="nav-item "><a class="nav-link" onclick="logout()">Logout</a></li>
   `;
            cartSearch = `
   <li class="nav-item"><a href="panier.html" class="cart"><span class="ti-bag" id="nbOrder"></span></a></li>
	<li class="nav-item">
	<button class="search"><span class="lnr lnr-magnifier" id="search"></span></button>
	</li>
   `;
        }

    } else {
        // visiteur
        header = `
   <li class="nav-item active"><a class="nav-link" href="index.html">Home</a></li>
   <li class="nav-item "><a class="nav-link" href="shop.html">Shop</a></li>
   <li class="nav-item"><a class="nav-link" href="contact.html">Contact</a></li>
   <li class="nav-item "><a class="nav-link" href="registration.html" >Register</a></li>
   <li class="nav-item "><a class="nav-link" href="login.html">Login</a></li>
   `;
        // icone search
        cartSearch = `
   <li>
	<button class="search"><span class="lnr lnr-magnifier" id="search"></span></button>
	</li>
   `;

    }

    document.getElementById("headerId").innerHTML = header;
    document.getElementById("cartSearch").innerHTML = cartSearch;


}
function logout() {
    localStorage.removeItem("connectedUser");
    location.reload();

}

function nbOrders() {
    var connectedUser = JSON.parse(localStorage.getItem("connectedUser"));
    var orders = JSON.parse(localStorage.getItem("orders") || "[]");
    var nb = 0;
    for (let i = 0; i < orders.length; i++) {
        if (orders[i].idUser == connectedUser.id) {
            nb += 1;
            //nb=nb+1
        }

    }
    document.getElementById("nbOrder").innerHTML = "(" + nb + ")";



}
function searchPr(event) {
    var key = event.keyCode;
    // 13 est le code du bouton entrer dans le clavier
    if (key == 13) {
        var category = document.getElementById("categoryToSearch").value;
        console.log("category",category);
        localStorage.setItem("categoryToSearch", category);
        location.replace("result.html");

    }

}
function dispalaySearchedProduct() {
    var category = localStorage.getItem("categoryToSearch");
    var products = JSON.parse(localStorage.getItem("products") || "[]");
    var searchedProducts = [];
    for (let i = 0; i < products.length; i++) {
        if (products[i].category == category) {
            searchedProducts.push(products[i]);

        }

    }

    console.log("result",searchedProducts);
    var result = ``;
    for (let i = 0; i < searchedProducts.length; i++) {
        result = result + `
      <div class="col-lg-4 col-md-6">
        <div class="single-product">
          <img class="img-fluid" src="img/product/p1.jpg" alt="">
            <div class="product-details">
             <h6>${searchedProducts[i].productName}</h6>
                </div>  
          <div class="price">
             <h6>${searchedProducts[i].price} DT</h6>
                 </div>
               <button class="primary-btn" style="margin-left: 50px;" onclick="goToReservation(${searchedProducts[i].id})">Reserve</button>
                          
            </div>
          </div>
      `;


    }
    document.getElementById("result").innerHTML = result;

}


















