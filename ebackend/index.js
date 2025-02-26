const express=require('express')
const cors=require('cors')
const app=express()
app.use(cors())
app.use(express.json())

const mongoose=require("mongoose")
const Todo = require('./module/todo')
dotenv=require("dotenv").config()


const connectDb= async()=>{
    try{
       await mongoose.connect(process.env.mongoURL)
        console.log("DB connected")
    }catch(error){
        console.log("error")
    }
   
}
connectDb()

app.get('/',(req,res)=>{
    res.send([{key:1,status:200,smg:"hey there"},{key:2,status:201,smg:"hellow dear"}])
})
app.get('/news',(req,res)=>{
    res.send([{key:1,status:200,smg:"hey there"},{key:2,status:201,smg:"hellow dear"}])
})
app.get("/todolist",async(req,res)=>{
    const  todoData=await Todo.find()
   res.send(todoData)
})

app.get("/getbyid/:id", async(req,res)=>{
    let id=req.params.id
  let data= await Todo.findById(id)
  res.send(data)
})

app.post('/addTodolist', async (req, res) => {
    try {
        console.log(req.body);
        const newtodo = new Todo(req.body);
        const savedTodo = await newtodo.save();
        res.status(201).json(savedTodo); 
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to add todo" });
    }
});


app.delete("/deleteTodolist/:id", async (req, res) => {
    try {
        let id = req.params.id;
        console.log(id);

        const deletedTodo = await Todo.findByIdAndDelete(id);

        if (deletedTodo) {
            res.json({ success: true, message: "Item deleted successfully", deletedTodo });
            console.log("Deleted:", deletedTodo);
        } else {
            res.status(404).json({ success: false, message: "Todo not found" });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to delete item" });
    }
});



app.put("/update/:id", async (req, res) => {
    try {
        let id = req.params.id;
        let updated = req.body;
        console.log(updated);

        const updatedTodo = await Todo.findByIdAndUpdate(id, updated, { new: true });

        if (updatedTodo) {
            console.log("edited", updatedTodo);
            res.status(200).json(updatedTodo); 
            console.log(updatedTodo)  
        } else {
            res.status(404).json({ success: false, message: "Todo not found" });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to update todo" });
    }
});


app.listen('8000')