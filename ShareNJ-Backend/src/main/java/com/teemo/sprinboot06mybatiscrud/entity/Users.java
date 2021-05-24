package com.teemo.sprinboot06mybatiscrud.entity;

import java.util.Date;

public class Users {

    private Integer id;
    private String username;
    private String password;
    private String user_role;
    private Date last_login;
    private Double balance;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getUser_role() {
        return user_role;
    }

    public void setUser_role(String user_role) {
        this.user_role = user_role;
    }

    public Date getLast_login() {
        return last_login;
    }

    public void setLast_login(Date last_login) {
        this.last_login = last_login;
    }

    public Double getBalance() {
        return balance;
    }

    public void setBalance(Double balance) {
        this.balance = balance;
    }
}
