package com.moviebot.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                // REST API → CSRF 비활성화
                .csrf(csrf -> csrf.disable())

//                // 기본 로그인 / Basic Auth 비활성화
//                .formLogin(form -> form.disable())
//                .httpBasic(basic -> basic.disable())

                // 접근 권한 설정
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(
                                "/members/**"   // 회원가입

                        ).permitAll()
                        .anyRequest().permitAll() // 일단 전부 허용 (개발 단계)
                );

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}

