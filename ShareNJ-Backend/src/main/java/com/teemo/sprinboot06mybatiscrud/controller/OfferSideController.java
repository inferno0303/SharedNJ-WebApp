package com.teemo.sprinboot06mybatiscrud.controller;

import com.alibaba.fastjson.JSONObject;
import com.teemo.sprinboot06mybatiscrud.entity.ProductList;
import com.teemo.sprinboot06mybatiscrud.entity.TransactionRecord;
import com.teemo.sprinboot06mybatiscrud.entity.User;
import com.teemo.sprinboot06mybatiscrud.mapper.*;
import com.teemo.sprinboot06mybatiscrud.utils.MyJsonResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.Date;
import java.util.List;

@RestController
public class OfferSideController {

    MyJsonResponse myJsonResponse = new MyJsonResponse();

    @Autowired
    UserMapper userMapper;

    @Autowired
    MachineMapper machineMapper;

    @Autowired
    UserDemandMapper userDemandMapper;

    @Autowired
    DispatchFeeMapper dispatchFeeMapper;

    @Autowired
    ProductListMapper productListMapper;

    @Autowired
    TransactionRecordMapper transactionRecordMapper;


    // offerSide 商家侧接口
    // 获取自己发布的商品列表
    @GetMapping("/getMyProductList")
    public String getMyProductList(HttpSession httpSession) {
        Object username = httpSession.getAttribute("username");
        Object user_role = httpSession.getAttribute("user_role");
        // 验证身份
        if (!user_role.toString().equals("offer")) {
            return myJsonResponse.make403Resp(MyJsonResponse.default_403_response);
        }
        List<ProductList> myProductList = productListMapper.getMyProductList(username.toString());
        return myJsonResponse.make200Resp(MyJsonResponse.default_200_response, myProductList);
    }

    // offerHome
    // 修改自己发布的商品属性（库存，单价）
    @PostMapping("/updateMyProduct")
    public String updateMyProduct(@RequestParam("productListId") Integer productListId,
                                  @RequestParam("total_count") Integer total_count,
                                  @RequestParam("unit_price") Double unit_price,
                                  HttpSession httpSession) {
        Object username = httpSession.getAttribute("username");
        Object user_role = httpSession.getAttribute("user_role");
        // 验证身份
        if (!user_role.toString().equals("offer")) {
            return myJsonResponse.make403Resp(MyJsonResponse.default_403_response);
        }
        Integer integer = productListMapper.updateMyProduct(productListId, username.toString(), total_count, unit_price);
        return myJsonResponse.make200Resp(MyJsonResponse.default_200_response, integer);
    }

    // 删除自己发布的商品
    @GetMapping("/deleteMyProduct")
    public String deleteMyProduct(@RequestParam("productListId") Integer productListId,
                                  HttpSession httpSession) {
        Object username = httpSession.getAttribute("username");
        Object user_role = httpSession.getAttribute("user_role");
        // 验证身份
        if (!user_role.toString().equals("offer")) {
            return myJsonResponse.make403Resp(MyJsonResponse.default_403_response);
        }
        Integer integer = productListMapper.deleteMyProduct(productListId, username.toString());
        return myJsonResponse.make200Resp(MyJsonResponse.default_200_response, integer);
    }

    // 商家侧获取订单数量（首页显示数量的数字）
    @GetMapping("/getOfferTransactionTypeNumber")
    public String getOfferTransactionTypeNumber(HttpSession httpSession) {
        Object username = httpSession.getAttribute("username");
        List<TransactionRecord> offerAllTransaction = transactionRecordMapper.getOfferAllTransaction(username.toString());
        int unHandleCount = 0;
        int dispatchingCount = 0;
        int finishedCount = 0;
        int canceledCount = 0;
        for (TransactionRecord eachTransaction : offerAllTransaction) {
            switch (eachTransaction.getStatus()) {
                case 1: {
                    unHandleCount++;
                    break;
                }
                case 2: {
                    dispatchingCount++;
                    break;
                }
                case 3: {
                    finishedCount++;
                    break;
                }
                case 4: {
                    canceledCount++;
                    break;
                }
            }
        }
        int totalCount = unHandleCount + dispatchingCount + finishedCount + canceledCount;
        JSONObject retJson = new JSONObject();
        retJson.put("totalCount", totalCount);
        retJson.put("unHandleCount", unHandleCount);
        retJson.put("dispatchingCount", dispatchingCount);
        retJson.put("finishedCount", finishedCount);
        retJson.put("canceledCount", canceledCount);
        return myJsonResponse.make200Resp(MyJsonResponse.default_200_response, retJson);
    }

    // 获取商家收到的全部订单列表
    @GetMapping("/getOfferAllTransaction")
    public String getOfferAllTransaction(HttpSession httpSession) {
        Object username = httpSession.getAttribute("username");
        List<TransactionRecord> offerAllTransaction = transactionRecordMapper.getOfferAllTransaction(username.toString());
        return myJsonResponse.make200Resp(MyJsonResponse.default_200_response, offerAllTransaction);
    }

    // 获取商家收到的未处理订单列表
    @GetMapping("/getOfferUnHandleTransaction")
    public String getOfferUnHandleTransaction(HttpSession httpSession) {
        Object username = httpSession.getAttribute("username");
        List<TransactionRecord> offerUnHandleTransaction = transactionRecordMapper.getOfferUnHandleTransaction(username.toString());
        return myJsonResponse.make200Resp(MyJsonResponse.default_200_response, offerUnHandleTransaction);
    }

