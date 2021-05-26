package com.teemo.sprinboot06mybatiscrud.controller;

import com.alibaba.fastjson.JSONObject;
import com.teemo.sprinboot06mybatiscrud.entity.*;
import com.teemo.sprinboot06mybatiscrud.mapper.*;
import com.teemo.sprinboot06mybatiscrud.utils.MyConstant;
import com.teemo.sprinboot06mybatiscrud.utils.MyJsonResponse;
import com.teemo.sprinboot06mybatiscrud.utils.MyUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

@RestController
public class UserSideController {

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

    // userSide 用户侧接口

    // machineInfo

    // 获取所有农机信息
    @GetMapping("/getAllMachineInfo")
    public String getAllMachineInfo() {
        List<Machine> allMachine = machineMapper.getAllMachine();
        return myJsonResponse.make200Resp(MyJsonResponse.default_200_response, allMachine);
    }

    // userDemand

    // 获取所有用户需求信息
    @GetMapping("/getAllUserDemand")
    public String getAllUserDemand() {
        List<UserDemand> allUserDemand = userDemandMapper.getAllUserDemand();
        return myJsonResponse.make200Resp(MyJsonResponse.default_200_response, allUserDemand);
    }

    // 获取配送city列表
    @GetMapping("/getCityList")
    public String getCityList() {
        List<String> cityList = dispatchFeeMapper.getCityList();
        return myJsonResponse.make200Resp(MyJsonResponse.default_200_response, cityList);
    }

    // 新增userDemand
    @PostMapping("/newUserDemand")
    public String newUserDemand(@RequestBody UserDemand userDemand,
                                HttpSession httpSession) {
        Object username = httpSession.getAttribute("username");
        Object user_role = httpSession.getAttribute("user_role");
        // 验证身份
        if (!user_role.toString().equals("user")) {
            return myJsonResponse.make403Resp(MyJsonResponse.default_403_response);
        }
        // 生成用户名
        userDemand.setUsername(username.toString());
        // 查询并生成machine_id
        List<Integer> machineIdByMachineName = machineMapper.getMachineIdByMachineName(userDemand.getMachine_name());
        if (machineIdByMachineName.size() == 0) {
            return myJsonResponse.make500Resp(MyJsonResponse.default_500_response, "machine_name is error");
        }
        userDemand.setMachine_id(machineIdByMachineName.get(0));
        // 生成delete_flag
        userDemand.setDelete_flag(0);
        // 生成detail_info
        userDemand.setRelease_time(new Date());
        Integer integer = userDemandMapper.insertUserDemand(userDemand);
        return myJsonResponse.make200Resp(MyJsonResponse.default_200_response, integer);
    }

    // userHome

    // 根据用户名获取自己发布的需求信息
    @GetMapping("/getUserDemandByUsername")
    public String getUserDemandByUsername(HttpSession httpSession) {
        Object username = httpSession.getAttribute("username");
        List<UserDemand> userDemandByUsername = userDemandMapper.getUserDemandByUsername(username.toString());
        return myJsonResponse.make200Resp(MyJsonResponse.default_200_response, userDemandByUsername);
    }

