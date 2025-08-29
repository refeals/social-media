import { createClient } from "@/utils/supabase/client"

export async function createPost(content: string) {
  const supabase = await createClient()

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()
  const userId = user?.id

  if (userError) {
    return {
      error: userError.message,
    }
  }

  const { error } = await supabase.from("posts").insert({
    content,
    user_id: userId,
  })

  return {
    error: error?.message,
  }
}
