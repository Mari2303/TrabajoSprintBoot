package com.ventasProcductos.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/usuarios")
public class UsuarioPageController {

    @GetMapping
    public String usuariosPage() {
        return "index.html";
    }
}