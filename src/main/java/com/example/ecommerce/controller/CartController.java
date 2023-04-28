package com.example.ecommerce.controller;

import com.example.ecommerce.model.Cart;
import com.example.ecommerce.model.CartItem;
import com.example.ecommerce.service.CartService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cart")
public class CartController {

    private final CartService cartService;


    public CartController(CartService cartService) {
        this.cartService = cartService;
    }


    @PostMapping
    public ResponseEntity<List<CartItem>> addToCart(@RequestParam Long productId, @RequestParam(required = false, defaultValue = "1") Integer amount){
        cartService.addToCart(productId, amount);
        return new ResponseEntity<>(cartService.getCart(),HttpStatus.OK);
    }

    @PostMapping("/increment")
    public ResponseEntity<List<CartItem>> increaseCartItem(@RequestParam Long productId, @RequestParam(required = false, defaultValue = "1") Integer amount){
        cartService.incrementCartItem(productId, amount);
        return new ResponseEntity<>(cartService.getCart(),HttpStatus.OK);
    }

    @PostMapping("/decrement")
    public ResponseEntity<List<CartItem>> decreaseCartItem(@RequestParam Long productId, @RequestParam(required = false, defaultValue = "1") Integer amount){
        cartService.decrementCartItem(productId, amount);
        return new ResponseEntity<>(cartService.getCart(),HttpStatus.OK);
    }

    @PostMapping("/remove")
    public ResponseEntity<List<CartItem>> removeFromCart(@RequestParam Long productId){
        cartService.removeFromCart(productId);
        return new ResponseEntity<>(cartService.getCart(), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<CartItem>> getCart(){
        List<CartItem> cart = cartService.getCart();
        return new ResponseEntity<>(cart, HttpStatus.OK);
    }

    @DeleteMapping
    public ResponseEntity<HttpStatus> emptyCart(){
        cartService.emptyCart();
        return new ResponseEntity<>(HttpStatus.OK);
    }


}
