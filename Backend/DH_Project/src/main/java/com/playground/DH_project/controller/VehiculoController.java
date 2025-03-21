package com.playground.DH_project.controller;

import com.playground.DH_project.dto.VehiculoDTO;
import com.playground.DH_project.model.Vehiculo;
import com.playground.DH_project.service.VehiculoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeParseException;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/vehiculos")
public class VehiculoController {

    @Autowired
    private VehiculoService vehiculoService;

    // Listar todos los vehículos
    @GetMapping
    public List<Vehiculo> listarVehiculos() {
        return vehiculoService.obtenerTodos();
    }

    // Crear un nuevo vehículo
    @PostMapping
    public ResponseEntity<VehiculoDTO> crearVehiculo(@RequestBody Vehiculo vehiculo) {
        Vehiculo nuevoVehiculo = vehiculoService.crearVehiculo(vehiculo);
        VehiculoDTO vehiculoDTO = vehiculoService.convertirAVehiculoDTO(nuevoVehiculo);
        return new ResponseEntity<>(vehiculoDTO, HttpStatus.CREATED);
    }

    // Actualizar un vehículo existente
    @PutMapping("/{id}")
    public ResponseEntity<Vehiculo> actualizarVehiculo(@PathVariable Integer id, @RequestBody Vehiculo vehiculo) {
        Vehiculo vehiculoActualizado = vehiculoService.actualizarVehiculo(id, vehiculo);
        return new ResponseEntity<>(vehiculoActualizado, HttpStatus.OK);
    }

    // Eliminar un vehículo por su ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarVehiculo(@PathVariable Integer id) {
        vehiculoService.eliminarVehiculo(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/{id}")
    public ResponseEntity<VehiculoDTO> obtenerVehiculoPorId(@PathVariable Integer id) {
        Optional<Vehiculo> vehiculo = vehiculoService.obtenerPorId(id);
        return vehiculo.map(v -> ResponseEntity.ok(vehiculoService.convertirAVehiculoDTO(v)))
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @PostMapping("/{id}/reservar")
    public ResponseEntity<Vehiculo> reservarVehiculo(@PathVariable Integer id, @RequestBody Map<String, String> request) {
        try {
            LocalDateTime fechaInicio = LocalDateTime.parse(request.get("fechaInicio"));
            LocalDateTime fechaFin = LocalDateTime.parse(request.get("fechaFin"));

            Vehiculo vehiculoReservado = vehiculoService.reservarVehiculo(id, fechaInicio, fechaFin);
            return new ResponseEntity<>(vehiculoReservado, HttpStatus.OK);
        } catch (DateTimeParseException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/disponibles")
    public ResponseEntity<List<Vehiculo>> obtenerVehiculosDisponibles(
            @RequestParam String fechaInicio,
            @RequestParam String fechaFin) {
        try {
            // Parsear las fechas desde String a LocalDateTime
            LocalDateTime inicio = LocalDateTime.parse(fechaInicio);
            LocalDateTime fin = LocalDateTime.parse(fechaFin);

            // Obtener los vehículos disponibles
            List<Vehiculo> vehiculosDisponibles = vehiculoService.obtenerVehiculosDisponibles(inicio, fin);
            return new ResponseEntity<>(vehiculosDisponibles, HttpStatus.OK);
        } catch (DateTimeParseException e) {
            // Manejar errores de formato de fecha
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}