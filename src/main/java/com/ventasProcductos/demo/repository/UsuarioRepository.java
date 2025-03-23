package com.ventasProcductos.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ventasProcductos.demo.model.Usuario;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {
    Usuario findByNumeroDocumento(int numeroDocumento);

    @Query("SELECT u FROM Usuario u WHERE LOWER(u.nombre) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
           "OR LOWER(u.apellido) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
           "OR CAST(u.numeroDocumento AS string) LIKE CONCAT('%', :keyword, '%') " +
           "OR LOWER(u.numeroCelular) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Usuario> searchUsuarios(@Param("keyword") String keyword);
}