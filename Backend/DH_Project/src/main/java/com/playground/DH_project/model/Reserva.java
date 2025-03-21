package com.playground.DH_project.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.OffsetDateTime;

@Entity
@Table(name = "reserva")
public class Reserva {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "vehiculo_id", nullable = false)
    private Vehiculo vehiculo;

    @Column(nullable = false)
    private Integer dias;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal total;

    @Column(name = "fecha_reserva", nullable = false, columnDefinition = "TIMESTAMP WITH TIME ZONE DEFAULT (now() AT TIME ZONE 'America/Lima')")
    private OffsetDateTime fechaReserva;

    @ManyToOne
    @JoinColumn(name = "sucursal_id", nullable = false)
    private Sucursal sucursal;

    @Column(nullable = true, columnDefinition = "TEXT DEFAULT 'Activa'")
    private String estado;

    @Column(name = "fecha_devolucion", nullable = false, columnDefinition = "TIMESTAMP WITH TIME ZONE DEFAULT (now() AT TIME ZONE 'America/Lima')")
    private OffsetDateTime fechaDevolucion;

    @Column(name = "fecha_reserva_realizada", nullable = true, columnDefinition = "TIMESTAMP WITH TIME ZONE DEFAULT (now() AT TIME ZONE 'America/Lima')")
    private OffsetDateTime fechaReservaRealizada;

    // Getters y Setters
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public Vehiculo getVehiculo() {
        return vehiculo;
    }

    public void setVehiculo(Vehiculo vehiculo) {
        this.vehiculo = vehiculo;
    }

    public Integer getDias() {
        return dias;
    }

    public void setDias(Integer dias) {
        this.dias = dias;
    }

    public BigDecimal getTotal() {
        return total;
    }

    public void setTotal(BigDecimal total) {
        this.total = total;
    }

    public OffsetDateTime getFechaReserva() {
        return fechaReserva;
    }

    public void setFechaReserva(OffsetDateTime fechaReserva) {
        this.fechaReserva = fechaReserva;
    }

    public Sucursal getSucursal() {
        return sucursal;
    }

    public void setSucursal(Sucursal sucursal) {
        this.sucursal = sucursal;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public OffsetDateTime getFechaDevolucion() {
        return fechaDevolucion;
    }

    public void setFechaDevolucion(OffsetDateTime fechaDevolucion) {
        this.fechaDevolucion = fechaDevolucion;
    }

    public OffsetDateTime getFechaReservaRealizada() {
        return fechaReservaRealizada;
    }

    public void setFechaReservaRealizada(OffsetDateTime fechaReservaRealizada) {
        this.fechaReservaRealizada = fechaReservaRealizada;
    }
}