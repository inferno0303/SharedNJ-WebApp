package com.teemo.sprinboot06mybatiscrud.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.teemo.sprinboot06mybatiscrud.entity.ProductList;
import com.teemo.sprinboot06mybatiscrud.entity.TransactionRecord;
import com.teemo.sprinboot06mybatiscrud.entity.User;
import com.teemo.sprinboot06mybatiscrud.mapper.*;
import com.teemo.sprinboot06mybatiscrud.utils.MyJsonResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.List;

@RestController
public class AdminController {

    MyJsonResponse myJsonResponse = new MyJsonResponse();

    @Autowired
    TransactionRecordMapper transactionRecordMapper;

    @Autowired
    ProductListMapper productListMapper;

    @Autowired
    UserMapper userMapper;

    @Autowired
    UserDemandMapper userDemandMapper;

    @Autowired
    MachineMapper machineMapper;

    // 总览
    // 获取订单总数
    @GetMapping(value = "/getTransactionTotalCount", produces = "application/json")
    public String getTransactionTotalCount (HttpSession httpSession) {
        // 验证身份
        Object username = httpSession.getAttribute("username");
        Object user_role = httpSession.getAttribute("user_role");
        if (!user_role.toString().equals("admin")) {
            return myJsonResponse.make403Resp(MyJsonResponse.default_403_response);
        }
        List<TransactionRecord> transactionRecord = transactionRecordMapper.getTransactionRecord();
        return myJsonResponse.make200Resp(MyJsonResponse.default_200_response, transactionRecord.size());
    }

    // 获取商品总数
    @GetMapping(value = "/getProductTotalCount", produces = "application/json")
    public String getProductTotalCount (HttpSession httpSession) {
        // 验证身份
        Object username = httpSession.getAttribute("username");
        Object user_role = httpSession.getAttribute("user_role");
        if (!user_role.toString().equals("admin")) {
            return myJsonResponse.make403Resp(MyJsonResponse.default_403_response);
        }
        List<ProductList> allProductList = productListMapper.getAllProductList();
        return myJsonResponse.make200Resp(MyJsonResponse.default_200_response, allProductList.size());
    }

    // 获取订单总金额
    @GetMapping(value = "/getTransactionPriceSum", produces = "application/json")
    public String getTransactionPriceSum (HttpSession httpSession) {
        // 验证身份，只有快递员能访问接口
        Object username = httpSession.getAttribute("username");
        Object user_role = httpSession.getAttribute("user_role");
        if (!user_role.toString().equals("admin")) {
            return myJsonResponse.make403Resp(MyJsonResponse.default_403_response);
        }
        Double transactionPriceSum = transactionRecordMapper.getTransactionPriceSum();
        return myJsonResponse.make200Resp(MyJsonResponse.default_200_response, transactionPriceSum);
    }

    // 获取注册用户数
    @GetMapping(value = "/getUserCount", produces = "application/json")
    public String getUserCount (HttpSession httpSession) {
        // 验证身份，只有快递员能访问接口
        Object username = httpSession.getAttribute("username");
        Object user_role = httpSession.getAttribute("user_role");
        if (!user_role.toString().equals("admin")) {
            return myJsonResponse.make403Resp(MyJsonResponse.default_403_response);
        }
        Integer userCount = userMapper.getUserCount();
        return myJsonResponse.make200Resp(MyJsonResponse.default_200_response, userCount);
    }

    // 获取注册商家数
    @GetMapping(value = "/getOfferCount", produces = "application/json")
    public String getOfferCount (HttpSession httpSession) {
        // 验证身份，只有快递员能访问接口
        Object username = httpSession.getAttribute("username");
        Object user_role = httpSession.getAttribute("user_role");
        if (!user_role.toString().equals("admin")) {
            return myJsonResponse.make403Resp(MyJsonResponse.default_403_response);
        }
        Integer offerCount = userMapper.getOfferCount();
        return myJsonResponse.make200Resp(MyJsonResponse.default_200_response, offerCount);
    }

    // 获取注册配送员数
    @GetMapping(value = "/getDeliverCount", produces = "application/json")
    public String getDeliverCount (HttpSession httpSession) {
        // 验证身份，只有快递员能访问接口
        Object username = httpSession.getAttribute("username");
        Object user_role = httpSession.getAttribute("user_role");
        if (!user_role.toString().equals("admin")) {
            return myJsonResponse.make403Resp(MyJsonResponse.default_403_response);
        }
        Integer deliverCount = userMapper.getDeliverCount();
        return myJsonResponse.make200Resp(MyJsonResponse.default_200_response, deliverCount);
    }

    // 获取用户表
    @GetMapping(value = "/getUserTable", produces = "application/json")
    public String getUserTable(HttpSession httpSession) {
        // 验证身份，只有快递员能访问接口
        Object username = httpSession.getAttribute("username");
        Object user_role = httpSession.getAttribute("user_role");
        if (!user_role.toString().equals("admin")) {
            return myJsonResponse.make403Resp(MyJsonResponse.default_403_response);
        }
        List<User> userList = userMapper.queryAllUser();
        return myJsonResponse.make200Resp(MyJsonResponse.default_200_response, userList);
    }

