const express = require ("express");
const app = express(); 
const bodyParser = require ("body-parser");
const { urlencoded } = require("body-parser");
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/pedidos",{useNewUrlParser:true,useUnifiedTopology:true});
const cors = require ("cors")
app.use (cors());
const pedidosModel = require("./pedidos");
const pedido = mongoose.model("Pedidos",pedidosModel);

const jwt = require("jsonwebtoken");
const JWTSecret = "jjkjsjdssllldldsdsdjdksjkdsjhjhjhllhjls";

function auth(req,res,next){
    const authToken = req.headers['authorization']
    
    if(authToken != undefined){
    
        const bearer = authToken.split(' ');
        var token = bearer[1];
    
        jwt.verify(token,JWTSecret,(err, data) => {
            if(err){
                res.status(401);
                res.json({err:"Token inválido!"});
            }else{
    
                req.token = token;
                req.loggedUser = {id: data.id,email: data.email};               
                next();
            }
        });
    }else{
        res.status(401);
        res.json({err:"Token inválido!"});
    } 
    }

app.use (bodyParser.urlencoded({extended:false}));
app.use (bodyParser.json());


app.get("/pedidos",auth,(req , res)=>{
    res.statusCode = 200;



    pedido.find({}).then(pedido =>{
        res.json(pedido);
        }).catch(err =>{
            console.log(err)
        })

    
});

    app.get("/pedidos/:id",auth,(req,res)=>{
        if(isNaN(req.params.id)){
            res.sendStatus(400)
        }else{
           var id = parseInt(req.params.id);
        
           var pedido = 
           Pedido.find({}).then(pedidos =>{
               res.json(pedidos);
               }).catch(err =>{
                   console.log(err)
               }).find(g =>g.id == id);
        
        
           if(pedido !=undefined){
               res.json(pedido);
           }else{
               res.sendStatus(404);
           }}
        }); 


    app.post("/pedidos",auth,(req,res)=>{
        var {id,idMesa,itensPedido,status} = req.body;
        const PedidoParaInserir = new pedido ({
        
            id: id,    
            idMesa: idMesa,
            itensPedido: itensPedido,
            status: status
        
        });
        
    PedidoParaInserir.save();
    
    res.sendStatus(200);
    })
    
    app.delete("/pedidos/:idFunc",auth,(req,res)=>{
    
        pedido.findByIdAndDelete(req.params.idFunc).then(MeuPedido=>{
            res.statusCode = 200;
            res.json("pedido excluido");
            console.log("dado removido")
        }).catch(err =>{
            console.log(err)
        });
        
        })

        app.put("/pedidos/:idFunc",auth,(req,res) => {

           
            var {id,idMesa,itensPedido,status} = req.body;
            const PedidoParaInserir = pedido ({
            
                id: id,    
                idMesa: idMesa,
                itensPedido: itensPedido,
                status: status
            
            });
           
            pedido.findByIdAndUpdate(req.body.idFunc,{ id: "eu",idMesa: "eu",itensPedido: "eu",status: "eu"}).then(MeuPedido=>{
                console.log("atualizado");
                res.statusCode = 200;
                res.json("ok")
            }).catch((err)=>{
                console.log(err)
            })
           

        });
    

        app.post("/auth",(req,res)=>{
            var {id, idMesa} = req.body;
    
            if(id != undefined){
        
                var user = pedido.find(u => u.email == email);


                jwt.sign({id: 10, idMesa: "oi"},JWTSecret,{expiresIn:'48h'},(err, token) => {
                    if(err){
                        res.status(400);
                        res.json({err:"Falha interna"});
                    }else{
                        res.status(200);
                        res.json({token: token});
                    }
                })

               
        
            }else{
                res.status(400);
                res.send({err: "O id da mesa enviado é inválido"});
            }
        })
   
app.listen(9090,()=>{
console.log("api rodando")
});