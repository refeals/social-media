import { createClient } from "@/utils/supabase/server"
import { PostgrestError } from "@supabase/supabase-js"

type Post = DB["posts"]["Row"] & {
  profile: DB["profile"]["Row"]
  likes: DB["likes"]["Row"][]
}

export type PostsWithUserLikeStatus = Post & {
  user_has_liked: boolean
  like_count: number
}

type GetHomePosts = {
  posts: PostsWithUserLikeStatus[]
  error?: string
}

export async function getHomePosts(): Promise<GetHomePosts> {
  const supabase = await createClient()

  // 1. Get the current user
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()
  const userId = user?.id

  if (userError) {
    return {
      error: userError.message,
      posts: [],
    }
  }

  // 2. Get the Feed
  const { data: postsRes, error: postsError } = (await supabase
    .from("posts")
    .select(
      `
        id,
        content,
        image_url,
        created_at,
        user_id,
        profile!user_id (username, full_name, avatar_url),
        likes (id)
      `
    )
    .order("created_at", { ascending: false })
    .limit(50)) as { data: Post[] | null; error: PostgrestError | null }

  const posts = (postsRes ?? []) as Post[]

  if (postsError) {
    return {
      error: postsError.message,
      posts: [],
    }
  }

  // 3. Get the current user's liked post IDs
  const { data: userLikes, error: userLikesError } = await supabase
    .from("likes")
    .select("post_id")
    .eq("user_id", userId)

  const userLikedPostIds = new Set(
    (userLikes ?? []).map((like) => like.post_id)
  )

  if (userLikesError) {
    return {
      error: userLikesError.message,
      posts: [],
    }
  }

  // 3. Enrich the posts data with the user's like status
  const postsWithUserLikeStatus = posts.map((post) => ({
    ...post,
    user_has_liked: userLikedPostIds.has(post.id), // This adds a boolean field
    like_count: post.likes?.length || 0, // And you can add the count for convenience
  }))

  return {
    posts: postsWithUserLikeStatus,
  }
}
