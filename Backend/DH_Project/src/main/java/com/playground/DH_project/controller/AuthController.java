package com.playground.DH_project.controller;

import com.playground.DH_project.model.Usuario;
import com.playground.DH_project.repository.UsuarioRepository;
import com.playground.DH_project.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest authRequest) {
        try {
            // 🔹 Buscar usuario por correo
            Usuario usuario = usuarioRepository.findByCorreo(authRequest.getCorreo())
                    .orElseThrow(() -> new UsernameNotFoundException("Credenciales inválidas"));

            // 🔹 Comparar contraseñas usando BCrypt
            if (!passwordEncoder.matches(authRequest.getContrasena(), usuario.getContrasena())) {
                throw new BadCredentialsException("Credenciales inválidas");
            }

            // 🔹 Generar JWT si la autenticación es correcta
            final String jwt = jwtUtil.generateToken(usuario.getCorreo());

            return ResponseEntity.ok(new AuthResponse(jwt));

        } catch (UsernameNotFoundException | BadCredentialsException e) {
            return ResponseEntity.status(401).body("Credenciales inválidas");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error interno del servidor");
        }
    }

    // 🔹 Clases DTO para el request y response
    public static class AuthRequest {
        private String correo;
        private String contrasena;

        public String getCorreo() { return correo; }
        public void setCorreo(String correo) { this.correo = correo; }
        public String getContrasena() { return contrasena; }
        public void setContrasena(String contrasena) { this.contrasena = contrasena; }
    }

    public static class AuthResponse {
        private String jwt;

        public AuthResponse(String jwt) { this.jwt = jwt; }
        public String getJwt() { return jwt; }
        public void setJwt(String jwt) { this.jwt = jwt; }
    }
}
