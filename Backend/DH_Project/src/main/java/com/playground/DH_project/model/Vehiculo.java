package com.playground.DH_project.model;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "vehiculo")
public class Vehiculo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(length = 50, nullable = false)
    private String marca;

    @Column(length = 50, nullable = false)
    private String modelo;

    @Column(length = 20, nullable = false, unique = true)
    private String matricula;

    @Column(length = 20, nullable = false)
    private String estado = "Disponible";

    @Column(name = "cantidadpersonas", nullable = false)
    private Integer cantidadPersonas = 4;

    @Column(nullable = false)
    private Integer puertas = 4;

    @Column(nullable = false)
    private Integer equipaje = 2;

    @Column(nullable = false)
    private BigDecimal precio;

    @Column(name = "imagen_url")
    private String imagenUrl;

    // Relación ManyToOne con Categoria
    @ManyToOne
    @JoinColumn(name = "categoria_id", nullable = false)
    private Categoria categoria;

    // Getters y Setters
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

    public Categoria getCategoria() {
        return categoria;
    }

    public void setCategoria(Categoria categoria) {
        this.categoria = categoria;
    }
}