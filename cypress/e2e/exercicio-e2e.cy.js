import { btn_comprar } from '../support/commands';
import { msg_sucesso } from '../support/commands';
import { link_comprar } from '../support/commands';

context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
   /*  Como cliente
       Quero acessar a Loja EBAC
       Para fazer um pedido de 4 produtos
       Fazendo a escolha dos produtos
       Adicionando ao carrinho
       Preenchendo todas opções no checkout
       E validando minha compra ao final */
   beforeEach(() => {
      cy.visit('/');
   });

   it('Deve fazer um pedido na loja Ebac Shop de ponta a ponta', () => {
      //TODO: Coloque todo o fluxo de teste aqui, considerando as boas práticas e otimizações
      
      let produto1 = '.post-2559 > .product-block > .caption > .meta > .infor > .name > a'
      cy.adicionarProdutos(produto1, 'L', 'Red')
      cy.get('.woocommerce-message').should('contain', msg_sucesso);
    
      let produto2 = '.post-3111 > .product-block > .caption > .meta > .infor > .name > a'
      cy.adicionarProdutos(produto2, 'L', 'Black')
      cy.get('.woocommerce-message').should('contain', msg_sucesso);

      let produto3 = '.post-3073 > .product-block > .caption > .meta > .infor > .name > a'
      cy.adicionarProdutos(produto3, '36', 'Brown')
      cy.get('.woocommerce-message').should('contain', msg_sucesso);

      let produto4 = '.post-3647 > .product-block > .caption > .meta > .infor > .name > a'
      cy.adicionarProdutos(produto4, 'M', 'Gray')
      cy.get('.woocommerce-message').should('contain', msg_sucesso)

      
      cy.get('.woocommerce-message > .button').should('be.visible')
      cy.carrinho();
      cy.url().should('include', '/checkout/')
   
      cy.checkout()
      cy.get('.page-title').should('be.visible')
      cy.wait(3000)
      cy.get('.woocommerce-notice').should('contain', 'Obrigado. Seu pedido foi recebido.')
      cy.get('body').find('.woocommerce-customer-details').should('exist', 'be.visible')
   });

});