package com.ventasProcductos.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ventasProcductos.demo.model.Pagos;
import com.ventasProcductos.demo.repository.PagosRepository;

@Service
public class PagosService {

    @Autowired
    private PagosRepository pagosRepository;

    // Obtener todos los pagos
    public List<Pagos> findAll() {
        return pagosRepository.findAll();
    }

    // Obtener un pago por ID
    public Optional<Pagos> findById(int id) {
        return pagosRepository.findById(id);
    }

    // Guardar o actualizar un pago
    public Pagos save(Pagos pagos) {
        return pagosRepository.save(pagos);
    }

    // Eliminar un pago por ID
    public void deleteById(int id) {
        pagosRepository.deleteById(id);
    }
}