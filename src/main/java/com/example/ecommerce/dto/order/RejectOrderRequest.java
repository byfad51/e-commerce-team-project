package com.example.ecommerce.dto.order;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RejectOrderRequest {

    private Long orderId;
    private String rejectMessage;

}
