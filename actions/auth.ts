import { createClient } from "@/utils/supabase/client"

export async function signIn({
  email,
  password,
}: {
  email: string
  password: string
}) {
  const supabase = await createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email,
    password,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    return {
      success: false,
      error: error.message,
    }
  }

  return {
    success: true,
  }
}

export async function signUp({
  email,
  password,
  fullName,
  username,
}: {
  email: string
  password: string
  fullName: string
  username: string
}) {
  const supabase = await createClient()

  // const { error } = await supabase.auth.signUp(data)
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        // This goes into the raw_user_meta_data column
        username,
        full_name: fullName,
      },
    },
  })

  if (error) {
    return {
      success: false,
      error: error.message,
    }
  }

  const { success, error: signInError } = await signIn({
    email,
    password,
  })

  if (signInError) {
    return {
      success,
      error: signInError,
    }
  }

  return {
    success,
  }
}

export async function signOut() {
  const supabase = await createClient()
  const { error } = await supabase.auth.signOut()

  if (error) {
    return {
      success: false,
      error: error.message,
    }
  }

  return {
    success: true,
    error,
  }
}