    // 获取订单数量（首页显示数量的数字）
    @GetMapping("/getTransactionRecordTypeNumber")
    public String getTransactionRecordCount(HttpSession httpSession) {
        Object username = httpSession.getAttribute("username");
        List<TransactionRecord> transactionRecordByUsername = transactionRecordMapper.getTransactionRecordByUsername(username.toString());
        int unHandleCount = 0;
        int dispatchingCount = 0;
        int finishedCount = 0;
        int canceledCount = 0;
        for (TransactionRecord eachTransactionRecord : transactionRecordByUsername) {
            switch (eachTransactionRecord.getStatus()) {
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

    // 根据用户名获取自己下单的全部订单
    @GetMapping("/getTransactionRecordByUsername")
    public String getTransactionRecordByUsername(HttpSession httpSession) {
        Object username = httpSession.getAttribute("username");
        List<TransactionRecord> transactionRecordByUsername = transactionRecordMapper.getTransactionRecordByUsername(username.toString());
        return myJsonResponse.make200Resp(MyJsonResponse.default_200_response, transactionRecordByUsername);
    }

    // 根据用户名获取自己下的订单，未处理订单
    @GetMapping("/getUnHandleTransactionRecordByUsername")
    public String getUnHandleTransactionRecordByUsername(HttpSession httpSession) {
        Object username = httpSession.getAttribute("username");
        List<TransactionRecord> unHandleTransactionRecordByUsername = transactionRecordMapper.getUnHandleTransactionRecordByUsername(username.toString());
        return myJsonResponse.make200Resp(MyJsonResponse.default_200_response, unHandleTransactionRecordByUsername);
    }

    // 根据用户名获取自己下的订单，正配送订单
    @GetMapping("/getDispatchingTransactionRecordByUsername")
    public String getDispatchingTransactionRecordByUsername(HttpSession httpSession) {
        Object username = httpSession.getAttribute("username");
        List<TransactionRecord> dispatchingTransactionRecordByUsername = transactionRecordMapper.getDispatchingTransactionRecordByUsername(username.toString());
        return myJsonResponse.make200Resp(MyJsonResponse.default_200_response, dispatchingTransactionRecordByUsername);
    }

    // 根据用户名获取自己下的订单，已完成订单
    @GetMapping("/getFinishedTransactionRecordByUsername")
    public String getFinishedTransactionRecordByUsername(HttpSession httpSession) {
        Object username = httpSession.getAttribute("username");
        List<TransactionRecord> finishedTransactionRecordByUsername = transactionRecordMapper.getFinishedTransactionRecordByUsername(username.toString());
        return myJsonResponse.make200Resp(MyJsonResponse.default_200_response, finishedTransactionRecordByUsername);
    }

    // 根据用户名获取自己下的订单，已取消订单
    @GetMapping("/getCanceledTransactionRecordByUsername")
    public String getCanceledTransactionRecordByUsername(HttpSession httpSession) {
        Object username = httpSession.getAttribute("username");
        List<TransactionRecord> canceledTransactionRecordByUsername = transactionRecordMapper.getCanceledTransactionRecordByUsername(username.toString());
        return myJsonResponse.make200Resp(MyJsonResponse.default_200_response, canceledTransactionRecordByUsername);
    }

    // 删除用户自己发布的需求信息
    @GetMapping("/deleteUserDemandById")
    public String deleteUserDemandById(@RequestParam("id") Integer id,
                                       HttpSession httpSession) {
        Object username = httpSession.getAttribute("username");
        List<String> usernameById = userDemandMapper.getUsernameById(id);
        if (usernameById.size() > 0) {
            String usernameInDb = usernameById.get(0);
            if (username.toString().equals(usernameInDb)) {
                Integer integer = userDemandMapper.deleteUserDemandById(id);
                return myJsonResponse.make200Resp(MyJsonResponse.default_200_response, integer);
            }
        }
        return myJsonResponse.make500Resp(MyJsonResponse.default_500_response, "param error");
    }

    // productList
    // 获取所有商品列表
    /**
     * 已经在offerSideController实现
     **/

    // 获取特定商品信息（商品详情页）
    @GetMapping("/getProductListById")
    public String getProductListById(@RequestParam("id") Integer id) {
        List<ProductList> productListById = productListMapper.getProductListById(id);
        return myJsonResponse.make200Resp(MyJsonResponse.default_200_response, productListById);
    };

    // 获取具体农机信息（商品详情页）
    @GetMapping("/getMachineById")
    public String getMachineById(@RequestParam("machineId") Integer machineId) {
        List<Machine> machineById = machineMapper.getMachineById(machineId);
        return myJsonResponse.make200Resp(MyJsonResponse.default_200_response, machineById);
    }

    // 获取两城市之间的运费（商品详情页）
    @GetMapping("/getDispatchFeeByTwoCity")
    public String getDispatchFeeByTwoCity(@RequestParam("city_start") String city_start,
                                          @RequestParam("city_end") String city_end) {
        List<DispatchFee> dispatchFeeByTwoCity = dispatchFeeMapper.getDispatchFeeByTwoCity(city_start, city_end);
        return myJsonResponse.make200Resp(MyJsonResponse.default_200_response, dispatchFeeByTwoCity);
    }

    // 获取余额（首页和结算页）
    @GetMapping("/getUserBalance")
    public String getUserBalance(HttpSession httpSession) {
        Object username = httpSession.getAttribute("username");
        List<Double> userBalanceByUsername = userMapper.getUserBalanceByUsername(username.toString());
        if (userBalanceByUsername.size() > 0) {
            return myJsonResponse.make200Resp(MyJsonResponse.default_200_response, userBalanceByUsername.get(0));
        } else {
            return myJsonResponse.make500Resp(MyJsonResponse.default_500_response, "balance error");
        }
    }

    @PostMapping("/insertTransactionRecord")
    public String insertTransactionRecord(@RequestParam("productListId") Integer productListId,
                                          @RequestParam("require_number") Integer require_number,
                                          @RequestParam("user_location") String user_location,
                                          @RequestParam("msg") String msg,
                                          HttpSession httpSession) {
        // 验证身份
        Object username = httpSession.getAttribute("username");
        Object user_role = httpSession.getAttribute("user_role");
        if (!user_role.toString().equals("user")) {
            return myJsonResponse.make403Resp(MyJsonResponse.default_403_response);
        }
        // 订单实体
        TransactionRecord transactionRecord = new TransactionRecord();
        // 查询商品信息（根据provideListId）
        List<ProductList> productListById = productListMapper.getProductListById(productListId);
        if (productListById.size() > 0) {
            ProductList productList = productListById.get(0);
            // 生成订单号 transaction_md5
            Date currentTime = new Date();
            String featureCode = String.valueOf(currentTime.getTime() + "_" + username.toString());
            String md5Digest = MyUtils.calcStringMD5(featureCode);
            transactionRecord.setTransaction_md5(md5Digest);
            transactionRecord.setOffer_username(productList.getUsername());
            transactionRecord.setUser_username(username.toString());
            transactionRecord.setMachine_name(productList.getMachine_name());
            transactionRecord.setMachine_id(productList.getMachine_id());
            transactionRecord.setUnit_price(productList.getUnit_price());
            transactionRecord.setRequire_number(require_number);
            transactionRecord.setOffer_location(productList.getLocation());
            transactionRecord.setUser_location(user_location);
            // 计算配送费
            List<DispatchFee> dispatchFeeByTwoCity = dispatchFeeMapper.getDispatchFeeByTwoCity(productList.getLocation(), user_location);
            if (dispatchFeeByTwoCity.size() <= 0) return myJsonResponse.make500Resp(MyJsonResponse.default_500_response, "user_location error");
            Double dispatch_fee = dispatchFeeByTwoCity.get(0).getDispatch_fee();
            transactionRecord.setDispatch_fee(dispatch_fee);
            // 计算总费用
            Double total_price = productList.getUnit_price() * require_number + dispatch_fee;
            transactionRecord.setTotal_price(total_price);
            transactionRecord.setMsg(msg);
            transactionRecord.setDeliver_username("");
            transactionRecord.setStatus(1);
            transactionRecord.setRelease_time(currentTime);
            // 计算余额够用吗？
            List<Double> userBalanceByUsername = userMapper.getUserBalanceByUsername(username.toString());
            if (userBalanceByUsername.size() <= 0) return myJsonResponse.make500Resp(MyJsonResponse.default_500_response, "user_balance bad");
            Double user_balance = userBalanceByUsername.get(0);
            double after_balance = user_balance - total_price;
            if (after_balance <= 0.0) return myJsonResponse.make500Resp(MyJsonResponse.default_500_response, "user_balance bad");
            Integer commitInteger = transactionRecordMapper.insertTransactionRecord(transactionRecord);
            // 扣减余额
            userMapper.updateUserBalance(username.toString(), after_balance);
            // 给商家增加余额
            List<Double> beforeOfferBalance = userMapper.getUserBalanceByUsername(transactionRecord.getOffer_username());
            if (beforeOfferBalance.size() <= 0) return myJsonResponse.make500Resp(MyJsonResponse.default_500_response, "offer balance error");
            Double afterOfferBalance = beforeOfferBalance.get(0) + transactionRecord.getDispatch_fee();
            userMapper.updateUserBalance(transactionRecord.getOffer_username(), afterOfferBalance);
            // 反馈回执
            return myJsonResponse.make200Resp(MyJsonResponse.default_200_response, transactionRecord.getTransaction_md5());
        }


        return myJsonResponse.make200Resp(MyJsonResponse.default_200_response, null);
    }
}
