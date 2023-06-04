package com.example.ecommerce.enums;

public enum OrderStatus {

    PENDING("Pending Order"),
    APPROVED ("Order Approved"),
    CANCELLED ("Order Cancelled"),
    REJECTED ("Order Rejected"),
    COMPLETED ("Order Completed");

    private final String statusMessage;

    OrderStatus(String statusMessage){
        this.statusMessage = statusMessage;
    }

    public String getStatusMessage(){
        return this.statusMessage;
    }

}
