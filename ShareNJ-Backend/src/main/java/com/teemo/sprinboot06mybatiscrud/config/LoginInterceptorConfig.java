package com.teemo.sprinboot06mybatiscrud.config;

import com.teemo.sprinboot06mybatiscrud.component.LoginHandlerInterceptor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurationSupport;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class LoginInterceptorConfig extends WebMvcConfigurationSupport {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        //添加资源映射
        registry.addResourceHandler("/static/**").addResourceLocations("classpath:/static/");
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new LoginHandlerInterceptor())
                .addPathPatterns("/**")
                .excludePathPatterns("/hello", "/getLoginStatus", "/login", "/permission_denied", "/registered", "/static/**");
    }

}
