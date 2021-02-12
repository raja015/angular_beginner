module.exports = mongoose => {
  const Todo = mongoose.model(
    "todo",
    mongoose.Schema(
      {
        title: String,
        description: String,
        published: Boolean
      },
      { timestamps: true }
    )
  );

  return Todo;
};
