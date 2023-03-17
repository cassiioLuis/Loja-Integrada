

class Product {

    go(product = '/categoria-produto-com-categoria-1-nivel')
    {
        cy.visit(product)
    }

    buy()
    {
        cy.contains('.comprar', ' Comprar ')
            .should('be.visible').click()
    }

}

export default new Product()