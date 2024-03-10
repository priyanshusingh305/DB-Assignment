const mongoose = require("mongoose");
const { Schema } = mongoose;


//Product
const productSchema=new Schema({
  name:{
    type: String,
    required: true,
  },
  desc:{
    type: String
    
  },
  SKU: {
    type: String,
    required: true
},
category_id: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "ProductCategory",
  required: true,
  validate: {
      validator: async function(value) {
          const category = await mongoose.model('ProductCategory').findOne({_id: value});
          return category !== null;
      },
      message: props => `${props.value} is not a valid category ID!`
  }
},
inventory_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Inventory",
    required: true
},
price: {
    type: Number,
    required: true
},
discount_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Discount"
},
created_at: {
    type: Date,
    default: Date.now()
},
modified_at: {
    type: Date,
    default: Date.now()
},
deleted_at: {
    type: Date
}
})
//Product_Category
const productCategorySchema = new mongoose.Schema({
  name: {
      type: String,
      required: true
  },
  desc: {
      type: String
  },
  created_at: {
      type: Date,
      default: Date.now()
  },
  modified_at: {
      type: Date,
      default: Date.now()
  },
  deleted_at: {
      type: Date
  }
});

// productInventorySchema
const productInventorySchema = new mongoose.Schema({
  quantity: {
      type: Number,
      required: true
  },
  created_at: {
      type: Date,
      default: Date.now()
  },
  modified_at: {
      type: Date,
      default: Date.now()
  },
  deleted_at: {
      type: Date
  }
});

// discountSchema
const discountSchema = new mongoose.Schema({
  name: {
      type: String,
      required: true
  },
  desc: {
      type: String
  },
  discount_percent: {
      type: Number,
      required: true
  },
  active: {
      type: Boolean,
      default: true
  },
  created_at: {
      type: Date,
      default: Date.now()
  },
  modified_at: {
      type: Date,
      default: Date.now()
  },
  deleted_at: {
      type: Date
  }
});

const product = mongoose.model("product", productSchema);
const product_category = mongoose.model("product_category", productCategorySchema);
const product_inventory = mongoose.model("product_inventory", productInventorySchema);
const discount = mongoose.model("discount", discountSchema);

module.exports = {
    product,
    product_category,
    product_inventory,
    discount,
};