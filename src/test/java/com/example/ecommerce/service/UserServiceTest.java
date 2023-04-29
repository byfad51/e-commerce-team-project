package com.example.ecommerce.service;

import com.example.ecommerce.TestData;
import com.example.ecommerce.dto.user.UserResponse;
import com.example.ecommerce.model.User;
import com.example.ecommerce.repository.ProductRepository;
import com.example.ecommerce.repository.UserRepository;
import com.example.ecommerce.service.impl.UserServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

class UserServiceTest {

    @Mock
    private UserRepository userRepository;

   @Mock
   private ProductRepository productRepository;

    private UserServiceImpl userService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        userService = new UserServiceImpl(userRepository, productRepository);
    }

    @Test
    void testGetAllUsers() {

        List<User> userList = new ArrayList<>();
        userList.add(TestData.testUser());
        when(userRepository.findAll()).thenReturn(userList);

        List<UserResponse> result = userService.getAllUsers();

        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals(userList.get(0).getUsername(), result.get(0).getUsername());
    }

    @Test
    void testGetUserByUsername() {

        User user = TestData.testUser();
        when(userRepository.findByUsername(anyString())).thenReturn(Optional.of(user));

        UserResponse result = userService.getUserByUsername(user.getUsername());

        assertNotNull(result);
        assertEquals(user.getUsername(), result.getUsername());
    }

    @Test
    void testGetUserByEmail() {

        User user = TestData.testUser();
        when(userRepository.findByEmail(anyString())).thenReturn(Optional.of(user));

        User result = userService.getUserByEmail(user.getEmail());

        assertNotNull(result);
        assertEquals(user.getEmail(), result.getEmail());
    }

    @Test
    void testUpdateUser() {

        User user = TestData.testUser();

        userService.updateUser(user);

        verify(userRepository, times(1)).save(user);
    }

    @Test
    void testGetUserById() {

        User user = TestData.testUser();
        when(userRepository.findById(anyLong())).thenReturn(Optional.of(user));

        UserResponse result = userService.getUserById(1L);

        assertNotNull(result);
        assertEquals(user.getUsername(), result.getUsername());
    }
}
