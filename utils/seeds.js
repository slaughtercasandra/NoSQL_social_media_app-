const mongoose = require('mongoose');
const User = require('../models/User');
const Thought = require('../models/Thought');
//const Reaction = require('../models/Reaction');

// Connect to the database
mongoose.connect('mongodb://localhost:27017/socialNetworkDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

const seedUsers = [
  {
    username: 'ladyw',
    email: 'ladyw@gmail.com'
  },
  {
    username: 'mjordan',
    email: 'mjordan@gmail.com'
  },
  {
    username: 'lbird',
    email: 'lbird@gmail.com'
  }
];

const seedThoughts = [
  {
    thoughtText: 'Here is a cool thought...',
    username: 'ladyw',
  },
  {
    thoughtText: 'Another really great thought...',
    username: 'mjordan',
  },
  {
    thoughtText: 'And yet another fantastic thought...',
    username: 'lbird',
  }
];

const seedReactions = [
  {
    reactionBody: 'This is a great reaction!',
    username: 'ladyw'
  },
  {
    reactionBody: 'Love this thought!',
    username: 'mjordan'
  },
  {
    reactionBody: 'Wow, so insightful!',
    username: 'lbird'
  }
];

const seedDB = async () => {
  try {
   
    await User.deleteMany({});
    await Thought.deleteMany({});
  

    const users = await User.insertMany(seedUsers);


    for (let i = 0; i < seedThoughts.length; i++) {
      const thought = await Thought.create({
        ...seedThoughts[i],
        username: users[i].username,
      });

      users[i].thoughts.push(thought._id);
    }

    await Promise.all(users.map(user => user.save()));

    for (let i = 0; i < seedReactions.length; i++) {
      const thought = await Thought.findOne({ username: seedThoughts[i].username });
      if (thought) {
        thought.reactions.push(seedReactions[i]); 
        await thought.save();
      }
    }

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding database:', err);
    process.exit(1);
  }
};

seedDB();