package com.example.banking.service;

import com.example.banking.dto.CustomerSaveRequest;
import com.example.banking.model.Customer;
import com.example.banking.repository.CustomerRepository;
import com.example.banking.util.AppUtils;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class CustomerService {

    private  final CustomerRepository customerRepository;

    public List<Customer> findAll(){
        return customerRepository.findAll();
    }

    public void saveCustomer (CustomerSaveRequest customerSaveRequest , Customer customer){
        Customer cus = AppUtils.mapper.map(customerSaveRequest,Customer.class);

        cus.setFullName(customer.getFullName());
    }

}
