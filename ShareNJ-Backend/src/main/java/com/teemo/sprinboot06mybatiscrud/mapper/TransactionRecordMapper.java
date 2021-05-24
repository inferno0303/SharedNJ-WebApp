package com.teemo.sprinboot06mybatiscrud.mapper;

import com.teemo.sprinboot06mybatiscrud.entity.TransactionRecord;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface TransactionRecordMapper {

    // 公共查询
    @Select("select * from TransactionRecord order by release_time desc")
    public List<TransactionRecord> getTransactionRecord();

    @Select("select * from TransactionRecord where id={id} order by release_time desc")
    public List<TransactionRecord> getTransactionRecordById(Integer id);

    @Select("select * from TransactionRecord where transaction_md5=#{transaction_md5} order by release_time desc")
    public List<TransactionRecord> getTransactionRecordByTransactionMD5(String transaction_md5);

    // 用户侧获取订单表
    @Select("select * from TransactionRecord where user_username=#{user_username} order by release_time desc")
    public List<TransactionRecord> getTransactionRecordByUsername(String user_username);

    @Select("select * from TransactionRecord where user_username=#{user_username} and status=1 order by release_time desc")
    public List<TransactionRecord> getUnHandleTransactionRecordByUsername(String user_username);

    @Select("select * from TransactionRecord where user_username=#{user_username} and status=2 order by release_time desc")
    public List<TransactionRecord> getDispatchingTransactionRecordByUsername(String user_username);

    @Select("select * from TransactionRecord where user_username=#{user_username} and status=3 order by release_time desc")
    public List<TransactionRecord> getFinishedTransactionRecordByUsername(String user_username);

    @Select("select * from TransactionRecord where user_username=#{user_username} and status=4 order by release_time desc")
    public List<TransactionRecord> getCanceledTransactionRecordByUsername(String user_username);

    // 下单
    @Insert("insert into TransactionRecord" +
            "(transaction_md5, offer_username, user_username, machine_name," +
            "machine_id, unit_price, require_number, offer_location," +
            "user_location, dispatch_fee, total_price, msg," +
            "deliver_username, status, release_time) values" +
            "(#{transaction_md5}, #{offer_username}, #{user_username}, #{machine_name}," +
            "#{machine_id}, #{unit_price}, #{require_number}, #{offer_location}," +
            "#{user_location}, #{dispatch_fee}, #{total_price}, #{msg}," +
            "#{deliver_username}, #{status}, #{release_time})")
    public Integer insertTransactionRecord(TransactionRecord transactionRecord);

    // 商家侧获取订单表
    @Select("select * from TransactionRecord where offer_username=#{offer_username} order by release_time desc")
    public List<TransactionRecord> getOfferAllTransaction(String offer_username);

    @Select("select * from TransactionRecord where offer_username=#{offer_username} and status=1 order by release_time desc")
    public List<TransactionRecord> getOfferUnHandleTransaction(String offer_username);

    @Select("select * from TransactionRecord where offer_username=#{offer_username} and status=2 order by release_time desc")
    public List<TransactionRecord> getOfferDispatchingTransaction(String offer_username);

    @Select("select * from TransactionRecord where offer_username=#{offer_username} and status=3 order by release_time desc")
    public List<TransactionRecord> getOfferFinishedTransaction(String offer_username);

    @Select("select * from TransactionRecord where offer_username=#{offer_username} and status=4 order by release_time desc")
    public List<TransactionRecord> getOfferCanceledTransaction(String offer_username);

    // 设置订单状态
    @Update("update TransactionRecord set status=#{status}, deliver_username=#{deliver_username} where transaction_md5=#{transaction_md5} and offer_username=#{offer_username}")
    public Integer updateTransactionStatus(Integer status, String deliver_username, String transaction_md5, String offer_username);

    // 配送员查询
    // 获取配送员所有任务
    @Select("select * from TransactionRecord where deliver_username=#{deliver_username} order by release_time desc")
    public List<TransactionRecord> getMyAllDeliverTask(String deliver_username);

    // 获取配送员待配送任务
    @Select("select * from TransactionRecord where deliver_username=#{deliver_username} and status=2 order by release_time desc")
    public List<TransactionRecord> getMyDispatchingDeliverTask(String deliver_username);

    // 获取配送员已完成任务
    @Select("select * from TransactionRecord where deliver_username=#{deliver_username} and status=3 order by release_time desc")
    public List<TransactionRecord> getMyFinishedDeliverTask(String deliver_username);

    // 将正配送的订单更改为完成状态
    @Update("update TransactionRecord set status=3 where transaction_md5=#{transaction_md5} and deliver_username=#{deliver_username}")
    public Integer setDeliverFinished(String transaction_md5, String deliver_username);

    // admin
    @Select("select SUM(total_price) from TransactionRecord")
    public Double getTransactionPriceSum();

    @Select("select count(*) from TransactionRecord where machine_name=#{machine_name}")
    public Integer getCountByMachineName(String machine_name);

    // 获取发货地列表
    @Select("select distinct offer_location from TransactionRecord")
    public List<String> getDistinctOfferLocation();

    // 获取收货地列表
    @Select("select distinct user_location from TransactionRecord")
    public List<String> getDistinctUserLocation();

    // 根据发货地获取订单数量
    @Select("select count(*) from TransactionRecord where offer_location=#{offer_location}")
    public Integer getTransactionCountByOfferLocation(String offer_location);

    // 根据收货地获取订单数量
    @Select("select count(*) from TransactionRecord where user_location=#{user_location}")
    public Integer getTransactionCountByUserLocation(String user_location);

    // 删除某个订单
    @Delete("delete from TransactionRecord where transaction_md5=#{transaction_md5}")
    public Integer deleteTransactionByTransactionMD5(String transaction_md5);
}
