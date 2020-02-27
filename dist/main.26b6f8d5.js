// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"epB2":[function(require,module,exports) {
//searchTop的tab栏
$(function () {
  //存放 form的action属性 和 input的name属性
  var searchValue = [{
    search: "http://www.baidu.com/s",
    name: "wd"
  }, {
    search: "http://www.google.com.hk/search",
    name: "q"
  }, {
    search: "http://weixin.sogou.com/weixin",
    name: "type=2&amp;query"
  }, {
    search: "https://www.zhihu.com/search",
    name: "type=content&amp;q"
  }, {
    search: "https://search.bilibili.com/all",
    name: "keyword"
  }];
  /*<li data-dec="百度一下" data-s="http://www.baidu.com/s?  wd=" class="current">
  <li data-dec="科学上网" data-s="http://www.google.com.hk/search?  q="><span style="color:#4285F4">G</span><span style="color:#EA4335">o</span><span style="color:#FBBC05">o</span><span style="color:#4285F4">g</span><span style="color:#44A759">l</span><span style="color:#EA4335">e</span></li>
  <li data-dec="微信搜索：搜索微信文章" data-s="http://weixin.sogou.com/weixin?  type=2&amp;query="><span style="color:">微信</span></li>
  <li data-dec="知乎问答搜索" data-s="https://www.zhihu.com/search?  type=content&amp;q="><span style="color:">知乎</span></li><li data-dec="图片搜索" data-s="http://huaban.com/search/?q="><span style="color:#EE4A57">花瓣</span></li>
  <li data-dec="B站搜索" data-s="https://search.bilibili.com/all?  keyword="><span style="color:">B站</span></li>
  */
  //1.点击tab，tab添加current类，其他兄弟移除类
  //searchBox的tab栏

  $(".searchTopWapper .searchValue").click(function () {
    //链式操作，获取元素的兄弟元素
    $(this).addClass("current").siblings().removeClass("current"); //2.点击的同时，得到相应索引号

    var index = $(this).index(); //console.log(index);
    //console.log(searchValue[index].search); 
    //3.将对应的input值加入

    $(".searchBox").attr("action", searchValue[index].search);
    $(".searchBox > input").attr("action", searchValue[index].name); //console.log($(".searchBox"));
  });
}); //navList的tab栏

