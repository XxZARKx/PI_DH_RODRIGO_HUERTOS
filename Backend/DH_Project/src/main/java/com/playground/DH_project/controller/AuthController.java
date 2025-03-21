package com.playground.DH_project.controller;

import com.playground.DH_project.model.RolUsuario;
import com.playground.DH_project.model.Usuario;
import com.playground.DH_project.repository.UsuarioRepository;
import com.playground.DH_project.util.JwtUtil;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final JwtUtil jwtUtil;
    private final UsuarioRepository usuarioRepository;

    public AuthController(JwtUtil jwtUtil, UsuarioRepository usuarioRepository) {
        this.jwtUtil = jwtUtil;
        this.usuarioRepository = usuarioRepository;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest authRequest) {
        Usuario usuario = usuarioRepository.findByCorreo(authRequest.getCorreo())
                .orElseThrow(() -> new RuntimeException("Correo no registrado"));

        if (!usuario.getContrasena().equals(authRequest.getContrasena())) {
            return ResponseEntity.status(401).body("Credenciales inválidas");
        }

        String token = jwtUtil.generateToken(usuario.getCorreo());

        return ResponseEntity.ok(new AuthResponse(token, usuario.getId(), usuario.getNombre(),
                usuario.getApellido(), usuario.getCorreo(), usuario.getRol()));
    }

    // Nuevo endpoint para obtener el usuario autenticado
    @GetMapping("/user")
    public ResponseEntity<?> getAuthenticatedUser(HttpServletRequest request) {
        // Extraer el token JWT del encabezado de autorización
        String authorizationHeader = request.getHeader("Authorization");

        if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(401).body("Token no proporcionado o inválido");
        }

        String token = authorizationHeader.substring(7); // Quitar "Bearer " del token

        // Validar el token y extraer el correo del usuario
        String correo = jwtUtil.extractUsername(token);

        if (correo == null || !jwtUtil.isTokenValid(token, correo)) {
            return ResponseEntity.status(401).body("Token inválido o expirado");
        }

        // Buscar el usuario por su correo
        Usuario usuario = usuarioRepository.findByCorreo(correo)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        // Devolver los datos del usuario
        return ResponseEntity.ok(new AuthResponse(
                token,
                usuario.getId(),
                usuario.getNombre(),
                usuario.getApellido(),
                usuario.getCorreo(),
                usuario.getRol()
        ));
    }

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
        private Integer id;
        private String nombre;
        private String apellido;
        private String correo;
        private RolUsuario rol;

        public AuthResponse(String jwt, Integer id, String nombre, String apellido, String correo, RolUsuario rol) {
            this.jwt = jwt;
            this.id = id;
            this.nombre = nombre;
            this.apellido = apellido;
            this.correo = correo;
            this.rol = rol;
        }

        public String getJwt() { return jwt; }
        public Integer getId() { return id; }
        public String getNombre() { return nombre; }
        public String getApellido() { return apellido; }
        public String getCorreo() { return correo; }
        public RolUsuario getRol() { return rol; }
    }
}