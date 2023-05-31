package com.example.ecommerce.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name="orders")
@Data
@NoArgsConstructor
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "total_order_price")
    private Double totalOrderPrice;

    @Column(name = "date")
    private LocalDate date;
    @ManyToOne
    @JoinColumn(name = "user")
    @JsonIgnore
    private User user;
   @OneToMany(mappedBy = "order",cascade = CascadeType.ALL,fetch = FetchType.EAGER,orphanRemoval = true)
   @JsonIgnore//bunu nie kullanıyoruz
    private List<OrderItem> orderItems;
}