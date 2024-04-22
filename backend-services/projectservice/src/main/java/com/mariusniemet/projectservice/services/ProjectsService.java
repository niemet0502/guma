package com.mariusniemet.projectservice.services;

import com.mariusniemet.projectservice.models.Project;
import com.mariusniemet.projectservice.utils.RestClient;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectsService {
    private final RestClient client;

    public ProjectsService(RestClient client){
        this.client = client;
    }

    public List<Project> findAll(){
        return this.client.getList("http://localhost:5002/projects/");
    }

    public Project findById(int id){
        ResponseEntity<Project> response =  this.client.get("http://localhost:5002/projects/"+id, Project.class);
        return response.getBody();
    }
}