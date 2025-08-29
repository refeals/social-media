// import { login, signup } from "@/actions/auth"
import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"
import { AuthForm } from "@/app/login/_sections/auth-form"

export default async function AuthPage() {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.getUser()

  if (!error && data?.user) {
    redirect("/")
  }

  return (
    // <div className="min-h-screen bg-background flex items-center justify-center p-4">
    //   <form>
    //     <label htmlFor="email">Email:</label>
    //     <input id="email" name="email" type="email" required />
    //     <label htmlFor="password">Password:</label>
    //     <input id="password" name="password" type="password" required />
    //     <button formAction={login}>Log in</button>
    //     <button formAction={signup}>Sign up</button>
    //   </form>
    // </div>
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <AuthForm />
    </div>
  )
}

// export default function AuthPage() {
//   return (
//     <div className="min-h-screen bg-background flex items-center justify-center p-4">
//       <AuthForm />
//     </div>
//   )
// }
