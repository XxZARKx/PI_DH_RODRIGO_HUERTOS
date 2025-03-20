package com.playground.DH_project.repository;

import com.playground.DH_project.model.Vehiculo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface VehiculoRepository extends JpaRepository<Vehiculo, Integer> {
    Optional<Vehiculo> findByMatricula(String matricula);
    List<Vehiculo> findByEstado(String estado);
}
