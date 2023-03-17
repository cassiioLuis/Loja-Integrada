

class Cart {

    isCartPage() {
        cy.get('h1[class^=titulo]').should('contain.text', 'Carrinho')
            .children().should('contain.text', 'Clique em finalizar compra para efetuar o seu pedido.')
    }

    addItem() {
        cy.get('.quantidade a').last().should('be.visible').click()
    }

    fillCoupun(coupon) {
        coupon ? cy.get('#usarCupom').clear().type(coupon) :
            cy.get('#usarCupom').should('not.exist')
    }

    applyCoupun() {
        cy.intercept('GET', `${Cypress.env('api')}/carrinho/valor/*`).as('value')
        cy.get('#btn-cupom').click()
        cy.wait('@value')
    }

    fillCep(cep) {
        cy.get('#calcularFrete').clear().type(cep)
    }

    applyCep() {
        cy.intercept('GET', `${Cypress.env('api')}/carrinho/endereco/*`).as('cep')
        cy.get('#btn-frete').should('be.visible').click()
        cy.wait('@cep')
    }

    couponApplied(coupon) {
        cy.get('.cupom-codigo').should('have.text', coupon)
    }

    freeShipping() {
        cy.contains('.nome', 'Frete Grátis').should('be.visible')
            .parent().find('.valor').should('have.text', 'R$ 0,00')
    }

    selectShipping() {
        cy.get('input[type=radio]').last()
            .should('be.visible').click({ force: true })
    }

    totalPrice(total) {
        cy.get('.total').should('contain.text', 'Total:')
            .children().should('contain.text', total)
    }

    noShipping() {
        cy.get('.muted').should('contain.text', '(frete não incluso)')
    }

    discount(discount) {
        cy.get('#cupom_desconto').should('contain.text', `${discount}`)
    }

    message(message) {
        cy.get('.alert').should('contain.text', message)
    }

    removeCoupon() {
        cy.get('a[title="Remover cupom"]').should('be.visible').click()
    }

}

export default new Cart()