    // 更新用户表
    @PostMapping(value = "/updateUserTable")
    public String updateUserTable(@RequestParam("username") String target_username,
                                  @RequestParam("password") String new_password,
                                  @RequestParam("balance") Double new_balance,
                                  HttpSession httpSession) {
        // 验证身份，只有快递员能访问接口
        Object username = httpSession.getAttribute("username");
        Object user_role = httpSession.getAttribute("user_role");
        if (!user_role.toString().equals("admin")) {
            return myJsonResponse.make403Resp(MyJsonResponse.default_403_response);
        }
        Integer integer = userMapper.updateUserTable(target_username, new_password, new_balance);
        return myJsonResponse.make200Resp(MyJsonResponse.default_200_response, integer);
    }

    // 删除用户，根据用户名
    @PostMapping(value = "/deleteUserByUsername")
    public String deleteUserByUsername(@RequestParam("username") String target_username,
                                       HttpSession httpSession) {
        // 验证身份，只有快递员能访问接口
        Object username = httpSession.getAttribute("username");
        Object user_role = httpSession.getAttribute("user_role");
        if (!user_role.toString().equals("admin")) {
            return myJsonResponse.make403Resp(MyJsonResponse.default_403_response);
        }
        Integer integer = userMapper.deleteUserByUsername(target_username);
        // 删除该用户下的其他信息
        Integer integer1 = userDemandMapper.deleteUserDemandByUsername(target_username);
        Integer integer2 = productListMapper.deleteProductListByUsername(target_username);
        return myJsonResponse.make200Resp(MyJsonResponse.default_200_response, integer);
    }

    // 商品管理页
    // 获取各商品数量
    @GetMapping(value = "/getProductTypeNumber", produces = "application/json")
    public String getProductTypeNumber(HttpSession httpSession) {
        // 验证身份，只有快递员能访问接口
        Object username = httpSession.getAttribute("username");
        Object user_role = httpSession.getAttribute("user_role");
        if (!user_role.toString().equals("admin")) {
            return myJsonResponse.make403Resp(MyJsonResponse.default_403_response);
        }
        List<String> distinctMachineName = machineMapper.getDistinctMachineName();
        ArrayList<JSONObject> ret = new ArrayList<>();
        for (String machine_name : distinctMachineName) {
            Integer product_number = productListMapper.getProductNumberByMachineName(machine_name);
            JSONObject _tmp = new JSONObject();
            _tmp.put("machine_name", machine_name);
            _tmp.put("product_number", product_number);
            ret.add(_tmp);
        }
        return myJsonResponse.make200Resp(MyJsonResponse.default_200_response, ret);
    }

    // 获取各农机的均价
    @GetMapping(value = "/getMachineAvgPrice", produces = "application/json")
    public String getMachineAvgPrice(HttpSession httpSession) {
        // 验证身份，只有快递员能访问接口
        Object username = httpSession.getAttribute("username");
        Object user_role = httpSession.getAttribute("user_role");
        if (!user_role.toString().equals("admin")) {
            return myJsonResponse.make403Resp(MyJsonResponse.default_403_response);
        }
        List<String> distinctMachineName = productListMapper.getDistinctMachineName();
        ArrayList<JSONObject> ret = new ArrayList<>();
        for (String machine_name : distinctMachineName) {
            Double avgPrice = productListMapper.getMachineAvgPriceByMachineName(machine_name);
            JSONObject _tmp = new JSONObject();
            _tmp.put("machine_name", machine_name);
            // 保留两位小数
            DecimalFormat decimalFormat = new DecimalFormat("#.##");
            _tmp.put("avg_price", decimalFormat.format(avgPrice));
            ret.add(_tmp);
        }
        return myJsonResponse.make200Resp(MyJsonResponse.default_200_response, ret);
    }

    // 获取所有商品列表
    @GetMapping(value = "/getProductListByAdmin", produces = "application/json")
    public String getProductListByAdmin (HttpSession httpSession) {
        // 验证身份，只有快递员能访问接口
        Object username = httpSession.getAttribute("username");
        Object user_role = httpSession.getAttribute("user_role");
        if (!user_role.toString().equals("admin")) {
            return myJsonResponse.make403Resp(MyJsonResponse.default_403_response);
        }
        List<ProductList> allProductList = productListMapper.getAllProductList();
        return myJsonResponse.make200Resp(MyJsonResponse.default_200_response, allProductList);
    }