    // 获取商家收到的正配送订单列表
    @GetMapping("/getOfferDispatchingTransaction")
    public String getOfferDispatchingTransaction(HttpSession httpSession) {
        Object username = httpSession.getAttribute("username");
        List<TransactionRecord> offerDispatchingTransaction = transactionRecordMapper.getOfferDispatchingTransaction(username.toString());
        return myJsonResponse.make200Resp(MyJsonResponse.default_200_response, offerDispatchingTransaction);
    }

    // 获取商家收到的已完成订单列表
    @GetMapping("/getOfferFinishedTransaction")
    public String getOfferFinishedTransaction(HttpSession httpSession) {
        Object username = httpSession.getAttribute("username");
        List<TransactionRecord> offerFinishedTransaction = transactionRecordMapper.getOfferFinishedTransaction(username.toString());
        return myJsonResponse.make200Resp(MyJsonResponse.default_200_response, offerFinishedTransaction);
    }

    // 获取商家收到的已取消订单列表
    @GetMapping("/getOfferCanceledTransaction")
    public String getOfferCanceledTransaction(HttpSession httpSession) {
        Object username = httpSession.getAttribute("username");
        List<TransactionRecord> offerCanceledTransaction = transactionRecordMapper.getOfferCanceledTransaction(username.toString());
        return myJsonResponse.make200Resp(MyJsonResponse.default_200_response, offerCanceledTransaction);
    }

    // 商家变更订单状态，并派单给配送员（从未处理变更到其他）
    @PostMapping("/setTransactionStatus")
    public String setTransactionStatus(@RequestParam("transaction_md5") String transaction_md5,
                                       @RequestParam("status") Integer status,
                                       @RequestParam("deliver") String deliver,
                                       HttpSession httpSession) {
        // 验证身份，只有商家能访问接口
        Object username = httpSession.getAttribute("username");
        Object user_role = httpSession.getAttribute("user_role");
        if (!user_role.toString().equals("offer")) {
            return myJsonResponse.make403Resp(MyJsonResponse.default_403_response);
        }
        List<TransactionRecord> transactionRecordByTransactionMD5 = transactionRecordMapper.getTransactionRecordByTransactionMD5(transaction_md5);
        // 校验transaction_md5是否正确
        if (transactionRecordByTransactionMD5.size() <= 0) return myJsonResponse.make500Resp(MyJsonResponse.default_500_response, "transaction_md5 error");
        TransactionRecord transactionRecord = transactionRecordByTransactionMD5.get(0);
        // 只有订单offer_username属于该商家才可操作
        if (!transactionRecord.getOffer_username().equals(username.toString())) return myJsonResponse.make403Resp(MyJsonResponse.default_403_response);
        // 只有状态是未处理状态status==1的订单可操作
        if (!transactionRecord.getStatus().equals(1)) return myJsonResponse.make500Resp(MyJsonResponse.default_500_response, "target transaction current status error");
        // 校验deliver是否正确
        List<User> deliverByUsername = userMapper.getDeliverByUsername(deliver);
        if (deliverByUsername.size() <= 0) return myJsonResponse.make500Resp(MyJsonResponse.default_500_response, "deliver error");
        // 更改状态，派单给配送员
        if (status == 2) {
            Integer commitCount = transactionRecordMapper.updateTransactionStatus(status, deliver, transaction_md5, username.toString());
            return myJsonResponse.make200Resp(MyJsonResponse.default_200_response, commitCount);
        }
        if (status == 3 || status == 4) {
            Integer commitCount = transactionRecordMapper.updateTransactionStatus(status, "", transaction_md5, username.toString());
            return myJsonResponse.make200Resp(MyJsonResponse.default_200_response, commitCount);
        }
        return myJsonResponse.make500Resp(MyJsonResponse.default_500_response, "status error");
    }

    // 获取商品列表
    @GetMapping("/getAllProductList")
    public String getAllProductList() {
        List<ProductList> allProductList = productListMapper.getAllProductList();
        return myJsonResponse.make200Resp(MyJsonResponse.default_200_response, allProductList);
    }

    // 新增newProductList
    @PostMapping("/newProductList")
    public String newProductList(@RequestBody ProductList productList,
                                 HttpSession httpSession) {
        Object username = httpSession.getAttribute("username");
        Object user_role = httpSession.getAttribute("user_role");
        // 验证身份
        if (!user_role.toString().equals("offer")) {
            return myJsonResponse.make403Resp(MyJsonResponse.default_403_response);
        }
        // 生成商家用户名
        productList.setUsername(username.toString());
        // 查询并生成 machine_id
        List<Integer> machineIdByMachineName = machineMapper.getMachineIdByMachineName(productList.getMachine_name());
        if (machineIdByMachineName.size() == 0) {
            return myJsonResponse.make500Resp(MyJsonResponse.default_500_response, "machine_name is error");
        }
        productList.setMachine_id(machineIdByMachineName.get(0));
        productList.setRelease_time(new Date());
        Integer integer = productListMapper.insertProductList(productList);
        return myJsonResponse.make200Resp(MyJsonResponse.default_200_response, integer);
    }
}
