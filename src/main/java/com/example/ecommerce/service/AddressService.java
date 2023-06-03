package com.example.ecommerce.service;

import com.example.ecommerce.model.Address;

import java.util.List;

public interface AddressService {

    List<Address> getUserAddresses(Long userId);

    Address getAddressById(Long addressId);

    Address addAddress(Long userId, Address address);

    void deleteAddressById(Long addressId);

    Address updateAddress(Long addressId, Address updatedAddress);

}