    // 删除商品
    @PostMapping(value = "/deleteProductByIdAndUsername")
    public String deleteProductByIdAndUsername(@RequestParam("id") Integer id,
                                               @RequestParam("username") String target_username,
                                               HttpSession httpSession) {
        // 验证身份，只有快递员能访问接口
        Object username = httpSession.getAttribute("username");
        Object user_role = httpSession.getAttribute("user_role");
        if (!user_role.toString().equals("admin")) {
            return myJsonResponse.make403Resp(MyJsonResponse.default_403_response);
        }
        Integer integer = productListMapper.deleteProductById(id, target_username);
        return myJsonResponse.make200Resp(MyJsonResponse.default_200_response, integer);
    }

    // 获取各农机的销量（订单数量）
    @GetMapping(value = "/getMachineTransactionNumber", produces = "application/json")
    public String getMachineTransactionNumber(HttpSession httpSession) {
        // 验证身份，只有快递员能访问接口
        Object username = httpSession.getAttribute("username");
        Object user_role = httpSession.getAttribute("user_role");
        if (!user_role.toString().equals("admin")) {
            return myJsonResponse.make403Resp(MyJsonResponse.default_403_response);
        }
        List<String> distinctMachineName = machineMapper.getDistinctMachineName();
        ArrayList<JSONObject> ret = new ArrayList<>();
        for (String machine_name : distinctMachineName) {
            Integer number = transactionRecordMapper.getCountByMachineName(machine_name);
            JSONObject _tmp = new JSONObject();
            _tmp.put("machine_name", machine_name);
            _tmp.put("number", number);
            ret.add(_tmp);
        }
        return myJsonResponse.make200Resp(MyJsonResponse.default_200_response, ret);
    }

    // 获取所有订单列表
    @GetMapping(value = "/getAllTransactionByAdmin", produces = "application/json")
    public String getAllTransactionByAdmin (HttpSession httpSession) {
        // 验证身份，只有快递员能访问接口
        Object username = httpSession.getAttribute("username");
        Object user_role = httpSession.getAttribute("user_role");
        if (!user_role.toString().equals("admin")) {
            return myJsonResponse.make403Resp(MyJsonResponse.default_403_response);
        }
        List<TransactionRecord> transactionRecord = transactionRecordMapper.getTransactionRecord();
        return myJsonResponse.make200Resp(MyJsonResponse.default_200_response, transactionRecord);
    }

    // 获取各发货地订单数量
    @GetMapping(value = "/getTransactionCountWithOfferLocation", produces = "application/json")
    public String getTransactionCountWithOfferLocation(HttpSession httpSession) {
        // 验证身份，只有快递员能访问接口
        Object username = httpSession.getAttribute("username");
        Object user_role = httpSession.getAttribute("user_role");
        if (!user_role.toString().equals("admin")) {
            return myJsonResponse.make403Resp(MyJsonResponse.default_403_response);
        }
        List<String> distinctOfferLocation = transactionRecordMapper.getDistinctOfferLocation();
        ArrayList<JSONObject> ret = new ArrayList<>();
        for (String offer_location : distinctOfferLocation) {
            Integer number = transactionRecordMapper.getTransactionCountByOfferLocation(offer_location);
            JSONObject _tmp = new JSONObject();
            _tmp.put("offer_location", offer_location);
            _tmp.put("number", number);
            ret.add(_tmp);
        }
        return myJsonResponse.make200Resp(MyJsonResponse.default_200_response, ret);
    }

    // 获取各收货地订单数量
    @GetMapping(value = "/getTransactionCountWithUserLocation", produces = "application/json")
    public String getTransactionCountWithUserLocation(HttpSession httpSession) {
        // 验证身份，只有快递员能访问接口
        Object username = httpSession.getAttribute("username");
        Object user_role = httpSession.getAttribute("user_role");
        if (!user_role.toString().equals("admin")) {
            return myJsonResponse.make403Resp(MyJsonResponse.default_403_response);
        }
        List<String> distinctUserLocation = transactionRecordMapper.getDistinctUserLocation();
        ArrayList<JSONObject> ret = new ArrayList<>();
        for (String user_location : distinctUserLocation) {
            Integer number = transactionRecordMapper.getTransactionCountByUserLocation(user_location);
            JSONObject _tmp = new JSONObject();
            _tmp.put("user_location", user_location);
            _tmp.put("number", number);
            ret.add(_tmp);
        }
        return myJsonResponse.make200Resp(MyJsonResponse.default_200_response, ret);
    }

    // 删除某个订单（根据订单编号）
    @PostMapping(value = "/deleteTransactionByTransactionMD5")
    public String deleteTransactionByTransactionMD5(@RequestParam("transaction_md5") String transaction_md5,
                                                    HttpSession httpSession) {
        // 验证身份，只有快递员能访问接口
        Object username = httpSession.getAttribute("username");
        Object user_role = httpSession.getAttribute("user_role");
        if (!user_role.toString().equals("admin")) {
            return myJsonResponse.make403Resp(MyJsonResponse.default_403_response);
        }
        Integer integer = transactionRecordMapper.deleteTransactionByTransactionMD5(transaction_md5);
        return myJsonResponse.make200Resp(MyJsonResponse.default_200_response, integer);
    }

}
