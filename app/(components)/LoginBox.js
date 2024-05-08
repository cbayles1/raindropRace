'use client'
import {useState} from "react";
import {cookies} from 'next/headers';

export default function LoginBox() {
  const cookieStore = cookies();
  //const username = cookieStore.get('username');

  const nameLengthLimit = 20;
  const [user, setUser] = useState("");
  
  return (
    <div className='w-full'>
      <h3 className="text-lg">We need your name before you can vote:</h3>
      <form className="grid grid-cols-1 w-fit space-y-2">
        <input id="username" name="username" required maxLength={nameLengthLimit} className="px-1 bg-oat" onChange={(inputElement) => {
          setUser(inputElement.target.value.trim());
        }}></input>
        <button onClick={async (event) => {
          if (user.length > 0) {
            event.preventDefault(); // we want to replace the default submit behavior
            const res = await fetch("http://localhost:3000/api/addUser/", {method: 'POST', body: JSON.stringify({'username': user})});
            if (res.status != 200) {
              alert("That username already exists.");
            } else {
              cookieStore.set('username', user);
            }
          }
        }} className="text-center bg-alpine px-1 text-oat rounded-xl hover:bg-midnight active:bg-alpine">Continue</button>
      </form>
    </div>
  );
}