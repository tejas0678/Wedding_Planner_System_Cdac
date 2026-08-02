package com.cdac.weddingplanner.auth.repository;

import com.cdac.weddingplanner.auth.entity.PasswordResetToken;
import com.cdac.weddingplanner.auth.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, Long> {

    Optional<PasswordResetToken> findByToken(String token);

    Optional<PasswordResetToken> findByUser(User user);
}
