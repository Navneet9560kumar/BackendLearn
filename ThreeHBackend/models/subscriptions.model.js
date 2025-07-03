import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
name:{
      type: String,
      required: [true, 'Subscription name is required'],
      trim: true,
      minLength: 2,
      maxLength: 50
},
price:{
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price must be a positive number']
},
currency:{
      type: String,
      required: [true, 'Currency is required'],
      enum: ['USD', 'EUR', 'GBP'],
      default: 'USD'
},
frequency:{
      type: String,
      required: [true, 'Frequency is required'],
      enum: ['monthly', 'yearly'],
     
},
category:{
      type:String,
      enum: ['sports','name', 'entertainment', 'education','liststyle','technology', 'finance', 'politics', 'other'],
      required:true,
}, paymentMethod:{
      type: String,
      required: true,
      trim: true,
},
status:{
      type: String,
      enum: ['active', 'inactive', 'cancelled'],
      default: 'active'
}, startDate:{
      type:Date,
      required:true,
      validate: {
              validator:(value) => value <= new Date(),
              message: 'start date must be in the past',
      }
},
  renewalDate:{
      type:Date,
   
      validate: {
            validator: function (value) {
                  return value > this.startDate;
            },
            message: 'Start date must be in the past',
      }
  }, 
  user:{
      type: mongoose.Schema.type.ObjectId,
      ref: 'user',
      required:true,
      index: true,
  }
}, {timestamps: true });

subscriptionSchema.pre('save', function(next){
      if(!this.renewalDate){
            const renewalPeriods = {
                  daily: 1,
                  weekly: 7,
                  monthly: 30,
                  yearly: 365,
            };
            this.renewalDate = new Date(this.startDate);
            this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriods[this.frequency]);
      }

      // Auto update  the status;
      if(this.renewalDate< new Date()){
            this.status = 'expired';
      }

      next();
})


const subscriptions= mongoose.model('Subscription', subscriptionSchema);

expport default subscriptions;