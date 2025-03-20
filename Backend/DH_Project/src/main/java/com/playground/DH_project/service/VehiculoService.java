package com.playground.DH_project.service;

import com.playground.DH_project.model.Categoria;
import com.playground.DH_project.model.Vehiculo;
import com.playground.DH_project.repository.VehiculoRepository;
import com.playground.DH_project.repository.CategoriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.HashSet;

@Service
public class VehiculoService {

    @Autowired
    private VehiculoRepository vehiculoRepository;

    @Autowired
    private CategoriaRepository categoriaRepository;

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

        // Buscar las categorías por sus IDs y asignarlas al vehículo
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

        // Buscar las categorías por sus IDs y asignarlas al vehículo
        Set<Categoria> categorias = new HashSet<>(categoriaRepository.findAllById(
                vehiculoDetalles.getCategorias().stream().map(Categoria::getId).toList()
        ));
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
}