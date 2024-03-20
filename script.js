
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


//chamando o modal de informações ao clicar no botao do carrinho
cartBtn.addEventListener("click",function(){
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
        const price = ParentButton.getAttribute("data-price")

    }
})