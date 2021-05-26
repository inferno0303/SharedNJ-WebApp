/**
 * 这里配置 API 请求的地址，按开发环境/生产环境配置 API 请求地址
 */

const NODE_ENV = process.env.NODE_ENV;
let API = window.location.origin;
if (NODE_ENV === 'development') {
    API = "http://localhost:8081";
}

// 如果上线后，前后端不运行在同一个端口中，那么手动更改端口号
// API = window.location.origin.replace(":8000", ":8081");

export { API }

