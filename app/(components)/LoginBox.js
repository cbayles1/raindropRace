//import {useState} from "react";
//import {cookies} from 'next/headers';
import { revalidatePath } from "next/cache";

export default function LoginBox() {
  //const cookieStore = cookies();
  //const username = cookieStore.get('username');

  const nameLengthLimit = 20;
  
  return (
    <div className='w-full'>
      <h3 className="text-lg">We need your name before you can vote:</h3>
      <form action={signup} autoComplete="false" className="grid grid-cols-1 w-fit space-y-2">
        <input data-lpignore="true" id="username" name="username" required maxLength={nameLengthLimit} className="px-1 bg-oat"></input>
        <button type="submit" className="text-center bg-alpine px-1 text-oat rounded-xl hover:bg-midnight active:bg-alpine">Continue</button>
      </form>
    </div>
  );
}

async function signup(formData) {
  'use server';
  const username = formData.get("username");
  if (username.length > 0) {
    const res = await fetch("http://localhost:3000/api/addUser/", {method: 'POST', body: JSON.stringify({'username': username})});
    if (res.status != 200) {
      console.log("That username already exists.");
    } else {
      //cookieStore.set('username', user);
      //revalidatePath("/");
    }
  }
}