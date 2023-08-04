package com.example.demo2.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class CustomerController {

    @GetMapping("/customer")
    public String showListCustomer(){
        return "customer/list";
    }

    @GetMapping("/create")
    public String showCreate(){
        return "customer/create";
    }
}
