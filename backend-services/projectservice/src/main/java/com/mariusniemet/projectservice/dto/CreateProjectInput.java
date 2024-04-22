package com.mariusniemet.projectservice.dto;

public class CreateProjectInput {
    private String name;

    private String size;

    private String logo;

    public CreateProjectInput(){

    }

    public CreateProjectInput(String name, String size, String logo) {
        this.name = name;
        this.size = size;
        this.logo = logo;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSize() {
        return size;
    }

    public void setSize(String size) {
        this.size = size;
    }

    public String getLogo() {
        return logo;
    }

    public void setLogo(String logo) {
        this.logo = logo;
    }
}
