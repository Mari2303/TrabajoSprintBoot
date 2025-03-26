package com.ventasProcductos.demo.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ventasProcductos.demo.model.Usuario;
import com.ventasProcductos.demo.service.UsuarioService;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @GetMapping("/buscar")
    public List<Usuario> searchUsuarios(@RequestParam String keyword) {
        return usuarioService.searchUsuarios(keyword);
    }


    @GetMapping
    public List<Usuario> getAllUsuarios() {
        return usuarioService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Usuario> getUsuarioById(@PathVariable int id) {
        Optional<Usuario> usuario = usuarioService.findById(id);
        return usuario.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }



    // Buscar un usuario por numero de documento
    @GetMapping("/documento/{numeroDocumento}")
    public ResponseEntity<Usuario> getUsuarioByNumeroDocumento(@PathVariable int numeroDocumento) {
        Usuario usuario = usuarioService.findByNumeroDocumento(numeroDocumento);
        if (usuario == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(usuario);
    }

    @PutMapping("/documento/{numeroDocumento}/actualizar")
public ResponseEntity<Usuario> updateNumeroDocumento(
        @PathVariable int numeroDocumento,
        @RequestBody int nuevoNumeroDocumento) {
    try {
        // Llamamos al servicio para actualizar el número de documento
        Usuario usuarioActualizado = usuarioService.updateNumeroDocumento(numeroDocumento, nuevoNumeroDocumento);
        return ResponseEntity.ok(usuarioActualizado);
    } catch (IllegalArgumentException e) {
        // Si el usuario no se encuentra, devolvemos un 404
        return ResponseEntity.notFound().build();
    }
}




    // Eliminar un usuario por numero de documento
    @DeleteMapping("/documento/{numeroDocumento}")
    public ResponseEntity<Void> deleteUsuarioByNumeroDocumento(@PathVariable int numeroDocumento) {
        Usuario usuario = usuarioService.findByNumeroDocumento(numeroDocumento);
        if (usuario == null) {
            return ResponseEntity.notFound().build();
        }
        usuarioService.deleteByNumeroDocumento(numeroDocumento);
        return ResponseEntity.noContent().build();
    }

     @PostMapping
    public ResponseEntity<?> createUsuario(@RequestBody Usuario usuario) {
        try {
            Usuario nuevoUsuario = usuarioService.save(usuario);
            return ResponseEntity.ok(nuevoUsuario);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<String> handleConstraintViolation(DataIntegrityViolationException ex) {
        return ResponseEntity.badRequest().body("El número de documento ya está registrado.");
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateUsuario(
            @PathVariable int id,
            @RequestBody Usuario usuarioActualizado) {
        try {
            System.out.println("ID recibido: " + id);
            System.out.println("Datos recibidos: " + usuarioActualizado);
    
            Optional<Usuario> usuarioOptional = usuarioService.findById(id);
            if (usuarioOptional.isPresent()) {
                Usuario usuario = usuarioOptional.get();
                usuario.setNombre(usuarioActualizado.getNombre());
                usuario.setApellido(usuarioActualizado.getApellido());
                usuario.setNumeroCelular(usuarioActualizado.getNumeroCelular());
                Usuario usuarioGuardado = usuarioService.save(usuario);
                System.out.println("Usuario actualizado: " + usuarioGuardado);
                return ResponseEntity.ok(usuarioGuardado);
            } else {
                return ResponseEntity.status(404).body("Usuario no encontrado con ID: " + id);
            }
        } catch (Exception e) {
            e.printStackTrace(); // Imprime el error en los logs
            return ResponseEntity.status(500).body("Error interno del servidor: " + e.getMessage());
        }
    }

}