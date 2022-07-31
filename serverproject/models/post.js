const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let postSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  link: { type: String, required: true },
  company:{type:String,required:true},

  startTime: {type:[Number],required:true},
  endTime:{type:[Number],required:true},
  pages: { type: [String], required: true },
  isTopPage:{type:[Boolean]},

  image:{type:Object},

  comments: { type: String },
  likes: { type: Number },
  date: Date,
  created_at: Date,
 
});

postSchema.index({ createdAt: 1 }, { expires: "2880m" })

module.exports = mongoose.model('Post', postSchema);

