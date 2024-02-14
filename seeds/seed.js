const sequelize = require("../config/connection");

const {User, Post, Comment} = require("../models");

// repeated pattern below. Get a random index within the bounds of an array
function randArrIndex(arr) {
  return Math.floor(Math.random()*arr.length);
}

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

const postData = [
  {
    post_title: "For the Love of God - Stop Spraying Insecticides",
    post_content: `Insect populations everywhere are on the decline. The world we live in\n
simply cannot exist without insects. Plus bees are adorable and they feed us!!`,
    creator_id: randArrIndex(userData)
  },
  {
    post_title: "Plants Are Cooler Than You",
    post_content: "Because I said so",
    creator_id: randArrIndex(userData)
  },
  {
    post_title: "Plant Natives!!!",
    post_content: "Native plants are so beneficial for our native fauna",
    creator_id: randArrIndex(userData)
  },
  {
    post_title: "Don't mow your lawn so short",
    post_content: "Unless you live in the deep south you do NOT have to mow your lawn twice a week",
    creator_id: randArrIndex(userData)
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

let commentsData = [];

do {
  const randComment = comments.splice(randArrIndex(comments), 1)[0];
  // this instance of creator_id pertains to the comment not the post
  let post_id = 0
  let creator_id = 0;
  do {
    post_id = postData[randArrIndex(postData)].creator_id;
    creator_id = randArrIndex(userData);
  } while (post_id === creator_id)
  commentsData.push({
    comment: randComment,
    // below id's should never be equal -- i.e. poster =/= commenter
    creator_id: creator_id,
    post_id: post_id
  })
} while (comments.length)

async function seedComments() {
  return await Comment.bulkCreate(commentsData);
}

console.log("🌱🌱🌱🌱🌱🌱🌱🌱🌱🌱🌱 Comment Seed Data 🌱🌱🌱🌱🌱🌱🌱🌱🌱🌱🌱🌱🌱🌱")
seedComments();
console.table(commentsData);




























process.exit(0);
