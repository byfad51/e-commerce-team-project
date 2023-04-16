package com.example.ecommerce.dto.user;

import lombok.Data;

@Data
public class ErrorResponse {

    private String message;
    private int status;


}
