package com.playground.DH_project.model;

import jakarta.persistence.*;

@Entity
@Table(name = "categoria")
public class Categoria {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(length = 50, nullable = false, unique = true)
    private String nombre;

    @Column(name = "icono_class", length = 50)
    private String iconoClass; // Nuevo campo para el icono

    // Getters y Setters
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getIconoClass() {
        return iconoClass;
    }

    public void setIconoClass(String iconoClass) {
        this.iconoClass = iconoClass;
    }
}