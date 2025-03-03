package com.ventasProcductos.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ventasProcductos.demo.model.Pagos;

@Repository
public interface PagosRepository extends JpaRepository<Pagos, Integer> {
}