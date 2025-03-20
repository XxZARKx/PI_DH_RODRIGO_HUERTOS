package com.playground.DH_project.dto;

import java.math.BigDecimal;
import java.util.Set;

public class VehiculoDTO {
    private Integer id;
    private String marca;
    private String modelo;
    private String matricula;
    private String estado;
    private Integer cantidadPersonas;
    private Integer puertas;
    private Integer equipaje;
    private BigDecimal precio;
    private String imagenUrl;
    private Set<Integer> categoriaIds; // Array de IDs de categorías

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getMarca() {
        return marca;
    }

    public void setMarca(String marca) {
        this.marca = marca;
    }

    public String getModelo() {
        return modelo;
    }

    public void setModelo(String modelo) {
        this.modelo = modelo;
    }

    public String getMatricula() {
        return matricula;
    }

    public void setMatricula(String matricula) {
        this.matricula = matricula;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public Integer getCantidadPersonas() {
        return cantidadPersonas;
    }

    public void setCantidadPersonas(Integer cantidadPersonas) {
        this.cantidadPersonas = cantidadPersonas;
    }

    public Integer getPuertas() {
        return puertas;
    }

    public void setPuertas(Integer puertas) {
        this.puertas = puertas;
    }

    public Integer getEquipaje() {
        return equipaje;
    }

    public void setEquipaje(Integer equipaje) {
        this.equipaje = equipaje;
    }

    public BigDecimal getPrecio() {
        return precio;
    }

    public void setPrecio(BigDecimal precio) {
        this.precio = precio;
    }

    public String getImagenUrl() {
        return imagenUrl;
    }

    public void setImagenUrl(String imagenUrl) {
        this.imagenUrl = imagenUrl;
    }

    public Set<Integer> getCategoriaIds() {
        return categoriaIds;
    }

    public void setCategoriaIds(Set<Integer> categoriaIds) {
        this.categoriaIds = categoriaIds;
    }
}
