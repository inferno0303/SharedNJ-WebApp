package com.teemo.sprinboot06mybatiscrud.entity;

public class DispatchFee {
    private Integer id;
    private String city_start;
    private String city_end;
    private Double dispatch_fee;
    private String note;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getCity_start() {
        return city_start;
    }

    public void setCity_start(String city_start) {
        this.city_start = city_start;
    }

    public String getCity_end() {
        return city_end;
    }

    public void setCity_end(String city_end) {
        this.city_end = city_end;
    }

    public Double getDispatch_fee() {
        return dispatch_fee;
    }

    public void setDispatch_fee(Double dispatch_fee) {
        this.dispatch_fee = dispatch_fee;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }
}
