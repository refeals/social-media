import { getHomePosts } from "@/actions/posts"
import { HomeFeed } from "@/components/home-feed"

export default async function HomePageFeed() {
  const { posts, error } = await getHomePosts()

  if (error) {
    return <div>Error: {error}</div>
  }

  return <HomeFeed posts={posts} />
}
