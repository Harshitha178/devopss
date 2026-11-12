const exp=require("express");
const app=exp();
app.use(exp.json());
let students=[{
    id:1,name:"Rasagna",course:"CSE"
},
{id:2,name:"Pranavi",course:"ECE"
}];
app.get("/students",(req,res)=>{
    res.status(200).send(students)});
app.get("/students/:id",(req,res)=>{
    let id=req.params.id;
    if(!Number(id)){   res.status(400).send({message:"Invalid id"});}
    const index=students.findIndex((s)=>s.id==id);
    if(index==-1){res.status(404).send({message:"Student not found"});}
    res.status(200).send(students[index]);
});
app.post("/students",(req,res)=>{
    let student=req.body;
    if(!student.name || !student.course){
        res.status(400).send({message:"Invalid student data"});
    }
    student.id=students.length+1;
    students.push(student);
    res.status(201).send(student);
});
app.patch("/students/:id",(req,res)=>{
    let id=req.params.id;
    if(!Number(id)){res.status(400).send({message:"Invalid id"});}
    const index=students.findIndex((s)=>s.id==id);
    if(index==-1){res.status(404).send({message:"Student not found"});}
    students[index]={...students[index],...req.body};
    res.status(200).send(students[index]);
});
app.delete("/students/:id",(req,res)=>{
    let id=req.params.id;
    if(!Number(id)){res.status(400).send({message:"Invalid id"});}
    const index=students.findIndex((s)=>s.id==id);
    if(index==-1){res.status(404).send({message:"Student not found"});}
    students.splice(index,1);
    res.status(200).send({students});
});
app.listen(3000,()=>console.log("Server is running on port 3000"));