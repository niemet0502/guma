package com.mariusniemet.projectservice.dto;

public class UpdateLabelInput extends CreateLabelInput{
    private int id;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }
}
