package com.mariusniemet.projectservice.resolvers;

import com.mariusniemet.projectservice.dto.CreateLabelInput;
import com.mariusniemet.projectservice.dto.UpdateLabelInput;
import com.mariusniemet.projectservice.models.Label;
import com.mariusniemet.projectservice.services.LabelsService;
import com.netflix.graphql.dgs.DgsComponent;
import com.netflix.graphql.dgs.DgsMutation;
import com.netflix.graphql.dgs.DgsQuery;
import com.netflix.graphql.dgs.InputArgument;

import java.util.List;

@DgsComponent
public class LabelsResolver {
    private LabelsService service;

    public LabelsResolver(LabelsService service) {
        this.service = service;
    }

    @DgsQuery
    public List<Label> labels(@InputArgument Integer project_id, @InputArgument Integer team_id){
        System.out.println(team_id);
        return this.service.findAll(project_id, null);
    }

    @DgsQuery
    public Label label(@InputArgument Integer id){
        return this.service.findOne(id);
    }

    @DgsMutation
    public Label createLabel(@InputArgument CreateLabelInput createLabelInput){
        return this.service.create(createLabelInput);
    }

    @DgsMutation
    public Label updateLabel(@InputArgument UpdateLabelInput updateLabelInput){
        return this.service.update(updateLabelInput);
    }
}
