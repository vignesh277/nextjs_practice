'use client'
import { useFormState } from 'react-dom';

import ImagePicker from '@/components/meals/image-picker';
import classes from './page.module.css';
import { title } from 'process';
import { shareMeal } from '@/lib/actions';
import MealsFormSubmit from '@/components/meals/meals-form-submit';
import { useActionState } from 'react';


export default function ShareMealPage() {
const [state,formAction]=useActionState(shareMeal,{message:null});

  return (
    <>
      <header className={classes.header}>
        <h1>
          Share your <span className={classes.highlight}>favorite meal</span>
        </h1>
        <p>Or any other meal you feel needs sharing!</p>
      </header>
      <main className={classes.main}>
        <form className={classes.form} action={formAction}>
          <div className={classes.row}>
            <p>
              <label htmlFor="name">Your name</label>
              <input type="text" id="name" name="name" required />
            </p>
            <p>
              <label htmlFor="email">Your email</label>
              <input type="email" id="email" name="email"  />
            </p>
          </div>
          <p>
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" required />
          </p>
          <p>
            <label htmlFor="summary">Short Summary</label>
            <input type="text" id="summary" name="summary" required />
          </p>
          <p>
            <label htmlFor="instructions">Instructions</label>
            <textarea
              id="instructions"
              name="instructions"
              rows="10"
              required
            ></textarea>
          </p>
    <ImagePicker label="your image" name="image"/>
  {state.message&&  <p>{state.message}</p>}
          <p className={classes.actions}>
            <MealsFormSubmit ></MealsFormSubmit>
          </p>
        </form>
      </main>
    </>
  );
}


// 🧾 Summary:
// The ShareMealPage component renders a form that allows users to:

// ✅ Enter their name and email

// ✅ Give the title and summary of a meal

// ✅ Write instructions (how to cook it)

// ✅ Upload an image using <ImagePicker />

// ✅ Submit the form

// When the form is submitted, it calls the server action:

// action={shareMeal} -- this line
// This sends the data to the backend function (shareMeal) which:

// Saves the image to disk

// Sanitizes input

// Inserts the meal data into the SQLite database