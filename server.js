import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

mongoose.connect("mongodb+srv://pramodsinghthakur0591:aWAg65AGyO9U1UYZ@cluster0.bhci9is.mongodb.net/?retryWrites=true&w=majority/todoDB");

const homeSchema = new mongoose.Schema({
  work: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
  },
});
const workSchema = new mongoose.Schema({
  work: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
  },
});

const Home = mongoose.model("Home", homeSchema);
const Work = mongoose.model("Work", workSchema);

app.get("/", async (req, res) => {
  res.render("index.ejs", { work: await Home.find({}), workType: "Home" });
});

app.post("/",async (req, res) => {
  const task = req.body.task;
  const newTast = new Home({
    work: task,
    status: false,
  });
  await newTast
    .save()
    .then(() => {
    //   mongoose.connection.close();
    })
    .catch((err) => {
      console.log("something is wrong! " + err);
    });
  res.redirect("/");
});

app.get("/work", async (req, res) => {
  res.render("index.ejs", { work: await Work.find({}), workType: "Work" });
});

app.post("/work", async(req, res) => {
  const task = req.body.task;
  const newTask = new Work({
    work: task,
    status: false,
  });
  await newTask
    .save()
    .then(() => {
    //   mongoose.connection.close();
    res.redirect('/work')
    })
    .catch((err) => {
      console.log("something is wrong in saving data" + err);
      res.redirect('/work')
    });
    
});

app.post('/delete',async(req,res)=>{
    const id = Object.keys(req.body)[0]
    await Home.findByIdAndDelete({_id:id}).then(()=>{
        // console.log(Home.find({}))
        // mongoose.connection.close()
        res.redirect('/')
    }).catch((err)=>{console.log("error in deleting items")
res.redirect('/')
})
})
app.post('/work/delete',async(req,res)=>{
    const id = Object.keys(req.body)[0]
    await Work.deleteOne({_id:id}).then(()=>{
        // console.log(Work.find({}))
        // mongoose.connection.close()
        res.redirect('/work')
    }).catch((err)=>{
        console.log("something just happend wrong")
        res.redirect('/work')
    })
})


app.listen(process.env.PORT||3000, () => {
  console.log("server runing>>>");
});
