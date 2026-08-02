package com.cdac.weddingplanner.admin.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ClientResponse {

    private Long id;

    private String fullName;

    private String email;

    private String phone;

    private String status;

    private String created;

}