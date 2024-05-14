//import {cookies} from 'next/headers';
import { revalidatePath } from "next/cache";
import Link from "next/link";

export default function LoginBox() {

  const nameLengthLimit = 20;
  
  return (
      <div id="loginForm" className="w-full grid grid-cols-1">
        <form action="http://localhost:3000/api/auth/signin/google" method="POST" className="bg-oat w-fit rounded-full hover:bg-[#c3d0c4] active:bg-oat justify-self-center">
          <input type="hidden" name="csrfToken" value="7931f6b4513ca89a8a3d0150c0239c2bd7119587869d2d5b7cbc1ac1c8d023c3"></input>
          <input type="hidden" name="callbackUrl" value="http://localhost:3000"></input>
          <button type="submit" className="button flex gap-6 p-4">
            <img alt="google sign in" loading="lazy" height="24" width="24" id="provider-logo" src="https://authjs.dev/img/providers/google.svg"></img>
            <span>Sign in with Google</span>
          </button>
        </form>
      </div>
  );
}
//style={{provider-bg: '#fff', --provider-dark-bg: #fff; --provider-color: #000; --provider-dark-color: #000; --provider-bg-hover: rgba(255, 255, 255, 0.8); --provider-dark-bg-hover: rgba(255, 255, 255, 0.8);"}}

async function login(formData) {
  'use server';
  return;
  const cookieStore = cookies();
  const username = await formData.get("username");
  const email = await formData.get("email");
  if (username.length > 0) {
    const res = await fetch("http://localhost:3000/api/addUser/", {method: 'POST', 
      body: JSON.stringify({'username': username})
    });
    if (res.status != 200) {
      console.log("Trouble logging in.");
    } else {
      const data = await res.json();
      cookieStore.set('user_id', data.user_id);
      revalidatePath("/");
    }
  }
}