package com.example.ecommerce.repository;


import com.example.ecommerce.TestData;
import com.example.ecommerce.model.Product;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest(properties = {
        "spring.jpa.hibernate.ddl-auto=create-drop",
        "spring.datasource.url=jdbc:h2:mem:testdb",
        "spring.datasource.driverClassName=org.h2.Driver",
        "spring.datasource.username=gulcan",
        "spring.datasource.password=123",
        "spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.H2Dialect"
})
public class ProductRepositoryTest {
    @Autowired
    ProductRepository productRepository;
    @Autowired
    TestEntityManager testEntityManager;
@Test
    public void testFindByProductName(){
    Product product=TestData.testProduct();

    testEntityManager.persist(product);
    testEntityManager.flush();

    Optional<Product> result=productRepository.findByProductName(product.getProductName());

    assertTrue(result.isPresent());
    assertEquals(product.getProductName(),result.get().getProductName());
}
@Test
public void testFindByNonExistingProductName(){

    Optional<Product> result=productRepository.findByProductName("NonExistingProductName");
    assertFalse(result.isPresent());
}

@Test
    public void testFindByProductNameAndAuthorName(){
    Product product=TestData.testProduct();

    testEntityManager.persist(product);
    testEntityManager.flush();

    Optional<Product> result=productRepository.findByProductNameAndAuthorName(product.getProductName(),
            product.getAuthorName());
    assertTrue(result.isPresent());
    assertEquals(product, result.get());

    // Bu Id yi göz ardı ediyor
    // assertEquals(product.getProductName(),result.get().getProductName());
  //  assertEquals(product.getAuthorName(),result.get().getAuthorName());

}
@Test
    public void testFindNonExistingByProductNameAndAuthorName(){
    Optional<Product> result=productRepository.findByProductNameAndAuthorName("Martin Eden",
            "Jack London");
    assertFalse(result.isPresent());
}

}
