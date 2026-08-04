package com.cdac.weddingplanner.admin.service;

import com.cdac.weddingplanner.auth.entity.User;

import java.util.List;
import java.util.Map;

public interface AdminClientService {

    List<User> getClients();

    Map<String, Object> getClientDetails(Long id);
}
