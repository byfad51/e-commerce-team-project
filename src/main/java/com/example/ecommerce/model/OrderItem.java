package com.example.ecommerce.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;


import java.util.Objects;

@Entity
@Table(name="order_item")
@Data
@NoArgsConstructor
public class OrderItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "order_id")
    @JsonIgnore//why ask muh
    private Order order;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    @Column(name = "quantity")
    private Integer quantity;
    // şu aşağıdaki metodları mı yapıyoruz @jsonıgnore dediğimizde
  @Override
  public boolean equals(Object o) {
      if (this == o) return true;
      if (o == null || getClass() != o.getClass()) return false;
      OrderItem orderItem = (OrderItem) o;
      return Objects.equals(id, orderItem.id);
  }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}