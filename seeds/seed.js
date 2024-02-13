const sequelize = require("../config/connection");

const {User, Post, Comment} = require("../models");

// repeated pattern below:

// My plant-themed users, comments, and reactions. Of course.

const userData = [
  {
    username: "plantMom",
    password: "123456789"
  },
  {
    username: "plantdad",
    password: "ILoveMyPlants"
  },
  {
    username: "plantGMa",
    password: "password123"
  },
  {
    username: "plantbro",
    password: "asdsbj2ds2"
  },
  {
    username: "plantsis",
    password: "123456789"
  },
  {
    username: "plantCuz",
    password: "123456789"
  }
]

async function seedUsers() {
  return await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true
  });
}
console.log("🌱🌱🌱🌱🌱🌱🌱🌱🌱🌱🌱 User Seed Data 🌱🌱🌱🌱🌱🌱🌱🌱🌱🌱🌱🌱🌱🌱")
seedUsers();
console.table(userData);

function randomCreatorId() {
  // merely a random integer in the bounds of the userData array
  return Math.floor(Math.random() * userData.length);
}

const postData = [
  {
    post_title: "For the Love of God - Stop Spraying Insecticides",
    post_content: `Insect populations everywhere are on the decline. The world we live in\n
simply cannot exist without insects. Plus bees are adorable and they feed us!!`,
    creator_id: randomCreatorId()
  },
  {
    post_title: "Plants Are Cooler Than You",
    post_content: "Because I said so",
    creator_id: randomCreatorId()
  },
  {
    post_title: "Plant Natives!!!",
    post_content: "Native plants are so beneficial for our native fauna",
    creator_id: randomCreatorId()
  },
  {
    post_title: "Don't mow your lawn so short",
    post_content: "Unless you live in the deep south you do NOT have to mow your lawn twice a week",
    creator_id: randomCreatorId()
  }
]

async function seedPosts() {
  return await Post.bulkCreate(postData);
}

console.log("🌱🌱🌱🌱🌱🌱🌱🌱🌱🌱🌱 Post Seed Data 🌱🌱🌱🌱🌱🌱🌱🌱🌱🌱🌱🌱🌱🌱")
seedPosts();
// Trim to the first 12 chars of post title/content so console isn't swamped
console.table(postData.map(
  (post) => {
    post.post_title = post.post_title.substring(0, 12) + "..."
    post.post_content = post.post_content.substring(0, 12) + "..."
    return post;
  }
));

// seeding comments is more complicated than the other two since
// we kind of expect comments to come from users other than the
// poster

const comments = [
  "Awesome!", "thanks for sharing", "I disagree",
  "soooo trueee", "you don't know what you're talking about"
];

function randomPostId() {
  // merely a random integer in the bounds of the postData array
  return Math.floor(Math.random() * postData.length);
}

let commentsData = [];

for (const post of postData) {
  const post_creator_id = post.creator_id;
  do {
    creator_id = randomCreatorId();
  } while (creator_id === post_creator_id)
}

function popRandomComment() {
  return comments.splice(Math.floor(Math.random()*comments.length), 1);
}

do {

} while (comments.length)

for (const comment of comments) {

  let creator_id
  do {

  }
}





























process.exit(0);
