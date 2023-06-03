package com.example.ecommerce.controller;

import com.example.ecommerce.exception.AddressNotFoundException;
import com.example.ecommerce.exception.InvalidArgumentException;
import com.example.ecommerce.exception.UserNotFoundException;
import com.example.ecommerce.model.Address;
import com.example.ecommerce.service.AddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/address")
public class AddressController {

    private final AddressService addressService;

    @Autowired
    public AddressController(AddressService addressService) {
        this.addressService = addressService;
    }

    @GetMapping("/getUserAddresses/{userId}")
    public ResponseEntity<List<Address>> getUserAddresses(@PathVariable Long userId) {
        try {
            List<Address> addresses = addressService.getUserAddresses(userId);
            return new ResponseEntity<>(addresses, HttpStatus.OK);
        } catch (UserNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/getAddressById/{addressId}")
    public ResponseEntity<Address> getAddressById(@PathVariable Long addressId) {
        try {
            Address address = addressService.getAddressById(addressId);
            return new ResponseEntity<>(address, HttpStatus.OK);
        } catch (AddressNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/addAddress/{userId}")
    public ResponseEntity<Address> addAddress(@PathVariable Long userId, @RequestBody Address address) {
        try {
            Address addedAddress = addressService.addAddress(userId, address);
            return new ResponseEntity<>(addedAddress, HttpStatus.CREATED);
        } catch (UserNotFoundException ex) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (InvalidArgumentException ex) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
    }


    @DeleteMapping("/deleteAddressById/{addressId}")
    public ResponseEntity<Object> deleteAddressById(@PathVariable Long addressId) {
        try {
            addressService.deleteAddressById(addressId);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (AddressNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/updateAddress/{addressId}")
    public ResponseEntity<Address> updateAddress(@PathVariable Long addressId, @RequestBody Address updatedAddress) {
        try {
            Address address = addressService.updateAddress(addressId, updatedAddress);
            return new ResponseEntity<>(address, HttpStatus.OK);
        } catch (AddressNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

}

