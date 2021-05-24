package com.teemo.sprinboot06mybatiscrud.mapper;

import com.teemo.sprinboot06mybatiscrud.entity.Machine;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface MachineMapper {

    @Select("select * from Machine")
    public List<Machine> getAllMachine();

    @Select("select * from Machine where id=#{id}")
    public List<Machine> getMachineById(Integer id);

    @Select("select * from Machine where machine_name=#{machine_name}")
    public List<Integer> getMachineIdByMachineName(String machine_name);

    @Select("select distinct machine_name from Machine")
    public List<String> getDistinctMachineName();
}
