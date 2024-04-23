package com.mariusniemet.projectservice.resolvers;

import com.mariusniemet.projectservice.dto.UpdateProjectInput;
import com.mariusniemet.projectservice.models.Label;
import com.mariusniemet.projectservice.models.Project;
import com.mariusniemet.projectservice.services.ProjectsService;
import com.netflix.graphql.dgs.*;
import org.slf4j.LoggerFactory;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Logger;

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

    @DgsMutation
    public Project updateProject(@InputArgument UpdateProjectInput updateProjectInput){
        return this.service.update(updateProjectInput);
    }

    @DgsMutation
    public Project removeProject(@InputArgument Integer id){
        return this.service.remove(id);
    }

    @DgsData(parentType = "Project", field = "labels")
    public List<Label> labelsFetcher(DgsDataFetchingEnvironment dataFetchingEnvironment) {
        System.out.println(dataFetchingEnvironment.getSource().toString());
        LinkedHashMap source = dataFetchingEnvironment.getSource();

        return this.service.getLabels((Integer) source.get("id"));
    }

    @DgsEntityFetcher(name = "Project")
    public Project project(Map<String, Object> values) {
        return this.service.findById((Integer) values.get("id"));
    }
}
