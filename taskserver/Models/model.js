const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const dataSchema = new Schema(
  {todaydetails:[{
    task: {type:String, required: false},
    tag: {type:String, required: false},
    check: {type:Boolean, default:false},
    date: {type:Date, required:false},
  }],
  tomorrowdetails:[{
    task: {type:String, required: false},
    tag: {type:String, required: false},
    check: {type:Boolean, default:false},
    date: {type:Date, required:false}
  }]

  },
  { timestamps: true }
);
module.exports = mongoose.model("data", dataSchema);
