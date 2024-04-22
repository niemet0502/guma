package com.mariusniemet.projectservice.resolvers;

import com.mariusniemet.projectservice.models.Project;
import com.mariusniemet.projectservice.services.ProjectsService;
import com.netflix.graphql.dgs.DgsComponent;
import com.netflix.graphql.dgs.DgsQuery;
import com.netflix.graphql.dgs.InputArgument;

import java.util.List;

@DgsComponent
public class ProjectsResolver {
    private final ProjectsService service;

    public ProjectsResolver(ProjectsService service){
        this.service = service;
    }

    @DgsQuery
    public List<Project> projects() {
        return this.service.findAll();
    }

    @DgsQuery
    public Project project(@InputArgument Integer id){
        return this.service.findById(id);
    }
}