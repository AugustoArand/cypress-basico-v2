Cypress.Commands.add('fillBlancSpaces', function(){
    cy.get('#firstName').type('Augusto')
    cy.get('#lastName').type('Arandiba')
    cy.get('#email').type('augustoarandiba@gmail.com')
    cy.get('#open-text-area').type('Teste')
    cy.contains('button', 'Enviar').click()

})