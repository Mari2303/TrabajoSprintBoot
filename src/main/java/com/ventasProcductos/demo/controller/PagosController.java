package com.ventasProcductos.demo.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ventasProcductos.demo.model.Pagos;
import com.ventasProcductos.demo.service.PagosService;

@RestController
@RequestMapping("/api/pagos")
public class PagosController {

    @Autowired
    private PagosService pagosService;

    @GetMapping
    public List<Pagos> getAllPagos() {
        return pagosService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Pagos> getPagosById(@PathVariable int id) {
        Optional<Pagos> pagos = pagosService.findById(id);
        return pagos.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Pagos createPagos(@RequestBody Pagos pagos) {
        return pagosService.save(pagos);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Pagos> updatePagos(@PathVariable int id, @RequestBody Pagos pagos) {
        if (!pagosService.findById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        pagos.setId(id);
        return ResponseEntity.ok(pagosService.save(pagos));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePagos(@PathVariable int id) {
        if (!pagosService.findById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        pagosService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}