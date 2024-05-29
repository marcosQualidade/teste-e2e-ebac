
const msg_sucesso = 'foi adicionado no seu carrinho.'
const link_comprar = '#primary-menu > .menu-item-629 > a'
const btn_comprar = '.single_add_to_cart_button'

Cypress.Commands.add('login', (usuario, senha) => {
    cy.get('#username').type(usuario)
    cy.get('#password').type(senha, {log: false})
    cy.get('.woocommerce-button').click()
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
 // valida se os produtos estão de fato no carrinho.
    cy.fixture('produtos').then((data) => {
        data.produtos.forEach(produto => {
           cy.get('body').should('include.text', produto);
        });
     });
    cy.get('.checkout-button').click()
})

Cypress.Commands.add('checkout', () => {
    cy.fixture('usuarios').then((dados) => {
        cy.get('#billing_first_name').type(dados.nome)
        cy.get('#billing_last_name').type(dados.sobrenome)
        cy.get('#billing_company').type(dados.empresa)
        cy.get('#billing_address_1').type(dados.endereco)
        cy.get('#billing_address_2').type(dados.complemento)
        cy.get('#billing_city').type(dados.cidade)
        cy.get('#billing_postcode').type(dados.cep)
        cy.get('#billing_phone').type(dados.telefone)
        cy.get('#billing_email').type(dados.email)
        cy.get('#createaccount').check()
        cy.get('#account_password').type(dados.password, {log : false})
        cy.get('#order_comments').type(dados.end_cobranca)
    })
    cy.get('#select2-billing_state-container').click()
    cy.get('#select2-billing_state-container').should('be.visible')
    cy.contains('.select2-results__option', 'Rio Grande do Sul').click();
    cy.get('#payment_method_cod').click()
    cy.get('#terms').check()
    cy.get('#place_order').click()
  // verifica se o usuário está registrado se sei, faz login, se não faz registro.  
    const mensagem = 'Uma conta já está registrada com seu endereço de e-mail. Faça login.'
    cy.get('body').contains(mensagem).then(($elemento) => {
        if ($elemento.length === 1) {
            cy.login()
        }
    })
})
Cypress.Commands.add('login', () => {    
    cy.get('li > .showlogin').click()
    cy.fixture('usuarios').then((dados) => {
        cy.get('#username').type(dados.email)
        cy.get('#password').type(dados.password, {log : false})
        cy.get('.woocommerce-button').click() 
    })
    cy.get('#terms').check()
    cy.get('#place_order').click()    
})



export {link_comprar} 
export {btn_comprar}
export {msg_sucesso}