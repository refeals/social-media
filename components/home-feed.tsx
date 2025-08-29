"use client"

import { useState } from "react"
import {
  Heart,
  MessageCircle,
  Search,
  User,
  Share,
  Plus,
  MoreHorizontal,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ThemeToggle } from "@/components/theme-toggle"
import Link from "next/link"

interface Post {
  id: string
  userName: string
  userAvatar: string
  postText: string
  imageUrl?: string
  likeCount: number
  commentCount: number
  timeAgo: string
}

interface Comment {
  id: string
  userName: string
  userAvatar: string
  text: string
  timeAgo: string
}

const mockPosts: Post[] = [
  {
    id: "1",
    userName: "Maria Silva",
    userAvatar: "https://placehold.co/40x40/e11d48/white?text=MS",
    postText: "Que dia lindo para um café na praia! ☕🌊",
    imageUrl: "https://placehold.co/600x400/0ea5e9/white?text=Praia",
    likeCount: 24,
    commentCount: 8,
    timeAgo: "há 2h",
  },
  {
    id: "2",
    userName: "João Santos",
    userAvatar: "https://placehold.co/40x40/059669/white?text=JS",
    postText: "Acabei de terminar meu projeto! Muito feliz com o resultado 🚀",
    likeCount: 15,
    commentCount: 3,
    timeAgo: "há 4h",
  },
  {
    id: "3",
    userName: "Ana Costa",
    userAvatar: "https://placehold.co/40x40/7c3aed/white?text=AC",
    postText:
      "Alguém mais viciado em séries coreanas? Preciso de recomendações!",
    imageUrl: "https://placehold.co/600x300/dc2626/white?text=K-Drama",
    likeCount: 42,
    commentCount: 12,
    timeAgo: "há 6h",
  },
  {
    id: "4",
    userName: "Pedro Lima",
    userAvatar: "https://placehold.co/40x40/ea580c/white?text=PL",
    postText: "Treino de hoje foi intenso! 💪 Quem mais está na academia?",
    likeCount: 18,
    commentCount: 5,
    timeAgo: "há 8h",
  },
]

const mockComments: Record<string, Comment[]> = {
  "1": [
    {
      id: "c1",
      userName: "Carlos Mendes",
      userAvatar: "https://placehold.co/32x32/059669/white?text=CM",
      text: "Que vista incrível! Onde é esse lugar?",
      timeAgo: "há 1h",
    },
    {
      id: "c2",
      userName: "Lucia Santos",
      userAvatar: "https://placehold.co/32x32/7c3aed/white?text=LS",
      text: "Adorei a foto! 📸",
      timeAgo: "há 30min",
    },
  ],
  "2": [
    {
      id: "c3",
      userName: "Rafael Costa",
      userAvatar: "https://placehold.co/32x32/dc2626/white?text=RC",
      text: "Parabéns! Qual foi o projeto?",
      timeAgo: "há 2h",
    },
  ],
}

