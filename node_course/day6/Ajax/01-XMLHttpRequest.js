/* 
文档 : https://www.w3school.com.cn/xmldom/dom_http.asp

什么是 XMLHttpRequest 对象？
        XMLHttpRequest 对象用于在后台与服务器交换数据。
    作用：
        1. 在不重新加载页面的情况下更新网页
        2. 在页面已加载后从服务器请求数据
        3. 在页面已加载后从服务器接收数据
        4. 在后台向服务器发送数据  
    
    1. 创建对象
        1.1 code for IE7, Firefox, Opera, etc.
            xmlHttp=new XMLHttpRequest();
        1.2 code for IE6, IE5
            xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");    
    2. onreadystatechange
           用于绑定回调函数，当服务器响应数据后，根据 readyState 状态触发。 
    3. readyState HTTP请的状态。初始值是 0 
        
        状态   名称	                描述
        0	  Uninitialized	    初始化状态。XMLHttpRequest 对象已创建或已被 abort() 方法重置。
        1	  Open	            open() 方法已调用，但是 send() 方法未调用。请求还没有被发送。
        2	  Sent	            Send() 方法已调用，HTTP 请求已发送到 Web 服务器。未接收到响应。
        3	  Receiving	        所有响应头部都已经接收到。响应体开始接收但未完成。
        4	  Loaded	        HTTP 响应已经完全接收。  
    4. status 由服务器返回的 HTTP 状态代码，
        如 200 表示成功，而 404 表示 "Not Found" 错误。当 readyState 小于 3 的时候读取这一属性会导致一个异常。  
        4** 客户端异常。
        5** 服务器异常
    5. 获取客户端的响应
        responseText 
            获取文本信息
        responseXML(基本弃用) 
            获取的数据以 XML 格式返回    
    6. open(method, url, async, username, password)
        设置请求
            参数1 : 请求方法 get / post
            参数2 ： url
            参数3 ： false ,同步
                    true 或省略，异步。
            参数4，5 ：一般省略     
    7. send();真正向服务器发送请求。
        7.1 get 请求 
             xmlhttp.send(null); 
             get 没有请求体。
        7.2 post/put 请求
             xmlhttp.send("hero=coco&age=22"); 
             设置请求体
                xmlhttp.setRequestHeader("content-type","application/x-www-form-urlencoded");
*/