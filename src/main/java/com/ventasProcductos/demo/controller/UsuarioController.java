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

import com.ventasProcductos.demo.model.Usuario;
import com.ventasProcductos.demo.service.UsuarioService;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @GetMapping
    public List<Usuario> getAllUsuarios() {
        return usuarioService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Usuario> getUsuarioById(@PathVariable int id) {
        Optional<Usuario> usuario = usuarioService.findById(id);
        return usuario.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Usuario createUsuario(@RequestBody Usuario usuario) {
        return usuarioService.save(usuario);
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


@PutMapping("/documento/{numeroDocumento}/nombre")
public ResponseEntity<Usuario> updateUsuarioNombreByNumeroDocumento(
        @PathVariable int numeroDocumento, @RequestBody Usuario usuario) {
    Usuario usuarioExistente = usuarioService.findByNumeroDocumento(numeroDocumento);
    if (usuarioExistente == null) {
        return ResponseEntity.notFound().build();
    }

    // Actualizamos nombre y apellido
    usuarioExistente.setNombre(usuario.getNombre());
    usuarioExistente.setApellido(usuario.getApellido());
    Usuario usuarioActualizado = usuarioService.save(usuarioExistente);

    return ResponseEntity.ok(usuarioActualizado);
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
}