package com.teemo.sprinboot06mybatiscrud.controller;

import com.alibaba.fastjson.JSONObject;
import com.teemo.sprinboot06mybatiscrud.entity.TransactionRecord;
import com.teemo.sprinboot06mybatiscrud.entity.User;
import com.teemo.sprinboot06mybatiscrud.mapper.TransactionRecordMapper;
import com.teemo.sprinboot06mybatiscrud.mapper.UserMapper;
import com.teemo.sprinboot06mybatiscrud.utils.MyJsonResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.List;

@RestController
public class DeliverSideController {

    MyJsonResponse myJsonResponse = new MyJsonResponse();

    @Autowired
    UserMapper userMapper;

    @Autowired
    TransactionRecordMapper transactionRecordMapper;

    // 获取所有快递员列表
    @GetMapping("/getAllDeliver")
    public String getAllDeliver() {
        List<User> allDeliver = userMapper.getAllDeliver();
        ArrayList<String> strings = new ArrayList<>();
        for (User eachUser : allDeliver) {
            strings.add(eachUser.getUsername());
        }
        return myJsonResponse.make200Resp(MyJsonResponse.default_200_response, strings);
    }

    // 获取该配送员的各订单数量（deliverHome 数据展示）
    @GetMapping("/getMyDeliverTaskNumber")
    public String getMyDeliverTaskNumber(HttpSession httpSession) {
        // 验证身份，只有快递员能访问接口
        Object username = httpSession.getAttribute("username");
        Object user_role = httpSession.getAttribute("user_role");
        if (!user_role.toString().equals("deliver")) {
            return myJsonResponse.make403Resp(MyJsonResponse.default_403_response);
        }
        List<TransactionRecord> myAllDeliverTask = transactionRecordMapper.getMyAllDeliverTask(username.toString());
        int dispatchingCount = 0;
        int finishedCount = 0;
        for (TransactionRecord eachTransaction : myAllDeliverTask) {
            switch (eachTransaction.getStatus()) {
                case 2: {
                    dispatchingCount++;
                    break;
                }
                case 3: {
                    finishedCount++;
                    break;
                }
            }
        }
        int totalCount = dispatchingCount + finishedCount;
        JSONObject retJson = new JSONObject();
        retJson.put("totalCount", totalCount);
        retJson.put("dispatchingCount", dispatchingCount);
        retJson.put("finishedCount", finishedCount);
        return myJsonResponse.make200Resp(MyJsonResponse.default_200_response, retJson);
    }

    // 获取所有配送的订单
    @GetMapping("/getMyAllDeliverTask")
    public String getMyAllDeliverTask(HttpSession httpSession) {
        // 验证身份，只有快递员能访问接口
        Object username = httpSession.getAttribute("username");
        Object user_role = httpSession.getAttribute("user_role");
        if (!user_role.toString().equals("deliver")) return myJsonResponse.make403Resp(MyJsonResponse.default_403_response);
        List<TransactionRecord> myAllDeliverTask = transactionRecordMapper.getMyAllDeliverTask(username.toString());
        return myJsonResponse.make200Resp(MyJsonResponse.default_200_response, myAllDeliverTask);
    }

    // 获取当前正配送的订单列表
    @GetMapping("/getMyDeliverTask")
    public String getMyDeliverTask(HttpSession httpSession) {
        // 验证身份，只有快递员能访问接口
        Object username = httpSession.getAttribute("username");
        Object user_role = httpSession.getAttribute("user_role");
        if (!user_role.toString().equals("deliver")) {
            return myJsonResponse.make403Resp(MyJsonResponse.default_403_response);
        }
        List<TransactionRecord> myDispatchingDeliverTask = transactionRecordMapper.getMyDispatchingDeliverTask(username.toString());
        return myJsonResponse.make200Resp(MyJsonResponse.default_200_response, myDispatchingDeliverTask);
    }

    // 获取已完成配送的订单列表
    @GetMapping("/getMyFinishedDeliverTask")
    public String getMyFinishedDeliverTask(HttpSession httpSession) {
        // 验证身份，只有快递员能访问接口
        Object username = httpSession.getAttribute("username");
        Object user_role = httpSession.getAttribute("user_role");
        if (!user_role.toString().equals("deliver")) {
            return myJsonResponse.make403Resp(MyJsonResponse.default_403_response);
        }
        List<TransactionRecord> myFinishedDeliverTask = transactionRecordMapper.getMyFinishedDeliverTask(username.toString());
        return myJsonResponse.make200Resp(MyJsonResponse.default_200_response, myFinishedDeliverTask);
    }

    // 将正配送的订单更改为完成状态
    @PostMapping("/setDeliverFinished")
    public String setDeliverFinished(@RequestParam("transaction_md5") String transaction_md5,
                                     HttpSession httpSession) {
        // 验证身份，只有快递员能访问接口
        Object username = httpSession.getAttribute("username");
        Object user_role = httpSession.getAttribute("user_role");
        if (!user_role.toString().equals("deliver")) {
            return myJsonResponse.make403Resp(MyJsonResponse.default_403_response);
        }
        // 验证transaction_md5 合法性
        List<TransactionRecord> transactionRecordByTransactionMD5 = transactionRecordMapper.getTransactionRecordByTransactionMD5(transaction_md5);
        if (transactionRecordByTransactionMD5.size() <= 0) return myJsonResponse.make500Resp(MyJsonResponse.default_500_response, "transaction_md5 error");
        // 更改为已完成配送状态
        Integer integer = transactionRecordMapper.setDeliverFinished(transaction_md5, username.toString());
        // 获取配送员之前的余额
        List<Double> userBalanceByUsername = userMapper.getUserBalanceByUsername(username.toString());
        if (userBalanceByUsername.size() <= 0) return myJsonResponse.make500Resp(MyJsonResponse.default_500_response, "user balance error");
        // 计算配送员新余额
        Double afterBalance = userBalanceByUsername.get(0) + transactionRecordByTransactionMD5.get(0).getDispatch_fee();
        // 更新配送员新的余额
        userMapper.updateUserBalance(username.toString(), afterBalance);
        return myJsonResponse.make200Resp(MyJsonResponse.default_200_response, integer);
    }

}
