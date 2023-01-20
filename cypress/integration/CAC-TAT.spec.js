
/// <reference types="Cypress" /> ///


describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function() {
        cy.visit('./src/index.html')

    })
    it('verifica o título da aplicação', function() {
        
        cy.title().should('be.equal','Central de Atendimento ao Cliente TAT') /// Validação de código.
    })
    it('Preenche os campo obrigatórios e envia o formulário', function(){
        const longText = 'Teste, teste, testes, teste, Teste, teste, testes, testeTeste, teste, testes, testeTeste, teste, testes, teste'
        cy.get('#firstName').type('Augusto')
        cy.get('#lastName').type('Arandiba')
        cy.get('#email').type('augustoarandiba@gmail.com')
        cy.get('#open-text-area').type(longText, {delay: 0})
        cy.contains('button', 'Enviar').click()

        cy.get('.success').should('be.visible')
    })
    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
        cy.get('#firstName').type('Augusto')
        cy.get('#lastName').type('Arandiba')
        cy.get('#email').type('augustoarandiba@gmail,com')
        cy.get('#open-text-area').type('Teste')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })
    it('campo telefone continua vazio quando preenchido com valor não numerico', function() {
        cy.get('#phone')
        .type('abcdefgh')
        .should('have.value', '' )
    })
    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
        cy.get('#firstName').type('Augusto')
        cy.get('#lastName').type('Arandiba')
        cy.get('#email').type('augustoarandiba@gmail.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('Teste')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })
    it.only('preenche e limpa os campos nome, sobrenome, email e telefone', function() {
       cy.get('#firstName')
       .type('Augusto')
       .should('have.value', 'Augusto')
       .clear()
       .should('have.value', '')
       cy.get('#lastName')
       .type('Arandiba')
       .should('have.value', 'Arandiba')
       .clear()
       .should('have.value', '')
       cy.get('#email')
       .type('augustoarandiba@gmail.com')
       .should('have.value', 'augustoarandiba@gmail.com')
       .clear()
       .should('have.value', '')
       cy.get('#open-text-area')
       .type('Teste')
       .should('have.value', 'Teste')
       .clear()
       .should('have.value', '')
    })
    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')

    })
    it('envia o formuário com sucesso usando um comando customizado', function(){
        cy.fillBlancSpaces()

        cy.get('.success').should('be.visible')
        

    })
    it('seleciona um produto (YouTube) por seu texto', function(){
        cy.get('#product')
        .select('YouTube')
        .should('have.value', 'youtube')

    })
    it('Crie um novo teste chamado seleciona um produto (Mentoria) por seu valor (value)', function(){
        cy.get('#product')
        .select('mentoria')
        .should('have.value', 'mentoria')
    })
    it('Crie um novo teste chamado seleciona um produto (Blog) por seu índice', function(){
        cy.get('#product')
        .select(1)
        .should('have.value', 'blog')
    })
    it('Crie um teste chamado marca o tipo de atendimento "Feedback"', function(){
        cy.get('input[type="radio"][value="feedback"]')
        .check()
        .should('have.value', 'feedback')

    })
    it('marca cada tipo de atendimento', function(){
        cy.get('input[type="radio"]')
           .should('have.length', 3)
           .each(function($radio) {
               cy.wrap($radio).check()
               cy.wrap($radio).should('be.checked')
           })    
   })
     it('marca ambos checkboxes, depois desmarca o último', function(){
            cy.get('input[type="checkbox"]')
            .check()
            .should('be.checked')
            .last()
            .uncheck()
            .should('not.be.checked')
    })
    it('seleciona um arquivo da pasta fixtures', function(){
        cy.get('input[type="file"]')
            .should('not.have.value') // Verificação intermediária
            .selectFile('cypress/fixtures/example.json')
            .should(function($input){
                expect($input[0].files[0].name).to.equal('example.json')
            })
            
    })  
    it('seleciona um arquivo simulando um drag-and-drop', function(){
        cy.get('input[type="file"]')
        .should('not.have.value') // Verificação intermediária
        .selectFile('cypress/fixtures/example.json', { action:'drag-drop'})
        .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
        })

    })      
    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){
        cy.get('#privacy a').should('have.attr','target', '_blank')
    })
    it('acessa a página da política de privacidade removendo o target e então clicando no link', function(){
        cy.get('#privacy a')
        .invoke('removeAttr', 'target')
        .click()
    })          
  })
  