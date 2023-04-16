package com.example.ecommerce.controller;

import com.example.ecommerce.dto.user.UserResponse;
import com.example.ecommerce.service.impl.UserServiceImpl;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;


import java.util.ArrayList;
import java.util.List;

import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;

@WebMvcTest(UserController.class)
@AutoConfigureMockMvc(addFilters = false)
public class UserControllerIT {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserServiceImpl userService;

    @Test
    public void testGetUserById_ExistingUser_ReturnsUserResponseAndStatusFound() throws Exception {
        UserResponse userResponse = new UserResponse();
        userResponse.setUsername("testUser");
        userResponse.setFirstname("Test");
        userResponse.setLastname("User");

        when(userService.getUserById(anyLong())).thenReturn(userResponse);

        mockMvc.perform(MockMvcRequestBuilders.get("/users/getUserById/1"))
                .andExpect(MockMvcResultMatchers.status().isFound())
                .andExpect(MockMvcResultMatchers.jsonPath("$.username").value(userResponse.getUsername()))
                .andExpect(MockMvcResultMatchers.jsonPath("$.firstname").value(userResponse.getFirstname()))
                .andExpect(MockMvcResultMatchers.jsonPath("$.lastname").value(userResponse.getLastname()));
    }

    @Test
    public void testGetUserById_NonExistingUser_ReturnsStatusNotFound() throws Exception {

        when(userService.getUserById(anyLong())).thenReturn(null);

        mockMvc.perform(MockMvcRequestBuilders.get("/users/getUserById/1"))
                .andExpect(MockMvcResultMatchers.status().isNotFound());
    }

    @Test
    public void testGetUserByUsername_ExistingUser_ReturnsUserResponseAndStatusFound() throws Exception {

        UserResponse response = new UserResponse();
        response.setUsername("testUser");
        response.setFirstname("Test");
        response.setLastname("User");

        when(userService.getUserByUsername(anyString())).thenReturn(response);

        mockMvc.perform(MockMvcRequestBuilders.get("/users/getUserByUsername?username=testUser"))
                .andExpect(MockMvcResultMatchers.status().isFound())
                .andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.jsonPath("$.username").value(response.getUsername()))
                .andExpect(MockMvcResultMatchers.jsonPath("$.firstname").value(response.getFirstname()))
                .andExpect(MockMvcResultMatchers.jsonPath("$.lastname").value(response.getLastname()));
    }

    @Test
    public void testGetUserByUsername_NonExistingUser_ReturnsStatusNotFound() throws Exception {

        when(userService.getUserByUsername(anyString())).thenReturn(null);

        mockMvc.perform(MockMvcRequestBuilders.get("/users/getUserByUsername?username=testUser"))
                .andExpect(MockMvcResultMatchers.status().isNotFound());
    }

    @Test
    public void testGetAllUsers_NonEmptyList_ReturnsListOfUsersAndStatusOk() throws Exception {

        List<UserResponse> userList = new ArrayList<>();
        UserResponse response = new UserResponse();
        response.setUsername("testUser");
        response.setFirstname("Test");
        response.setLastname("User");
        UserResponse response2 = new UserResponse();
        response2.setUsername("testUser2");
        response2.setFirstname("Test2");
        response2.setLastname("User2");

        userList.add(response);
        userList.add(response2);

        when(userService.getAllUsers()).thenReturn(userList);

        mockMvc.perform(MockMvcRequestBuilders.get("/users/getAllUsers"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].username").value(response.getUsername()))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].firstname").value(response.getFirstname()))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].lastname").value(response.getLastname()))
                .andExpect(MockMvcResultMatchers.jsonPath("$[1].username").value(response2.getUsername()))
                .andExpect(MockMvcResultMatchers.jsonPath("$[1].firstname").value(response2.getFirstname()))
                .andExpect(MockMvcResultMatchers.jsonPath("$[1].lastname").value(response2.getLastname()));

    }

    @Test
    public void testGetAllUsers_EmptyList_ReturnsEmptyListAndStatusOk() throws Exception {

        List<UserResponse> userList = new ArrayList<>();

        when(userService.getAllUsers()).thenReturn(userList);

        mockMvc.perform(MockMvcRequestBuilders.get("/users/getAllUsers"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.jsonPath("$").isEmpty());

    }

}