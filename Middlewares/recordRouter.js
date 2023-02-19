const express = require("express")
const fs = require("fs")

const recordLogger = (req,res,next)=>{
    const D = new Date()
    const date = D.toString()
    
if(req.method=="PATCH"){
    const id = req.params.id
    const record = fs.appendFileSync("routesLogger.txt", `The method used on ${id} is ${req.method} | ${date} \n`)
    next()
}
else if(req.method=="DELETE"){
    const id = req.params.id
    const record = fs.appendFileSync("routesLogger.txt", `The method used on ${id} is ${req.method} | ${date} \n`)
    next()
}
else{
    const record = fs.appendFileSync("routesLogger.txt", `The method used is ${req.method} | ${date} \n`)
    next()
}
}

module.exports = {
    recordLogger
}