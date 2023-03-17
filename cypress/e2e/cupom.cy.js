import cart from '../actions/cart'
import prod from '../actions/products'

import { shipping, product, total, cep, value, expired, invalid, coupons } from '../support/factories/coupon'

describe('Coupon validation', () => {

    beforeEach(() => {
        prod.go('[CATEGORIA] Produto com categoria - 1 Nível')
        prod.buy()
        cart.isCartPage()  
    })
    
    context('when free shipping coupon is applied', () => {

        beforeEach(() => {
            cart.fillCep(cep.cep)
            cart.applyCep()            
            cart.fillCoupun(shipping.coupon)
            cart.applyCoupun()
        })
        
        it('should see zero cost for shipping', () => {
            cart.couponApplied(shipping.coupon)
            cart.freeShipping()
        })

        it('should see product price in total', () => {
            cart.selectShipping()
            cart.totalPrice(shipping.total)
        })       

    })


    context('when product discount is applied', () => {
        
        beforeEach(() => {
            cart.fillCoupun(product.coupon)
            cart.applyCoupun()
        })

        it('should see menssage: "frete não incluso"', () => {
            cart.discount(product.discount)
            cart.noShipping()
        })

        it('should see product price -10% + shipping in total', () => {
            cart.fillCep(cep.cep)
            cart.applyCep()
            cart.selectShipping()
            cart.totalPrice(product.total)
        })

    })


    context('when total discont is applied', () => {

        beforeEach(() => {
            cart.fillCep(cep.cep)
            cart.applyCep()
            cart.selectShipping()
        })

        it('should see 5% discount on total price', () => {
            cart.fillCoupun(total.coupon)
            cart.applyCoupun()
            cart.discount(total.discount)
            cart.totalPrice(total.total)
        })

    })

    context('when value discount is applied', () => {

        beforeEach(() => {
            cart.fillCoupun(value.coupon)
            cart.applyCoupun()
        })

        it(`should see discount of R$${value.discount}`, () => {
            cart.discount(value.discount)
            cart.totalPrice(value.total)
        })

        it('should see menssage: "frete não incluso"', () => {
            cart.discount(value.discount)
            cart.noShipping()
        })

    })


    context('when expired coupon is applied', () => {

        it(`should see message ${expired.message}`, () => {
            cart.fillCoupun(expired.coupon)
            cart.applyCoupun()
            cart.message(expired.message)
            cart.totalPrice(expired.total)
        })

    })


    context('when invalid coupon is applied', () => {

        it(`should see message ${invalid.message}`, () => {
            cart.fillCoupun(invalid.coupon)
            cart.applyCoupun()
            cart.message(invalid.message)
            cart.totalPrice(invalid.total)
        })
        
    })


    context('when remove cupons', () => {

        coupons.forEach(coup => {
            it(`should recalculate the total without discount of coupon ${coup.coupon}`, () => {
                cart.fillCoupun(coup.coupon)
                cart.applyCoupun()
                cart.removeCoupon()
                cart.totalPrice('80,00')
            })
        })

    })

})