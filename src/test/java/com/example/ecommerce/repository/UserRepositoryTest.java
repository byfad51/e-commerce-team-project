package com.example.ecommerce.repository;

import com.example.ecommerce.TestData;
import com.example.ecommerce.model.User;
import org.junit.jupiter.api.BeforeEach;
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
        "spring.datasource.username=sa",
        "spring.datasource.password=",
        "spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.H2Dialect"
})
public class UserRepositoryTest {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    TestEntityManager testEntityManager;

    @Test
    public void testFindByUsername(){

        User user = TestData.testUser();
        testEntityManager.persist(user);
        testEntityManager.flush();

        Optional<User> result = userRepository.findByUsername(user.getUsername());

        assertTrue(result.isPresent());
        assertEquals(user.getUsername(), result.get().getUsername());

    }

    @Test
    public void testFindByNonExistingUsername(){

        Optional<User> result = userRepository.findByUsername("nonexistent");

        assertFalse(result.isPresent());
    }

    @Test
    public void testFindByEmail(){

        User user = TestData.testUser();
        testEntityManager.persist(user);
        testEntityManager.flush();

        Optional<User> result = userRepository.findByEmail(user.getEmail());

        assertTrue(result.isPresent());
        assertEquals(user.getEmail(), result.get().getEmail());
    }

    @Test
    public void testFindByNonExistingEmail(){

        Optional<User> result = userRepository.findByEmail("nonexistent@example.com");
        assertFalse(result.isPresent());
    }

    @Test
    public void testSaveOneUser() {

        User user = TestData.testUser();
        testEntityManager.persist(user);
        testEntityManager.flush();

        User result = userRepository.save(user);

        assertNotNull(result);
        assertNotNull(result.getEmail());
        assertEquals(user.getEmail(), result.getEmail());
    }

    @Test
    public void testDeleteOneUser(){

        User user = TestData.testUser();
        testEntityManager.persist(user);
        testEntityManager.flush();

        userRepository.delete(user);

        assertEquals(userRepository.findByUsername(user.getUsername()), Optional.empty());
    }


}