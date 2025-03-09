package com.playground.DH_project.service;

import com.playground.DH_project.model.Usuario;
import com.playground.DH_project.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public List<Usuario> obtenerTodos() {
        return usuarioRepository.findAll();
    }

    public Usuario crearUsuario(Usuario usuario) {
        // Verificar si el correo ya está registrado
        if (usuarioRepository.findByCorreo(usuario.getCorreo()).isPresent()) {
            throw new RuntimeException("El correo ya está registrado");
        }

        // Validar que la contraseña no esté vacía
        if (usuario.getContrasena() == null || usuario.getContrasena().isEmpty()) {
            throw new RuntimeException("La contraseña no puede estar vacía");
        }

        // Encriptar la contraseña antes de guardar
        usuario.setContrasena(passwordEncoder.encode(usuario.getContrasena()));

        Usuario nuevoUsuario = usuarioRepository.save(usuario);
        System.out.println("DEBUG: Usuario guardado con éxito -> ID: " + nuevoUsuario.getId());

        return nuevoUsuario;
    }



    public Optional<Usuario> buscarPorCorreo(String correo) {
        return usuarioRepository.findByCorreo(correo);
    }

    public Usuario actualizarUsuario(Integer id, Usuario usuarioDetalles) {
        Usuario usuarioExistente = usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        usuarioExistente.setNombre(usuarioDetalles.getNombre());
        usuarioExistente.setApellido(usuarioDetalles.getApellido());
        usuarioExistente.setCorreo(usuarioDetalles.getCorreo());
        usuarioExistente.setDni(usuarioDetalles.getDni());
        usuarioExistente.setRol(usuarioDetalles.getRol());

        if (usuarioDetalles.getContrasena() != null && !usuarioDetalles.getContrasena().isEmpty()) {
            usuarioExistente.setContrasena(passwordEncoder.encode(usuarioDetalles.getContrasena()));
        }

        return usuarioRepository.save(usuarioExistente);
    }

    public void eliminarUsuario(Integer id) {
        Usuario usuarioExistente = usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        usuarioRepository.delete(usuarioExistente);
    }
}