export function HomeFeed() {
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set())
  const [followedUsers, setFollowedUsers] = useState<Set<string>>(new Set())
  const [newPost, setNewPost] = useState("")
  const [selectedPost, setSelectedPost] = useState<string | null>(null)
  const [newComment, setNewComment] = useState("")
  const [comments, setComments] =
    useState<Record<string, Comment[]>>(mockComments)

  const toggleLike = (postId: string) => {
    setLikedPosts((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(postId)) {
        newSet.delete(postId)
      } else {
        newSet.add(postId)
      }
      return newSet
    })
  }

  const toggleFollow = (userName: string) => {
    setFollowedUsers((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(userName)) {
        newSet.delete(userName)
      } else {
        newSet.add(userName)
      }
      return newSet
    })
  }

  const handleShare = (post: Post) => {
    if (navigator.share) {
      navigator.share({
        title: `Post de ${post.userName}`,
        text: post.postText,
        url: window.location.href,
      })
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(
        `${post.postText} - ${window.location.href}`
      )
      // You could show a toast notification here
    }
  }

  const handleCreatePost = () => {
    if (newPost.trim()) {
      // Here you would typically send the post to your backend
      console.log("Novo post:", newPost)
      setNewPost("")
    }
  }

  const handleAddComment = (postId: string) => {
    if (newComment.trim()) {
      const comment: Comment = {
        id: `c${Date.now()}`,
        userName: "Você",
        userAvatar: "https://placehold.co/32x32/0ea5e9/white?text=U",
        text: newComment,
        timeAgo: "agora",
      }

      setComments((prev) => ({
        ...prev,
        [postId]: [...(prev[postId] || []), comment],
      }))
      setNewComment("")
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Bar */}
      <header className="sticky top-0 z-50 bg-card border-b border-border">
        <div className="max-w-2xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">
                  S
                </span>
              </div>
              <span className="font-bold text-lg text-foreground">Social</span>
            </Link>

            {/* Search Bar */}
            <div className="flex-1 max-w-md relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Buscar..."
                className="pl-10 bg-muted border-0"
              />
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="sm" className="p-2">
                    <Plus className="w-5 h-5" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Criar novo post</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <Textarea
                      placeholder="O que você está pensando?"
                      value={newPost}
                      onChange={(e) => setNewPost(e.target.value)}
                      className="min-h-[100px] resize-none"
                    />
                    <div className="flex justify-end gap-2">
                      <DialogTrigger asChild>
                        <Button variant="outline">Cancelar</Button>
                      </DialogTrigger>
                      <DialogTrigger asChild>
                        <Button
                          onClick={handleCreatePost}
                          disabled={!newPost.trim()}
                        >
                          Publicar
                        </Button>
                      </DialogTrigger>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

              {/* Dark Mode Toggle */}
              <ThemeToggle />

              {/* User Avatar */}
              <Link href="/perfil">
                <Avatar className="w-8 h-8 cursor-pointer">
                  <AvatarImage src="https://placehold.co/32x32/0ea5e9/white?text=U" />
                  <AvatarFallback>
                    <User className="w-4 h-4" />
                  </AvatarFallback>
                </Avatar>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Feed */}
      <main className="max-w-2xl mx-auto px-4 py-6">
        <div className="space-y-6">
          {mockPosts.map((post) => (
            <Card key={post.id} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Link href="/perfil">
                      <Avatar className="w-10 h-10 cursor-pointer">
                        <AvatarImage
                          src={post.userAvatar || "/placeholder.svg"}
                        />
                        <AvatarFallback>
                          {post.userName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                    </Link>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-foreground">
                          {post.userName}
                        </h3>
                        {post.userName !== "Você" && (
                          <Button
                            variant={
                              followedUsers.has(post.userName)
                                ? "secondary"
                                : "outline"
                            }
                            size="sm"
                            className="h-6 px-2 text-xs"
                            onClick={() => toggleFollow(post.userName)}
                          >
                            {followedUsers.has(post.userName)
                              ? "Seguindo"
                              : "Seguir"}
                          </Button>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {post.timeAgo}
                      </p>
                    </div>
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="p-2">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleShare(post)}>
                        Compartilhar
                      </DropdownMenuItem>
                      <DropdownMenuItem>Salvar post</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        Reportar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                {/* Post Text */}
                <p className="text-foreground mb-4 leading-relaxed">
                  {post.postText}
                </p>

                {/* Post Image */}
                {post.imageUrl && (
                  <div className="mb-4 -mx-6">
                    <img
                      src={post.imageUrl || "/placeholder.svg"}
                      alt="Post image"
                      className="w-full h-auto object-cover cursor-pointer"
                      onClick={() => {
                        // Could open image in fullscreen modal
                        console.log("Abrir imagem em tela cheia")
                      }}
                    />
                  </div>
                )}

                {/* Post Actions */}
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-6">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex items-center gap-2 text-muted-foreground hover:text-red-500 p-0"
                      onClick={() => toggleLike(post.id)}
                    >
                      <Heart
                        className={`w-5 h-5 ${
                          likedPosts.has(post.id)
                            ? "fill-red-500 text-red-500"
                            : "text-muted-foreground"
                        }`}
                      />
                      <span className="text-sm">
                        {post.likeCount + (likedPosts.has(post.id) ? 1 : 0)}
                      </span>
                    </Button>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="flex items-center gap-2 text-muted-foreground hover:text-blue-500 p-0"
                          onClick={() => setSelectedPost(post.id)}
                        >
                          <MessageCircle className="w-5 h-5" />
                          <span className="text-sm">
                            {comments[post.id]?.length || post.commentCount}
                          </span>
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>Comentários</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          {/* Existing comments */}
                          <div className="space-y-3">
                            {(comments[post.id] || []).map((comment) => (
                              <div key={comment.id} className="flex gap-3">
                                <Avatar className="w-8 h-8">
                                  <AvatarImage
                                    src={
                                      comment.userAvatar || "/placeholder.svg"
                                    }
                                  />
                                  <AvatarFallback>
                                    {comment.userName
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                  <div className="bg-muted rounded-lg px-3 py-2">
                                    <p className="font-semibold text-sm">
                                      {comment.userName}
                                    </p>
                                    <p className="text-sm">{comment.text}</p>
                                  </div>
                                  <p className="text-xs text-muted-foreground mt-1">
                                    {comment.timeAgo}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Add comment */}
                          <div className="flex gap-2 pt-4 border-t">
                            <Avatar className="w-8 h-8">
                              <AvatarImage src="https://placehold.co/32x32/0ea5e9/white?text=U" />
                              <AvatarFallback>U</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 flex gap-2">
                              <Input
                                placeholder="Escreva um comentário..."
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                onKeyPress={(e) => {
                                  if (e.key === "Enter" && selectedPost) {
                                    handleAddComment(selectedPost)
                                  }
                                }}
                              />
                              <Button
                                size="sm"
                                onClick={() =>
                                  selectedPost && handleAddComment(selectedPost)
                                }
                                disabled={!newComment.trim()}
                              >
                                Enviar
                              </Button>
                            </div>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-muted-foreground hover:text-green-500 p-2"
                    onClick={() => handleShare(post)}
                  >
                    <Share className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
