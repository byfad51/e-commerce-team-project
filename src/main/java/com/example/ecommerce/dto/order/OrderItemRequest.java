package com.example.ecommerce.dto.order;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class OrderItemRequest {

    @NotNull
    private Long productId;

    @NotNull
    @Positive
    private Integer quantity;

    public Long getProductId() {
        return productId;
    }


}
