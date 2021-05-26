package com.teemo.sprinboot06mybatiscrud.controller;

import com.alibaba.fastjson.JSONObject;
import com.teemo.sprinboot06mybatiscrud.entity.User;
import com.teemo.sprinboot06mybatiscrud.entity.Users;
import com.teemo.sprinboot06mybatiscrud.mapper.UserMapper;
import com.teemo.sprinboot06mybatiscrud.utils.MyConstant;
import com.teemo.sprinboot06mybatiscrud.utils.MyJsonResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.Date;
import java.util.List;

@RestController
public class LoginController {

    MyJsonResponse myJsonResponse = new MyJsonResponse();

    @Autowired
    UserMapper userMapper;

    @GetMapping("/permission_denied") // 没有权限时，转发该请求
    public String permission_denied() {
        return myJsonResponse.make403Resp(MyJsonResponse.default_403_response);
    }

    @GetMapping("/getLoginStatus")
    public String getLoginStatus(HttpSession httpSession) {
        Object username = httpSession.getAttribute("username");
        Object user_role = httpSession.getAttribute("user_role");
        Object last_login = httpSession.getAttribute("last_login");
        if (username != null && user_role != null && last_login != null) {
            JSONObject retData = new JSONObject();
            retData.put("username", username);
            retData.put("user_role", user_role);
            retData.put("last_login", last_login);
            return myJsonResponse.make200Resp(MyJsonResponse.default_200_response, retData);
        } else {
            return myJsonResponse.make403Resp(MyJsonResponse.default_403_response);
        }
    }

    @PostMapping("/login")
    public String login(@RequestParam("username") String username,
                        @RequestParam("password") String password,
                        @RequestParam("user_role") String user_role,
                        HttpSession httpSession) {
        User user = new User();
        user.setUsername(username);
        user.setPassword(password);
        switch (user_role) {
            case "用户":
                user.setUser_role("user");
                break;
            case "商户":
                user.setUser_role("offer");
                break;
            case "配送员":
                user.setUser_role("deliver");
                break;
            case "管理员":
                user.setUser_role("admin");
                break;
        }
        user.setLast_login(new Date());
        List<User> userList = userMapper.login(user);
        if (userList.size() > 0) {
            userMapper.updateLastLoginTime(user);
            httpSession.setAttribute("username", userList.get(0).getUsername());
            httpSession.setAttribute("user_role", userList.get(0).getUser_role());
            httpSession.setAttribute("last_login", userList.get(0).getLast_login());
            // 返回
            JSONObject retData = new JSONObject();
            retData.put("username", userList.get(0).getUsername());
            retData.put("user_role", userList.get(0).getUser_role());
            retData.put("last_login", userList.get(0).getLast_login());
            return myJsonResponse.make200Resp(MyJsonResponse.default_200_response, retData);
        } else {
            return myJsonResponse.make403Resp(MyJsonResponse.default_403_response);
        }
    }

    @PostMapping("/logout")
    public String logout(HttpSession httpSession) {
        // 删除 session
        httpSession.invalidate();
        return myJsonResponse.make200Resp(MyJsonResponse.default_200_response, "退出登陆成功");
    }

    // 注册用户
    @PostMapping("/registered")
    public String registered(@RequestBody User user) {
        List<User> userByUsername = userMapper.getUserByUsername(user.getUsername());
        if (userByUsername.size() > 0) {
            return myJsonResponse.make500Resp(MyJsonResponse.default_500_response, "用户名重复");
        }
        if (user.getUser_role().equals("user") || user.getUser_role().equals("offer") || user.getUser_role().equals("deliver")) {
            user.setLast_login(new Date());
            user.setBalance(99999.0);
            Integer integer = userMapper.addNewUser(user);
            return myJsonResponse.make200Resp(MyJsonResponse.default_200_response, integer);
        } else return myJsonResponse.make500Resp(MyJsonResponse.default_500_response, "user_role error");
    }

}
