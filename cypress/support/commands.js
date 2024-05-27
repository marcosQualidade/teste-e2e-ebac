
const msg_sucesso = 'foi adicionado no seu carrinho.'
const link_comprar = '#primary-menu > .menu-item-629 > a'
const btn_comprar = '.single_add_to_cart_button'

Cypress.Commands.add('login', (usuario, senha) => {
    cy.get('#username').type(usuario)
    cy.get('#password').type(senha, {log: false})
    cy.get('.woocommerce-form > .button').click()
});

Cypress.Commands.add('primeiroProduto', () => { 
    let produto1 = '.post-2559 > .product-block > .caption > .meta > .infor > .name > a' 
    
    cy.get(link_comprar).click()
    cy.get(produto1).should('be.visible').click()

    cy.get('.button-variable-item-L').click()
    cy.get('.button-variable-item-Red').click()

    cy.get(btn_comprar).click()
})

Cypress.Commands.add('segundoProduto', () => {
    let produto2 = '.post-3111 > .product-block > .caption > .meta > .infor > .name > a'

    cy.get(link_comprar).click()
    cy.get(produto2).should('be.visible').click()

    cy.get('.button-variable-item-L').click()
    cy.get('.button-variable-item-Black').click()

    cy.get(btn_comprar).click()
})

Cypress.Commands.add('terceiroProduto', () => {
    let produto3 = '.post-3073 > .product-block > .caption > .meta > .infor > .name > a'

    cy.get(link_comprar).click()
    cy.get(produto3).should('be.visible').click()

    cy.get('.button-variable-item-36').click()
    cy.get('.button-variable-item-Brown').click()

    cy.get(btn_comprar).click()
})

Cypress.Commands.add('quartoProduto', () => {
    let produto4 = '.post-3647 > .product-block > .caption > .meta > .infor > .name > a'

    cy.get(link_comprar).click()
    cy.get(produto4).should('be.visible').click()

    cy.get('.button-variable-item-M').click()
    cy.get('.button-variable-item-Gray').click()

    cy.get(btn_comprar).click()
})
Cypress.Commands.add('carrinho', () => {
    cy.get('.woocommerce-message > .button').click()
 // valida se os produtos estão de fato adicionados no carrinho.
    cy.fixture('produtos').then((data) => {
       data.produtos.forEach(produto => {
          cy.get('body').should('include.text', produto)  
        })
     })
    cy.get('.checkout-button').click()
})


export {link_comprar} 
export {btn_comprar}
export {msg_sucesso}