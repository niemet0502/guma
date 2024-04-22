package com.mariusniemet.projectservice.models;

public class Project {
    private int id;
    private String name;

    private String size;
    private String logo;

    public Project(){

    }

    public Project(String name, String size, String logo) {
        this.name = name;
        this.size = size;
        this.logo = logo;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
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
