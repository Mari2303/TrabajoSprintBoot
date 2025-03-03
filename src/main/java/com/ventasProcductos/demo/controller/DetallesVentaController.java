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

import com.ventasProcductos.demo.model.Detalles_Venta;
import com.ventasProcductos.demo.service.DetallesVentaService;

@RestController
@RequestMapping("/api/detalles_venta")
public class DetallesVentaController {

    @Autowired
    private DetallesVentaService detallesVentaService;

    @GetMapping
    public List<Detalles_Venta> getAllDetallesVenta() {
        return detallesVentaService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Detalles_Venta> getDetallesVentaById(@PathVariable int id) {
        Optional<Detalles_Venta> detallesVenta = detallesVentaService.findById(id);
        return detallesVenta.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Detalles_Venta createDetallesVenta(@RequestBody Detalles_Venta detallesVenta) {
        return detallesVentaService.save(detallesVenta);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Detalles_Venta> updateDetallesVenta(@PathVariable int id, @RequestBody Detalles_Venta detallesVenta) {
        if (!detallesVentaService.findById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        detallesVenta.setId(id);
        return ResponseEntity.ok(detallesVentaService.save(detallesVenta));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDetallesVenta(@PathVariable int id) {
        if (!detallesVentaService.findById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        detallesVentaService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}