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
      cy.primeiroProduto();
      // Verifica se o link/botão de compras existe e está visivel na página
      cy.get('body').find(link_comprar).should('exist').and('be.visible');
      // verifica se a home de produtos foi carregada corretamente.
      cy.get('body').find('#content').should('be.visible');
      // verifica se o nome do produto está visivel no detalhe do produto selecionado.
      cy.get('.product_title').should('contain', 'Abominable Hoodie');
      // verifica se o botão para adicionar o produto ao carrinho está habilitado.
      cy.get(btn_comprar).should('be.enabled');
      // verifica se o produto foi adicionado com sucesso ao carrinho.
      cy.get('.woocommerce-message').should('contain', msg_sucesso);

      cy.segundoProduto();
      // Verifica se o link/botão de compras existe e está visivel na página
      cy.get('body').find(link_comprar).should('exist').and('be.visible');
      // verifica se o nome do produto está visivel no detalhe do produto selecionado.
      cy.get('.product_title').should('contain', 'Aero Daily Fitness Tee');
      // verifica se o botão para adicionar o produto ao carrinho está habilitado.
      cy.get(btn_comprar).should('be.enabled');
      // verifica se o produto foi adicionado com sucesso ao carrinho.
      cy.get('.woocommerce-message').should('contain', msg_sucesso);

      cy.terceiroProduto();
      // Verifica se o link/botão de compras existe e está visivel na página
      cy.get('body').find(link_comprar).should('exist').and('be.visible');
      // verifica se o nome do produto está visivel no detalhe do produto selecionado.
      cy.get('.product_title').should('contain', 'Aether Gym Pant');
      // verifica se o botão para adicionar o produto ao carrinho está habilitado.
      cy.get(btn_comprar).should('be.enabled');
      // verifica se o produto foi adicionado com sucesso ao carrinho.
      cy.get('.woocommerce-message').should('contain', msg_sucesso);

      cy.quartoProduto();
      // Verifica se o link/botão de compras existe e está visivel na página.
      cy.get('body').find(link_comprar).should('exist').and('be.visible');
      // verifica se a home de produtos foi carregada corretamente.
      cy.get('body').find('#content').should('be.visible');
      // verifica se o nome do produto está visivel no detalhe do produto selecionado.
      cy.get('.product_title').should('contain', 'Argus All-Weather Tank');
      // verifica se o botão para adicionar o produto ao carrinho está habilitado.
      cy.get(btn_comprar).should('be.enabled');
      // verifica se o produto foi adicionado com sucesso ao carrinho.
      cy.get('.woocommerce-message').should('contain', msg_sucesso);

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