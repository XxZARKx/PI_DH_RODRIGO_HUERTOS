package com.playground.DH_project.repository;

import com.playground.DH_project.model.Reserva;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface ReservaRepository extends JpaRepository<Reserva, Integer> {
    List<Reserva> findByUsuarioId(Integer usuarioId);
    List<Reserva> findByVehiculoId(Integer vehiculoId);

}
