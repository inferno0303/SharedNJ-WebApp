package com.teemo.sprinboot06mybatiscrud.mapper;

import com.teemo.sprinboot06mybatiscrud.entity.DispatchFee;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface DispatchFeeMapper {

    @Select("select distinct city_start from DispatchFee")
    public List<String> getCityList();

    @Select("select * from DispatchFee where city_start=#{city_start} and city_end=#{city_end}")
    public List<DispatchFee> getDispatchFeeByTwoCity(String city_start, String city_end);
}
