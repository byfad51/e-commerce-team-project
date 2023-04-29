package com.example.ecommerce.enums;

public enum Role {

    ADMIN ("ROLE_ADMIN"),
    USER ("ROLE_USER");

    Role(String roleName) {
        this.roleName=roleName;
    }

    private final String roleName;

    public String getRoleName() {
        return roleName;
    }

}
