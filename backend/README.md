# TSS Backend



## 代码结构

* top: 记录整个项目路由，路由到各个的子项目
* authentication 实现用户信息管理和认证


## 数据库
  sqlite3

## JWT验证
```
  <root>/api/get_token   获取 JWT token
  <root>/api/refresh_token  刷新JWT 
  <root>/api/is_token_valid  验证JWT
  目前处于开发阶段所以仅开启login时获取JWT，如想开启JWT验证在top.setting中设置如下即可
  
  REST_FRAMEWORK = {
    'PAGE_SIZE': 10,

    # 设置所有接口都需要被验证
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticated',
    ),
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_jwt.authentication.JSONWebTokenAuthentication',
        
    ),
}
```

## 权限管理
  详见接口说明
  
## 日志管理
  储存在log文件夹下
  
