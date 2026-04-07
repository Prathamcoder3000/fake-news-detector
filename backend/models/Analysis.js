const mongoose = require('mongoose');

const AnalysisSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    inputText: {
      type: String,
      required: true,
    },
    source: {
      type: String,
      enum: ['text', 'url'],
      default: 'text',
    },
    result: {
      type: String,
      enum: ['Real', 'Fake', 'Error'],
      required: true,
    },
    confidence: {
      type: Number,
      min: 0,
      max: 100,
      required: true,
    },
    explanation: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Analysis', AnalysisSchema);
