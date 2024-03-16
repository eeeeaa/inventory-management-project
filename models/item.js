const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  name: { type: String, required: true, maxLength: 100 },
  description: { type: String, required: true },
  category_id: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  price: { type: Number, min: 0 },
  quantity: { type: Number, min: 0 },
});

ItemSchema.virtual("url").get(function () {
  return `/inventory/item/${this._id}`;
});

module.exports = mongoose.model("Item", ItemSchema);
