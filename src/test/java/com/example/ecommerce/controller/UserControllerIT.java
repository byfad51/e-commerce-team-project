package com.example.ecommerce.controller;

import com.example.ecommerce.dto.user.UserResponse;
import com.example.ecommerce.service.impl.UserServiceImpl;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

@WebMvcTest(UserController.class)
@AutoConfigureMockMvc(addFilters = false)
@ExtendWith(SpringExtension.class)
public class UserControllerIT {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserServiceImpl userService;

    @Test
    public void testGetUserById_ExistingUser_ReturnsUserResponseAndStatusFound() throws Exception {
        // Mock a UserResponse object
        UserResponse userResponse = new UserResponse();
        userResponse.setUsername("testUser");
        userResponse.setFirstname("Test");
        userResponse.setLastname("User");

        // Mock the userService and return the UserResponse object
        Mockito.when(userService.getUserById(1L)).thenReturn(userResponse);

        // Make a GET request to the UserController endpoint
        mockMvc.perform(MockMvcRequestBuilders.get("/users/getUserById/1"))
                // Assert that the response status is 302 FOUND
                .andExpect(MockMvcResultMatchers.status().isFound())
                // Assert that the response JSON contains the expected properties and values
                .andExpect(MockMvcResultMatchers.jsonPath("$.username").value(userResponse.getUsername()))
                .andExpect(MockMvcResultMatchers.jsonPath("$.firstname").value(userResponse.getFirstname()))
                .andExpect(MockMvcResultMatchers.jsonPath("$.lastname").value(userResponse.getLastname()));
    }

    @Test
    public void testGetUserById_NonExistingUser_ReturnsStatusNotFound() throws Exception {
        // Mock the userService and return null
        Mockito.when(userService.getUserById(1L)).thenReturn(null);

        // Make a GET request to the UserController endpoint
        mockMvc.perform(MockMvcRequestBuilders.get("/users/getUserById/1"))
                // Assert that the response status is 404 NOT FOUND
                .andExpect(MockMvcResultMatchers.status().isNotFound());
    }

}
