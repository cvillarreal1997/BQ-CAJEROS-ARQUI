const { createYield } = require("typescript")

describe('Banquito App', ()=>{
beforeEach(()=>{
    cy.visit('http://localhost:4200')
})

    it('frontpage can be opened', () =>{
     cy.contains('Banco BanQuito')
    })

    it('login form can be opened', () =>{
        cy.contains('Acceder').click()
       })

       it('user can login', () =>{
        cy.get('[id="username"]').type('carlos')
        cy.get('[id="password"]').type('12345678')
        cy.get('[id="acceder"]').click()
       })
})