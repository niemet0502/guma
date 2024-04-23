package com.mariusniemet.projectservice.services;

import com.mariusniemet.projectservice.dto.UpdateProjectInput;
import com.mariusniemet.projectservice.models.Label;
import com.mariusniemet.projectservice.models.Project;
import com.mariusniemet.projectservice.utils.RestClient;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectsService {
    private final RestClient client;
    private final LabelsService labelsService;


    public ProjectsService(RestClient client, LabelsService labelsService){
        this.client = client;
        this.labelsService = labelsService;

    }

    public List<Project> findAll(){
        return this.client.getList("http://localhost:5002/projects/", null);
    }

    public Project findById(int id){
        ResponseEntity<Project> response =  this.client.get("http://localhost:5002/projects/"+id, Project.class);
        return response.getBody();
    }

    public Project update(UpdateProjectInput data){
       ResponseEntity<Project> response =  this.client.put("http://localhost:5002/projects/"+data.getId(), data, Project.class);
        return response.getBody();
    }

    public Project remove(int id){
        return new Project();
    }

    public List<Label> getLabels(int projectId){
        return this.labelsService.findAll(projectId, null);
    }
}
