package com.playground.DH_project.controller;

import com.playground.DH_project.model.Vehiculo;
import com.playground.DH_project.service.VehiculoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
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
    public ResponseEntity<Vehiculo> crearVehiculo(@RequestBody Vehiculo vehiculo) {
        Vehiculo nuevoVehiculo = vehiculoService.crearVehiculo(vehiculo);
        return new ResponseEntity<>(nuevoVehiculo, HttpStatus.CREATED);
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
    public ResponseEntity<Vehiculo> obtenerVehiculoPorId(@PathVariable Integer id) {
        Optional<Vehiculo> vehiculo = vehiculoService.obtenerPorId(id);
        return vehiculo.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }
}