package com.flavio.api.models;

import java.util.List;

public class TaskDTO {
    public String content;
    public List<Long> userIds;
    public int time;
    public String priority;
    public Long projectId;
    public int status;
}