$(function () {
  //1.点击tab，tab添加current类，其他兄弟移除类
  $(".navTabsWarpper .navTab").click(function () {
    //链式操作，获取元素的兄弟元素
    $(this).addClass("current").siblings().removeClass("current"); //2.点击的同时，得到相应索引号

    var index = $(this).index(); //console.log(index);
    //3.显示对应索引号的tab内容

    $(".navList .navContent").eq(index).attr("style", "display:flex;").siblings().attr("style", "display:none;");
  });
});
$(function () {
  var $linklist = $(".linkListWapper");
  var x = localStorage.getItem("x");
  var xObject = JSON.parse(x);
  var hashMap = xObject || [{
    index: 0,
    url: "https://mail.163.com/",
    logo: "M",
    name: "163邮箱"
  }, {
    index: 1,
    url: "https://search.chongbuluo.com/",
    logo: "C",
    name: "虫部落搜索"
  }, {
    index: 2,
    url: "https://www.jiumodiary.com/",
    logo: "J",
    name: "鸠摩搜索"
  }, {
    index: 3,
    url: "https://github.com/",
    logo: "G",
    name: "github"
  }, {
    index: 4,
    url: "https://www.csdn.net/",
    logo: "C",
    name: "CSDN"
  }, {
    index: 5,
    url: "https://www.cnblogs.com/",
    logo: "C",
    name: "博客园"
  }, {
    index: 6,
    url: "https://juejin.im/",
    logo: "J",
    name: "掘金"
  }, {
    index: 7,
    url: "https://segmentfault.com/",
    logo: "S",
    name: "segmentfault"
  }, {
    index: 8,
    url: "https://css-tricks.com/",
    logo: "C",
    name: "css-tricks"
  }, {
    index: 9,
    url: "https://cloud.tencent.com/developer",
    logo: "C",
    name: "腾讯云社区"
  }, {
    index: 10,
    url: "https://developer.mozilla.org/zh-CN/docs/Web",
    logo: "M",
    name: "MDN"
  }, {
    index: 11,
    url: "https://www.runoob.com/",
    logo: "R",
    name: "菜鸟教程"
  }, {
    index: 12,
    url: "https://www.bilibili.com",
    logo: "B",
    name: "BiliBili"
  }];

  var render = function render() {
    console.log("hashmapindex"); //1.每次渲染前都要更新list的index,这一步在forEach中可以完成   
    //for(let i=0;i<hashMap.length;i++){
    //console.log("hi");
    //    hashMap[i].index = i;
    //}

    console.log("remove"); //2.移除父级元素的子元素

    $linklist.find("li:not(.addFav)").remove();
    console.log("insert"); //3.遍历hashMap，依次将节点添加到父元素中

    hashMap.forEach(function (node, index) {
      var $li = $("<li class=\"link\" >\n            <div class=\"remove\"><div class=\"re1\"></div><div class=\"re2\"></div></div>\n            <div class=\"linkWrapper\"><div class=\"linkLogo\">".concat(node.logo, "</div>\n            <div class=\"linkName\">").concat(node.name, "</div></div></li>\n            ")).insertBefore($(".addFav")); //4.不能连续删除页面，所以只能先刷新解决
      //window.location.reload(); 

      $li.on("click", function () {
        window.open(node.url); //因为a标签的面积太大，所以改用click事件，打开新窗口
      });
      $li.on("click", ".remove", function (e) {
        e.stopPropagation(); //阻止冒泡，但是没啥用啊

        hashMap.splice(index, 1);
        render();
        savehash();
      });
    });
  };

  render();

  var savehash = function savehash() {
    var string = JSON.stringify(hashMap);
    localStorage.setItem("x", string);
    console.log("save");
    console.log(xObject);
  };

  var simplify = function simplify(url) {
    return url.replace("https://", "").replace("http://", "").replace("www.").replace(/\/.*/, ""); //删除/开头的内容;
  };

  $(".addFav").on("click", function () {
    var url = window.prompt("要保存的常用网站：");

    if (url.indexOf("http") !== 0) {
      url = "https://" + url;
    }

    var index = hashMap.length - 1;
    hashMap.push({
      index: index,
      url: url,
      logo: simplify(url)[0].toUpperCase(),
      name: simplify(url)
    }); //.toUpperCase()是jQuery的函数

    console.log(hashMap);
    savehash();
    render();
  });
  /* 第一版，写在了render外面，但是在render里面就能完成，还少了遍历数组的过程
    $(".link").on("click",".remove",(e)=>{
        e.stopPropagation();
        //阻止冒泡，但是没啥用啊
        //render();
        console.log("hi");
        for(let i=0;i<hashMap.length;i++){
            //console.log("hi");
            hashMap[i].index = i;
        }
         //1.获得点击的元素的index
        const index = $(this).parent().index();
        console.log(index);
        console.log(hashMap[index]);
        //$(this).parent().eq(index).remove();
        hashMap.splice(index, 1);
        for(let i=0;i<hashMap.length;i++){
            //console.log("hi");
            hashMap[i].index = i;
        }
        //$(this).parent().hide;
        console.log(index);
        console.log(hashMap[index]);
        //console.log(hashMap);
        /*2.删除hashMap中的对应元素
        //hashMap.splice(index, 1);
        //render();
        for(let i=0;i<hashMap.length;i++){
            //console.log("hi");
            hashMap[i].index = i;
        }
        console.log(hashMap);
        
        //4.重新渲染hashMap
        render();
        window.location.reload(); 
        //3.保存hashMap
        savehash();
        //4.不能连续删除页面，所以只能先刷新解决,先加在render里面了
        window.location.reload(); 
    });
  */

  /*
  //修改移动端的hover效果,但是没用
  $(function(){
    $(".navTab").on("swipe",(e)=>{
        $(this).attr("style","color:rgba(64,104,167,0.8);")
    });
    $(".searchValue").on("swipe",(e)=>{
      $(this).attr("style","color:#4068A7;background:rgba(255, 255, 2555, 0.6);")
    });
    $(".searchBox > button").on("swipe",(e)=>{
      $(this).attr("style","color:rgba(245, 246, 248, 0.945);")
    });
    $(".link").on("swipe",".remove",(e)=>{
      $(this).attr("style","opacity: 1;")
    });
  })
  */
});
},{}]},{},["epB2"], null)
//# sourceMappingURL=main.26b6f8d5.js.map