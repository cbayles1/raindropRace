import HelpStuffing from "./HelpStuffing";

export default function LoginBox() {
  return (
    <div id="loginForm" className="w-full grid grid-cols-1">
      <form action={`${process.env.DOMAIN_NAME}/api/auth/signin/google`} method="POST" className="bg-oat w-fit rounded-full hover:bg-[#c3d0c4] active:bg-oat justify-self-center">
        <input type="hidden" name="csrfToken" value="7931f6b4513ca89a8a3d0150c0239c2bd7119587869d2d5b7cbc1ac1c8d023c3"></input>
        <input type="hidden" name="callbackUrl" value={`${process.env.DOMAIN_NAME}`}></input>
        <button type="submit" className="button flex gap-6 p-4">
          <img alt="google sign in" loading="lazy" height="24" width="24" id="provider-logo" src="https://authjs.dev/img/providers/google.svg"></img>
          <span>Sign in with Google</span>
        </button>
      </form>
      <div className='mt-12 max-h-32 ml-12 mr-6 mb-2 justify-self-center pt-3 px-4 pb-4 w-fit overflow-y-scroll bg-nero border-oat border-2'>
        <HelpStuffing></HelpStuffing>
      </div>
    </div>
  );
}