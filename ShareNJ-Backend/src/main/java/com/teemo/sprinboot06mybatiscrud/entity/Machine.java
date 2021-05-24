package com.teemo.sprinboot06mybatiscrud.entity;

public class Machine {

    private Integer id;
    private String machine_name;
    private Double price;
    private String machine_function;
    private String machine_features;
    private String machine_image;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getMachine_name() {
        return machine_name;
    }

    public void setMachine_name(String machine_name) {
        this.machine_name = machine_name;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getMachine_function() {
        return machine_function;
    }

    public void setMachine_function(String machine_function) {
        this.machine_function = machine_function;
    }

    public String getMachine_features() {
        return machine_features;
    }

    public void setMachine_features(String machine_features) {
        this.machine_features = machine_features;
    }

    public String getMachine_image() {
        return machine_image;
    }

    public void setMachine_image(String machine_image) {
        this.machine_image = machine_image;
    }
}
