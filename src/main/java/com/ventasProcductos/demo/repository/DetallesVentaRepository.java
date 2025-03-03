package com.ventasProcductos.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ventasProcductos.demo.model.Detalles_Venta;

@Repository
public interface DetallesVentaRepository extends JpaRepository<Detalles_Venta, Integer> {
}