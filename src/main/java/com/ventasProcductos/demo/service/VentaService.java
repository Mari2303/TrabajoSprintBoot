package com.ventasProcductos.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ventasProcductos.demo.model.Venta;
import com.ventasProcductos.demo.repository.VentaRepository;

@Service
public class VentaService {

    @Autowired
    private VentaRepository ventaRepository;

    // Obtener todas las ventas
    public List<Venta> findAll() {
        return ventaRepository.findAll();
    }

    // Obtener una venta por ID
    public Optional<Venta> findById(int id) {
        return ventaRepository.findById(id);
    }

    // Guardar o actualizar una venta
    public Venta save(Venta venta) {
        return ventaRepository.save(venta);
    }

    // Eliminar una venta por ID
    public void deleteById(int id) {
        ventaRepository.deleteById(id);
    }
}