package com.playground.DH_project.service;

import com.playground.DH_project.model.Reserva;
import com.playground.DH_project.model.Vehiculo;
import com.playground.DH_project.model.Usuario;
import com.playground.DH_project.repository.ReservaRepository;
import com.playground.DH_project.repository.UsuarioRepository;
import com.playground.DH_project.repository.VehiculoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ReservaService {

    @Autowired
    private ReservaRepository reservaRepository;

    @Autowired
    private VehiculoRepository vehiculoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    // Lista todas las reservas
    public List<Reserva> obtenerTodas() {
        return reservaRepository.findAll();
    }

    // Obtiene una reserva por ID
    public Optional<Reserva> obtenerPorId(Integer id) {
        return reservaRepository.findById(id);
    }

    // Crea una nueva reserva
    public Reserva crearReserva(Reserva reserva) {
        // Validar que se haya enviado un vehículo con id
        if (reserva.getVehiculo() != null && reserva.getVehiculo().getId() != null) {
            Vehiculo vehiculo = vehiculoRepository.findById(reserva.getVehiculo().getId())
                    .orElseThrow(() -> new RuntimeException("Vehículo no encontrado"));
            reserva.setVehiculo(vehiculo);
            // Si no se ha definido el total, se calcula como precio del vehículo * días
            if (reserva.getTotal() == null && reserva.getDias() != null) {
                reserva.setTotal(vehiculo.getPrecio().multiply(new BigDecimal(reserva.getDias())));
            }
        } else {
            throw new RuntimeException("El vehículo es obligatorio para la reserva");
        }

        // Si se proporciona un usuario, se valida que exista
        if (reserva.getUsuario() != null && reserva.getUsuario().getId() != null) {
            Usuario usuario = usuarioRepository.findById(reserva.getUsuario().getId())
                    .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
            reserva.setUsuario(usuario);
        }

        // Asigna la fecha de reserva si no se ha definido
        if (reserva.getFechaReserva() == null) {
            reserva.setFechaReserva(OffsetDateTime.now());
        }
        return reservaRepository.save(reserva);
    }

    // Actualiza una reserva existente
    public Reserva actualizarReserva(Integer id, Reserva reservaDetalles) {
        Reserva reservaExistente = reservaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Reserva no encontrada"));

        // Actualiza la cantidad de días
        reservaExistente.setDias(reservaDetalles.getDias());

        // Si se envía un nuevo vehículo, se valida y actualiza
        if (reservaDetalles.getVehiculo() != null && reservaDetalles.getVehiculo().getId() != null) {
            Vehiculo vehiculo = vehiculoRepository.findById(reservaDetalles.getVehiculo().getId())
                    .orElseThrow(() -> new RuntimeException("Vehículo no encontrado"));
            reservaExistente.setVehiculo(vehiculo);
            // Recalcula el total en función del nuevo vehículo y los días
            if (reservaDetalles.getDias() != null) {
                reservaExistente.setTotal(vehiculo.getPrecio().multiply(new BigDecimal(reservaDetalles.getDias())));
            }
        }

        // Actualiza el usuario si se envía uno
        if (reservaDetalles.getUsuario() != null && reservaDetalles.getUsuario().getId() != null) {
            Usuario usuario = usuarioRepository.findById(reservaDetalles.getUsuario().getId())
                    .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
            reservaExistente.setUsuario(usuario);
        }

        // Se puede agregar la actualización de otros campos según necesidades
        return reservaRepository.save(reservaExistente);
    }

    // Elimina una reserva por ID
    public void eliminarReserva(Integer id) {
        Reserva reservaExistente = reservaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Reserva no encontrada"));
        reservaRepository.delete(reservaExistente);
    }
}
