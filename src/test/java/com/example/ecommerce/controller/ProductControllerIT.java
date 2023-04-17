package com.example.ecommerce.controller;

import com.example.ecommerce.dto.product.ProductResponse;
import com.example.ecommerce.service.impl.ProductServiceImpl;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.ArrayList;
import java.util.List;

import static org.mockito.Mockito.when;

@WebMvcTest(ProductController.class)
@AutoConfigureMockMvc(addFilters = false)
@ExtendWith(SpringExtension.class)
public class ProductControllerIT {
    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ProductServiceImpl productService;

    @Test
    public void getAllProducts_ShouldReturnProductResponseListAndStatusOk() throws Exception {

        List<ProductResponse> products = new ArrayList<>();
        ProductResponse product1 =new ProductResponse();
        product1.setProductName("martineden");
        product1.setPrice(22.0);

         products.add(product1);

         when(productService.getAllProducts()).thenReturn(products);

         mockMvc.perform(MockMvcRequestBuilders.get("/products/getAllProducts"))
                 .andExpect(MockMvcResultMatchers.status().isOk())
                 .andExpect(MockMvcResultMatchers.jsonPath("$[0].productName")
                         .value(product1.getProductName()))
                 .andExpect(MockMvcResultMatchers.jsonPath("$[0].price")
                         .value(product1.getPrice()));

    }
}
