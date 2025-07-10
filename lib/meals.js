import fs from "node:fs";

import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";
const db = sql("meals.db");

export async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  // throw new Error('Loading meals failed')
  return db.prepare("SELECT * FROM meals").all();
}

export async function getMeal(slug) {
  return db.prepare("SELECT * from meals where slug = ? ").get(slug);
}

export async function saveMeal(meal) {
  // 🔧 Step 1: Generate Slug & Clean Data
  const slug = slugify(meal.title, { lower: true });
  meal.slug=slug;  //This line adds a new property slug to the meal object
  meal.instructions = xss(meal.instructions);
 //Step 2: Handle Image File
  const extension = meal.image.name.split(".").pop();  //ex "jpg"
  const fileName = `${slug}.${extension}`;   //ex "chiken-biryani.jpg"
// 💾 Step 3: Save Image to public/images/
  const stream = fs.createWriteStream(`public/images/${fileName}`);
  const bufferedImage = await meal.image.arrayBuffer();

  stream.write(Buffer.from(bufferedImage), (error) => {
    if (error) {
      throw new Error("saving image failed");
    }
  });
  // 📥 Step 4: Insert Meal into DB

  meal.image = `/images/${fileName}`; // image path to store in DB

  db.prepare(`
  INSERT INTO meals (title,summary,instructions,creator,creator_email,image,slug)
  VALUES ( 
       @title,
       @summary,
       @instructions,
       @creator,
       @creator_email,
       @image,
       @slug      
  )
  `).run(meal);
}


// 📄 What Is meal.js Doing?
// This file is doing 3 major things:

// Connecting to a SQLite database (meals.db)

// Fetching meals from the database

// Saving a new meal (along with uploading an image)