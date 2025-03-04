package com.ventasProcductos.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/pagos")
public class PagoPageController {

    @GetMapping
    public String pagosPage() {
        return "pagos.html";
    }
}