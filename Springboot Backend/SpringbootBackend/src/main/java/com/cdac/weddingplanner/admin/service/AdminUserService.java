package com.cdac.weddingplanner.admin.service;

import com.cdac.weddingplanner.auth.entity.User;

import java.util.List;

public interface AdminUserService {

    List<User> getAllUsers();

    User toggleUserStatus(Long userId, boolean enabled);

    void deleteUser(Long userId);
}
