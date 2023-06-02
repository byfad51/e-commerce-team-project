package com.example.ecommerce.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name="orders")
@Getter
@Setter
@NoArgsConstructor
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "total_order_price")
    private Double totalOrderPrice;

    @Column(name = "date")
    private LocalDateTime date;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User user;

    @Column(name = "city")
    private String city;

    @Column(name = "address")
    private String address;

    @Column(name = "email")
    private String email;

    @Column(name = "phone_number")
    private String phoneNumber;

    @Column(name = "post_index")
    private Integer postIndex;

    @OneToMany(mappedBy = "order",cascade = CascadeType.ALL,fetch = FetchType.EAGER,orphanRemoval = true)
    @JsonIgnore
    private List<OrderItem> orderItems;

}