package com.playground.DH_project.controller;

import com.playground.DH_project.model.Sucursal;
import com.playground.DH_project.service.SucursalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sucursales")
public class SucursalController {

    @Autowired
    private SucursalService sucursalService;

    @GetMapping
    public ResponseEntity<List<Sucursal>> listarSucursales() {
        return new ResponseEntity<>(sucursalService.obtenerTodas(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Sucursal> obtenerSucursal(@PathVariable Long id) {
        return sucursalService.obtenerPorId(id)
                .map(sucursal -> new ResponseEntity<>(sucursal, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping
    public ResponseEntity<Sucursal> crearSucursal(@RequestBody Sucursal sucursal) {
        return new ResponseEntity<>(sucursalService.crearSucursal(sucursal), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Sucursal> actualizarSucursal(@PathVariable Long id, @RequestBody Sucursal detalles) {
        return new ResponseEntity<>(sucursalService.actualizarSucursal(id, detalles), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarSucursal(@PathVariable Long id) {
        sucursalService.eliminarSucursal(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
