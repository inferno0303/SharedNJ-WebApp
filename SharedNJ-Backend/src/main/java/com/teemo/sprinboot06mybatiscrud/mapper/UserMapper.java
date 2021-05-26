package com.teemo.sprinboot06mybatiscrud.mapper;

import com.teemo.sprinboot06mybatiscrud.entity.User;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface UserMapper {

    @Select("select 1")
    public String select1();

    @Select("select * from User where username=#{username} and password=#{password} and user_role=#{user_role}")
    public List<User> login(User user);

    @Select("select * from User where username=#{username}")
    public List<User> getUserByUsername(String username);

    @Insert("insert into User (username, password, user_role, last_login, balance)" +
            "values(#{username}, #{password}, #{user_role}, #{last_login}, #{balance})")
    public Integer addNewUser(User user);

    @Update("update User set last_login=#{last_login} where username=#{username} and password=#{password}")
    public void updateLastLoginTime(User user);

    @Select("select balance from User where username=#{username}")
    public List<Double> getUserBalanceByUsername(String username);

    @Update("update User set balance=#{balance} where username=#{username}")
    public void updateUserBalance(String username, Double balance);

    @Select("select * from User where user_role='deliver'")
    public List<User> getAllDeliver();

    @Select("select * from User where user_role='deliver' and username=#{username}")
    public List<User> getDeliverByUsername(String username);

    // admin
    @Select("select count(*) from User where user_role='user'")
    public Integer getUserCount();

    @Select("select count(*) from User where user_role='offer'")
    public Integer getOfferCount();

    @Select("select count(*) from User where user_role='deliver'")
    public Integer getDeliverCount();

    @Select("select * from User")
    public List<User> queryAllUser();

    @Update("update User set password=#{new_password}, balance=#{new_balance} where username=#{target_username}")
    public Integer updateUserTable(String target_username, String new_password, Double new_balance);

    @Delete("delete from User where username=#{username}")
    public Integer deleteUserByUsername(String username);
}
