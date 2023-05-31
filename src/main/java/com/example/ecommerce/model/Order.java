package com.example.ecommerce.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;
import java.util.Objects;

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

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

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
   @JsonIgnore//bunu nie kullanıyoruz
    private List<OrderItem> orderItems;

// Aşağıdaki iki metoda tekrar bak
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Order order = (Order) o;
        return Objects.equals(id, order.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}