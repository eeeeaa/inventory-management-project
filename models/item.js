const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  name: { type: String, required: true, maxLength: 100 },
  description: { type: String },
  category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  price: { type: Number, min: 0, required: true },
  quantity: {
    type: Number,
    min: 0,
    required: true,
    get: (v) => Math.round(v),
    set: (v) => Math.round(v),
  },
  imageUrl: { type: String },
});

ItemSchema.virtual("url").get(function () {
  return `/inventory/item/${this._id}`;
});

ItemSchema.virtual("price_text").get(function () {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "USD",
  }).format(this.price);
});

module.exports = mongoose.model("Item", ItemSchema);
