package com.ventasProcductos.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ventasProcductos.demo.model.Usuario;
import com.ventasProcductos.demo.repository.UsuarioRepository;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    // Obtener todos los usuarios
    public List<Usuario> findAll() {
        return usuarioRepository.findAll();
    }

    public List<Usuario> searchUsuarios(String keyword) {
        return usuarioRepository.searchUsuarios(keyword);
    }

    // Obtener un usuario por ID
    public Optional<Usuario> findById(int id) {
        return usuarioRepository.findById(id);
    }

    // Guardar o actualizar un usuario
    public Usuario save(Usuario usuario) {
        return usuarioRepository.save(usuario);
    }

    // Eliminar un usuario por ID
    public void deleteById(int id) {
        usuarioRepository.deleteById(id);
    }

    //obtener un usuario por numero de documento
    public Usuario findByNumeroDocumento(int numeroDocumento) {
        return usuarioRepository.findByNumeroDocumento(numeroDocumento);
    }
   
    // Actualizar el número de documento de un usuario
public Usuario updateNumeroDocumento(int numeroDocumento, int nuevoNumeroDocumento) {
    Usuario usuario = usuarioRepository.findByNumeroDocumento(numeroDocumento);
    if (usuario == null) {
        throw new IllegalArgumentException("Usuario no encontrado");
    }
    usuario.setNumeroDocumento(nuevoNumeroDocumento);
    return usuarioRepository.save(usuario);
}
    
    //eliminar un usuario por numero de documento
    public void deleteByNumeroDocumento(int numeroDocumento) {
        Usuario usuario = usuarioRepository.findByNumeroDocumento(numeroDocumento);
        usuarioRepository.delete(usuario);
    }

    

}