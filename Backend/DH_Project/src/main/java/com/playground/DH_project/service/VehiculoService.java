package com.playground.DH_project.service;

import com.playground.DH_project.dto.VehiculoDTO;
import com.playground.DH_project.model.Categoria;
import com.playground.DH_project.model.Reserva;
import com.playground.DH_project.model.Vehiculo;
import com.playground.DH_project.repository.ReservaRepository;
import com.playground.DH_project.repository.VehiculoRepository;
import com.playground.DH_project.repository.CategoriaRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.HashSet;
import java.util.stream.Collectors;

@Service
public class VehiculoService {

    @Autowired
    private VehiculoRepository vehiculoRepository;

    @Autowired
    private CategoriaRepository categoriaRepository;

    @Autowired
    private ReservaRepository reservaRepository;

    // Lista todos los vehículos
    public List<Vehiculo> obtenerTodos() {
        return vehiculoRepository.findAll(); // Usa el repositorio directamente
    }

    // Crea un nuevo vehículo
    @Transactional
    public Vehiculo crearVehiculo(Vehiculo vehiculo) {
        // Validar que la matrícula no exista ya
        Optional<Vehiculo> existente = vehiculoRepository.findByMatricula(vehiculo.getMatricula());
        if (existente.isPresent()) {
            throw new RuntimeException("Ya existe un vehículo con esa matrícula");
        }

        // Validar y asignar las categorías
        Set<Categoria> categorias = new HashSet<>();
        for (Categoria categoria : vehiculo.getCategorias()) {
            Categoria categoriaExistente = categoriaRepository.findById(categoria.getId())
                    .orElseThrow(() -> new RuntimeException("Categoría no encontrada"));
            categorias.add(categoriaExistente);
        }
        vehiculo.setCategorias(categorias);

        return vehiculoRepository.save(vehiculo);
    }

    // Actualiza un vehículo existente
    public Vehiculo actualizarVehiculo(Integer id, Vehiculo vehiculoDetalles) {
        Vehiculo vehiculoExistente = vehiculoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Vehículo no encontrado"));

        vehiculoExistente.setMarca(vehiculoDetalles.getMarca());
        vehiculoExistente.setModelo(vehiculoDetalles.getModelo());
        vehiculoExistente.setMatricula(vehiculoDetalles.getMatricula());
        vehiculoExistente.setEstado(vehiculoDetalles.getEstado());
        vehiculoExistente.setCantidadPersonas(vehiculoDetalles.getCantidadPersonas());
        vehiculoExistente.setPuertas(vehiculoDetalles.getPuertas());
        vehiculoExistente.setEquipaje(vehiculoDetalles.getEquipaje());
        vehiculoExistente.setPrecio(vehiculoDetalles.getPrecio());
        vehiculoExistente.setImagenUrl(vehiculoDetalles.getImagenUrl());

        // Validar y asignar las categorías
        Set<Categoria> categorias = new HashSet<>();
        for (Categoria categoria : vehiculoDetalles.getCategorias()) {
            Categoria categoriaExistente = categoriaRepository.findById(categoria.getId())
                    .orElseThrow(() -> new RuntimeException("Categoría no encontrada"));
            categorias.add(categoriaExistente);
        }
        vehiculoExistente.setCategorias(categorias);

        return vehiculoRepository.save(vehiculoExistente);
    }

    // Elimina un vehículo por su ID
    public void eliminarVehiculo(Integer id) {
        Vehiculo vehiculoExistente = vehiculoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Vehículo no encontrado"));
        vehiculoRepository.delete(vehiculoExistente);
    }

    public Optional<Vehiculo> obtenerPorId(Integer id) {
        return vehiculoRepository.findById(id);
    }

    public VehiculoDTO convertirAVehiculoDTO(Vehiculo vehiculo) {
        VehiculoDTO dto = new VehiculoDTO();
        dto.setId(vehiculo.getId());
        dto.setMarca(vehiculo.getMarca());
        dto.setModelo(vehiculo.getModelo());
        dto.setMatricula(vehiculo.getMatricula());
        dto.setEstado(vehiculo.getEstado());
        dto.setCantidadPersonas(vehiculo.getCantidadPersonas());
        dto.setPuertas(vehiculo.getPuertas());
        dto.setEquipaje(vehiculo.getEquipaje());
        dto.setPrecio(vehiculo.getPrecio());
        dto.setImagenUrl(vehiculo.getImagenUrl());

        // Obtener las categorías como un array de IDs
        Set<Integer> categoriaIds = vehiculo.getCategorias().stream()
                .map(Categoria::getId)
                .collect(Collectors.toSet());
        dto.setCategoriaIds(categoriaIds);

        return dto;
    }

    public Vehiculo reservarVehiculo(Integer id, LocalDateTime fechaInicio, LocalDateTime fechaFin) {
        Vehiculo vehiculo = vehiculoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Vehículo no encontrado"));

        // Validar que el vehículo no esté reservado en el rango de fechas solicitado
        if (vehiculo.getEstado().equals("Reservado") &&
                !(fechaInicio.isAfter(vehiculo.getFechaFinReserva()) || fechaFin.isBefore(vehiculo.getFechaInicioReserva()))) {
            throw new RuntimeException("El vehículo ya está reservado en ese rango de fechas");
        }

        vehiculo.setEstado("Reservado");
        vehiculo.setFechaInicioReserva(fechaInicio);
        vehiculo.setFechaFinReserva(fechaFin);

        return vehiculoRepository.save(vehiculo);
    }

    public List<Vehiculo> obtenerVehiculosDisponibles(LocalDateTime inicio, LocalDateTime fin) {
        // Convertir LocalDateTime a OffsetDateTime usando la zona horaria UTC
        OffsetDateTime inicioOffset = inicio.atOffset(ZoneOffset.UTC);
        OffsetDateTime finOffset = fin.atOffset(ZoneOffset.UTC);

        // Obtener todos los vehículos
        List<Vehiculo> todosLosVehiculos = vehiculoRepository.findAll();

        // Filtrar los vehículos que están disponibles en el rango de fechas
        return todosLosVehiculos.stream()
                .filter(vehiculo -> {
                    // Obtener las reservas del vehículo
                    List<Reserva> reservas = reservaRepository.findByVehiculoId(vehiculo.getId());

                    // Verificar que no haya reservas que se superpongan con el rango de fechas
                    return reservas.stream().noneMatch(reserva ->
                            !(reserva.getFechaDevolucion().isBefore(inicioOffset) || reserva.getFechaReserva().isAfter(finOffset))
                    );
                })
                .toList();
    }

    @Transactional
    public Vehiculo actualizarEstadoVehiculo(Integer id, String nuevoEstado) {
        Vehiculo vehiculo = vehiculoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Vehículo no encontrado"));

        // Validar estados permitidos si es necesario
        vehiculo.setEstado(nuevoEstado);
        return vehiculoRepository.save(vehiculo);
    }
}