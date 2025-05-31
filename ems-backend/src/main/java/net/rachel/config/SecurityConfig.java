package net.rachel.config;

import net.rachel.service.imlp.CustomUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import static org.springframework.security.config.Customizer.withDefaults;


@Configuration
@EnableWebSecurity
public class SecurityConfigOld {

    @Autowired
    private CustomUserDetailsService userDetailsService;



    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            // 关闭 CSRF 的新写法
            .csrf(csrf -> csrf.disable())

            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/admin/**").hasAuthority("trainer:edit")
                .requestMatchers("/trainers/**").hasAuthority("trainer:view")
                .requestMatchers("/login", "/error").permitAll()  // 允许登录接口公开访问
                .anyRequest().authenticated()
            )
//            .formLogin(form -> form
//                .loginProcessingUrl("/login") // 后端登录处理接口
//                .successHandler((request, response, authentication) -> {
//                    response.setStatus(200);
//                    // 你可以返回登录成功的JSON信息
//                })
//                .failureHandler((request, response, exception) -> {
//                    response.setStatus(401);
//                    // 你可以返回失败的JSON信息
//                })
//                .permitAll()
//            )
            .httpBasic(withDefaults())
            .logout(logout -> logout.permitAll());

        return http.build();
    }

    @Bean
    public AuthenticationManager authManager(HttpSecurity http) throws Exception {
        AuthenticationManagerBuilder authenticationManagerBuilder =
            http.getSharedObject(AuthenticationManagerBuilder.class);

        authenticationManagerBuilder
            .userDetailsService(userDetailsService)
            .passwordEncoder(passwordEncoder());

        return authenticationManagerBuilder.build();
    }


    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }


}
