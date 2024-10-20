package com.QueueIt.capstone.API.Entities;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import static com.QueueIt.capstone.API.Entities.Permission.*;

@RequiredArgsConstructor
public enum Role {
    ADMIN(
            Set.of(
                    ADMIN_READ,
                    ADMIN_DELETE,
                    ADMIN_CREATE,
                    ADMIN_UPDATE,
                    ADVISER_READ,
                    ADVISER_DELETE,
                    ADVISER_CREATE,
                    ADVISER_UPDATE,
                    STUDENT_READ,
                    STUDENT_DELETE,
                    STUDENT_CREATE,
                    STUDENT_UPDATE
            )
    ),
    ADVISER(
            Set.of(
                    ADVISER_READ,
                    ADVISER_DELETE,
                    ADVISER_CREATE,
                    ADVISER_UPDATE
            )
    ),
    STUDENT(
            Set.of(
                    STUDENT_READ,
                    STUDENT_CREATE,
                    STUDENT_DELETE,
                    STUDENT_UPDATE
            )
    )
    ;

    private final Set<Permission> permissions;

    public Set<Permission> getPermissions(){
        return permissions;
    }

    public List<SimpleGrantedAuthority> getAuthorities(){
        var authorities = getPermissions()
                .stream()
                .map(permission -> new SimpleGrantedAuthority(permission.name()))
                .collect(Collectors.toList());

        authorities.add(new SimpleGrantedAuthority("ROLE_"+this.name()));
        return authorities;
    }
}
