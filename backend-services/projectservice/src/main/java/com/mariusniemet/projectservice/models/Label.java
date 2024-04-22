package com.mariusniemet.projectservice.models;

public class Label {
    private int id;
    private String name;
    private int project_id;
    private int team_id;

    public Label(){

    }

    public Label(String name, int project_id, int team_id) {
        this.name = name;
        this.project_id = project_id;
        this.team_id = team_id;
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

    public int getProject_id() {
        return project_id;
    }

    public void setProject_id(int project_id) {
        this.project_id = project_id;
    }

    public int getTeam_id() {
        return team_id;
    }

    public void setTeam_id(int team_id) {
        this.team_id = team_id;
    }
}
