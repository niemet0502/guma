package com.mariusniemet.projectservice.services;

import com.mariusniemet.projectservice.dto.CreateLabelInput;
import com.mariusniemet.projectservice.dto.UpdateLabelInput;
import com.mariusniemet.projectservice.models.Label;
import com.mariusniemet.projectservice.utils.RestClient;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class LabelsService {
    private final RestClient client;
    private final  String url = "http://localhost:5002/labels/";

    public LabelsService(RestClient client) {
        this.client = client;
    }

    public Label create(CreateLabelInput createLabelInput){
        ResponseEntity<Label> response = this.client.post(url, createLabelInput, Label.class);
        return response.getBody();
    }


    public List<Label> findAll(Integer project_id, Integer team_id) {
        Map<String, String> queryParams = new HashMap<>();

        if(project_id != null){
            queryParams.put("project_id", String.valueOf(project_id));

        }

        if(team_id != null){
            queryParams.put("team_id", String.valueOf(team_id));
        }

        return  this.client.getList(url, queryParams);
    }

    public Label findOne(int id){
        ResponseEntity<Label> response = this.client.get(url+ id, Label.class);
        return response.getBody();
    }

    public Label update(UpdateLabelInput update){
        ResponseEntity<Label> response =  this.client.put(url+ update.getId(), update, Label.class);
        return response.getBody();
    }
}

