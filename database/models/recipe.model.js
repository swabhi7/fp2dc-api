const { default: mongoose } = require("mongoose");

const tagSchema = mongoose.Schema({
  tagId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Tag",
  },
  type: { type: String, required: false },
  value: { type: Number, required: true },
});

const reviewSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    rating: { type: Number, required: true },
    feedback: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

const instructionSchema = mongoose.Schema({
  text: { type: String, required: true },
  imageUrl: { type: String, required: false },
});

const commentSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    text: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const recipeSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    youtubeUrl: {
      type: String,
    },
    difficulty: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    cookingTime: {
      type: Number,
      required: true,
    },
    serves: {
      type: String,
      required: true,
    },
    tags: [tagSchema],
    reviews: [reviewSchema],
    instructions: [instructionSchema],
    ingredients: {
      type: Object,
      required: true,
    },
    comments: [commentSchema],
  },
  {
    timestamps: true,
  }
);

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
