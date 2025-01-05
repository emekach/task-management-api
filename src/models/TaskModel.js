const mongoose = require('mongoose');
const slugify = require('slugify');

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, 'A task must have a title'],
    },
    description: String,
    dueDate: {
      type: Date,
      required: true,
    },
    slug: String,
    status: {
      type: String,
      enum: ['pending', 'in-progress', 'completed'],
      default: 'pending',
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium',
    },
    createdBy: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
      },
    ],
    assignedTo: {
      type: String,
    },
    tags: {
      type: ['String'],
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

taskSchema.pre('save', function (next) {
  this.slug = slugify(this.title, { lower: true });

  next();
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
