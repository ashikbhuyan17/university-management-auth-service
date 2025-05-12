// Schemas মূলত একটি নকশা বা কাঠামো (blueprint), যা বলে দেয় কোনো ডেটাবেজে কী ধরনের ডেটা থাকবে,
// কী নিয়মে থাকবে, এবং কোন কোন ফিল্ড বাধ্যতামূলক বা ঐচ্ছিক।
const mongoose = require('mongoose')
// ✅ ১. Nested Sub-Schema (আরও জটিল Address Schema)
const geoSchema = new mongoose.Schema(
  {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  { _id: false }
)

const addressSchema = new mongoose.Schema(
  {
    street: String,
    city: String,
    postalCode: String,
    geo: geoSchema, // Address এর ভিতরে geo object
  },
  { _id: false }
)

// ✅ ২. Embedded Document: Social Profile Schema
const socialProfileSchema = new mongoose.Schema(
  {
    platform: {
      type: String,
      enum: ['facebook', 'twitter', 'linkedin', 'github'],
    },
    username: String,
    url: String,
  },
  { _id: false }
)

// ✅ ৩. Main User Schema
const userSchema = new mongoose.Schema(
  {
    name: {
      //         কেন type ব্যবহার করা হয়?
      // Object Structure: যখন তুমি একসাথে একাধিক ফিল্ড বা property রাখতে চাও, তখন object আকারে সেটা সাজানো সহজ হয়। যেমন,
      // তুমি address নামের একটি object রাখো, এবং তার মধ্যে street, city, postalCode রাখো।

      type: {
        firstName: {
          type: String,
          required: [true, 'প্রথম নাম আবশ্যক'],
        },
        lastName: {
          type: String,
          required: [true, 'শেষ নাম আবশ্যক'],
        },
        middleName: {
          type: String,
          required: false,
        },
      },
      required: true, // name ফিল্ড অবশ্যই থাকতে হবে
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: {
        validator: function (v) {
          return /^\S+@\S+\.\S+$/.test(v)
        },
        message: props => `${props.value} একটি বৈধ ইমেইল নয়!`,
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    role: {
      type: String,
      enum: ['admin', 'user', 'guest'], // নির্দিষ্ট মান ছাড়া অন্য কিছু রাখা যাবে না
      default: 'user',
    },
    age: {
      type: Number,
      min: [18, 'বয়স কমপক্ষে ১৮ হতে হবে'],
      max: [65, 'বয়স সর্বোচ্চ ৬৫ হতে পারে'],
    },
    hobbies: {
      type: [String], // string array
      validate: [arrayLimit, 'কমপক্ষে একটি শখ অবশ্যই থাকতে হবে'],
    },
    address: addressSchema, // nested schema
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    socialProfiles: [socialProfileSchema], // embedded array of objects
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

// ✅ Helper Function for hobbies validation
function arrayLimit(val) {
  return val.length > 0
}

// ✅ ৪. Instance Method
userSchema.methods.sayHi = function () {
  console.log(`হ্যালো, আমি ${this.name}`)
}

// ✅ ৫. Static Method
userSchema.statics.findByRole = function (role) {
  return this.find({ role })
}

// ✅ ৬. Virtual Field (সর্বনাম + বয়স)
userSchema.virtual('summary').get(function () {
  return `${this.name} (${this.age} বছর) - ${this.role}`
})

// ✅ ৭. Middleware: Pre-save (password hash বা logging করার জন্য)
userSchema.pre('save', function (next) {
  console.log('ইউজার সেভ হচ্ছে:', this.name)
  // এখানে আপনি password hash করতে পারেন bcrypt দিয়ে
  next()
})

// ✅ ৮. Middleware: Post-save
userSchema.post('save', function (doc) {
  console.log(`ইউজার সেভ সম্পন্ন: ${doc.name}`)
})

// ✅ ৯. Model তৈরি
const User = mongoose.model('User', userSchema)

// ✅ 🔄 ব্যবহার: নতুন ইউজার তৈরি ও সেভ
async function run() {
  await mongoose.connect('mongodb://127.0.0.1:27017/advancedUserDB')

  const newUser = new User({
    name: {
      firstName: 'Zaki',
      lastName: 'Hussain',
      middleName: 'Imtiaz',
    },
    email: 'zaki@example.com',
    password: 'securepass',
    age: 30,
    role: 'admin',
    hobbies: ['coding', 'music'],
    address: {
      street: '123 Main St',
      city: 'Dhaka',
      postalCode: '1216',
      geo: {
        lat: 23.8103,
        lng: 90.4125,
      },
    },
    socialProfiles: [
      {
        platform: 'github',
        username: 'zakiimtiaz',
        url: 'https://github.com/zakiimtiaz',
      },
    ],
  })

  await newUser.save() // pre ও post middleware কাজ করবে
  newUser.sayHi() // instance method
  console.log('Summary:', newUser.summary) // virtual field

  // Static method ব্যবহার
  const admins = await User.findByRole('admin')
  console.log(
    'অ্যাডমিন ইউজার:',
    admins.map(u => u.name)
  )

  await mongoose.disconnect()
}

run().catch(console.error)
