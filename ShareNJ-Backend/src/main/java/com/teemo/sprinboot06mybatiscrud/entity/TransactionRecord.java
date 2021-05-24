package com.teemo.sprinboot06mybatiscrud.entity;

import java.util.Date;

public class TransactionRecord {

    private Integer id;
    private String transaction_md5;
    private String offer_username;
    private String user_username;
    private String machine_name;
    private Integer machine_id;
    private Double unit_price;
    private Integer require_number;
    private String offer_location;
    private String user_location;
    private Double dispatch_fee;
    private Double total_price;
    private String msg;
    private String deliver_username;
    private Integer status;
    private Date release_time;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTransaction_md5() {
        return transaction_md5;
    }

    public void setTransaction_md5(String transaction_md5) {
        this.transaction_md5 = transaction_md5;
    }

    public String getOffer_username() {
        return offer_username;
    }

    public void setOffer_username(String offer_username) {
        this.offer_username = offer_username;
    }

    public String getUser_username() {
        return user_username;
    }

    public void setUser_username(String user_username) {
        this.user_username = user_username;
    }

    public String getMachine_name() {
        return machine_name;
    }

    public void setMachine_name(String machine_name) {
        this.machine_name = machine_name;
    }

    public Integer getMachine_id() {
        return machine_id;
    }

    public void setMachine_id(Integer machine_id) {
        this.machine_id = machine_id;
    }

    public Double getUnit_price() {
        return unit_price;
    }

    public void setUnit_price(Double unit_price) {
        this.unit_price = unit_price;
    }

    public Integer getRequire_number() {
        return require_number;
    }

    public void setRequire_number(Integer require_number) {
        this.require_number = require_number;
    }

    public String getOffer_location() {
        return offer_location;
    }

    public void setOffer_location(String offer_location) {
        this.offer_location = offer_location;
    }

    public String getUser_location() {
        return user_location;
    }

    public void setUser_location(String user_location) {
        this.user_location = user_location;
    }

    public Double getDispatch_fee() {
        return dispatch_fee;
    }

    public void setDispatch_fee(Double dispatch_fee) {
        this.dispatch_fee = dispatch_fee;
    }

    public Double getTotal_price() {
        return total_price;
    }

    public void setTotal_price(Double total_price) {
        this.total_price = total_price;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public String getDeliver_username() {
        return deliver_username;
    }

    public void setDeliver_username(String deliver_username) {
        this.deliver_username = deliver_username;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public Date getRelease_time() {
        return release_time;
    }

    public void setRelease_time(Date release_time) {
        this.release_time = release_time;
    }
}
