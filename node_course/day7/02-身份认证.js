/* 
身份认证：
    通过一定的手段，完成用户身份的确认。
    如：手机指纹解锁，支付宝支付，快递提货码等

    常见的身份认证方案：
        1. Session (前后端不分离，服务端渲染)
        2. JWT (前后端分离)

HTTP协议的无状态性:
    概念: 每次客户端发起的 HTTP 请求是互相独立，连续多个请求之前没有直接联系
          服务器端不会主动保存每次 HTTP 请求状态。
          比如，第一次请求登录，第二个请求查询订单。服务器不知道你是否已经登录。
    案例1：如图(01-超市收银.png)
        客户1 ————> 超市收银员 <———— 客户2
        收银员只负责收银结算，不管每次是否为同一个客户。
    案例2：如图(02-会员卡.png)          
        客户1 ——出示会员卡——> 超市收银员 <———— 客户2
        收银员扫码后，确认会员卡正常，才结算打折。
    
    用户在第一次登录淘宝时，服务器发送给客户端一个标识字符串(cookie),
    用户第二次请求订单记录时，携带 cookie，服务器验证cookie 有效后，返回订单记录。

Cookie：
    存储在用户浏览器中的一段不超过 4KB 的字符串。它有名称(name)、一个值(value)和
    其它几个可选属性，如有效期，安全性，使用范围等。

    查看：F12 ————> 应用 ————> cookie

    不同域名下的 cookie 各自独立，每当客户端发起请求时，会自动把当前域名下的所有未
    过期的 cookie 一起发送给服务器。

    cookie 的几个特性：
        1. 自动发送
        2. 域名独立
        3. 过期时限
        4. 4KB 限制

    cookie 在身份认证中的作用：
        客户端在第一次请求服务器的时候，服务器通过响应头的形式，向客户端发送一个身份
        认证的cookie，客户端会把 cookie 自动保存到浏览器中。
        随后，客户端再次请求服务器，浏览器会自动讲身份认证相关的 cookie,通过请求头
        形式发送给服务器，服务器即可验证客户端身份。
    如图:03-cookie流程.png         
       
    查看百度的请求及cookie

    cookie 不具有安全性
        由于 cookie 是存储在浏览器中，而且浏览器页提供了读写 cookie 的API，因此 cookie很容易被伪造，不具有安全性。因此不建议服务器将重要的数据，通过 cookie 发送给客户端。

        如图：04-cookie不安全.png

    提供身份认证的安全性
        为了防止客户伪造会员卡，收银员在客户端出示会员卡之后，可以在收银机上刷卡认证。认证成功，才能结算打折。
        
        如图：05-提供安全性.png

    Session 的工作原理：
        如图：06-session工作原理.png
    
    在 Express 中使用 Session 认证
        1.安装中间件
            npm install express-session
        2.配置中间件
            // 导入 session 中间件
            const session require('express-session');    
            // 配置中间件
            app.use(session({
                secret: 'ok',           // 加密字符串，任意
                resave: false,          // 固定写法
                saveUninitialized: true // 固定写法
            }));
        3.向 session 中存数据
            当 express-session 中间件配置成功后，即可通过 req.session 来访问和使用 session 对象
            从而存储用户的关键信息
            实例代码：
                app.post("/api/login", (req, res) => {
                    // 判断用户提交的登录信息是否正确
                    if (req.body.username !== "admin" || req.body.password !== "000000") {
                        return res.send({ status: 1, msg: "登录失败" });
                    }

                    req.session.user = req.body; // 存储用户信息
                    req.session.isLogin = true; // 用户登录状态
                    
                    res.send({ status: 0, msg: "登录成功" });
                });    
        4.从 session 中取数据
            可以直接从 req.session 对象上获取之前存储的数据，
            示例代码：
                // 获取用户姓名的接口
                app.get("/api/username", (req, res) => {
                    // 判断用户是否登录
                    if (!req.session.isLogin) {
                        return res.send({ status: 1, msg: "fail" });
                    }

                    res.send({status: 0, msg: "success", username: req.session.user.username});
                }); 
                
        5.清空 session        
            调用 req.session.destroy() 函数，即可清空服务器保存的当前请求用户的 session 信息
            示例代码：
                // 退出登录的接口
                app.post("/api/logout", (req, res) => {
                    // 清空 Session 信息
                    req.session.destroy();
                    res.send({
                        status: 0,
                        msg: "退出登录成功",
                    });
                });        
*/
