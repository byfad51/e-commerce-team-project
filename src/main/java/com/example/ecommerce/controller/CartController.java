package com.example.ecommerce.controller;

import com.example.ecommerce.dto.cart.CartResponse;
import com.example.ecommerce.service.CartService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/cart")
public class CartController {

    private final CartService cartService;


    public CartController(CartService cartService) {
        this.cartService = cartService;
    }


    @PostMapping("/addToCart")
    public ResponseEntity<CartResponse> addToCart(@RequestParam Long productId, @RequestParam(required = false, defaultValue = "1") Integer amount){
        CartResponse cartResponse = cartService.addToCart(productId, amount);
        return new ResponseEntity<>(cartResponse,HttpStatus.OK);
    }

    @PostMapping("/increment")
    public ResponseEntity<CartResponse> increaseCartItem(@RequestParam Long cartItemId, @RequestParam(required = false, defaultValue = "1") Integer amount){
        cartService.incrementCartItem(cartItemId, amount);
        return new ResponseEntity<>(cartService.getCart(),HttpStatus.OK);
    }

    @PostMapping("/decrement")
    public ResponseEntity<CartResponse> decreaseCartItem(@RequestParam Long cartItemId, @RequestParam(required = false, defaultValue = "1") Integer amount){
        cartService.decrementCartItem(cartItemId, amount);
        return new ResponseEntity<>(cartService.getCart(),HttpStatus.OK);
    }

    @PostMapping("/remove")
    public ResponseEntity<CartResponse> removeFromCart(@RequestParam Long cartItemId){
        cartService.removeFromCart(cartItemId);
        return new ResponseEntity<>(cartService.getCart(), HttpStatus.OK);
    }

    @GetMapping("/getCart")
    public ResponseEntity<CartResponse> getCart(){
        CartResponse cartResponse = cartService.getCart();
        return new ResponseEntity<>(cartResponse, HttpStatus.OK);
    }

    @DeleteMapping("/emptyCart")
    public ResponseEntity<HttpStatus> emptyCart(){
        cartService.emptyCart();
        return new ResponseEntity<>(HttpStatus.OK);
    }


}
