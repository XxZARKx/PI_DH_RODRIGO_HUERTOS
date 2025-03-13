package com.playground.DH_project.service;

import com.playground.DH_project.model.RolUsuario;
import com.playground.DH_project.model.Usuario;
import com.playground.DH_project.repository.RolUsuarioRepository;
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

    @Autowired
    private RolUsuarioRepository rolUsuarioRepository;

    public List<Usuario> obtenerTodos() {
        return usuarioRepository.findAll();
    }

    public Usuario crearUsuario(Usuario usuario) {
        // 🔹 Verificar si el correo ya existe
        if (usuarioRepository.findByCorreo(usuario.getCorreo()).isPresent()) {
            throw new RuntimeException("El correo ya está registrado");
        }

        // 🔹 Verificar que la contraseña no esté vacía
        if (usuario.getContrasena() == null || usuario.getContrasena().isEmpty()) {
            throw new RuntimeException("La contraseña no puede estar vacía");
        }

        // 🔹 Asignar el rol de CLIENTE (id = 2)
        RolUsuario rolCliente = rolUsuarioRepository.findById(2)
                .orElseThrow(() -> new RuntimeException("Rol CLIENTE no encontrado"));
        usuario.setRol(rolCliente);

        // 🔹 Encriptar la contraseña antes de guardar
        usuario.setContrasena(passwordEncoder.encode(usuario.getContrasena()));

        // 🔹 Guardar usuario en la base de datos
        Usuario nuevoUsuario = usuarioRepository.save(usuario);
        System.out.println("DEBUG: Usuario creado con ID: " + nuevoUsuario.getId());

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

        // 🔹 Encriptar la nueva contraseña solo si se proporciona
        if (usuarioDetalles.getContrasena() != null && !usuarioDetalles.getContrasena().isEmpty()) {
            usuarioExistente.setContrasena(passwordEncoder.encode(usuarioDetalles.getContrasena()));
        }

        Usuario usuarioActualizado = usuarioRepository.save(usuarioExistente);
        System.out.println("DEBUG: Usuario actualizado con ID: " + usuarioActualizado.getId());

        return usuarioActualizado;
    }

    public void eliminarUsuario(Integer id) {
        Usuario usuarioExistente = usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        usuarioRepository.delete(usuarioExistente);
        System.out.println("DEBUG: Usuario eliminado con ID: " + id);
    }
}
