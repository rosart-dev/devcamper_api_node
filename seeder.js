const fs = require("fs");
const mongoose = require("mongoose");
const colors = require("colors");
const dotenv = require("dotenv");

//Load enc vars
dotenv.config({ path: "./config/config.env" });

//Load models
const BootcampModel = require("./models/Bootcamp");
const CourseModel = require("./models/Course");
const UserModel = require("./models/User");
const ReviewModel = require("./models/Review");

//Connect to DB
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

//Read JSON file
const bootcamps = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/bootcamps.json`, "utf-8")
);

const courses = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/courses.json`, "utf-8")
);

const users = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/users.json`, "utf-8")
);

const reviews = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/reviews.json`, "utf-8")
);

//Import into DB
const importData = async () => {
  try {
    await BootcampModel.create(bootcamps);
    await CourseModel.create(courses);
    await UserModel.create(users);
    await ReviewModel.create(reviews);
    console.log("Data Imported...".green.inverse);
    process.exit();
  } catch (error) {
    console.error(err);
  }
};

//Delete data
const deleteData = async () => {
  try {
    await BootcampModel.deleteMany();
    await CourseModel.deleteMany();
    await UserModel.deleteMany();
    await ReviewModel.deleteMany();
    console.log("Data Destroyed...".red.inverse);
    process.exit();
  } catch (error) {
    console.error(err);
  }
};

if (process.argv[2] === "-i") {
  importData();
} else if (process.argv[2] === "-d") {
  deleteData();
}
