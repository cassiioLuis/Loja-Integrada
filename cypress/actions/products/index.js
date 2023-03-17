

class Product {

    go()
    {
        cy.visit('/categoria-produto-com-categoria-1-nivel')
    }

    buy()
    {
        cy.contains('.comprar', ' Comprar ')
            .should('be.visible').click()
    }

}

export default new Product()