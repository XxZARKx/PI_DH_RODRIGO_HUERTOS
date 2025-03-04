package com.playground.DH_project;

import com.playground.DH_project.model.Reserva;
import com.playground.DH_project.model.Vehiculo;
import com.playground.DH_project.repository.ReservaRepository;
import com.playground.DH_project.repository.VehiculoRepository;
import com.playground.DH_project.service.ReservaService;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import java.math.BigDecimal;
import java.util.Optional;
import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

public class ReservaServiceTest {

    @Mock
    private ReservaRepository reservaRepository;

    @Mock
    private VehiculoRepository vehiculoRepository;

    @InjectMocks
    private ReservaService reservaService;

    public ReservaServiceTest() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testCrearReserva() {
        // Configurar datos de prueba
        Vehiculo vehiculo = new Vehiculo();
        vehiculo.setId(1);
        vehiculo.setPrecio(new BigDecimal("100.00"));

        Reserva reserva = new Reserva();
        reserva.setVehiculo(vehiculo);
        reserva.setDias(3);

        when(vehiculoRepository.findById(1)).thenReturn(Optional.of(vehiculo));
        when(reservaRepository.save(any(Reserva.class))).thenAnswer(i -> i.getArguments()[0]);

        Reserva reservaCreada = reservaService.crearReserva(reserva);
        assertEquals(new BigDecimal("300.00"), reservaCreada.getTotal());
        verify(reservaRepository, times(1)).save(any(Reserva.class));
    }
}
