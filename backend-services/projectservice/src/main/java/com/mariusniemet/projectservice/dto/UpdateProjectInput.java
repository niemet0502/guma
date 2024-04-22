package com.mariusniemet.projectservice.dto;

public class UpdateProjectInput extends CreateProjectInput{
    private int id;

    public UpdateProjectInput(String name, String size, String logo, int id) {
        super(name, size, logo);
        this.id = id;
    }

    public UpdateProjectInput(){

    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }
}
