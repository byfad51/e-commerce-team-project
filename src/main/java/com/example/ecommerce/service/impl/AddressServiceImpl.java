package com.example.ecommerce.service.impl;

import com.example.ecommerce.exception.AddressNotFoundException;
import com.example.ecommerce.exception.InvalidArgumentException;
import com.example.ecommerce.exception.UserNotFoundException;
import com.example.ecommerce.model.Address;
import com.example.ecommerce.model.User;
import com.example.ecommerce.repository.AddressRepository;
import com.example.ecommerce.repository.UserRepository;
import com.example.ecommerce.service.AddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AddressServiceImpl implements AddressService {

    private final AddressRepository addressRepository;
    private final UserRepository userRepository;

    @Autowired
    public AddressServiceImpl(AddressRepository addressRepository, UserRepository userRepository) {
        this.addressRepository = addressRepository;
        this.userRepository = userRepository;
    }

    @Override
    public List<Address> getUserAddresses(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() ->
                new UserNotFoundException("User not found with id: " + userId));

        return user.getAddresses();
    }

    @Override
    public Address getAddressById(Long addressId) {
        Optional<Address> optionalAddress = addressRepository.findById(addressId);
        return optionalAddress.orElseThrow(() -> new AddressNotFoundException("Address not found"));
    }

    @Override
    public Address addAddress(Long userId, Address address) {
        User user = userRepository.findById(userId).orElseThrow(() ->
                new UserNotFoundException("User not found with id: " + userId));

        List<Address> userAddresses = user.getAddresses();

        if (userAddresses.stream().anyMatch(existingAddress -> isSameAddress(existingAddress, address))) {
            throw new InvalidArgumentException("Address already exists for the user.");
        }

        userAddresses.add(address);
        return addressRepository.save(address);
    }


    @Override
    public void deleteAddressById(Long addressId) {

        if (!addressRepository.existsById(addressId)) {
            throw new AddressNotFoundException("Address not found");
        }

        addressRepository.deleteById(addressId);
    }

    @Override
    public Address updateAddress(Long addressId, Address updatedAddress) {

        Address address = getAddressById(addressId);
        address.setFirstname(updatedAddress.getFirstname());
        address.setLastname(updatedAddress.getLastname());
        address.setCity(updatedAddress.getCity());
        address.setDistrict(updatedAddress.getDistrict());
        address.setNeighbourhood(updatedAddress.getNeighbourhood());
        address.setFullAddress(updatedAddress.getFullAddress());
        address.setPostalCode(updatedAddress.getPostalCode());
        address.setPhoneNumber(updatedAddress.getPhoneNumber());
        return addressRepository.save(address);

    }

    private boolean isSameAddress(Address address1, Address address2) {
        return address1.getFirstname().equals(address2.getFirstname()) &&
                address1.getLastname().equals(address2.getLastname()) &&
                address1.getCity().equals(address2.getCity()) &&
                address1.getDistrict().equals(address2.getDistrict()) &&
                address1.getNeighbourhood().equals(address2.getNeighbourhood()) &&
                address1.getFullAddress().equals(address2.getFullAddress()) &&
                address1.getPostalCode().equals(address2.getPostalCode()) &&
                address1.getPhoneNumber().equals(address2.getPhoneNumber());
    }

}
