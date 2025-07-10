/* eslint-disable jsx-a11y/alt-text */
import { clearScreenDown } from "readline";
import classes from "./page.module.css";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getMeal } from "@/lib/meals";
import { title } from "process";


export async function generateMetadata({params}) {
  const meal= await getMeal(params.mealSlug);
  if(!meal){
    notFound();
  }
  return{
    title:meal.title,
    description:meal.summary,
  }
}


export default async function MealDetailsPage({ params }) {
  const meal = await getMeal(params.mealSlug);
if(!meal){
    notFound();
}


  return (
    <div className={classes.header}>
      <div className={classes.image}>
        <Image src={meal.image} fill alt="image" />
      </div>
      <div className={classes.headerText}>
        <h1>{meal.title}</h1>
        <p className={classes.creater}>
          by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
        </p>
        <p className={classes.summary}>SUMMARY</p>
      </div>
      <main>
        <p
          className={classes.instructions}
          dangerouslySetInnerHTML={{ __html: meal.instructions }}
        ></p>
      </main>
      {/* <h1>slug page</h1>
            <p>{params.slug}</p> */}
    </div>
  );
}
