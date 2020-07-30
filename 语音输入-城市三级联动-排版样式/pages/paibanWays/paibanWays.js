//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    list:[
      {num:1,num1:1,num2:1,type:0},
      {num:"a",num1:"b",num2:"c",type:1},
      {num:22,num1:33,num2:44,type:0},
      {num:"按钮1",num1:"按钮2",num2:"按钮3",type:2},
      {num:"还好",num1:"hene",num2:"就是",type:0},
      {num:"j",num1:"a",num2:"a",type:1},
      {num:"chifan",num1:"拉阿鲁",num2:"enen品牌",type:0},
    ],
  },
  box:function(){
    console.log("red")
  },
  item:function(){
    console.log("green")
  },
  content:function(){
    console.log("blue")
  },
  spe:function(){
    console.log("spe")
  },
  onLoad: function () {
  },
  getUserInfo: function(e) {
   
  }
})
