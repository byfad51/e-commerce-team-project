package com.example.ecommerce.service;

import com.example.ecommerce.model.Cart;
import com.example.ecommerce.model.CartItem;

import java.util.List;

public interface CartService {

    void addToCart(Long productId, Integer amount);

    Cart calculatePrice(Cart cart);

    void incrementCartItem(Long cartItemId, Integer amount);

    void decrementCartItem(Long cartItemId, Integer amount);

    void removeFromCart(Long cartItemId);

    List<CartItem> getCart();

    void emptyCart();

}
