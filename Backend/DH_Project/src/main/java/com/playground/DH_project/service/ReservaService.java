package com.playground.DH_project.service;

import com.playground.DH_project.model.Reserva;
import com.playground.DH_project.model.Sucursal;
import com.playground.DH_project.model.Vehiculo;
import com.playground.DH_project.model.Usuario;
import com.playground.DH_project.repository.ReservaRepository;
import com.playground.DH_project.repository.SucursalRepository;
import com.playground.DH_project.repository.UsuarioRepository;
import com.playground.DH_project.repository.VehiculoRepository;
import jakarta.transaction.Transactional;
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

    @Autowired
    private SucursalRepository sucursalRepository;

    public List<Reserva> obtenerTodas() {
        return reservaRepository.findAll();
    }

    public Optional<Reserva> obtenerPorId(Integer id) {
        return reservaRepository.findById(id);
    }

    public Reserva crearReserva(Reserva reserva) {
        // Establecer la fecha de reserva realizada con la fecha y hora actuales
        if (reserva.getFechaReservaRealizada() == null) {
            reserva.setFechaReservaRealizada(OffsetDateTime.now());
        }

        // Validar y asignar el vehículo
        if (reserva.getVehiculo() != null && reserva.getVehiculo().getId() != null) {
            Vehiculo vehiculo = vehiculoRepository.findById(reserva.getVehiculo().getId())
                    .orElseThrow(() -> new RuntimeException("Vehículo no encontrado"));
            reserva.setVehiculo(vehiculo);
            if (reserva.getTotal() == null && reserva.getDias() != null) {
                reserva.setTotal(vehiculo.getPrecio().multiply(new BigDecimal(reserva.getDias())));
            }
        } else {
            throw new RuntimeException("El vehículo es obligatorio para la reserva");
        }

        // Validar y asignar el usuario
        if (reserva.getUsuario() != null && reserva.getUsuario().getId() != null) {
            Usuario usuario = usuarioRepository.findById(reserva.getUsuario().getId())
                    .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
            reserva.setUsuario(usuario);
        }

        // Validar y asignar la sucursal
        if (reserva.getSucursal() != null && reserva.getSucursal().getId() != null) {
            Sucursal sucursal = sucursalRepository.findById(reserva.getSucursal().getId())
                    .orElseThrow(() -> new RuntimeException("Sucursal no encontrada"));
            reserva.setSucursal(sucursal);
        }

        // Establecer la fecha de reserva si no se proporciona
        if (reserva.getFechaReserva() == null) {
            reserva.setFechaReserva(OffsetDateTime.now());
        }

        // Validar la fecha de devolución
        if (reserva.getFechaDevolucion() == null) {
            throw new RuntimeException("La fecha de devolución es obligatoria");
        }

        // Guardar la reserva en la base de datos
        return reservaRepository.save(reserva);
    }

    public Reserva actualizarReserva(Integer id, Reserva reservaDetalles) {
        Reserva reservaExistente = reservaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Reserva no encontrada"));

        reservaExistente.setDias(reservaDetalles.getDias());

        if (reservaDetalles.getVehiculo() != null && reservaDetalles.getVehiculo().getId() != null) {
            Vehiculo vehiculo = vehiculoRepository.findById(reservaDetalles.getVehiculo().getId())
                    .orElseThrow(() -> new RuntimeException("Vehículo no encontrado"));
            reservaExistente.setVehiculo(vehiculo);
            if (reservaDetalles.getDias() != null) {
                reservaExistente.setTotal(vehiculo.getPrecio().multiply(new BigDecimal(reservaDetalles.getDias())));
            }
        }

        if (reservaDetalles.getUsuario() != null && reservaDetalles.getUsuario().getId() != null) {
            Usuario usuario = usuarioRepository.findById(reservaDetalles.getUsuario().getId())
                    .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
            reservaExistente.setUsuario(usuario);
        }

        if (reservaDetalles.getSucursal() != null && reservaDetalles.getSucursal().getId() != null) {
            Sucursal sucursal = sucursalRepository.findById(reservaDetalles.getSucursal().getId())
                    .orElseThrow(() -> new RuntimeException("Sucursal no encontrada"));
            reservaExistente.setSucursal(sucursal);
        }

        return reservaRepository.save(reservaExistente);
    }

    public void eliminarReserva(Integer id) {
        Reserva reservaExistente = reservaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Reserva no encontrada"));
        reservaRepository.delete(reservaExistente);
    }

    public List<Reserva> findByVehiculoId(Integer vehiculoId) {
        return reservaRepository.findByVehiculoId(vehiculoId);
    }

    public List<Reserva> findByUsuarioId(Integer usuarioId) {
        return reservaRepository.findByUsuarioId(usuarioId);
    }

    @Transactional
    public void cancelarReserva(Integer reservaId) {
        // Buscar la reserva por ID
        Reserva reserva = reservaRepository.findById(reservaId)
                .orElseThrow(() -> new RuntimeException("Reserva no encontrada"));

        // Actualizar el estado del vehículo a "Disponible"
        reserva.getVehiculo().setEstado("Disponible");

        // Eliminar la reserva
        reservaRepository.deleteById(reservaId);
    }
}