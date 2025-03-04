package com.playground.DH_project.service;

import com.playground.DH_project.model.Sucursal;
import com.playground.DH_project.repository.SucursalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SucursalService {

    @Autowired
    private SucursalRepository sucursalRepository;

    public List<Sucursal> obtenerTodas() {
        return sucursalRepository.findAll();
    }

    public Optional<Sucursal> obtenerPorId(Long id) {
        return sucursalRepository.findById(id);
    }

    public Sucursal crearSucursal(Sucursal sucursal) {
        return sucursalRepository.save(sucursal);
    }

    public Sucursal actualizarSucursal(Long id, Sucursal detalles) {
        Sucursal sucursalExistente = sucursalRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Sucursal no encontrada"));

        sucursalExistente.setNombreSucursal(detalles.getNombreSucursal());
        return sucursalRepository.save(sucursalExistente);
    }

    public void eliminarSucursal(Long id) {
        sucursalRepository.deleteById(id);
    }
}
