const express=require("express");
const mysql=require("mysql");

const app=express();

var dbConfig={
    host:"localhost",
    user:"root",
    password:"",
    database:"nodejs"
}

var dbcon=mysql.createConnection(dbConfig);

dbcon.connect(function(err){
    if(err)
        console.log(err.message);
    else
        console.log("Connection  successful");
})

app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));



app.get("/",function(req,res){
    res.sendFile(__dirname+"/public/pages/index.html");
})

app.get("/about",function(req,res){
    res.sendFile(__dirname+"/public/pages/About.html");
})

app.get("/help",function(req,res){
    res.sendFile(__dirname+"/public/pages/help.html");
})

app.get("/result",function(req,res){
    res.sendFile(__dirname+"/public/pages/result.html");
})

app.listen(5500,function(){
    console.log("hello");
})
app.get('/show-food',function(req,res){
    req.query.thisFood='%'+req.query.thisFood+'%';
    dbcon.query("select items.itemname,items.itemprice,thapar.location,shops.shopname,shops.vendorname from items,thapar,shops where LOWER(items.itemname) like ? and items.shopno=shops.shopno and thapar.locationno=items.locationno and items.locationno=shops.locationno order by items.itemprice",[req.query.thisFood],(err,result)=>{
        if(err)
            res.send(err.message);
        else
            res.send(result);
    })
})

app.get('/show-loc',function(req,res){
    req.query.thisLoc='%'+req.query.thisLoc+'%';
    dbcon.query("select items.itemname,items.itemprice,thapar.location,shops.shopname,shops.vendorname from items,thapar,shops where LOWER(thapar.location) like ? and thapar.locationno=shops.locationno and items.shopno=shops.shopno and items.locationno=shops.locationno order by items.itemprice",[req.query.thisLoc],(err,result)=>{
        if(err)
            res.send(err.message);
        else
            res.send(result);
    })
})

app.get('/show-shop',function(req,res){
    req.query.thisShop='%'+req.query.thisShop+'%';

    dbcon.query("select items.itemname,items.itemprice,thapar.location,shops.shopname,shops.vendorname from shops,thapar,items where LOWER(shops.shopname) like ? and items.shopno=shops.shopno and items.locationno=shops.locationno and shops.locationno=thapar.locationno order by items.itemprice",[req.query.thisShop],(err,result)=>{
        if(err)
            res.send(err.message);
        else
            res.send(result);
    })
})