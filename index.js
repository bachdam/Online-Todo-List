import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
let newTasks = [];
let newTasksMonth = [];

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  const date = new Date();

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  let day = date.toLocaleString("en-US", options);
  console.log(day);
  res.render("index.ejs", { currentDay: day, newItems: newTasks });
});

app.post("/", (req, res) => {
  let newTask = req.body.newItem;
  newTasks.push(newTask);
  res.redirect("/");
});

app.get("/thisMonth", (req, res) => {
  res.render("thisMonth.ejs", {
    currentDay: "This month",
    newItemsMonth: newTasksMonth,
  });
});

app.post("/thisMonth", (req, res) => {
  let newTaskMonth = req.body.newItemsMonth;
  newTasksMonth.push(newTaskMonth);
  res.render("thisMonth.ejs", {
    newItemsMonth: newTasksMonth,
    currentDay: "This month",
  });
});

app.listen(port, () => {
  console.log(`>>> The website has been launched in port: ${port}`);
});
