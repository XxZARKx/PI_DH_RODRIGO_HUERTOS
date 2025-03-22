package com.playground.DH_project.repository;

import com.playground.DH_project.model.Reserva;
import com.playground.DH_project.model.Vehiculo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface VehiculoRepository extends JpaRepository<Vehiculo, Integer> {
    Optional<Vehiculo> findByMatricula(String matricula);
    List<Vehiculo> findByEstado(String estado);

    @Query("SELECT v FROM Vehiculo v WHERE v.estado = 'Disponible' OR " +
            "(v.fechaFinReserva IS NOT NULL AND v.fechaFinReserva < :fechaInicio) OR " +
            "(v.fechaInicioReserva IS NOT NULL AND v.fechaInicioReserva > :fechaFin)")
    List<Vehiculo> findVehiculosDisponibles(
            @Param("fechaInicio") LocalDateTime fechaInicio,
            @Param("fechaFin") LocalDateTime fechaFin);

    @Query("SELECT r FROM Reserva r WHERE r.vehiculo.id = :vehiculoId")
    List<Reserva> findByVehiculoId(@Param("vehiculoId") Integer vehiculoId);

}
