
const menu = document.getElementById("menu")
const cartBtn = document.getElementById("cart-btn")
const cartModal = document.getElementById("cart-modal")
const cartItemsContainer = document.getElementById("cart-items")
const cartTotal = document.getElementById("cart-total")
const checkoutBtn = document.getElementById("checkout-btn")
const closeModalBtn = document.getElementById("close-modal-btn")
const cartCounter = document.getElementById("cart-count")
const addressInput = document.getElementById("address")
const addressWarn = document.getElementById("address-warn")

let cart = [];


//chamando o modal de informações ao clicar no botao do carrinho
cartBtn.addEventListener("click",function(){
    updateCartModal();
    cartModal.style.display = "flex"  
})

//fechar o modal quando clicar fora ou no botao fechar
cartModal.addEventListener("click",function(event){
    if(event.target === cartModal){
        cartModal.style.display = "none"
    }
})

closeModalBtn.addEventListener("click",function(){
    cartModal.style.display = "none"
})

//add itens no carrinho
menu.addEventListener("click", function(event){

    let ParentButton = event.target.closest(".add-to-cart-btn")
    
    if(ParentButton){
        const name = ParentButton.getAttribute("data-name")
        const price = parseFloat(ParentButton.getAttribute("data-price"))   
        addToCart(name,price)


    }
})

//funcao para add o item no carrinho
function addToCart(name, price){

    const existingItem = cart.find(item => item.name === name)
    if(existingItem){
        existingItem.quantity +=1;
    }else{
        cart.push({
            name,
            price,
            quantity: 1,
        })
    }
    updateCartModal()
}

//atualizar carrinho na tela - modal
function updateCartModal(){
    cartItemsContainer.innerHTML = "";
    let total = 0;

    cart.forEach(item =>{
        const cartItemElement = document.createElement("div");
        cartItemElement.classList.add("flex", "justify-between", "mb-4", "flex-col")
        cartItemElement.innerHTML = `
        <div class="flex items-center justify-between">
            <div>
                <p class="font-medium">${item.name}</p>
                <p class="font-medium">Qtde: ${item.quantity}</p>
                <p class="font-medium">R$ ${item.price.toFixed(2)}</p>
            </div>

                <button class="remove-btn" data-name="${item.name}"> (X) Remover Item </button>

        </div>
        `
        //calcular valor total
        total += item.price * item.quantity;
        cartItemsContainer.appendChild(cartItemElement)
    })

    //formatar valor total para o formato de moeda
    cartTotal.textContent = total.toLocaleString("pt-BR",{
        style: "currency",
        currency: "BRL"
    });

    //atualizar contador de itens (footer) do carrinho
    cartCounter.innerHTML = cart.length;
}

//função para remover item do carrinho
cartItemsContainer.addEventListener("click", function(event){
    if(event.target.classList.contains("remove-btn")){
        const name = event.target.getAttribute("data-name")

        removeItemCart(name);
    }
})

function removeItemCart(name){
    const index = cart.findIndex(item => item.name === name);
    if(index !== -1){
        const item = cart[index];
        
        if(item.quantity > 1){
            item.quantity -= 1;
            updateCartModal();
            return;
        }
        cart.splice(index,1);
        updateCartModal();
    }
}

//funcao para pegar endereço de entrega

addressInput.addEventListener("input", function(event){
    let inputValue = event.target.value;

    if(inputValue !== ""){
        addressWarn.classList.add("hidden");
        addressInput.classList.remove("border-red-500");
    }else{
        addressWarn.classList.remove("hidden");
        addressInput.classList.add("border-red-500");
    }

})

//função para finalizar o carrinho de compra
checkoutBtn.addEventListener("click", function(){

    const isOpen = checkRestaurantOpen();
    if(!isOpen){
        alert("RESTAURENTE ESTÁ FECHADO NO MOMENTO, NÃO SERÁ POSSÍVEL REALIZAR O PEDIDO!")
    }

    if(cart.length === 0) return;

    if(addressInput.value === ""){
        addressWarn.classList.remove("hidden");
        addressInput.classList.add("border-red-500");
        return;
    }

    //enviar o pedido para api do whatsapp
    const cartItems = cart.map((item => {
        return(
            `${item.name} Qtde: ${item.quantity} Preço: R$${item.price} |`
        )
    })).join("")
    
    const message = encodeURIComponent(cartItems);
    const phone = "" // colocar aqui o telefone que vai ser utilizado para receber os pedidos

    window.open(`https://wa.me/${phone}?text=${message} Endereço: ${addressInput.value}`, "_blank");

    cart = [];
})

//função para verificar se o restaurante está aberto
function checkRestaurantOpen(){
    const data = new Date();
    const hora = data.getHours();
    return hora >= 19 && hora < 22;
}

//manipular o card de horario
const spanItem = document.getElementById("date-span")
const isOpen = checkRestaurantOpen();

if(isOpen){
    spanItem.classList.remove("bg-red-500");
    spanItem.classList.add("bg-green-600");
}else{
    spanItem.classList.remove("bg-green-600"); 
    spanItem.classList.add("bg-red-500");
}