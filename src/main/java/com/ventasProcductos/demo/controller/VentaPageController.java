package com.ventasProcductos.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/ventas")
public class VentaPageController {

    @GetMapping
    public String ventasPage() {
        return "ventas.html";
    }
}