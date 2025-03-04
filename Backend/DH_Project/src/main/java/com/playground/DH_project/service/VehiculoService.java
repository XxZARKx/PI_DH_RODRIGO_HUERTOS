package com.playground.DH_project.service;

import com.playground.DH_project.model.Vehiculo;
import com.playground.DH_project.repository.VehiculoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VehiculoService {

    @Autowired
    private VehiculoRepository vehiculoRepository;

    // Lista todos los vehículos
    public List<Vehiculo> obtenerTodos() {
        return vehiculoRepository.findAll();
    }

    // Crea un nuevo vehículo
    public Vehiculo crearVehiculo(Vehiculo vehiculo) {
        // Opcional: Validar que la matrícula no exista ya
        Optional<Vehiculo> existente = vehiculoRepository.findByMatricula(vehiculo.getMatricula());
        if (existente.isPresent()) {
            throw new RuntimeException("Ya existe un vehículo con esa matrícula");
        }
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
        vehiculoExistente.setCategoria(vehiculoDetalles.getCategoria());
        vehiculoExistente.setPrecio(vehiculoDetalles.getPrecio());
        vehiculoExistente.setImagenUrl(vehiculoDetalles.getImagenUrl());

        return vehiculoRepository.save(vehiculoExistente);
    }

    // Elimina un vehículo por su ID
    public void eliminarVehiculo(Integer id) {
        Vehiculo vehiculoExistente = vehiculoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Vehículo no encontrado"));
        vehiculoRepository.delete(vehiculoExistente);
    }
}
