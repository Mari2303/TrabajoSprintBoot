
// filepath: /c:/Users/User/Downloads/TrabajoSprintBoot/src/main/java/com/ventasProcductos/demo/controller/DetallesVentaPageController.java
package com.ventasProcductos.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/detalles_venta")
public class DetallesVentaPageController {

    @GetMapping
    public String detallesVentaPage() {
        return "detalles_venta.html";
    }
}