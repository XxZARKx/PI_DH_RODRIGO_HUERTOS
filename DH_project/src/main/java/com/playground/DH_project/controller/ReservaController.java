package com.playground.DH_project.controller;

import com.playground.DH_project.model.Reserva;
import com.playground.DH_project.service.ReservaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reservas")
public class ReservaController {

    @Autowired
    private ReservaService reservaService;

    // Endpoint para listar todas las reservas
    @GetMapping
    public ResponseEntity<List<Reserva>> listarReservas() {
        List<Reserva> reservas = reservaService.obtenerTodas();
        return new ResponseEntity<>(reservas, HttpStatus.OK);
    }

    // Endpoint para obtener una reserva por su ID
    @GetMapping("/{id}")
    public ResponseEntity<Reserva> obtenerReserva(@PathVariable Integer id) {
        Reserva reserva = reservaService.obtenerPorId(id)
                .orElseThrow(() -> new RuntimeException("Reserva no encontrada"));
        return new ResponseEntity<>(reserva, HttpStatus.OK);
    }

    // Endpoint para crear una nueva reserva
    @PostMapping
    public ResponseEntity<Reserva> crearReserva(@RequestBody Reserva reserva) {
        Reserva nuevaReserva = reservaService.crearReserva(reserva);
        return new ResponseEntity<>(nuevaReserva, HttpStatus.CREATED);
    }

    // Endpoint para actualizar una reserva existente
    @PutMapping("/{id}")
    public ResponseEntity<Reserva> actualizarReserva(@PathVariable Integer id, @RequestBody Reserva reservaDetalles) {
        Reserva reservaActualizada = reservaService.actualizarReserva(id, reservaDetalles);
        return new ResponseEntity<>(reservaActualizada, HttpStatus.OK);
    }

    // Endpoint para eliminar una reserva por su ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarReserva(@PathVariable Integer id) {
        reservaService.eliminarReserva(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
