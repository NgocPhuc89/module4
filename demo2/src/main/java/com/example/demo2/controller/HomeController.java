package com.example.demo2.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {


    @GetMapping("/home")
    public String show(){
        return "home";
    }

    @GetMapping("/create")
    public String showList(){
        return "customer/create";
    }
}
