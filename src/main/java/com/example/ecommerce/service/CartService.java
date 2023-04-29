package com.example.ecommerce.service;

import com.example.ecommerce.dto.cart.CartResponse;
import com.example.ecommerce.model.Cart;
import com.example.ecommerce.model.CartItem;

import java.util.List;

public interface CartService {

    CartResponse addToCart(Long productId, Integer amount);

    Cart calculatePrice(Cart cart);

    CartResponse incrementCartItem(Long cartItemId, Integer amount);

    CartResponse decrementCartItem(Long cartItemId, Integer amount);

    CartResponse removeFromCart(Long cartItemId);

    CartResponse getCart();

    void emptyCart();

}
