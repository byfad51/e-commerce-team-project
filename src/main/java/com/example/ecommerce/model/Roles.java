package com.example.ecommerce.model;

public enum Roles {

    ADMIN ("ROLE_ADMIN"),
    USER ("ROLE_USER");

    Roles(String roleName) {
        this.roleName=roleName;
    }

    private final String roleName;

    public String getRoleName() {
        return roleName;
    }

}
