package com.teemo.sprinboot06mybatiscrud.mapper;

import com.teemo.sprinboot06mybatiscrud.entity.ProductList;
import com.teemo.sprinboot06mybatiscrud.entity.UserDemand;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface ProductListMapper {

    @Select("select * from ProductList where username=#{username} order by release_time desc")
    public List<ProductList> getMyProductList(String username);

    @Update("update ProductList set total_count=#{total_count}, unit_price=#{unit_price} where id=#{productListId} and username=#{username}")
    public Integer updateMyProduct(Integer productListId, String username, Integer total_count, Double unit_price);

    @Delete("delete from ProductList where id=#{productListId} and username=#{username}")
    public Integer deleteMyProduct(Integer productListId, String username);

    @Select("select * from ProductList order by release_time desc")
    public List<ProductList> getAllProductList();

    @Select("select * from ProductList where id=#{id}")
    public List<ProductList> getProductListById(Integer id);

    @Insert("insert into ProductList(username, machine_name, machine_id, total_count, location, detail, unit_price, release_time)" +
            "values(#{username}, #{machine_name}, #{machine_id}, #{total_count}, #{location}, #{detail}, #{unit_price}, #{release_time})")
    public Integer insertProductList(ProductList productList);

    // admin
    @Delete("delete from ProductList where username=#{username}")
    public Integer deleteProductListByUsername(String username);

    // 获取各商品数量（根据农机名）
    @Select("select count(*) from ProductList where machine_name=#{machine_name}")
    public Integer getProductNumberByMachineName(String machine_name);

    // 获取农机名称
    @Select("select distinct machine_name from ProductList")
    public List<String> getDistinctMachineName();

    // 获取农机的平均售价（根据农机名）
    @Select("select avg(unit_price) from ProductList where machine_name=#{machine_name}")
    public Double getMachineAvgPriceByMachineName(String machine_name);

    // 删除某个商品
    @Delete("delete from ProductList where id=#{id} and username=#{username}")
    public Integer deleteProductById(Integer id, String username);

}
