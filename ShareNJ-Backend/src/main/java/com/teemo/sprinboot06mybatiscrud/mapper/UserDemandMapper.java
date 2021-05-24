package com.teemo.sprinboot06mybatiscrud.mapper;

import com.teemo.sprinboot06mybatiscrud.entity.UserDemand;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface UserDemandMapper {

    @Select("select * from UserDemand where delete_flag=0 order by release_time desc")
    public List<UserDemand> getAllUserDemand();

    @Insert("insert into UserDemand(username, machine_name, machine_id, number, location, start_time, end_time, offer_price, detail_info, delete_flag, release_time)" +
            "values(#{username}, #{machine_name}, #{machine_id}, #{number}, #{location}, #{start_time}, #{end_time}, #{offer_price}, #{detail_info}, #{delete_flag}, #{release_time})")
    public Integer insertUserDemand(UserDemand userDemand);

    @Select("select * from UserDemand where username=#{username} and delete_flag=0 order by release_time desc")
    public List<UserDemand> getUserDemandByUsername(String username);

    @Select("select username from UserDemand where id=#{id}")
    public List<String> getUsernameById(Integer id);

    @Update("update UserDemand set delete_flag=1 where id=#{id}")
    public Integer updateUserDemandDeleteFlagById(Integer id);

    @Delete("delete from UserDemand where id=#{id}")
    public Integer deleteUserDemandById(Integer id);

    // 根据username删除用户需求
    @Delete("delete from UserDemand where username=#{username}")
    public Integer deleteUserDemandByUsername(String username);
}
