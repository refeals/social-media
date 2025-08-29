"use client"

import { useState } from "react"
import { ArrowLeft, Camera, MapPin } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ThemeToggle } from "@/components/theme-toggle"
import Link from "next/link"

interface UserPost {
  id: string
  imageUrl: string
  likeCount: number
  commentCount: number
}

const mockUserPosts: UserPost[] = [
  {
    id: "1",
    imageUrl: "https://placehold.co/300x300/0ea5e9/white?text=Post+1",
    likeCount: 24,
    commentCount: 8,
  },
  {
    id: "2",
    imageUrl: "https://placehold.co/300x300/059669/white?text=Post+2",
    likeCount: 15,
    commentCount: 3,
  },
  {
    id: "3",
    imageUrl: "https://placehold.co/300x300/7c3aed/white?text=Post+3",
    likeCount: 42,
    commentCount: 12,
  },
  {
    id: "4",
    imageUrl: "https://placehold.co/300x300/dc2626/white?text=Post+4",
    likeCount: 18,
    commentCount: 5,
  },
  {
    id: "5",
    imageUrl: "https://placehold.co/300x300/ea580c/white?text=Post+5",
    likeCount: 31,
    commentCount: 9,
  },
  {
    id: "6",
    imageUrl: "https://placehold.co/300x300/0891b2/white?text=Post+6",
    likeCount: 27,
    commentCount: 6,
  },
]

const mockUserData = {
  name: "Maria Silva",
  username: "@mariasilva",
  bio: "Apaixonada por fotografia e viagens 📸✈️\nCompartilhando momentos especiais do Brasil",
  location: "São Paulo, Brasil",
  followersCount: 1234,
  followingCount: 567,
  postsCount: 89,
  avatar: "https://placehold.co/120x120/e11d48/white?text=MS",
  coverPhoto: "https://placehold.co/800x300/0ea5e9/white?text=Capa+do+Perfil",
}

export function UserProfile() {
  const [activeTab, setActiveTab] = useState("posts")

  return (
    <div className="min-h-screen bg-background">
      {/* Header with back button */}
      <header className="sticky top-0 z-50 bg-card border-b border-border">
        <div className="max-w-2xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="sm" className="p-2">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <div>
                <h1 className="font-bold text-lg text-foreground">
                  {mockUserData.name}
                </h1>
                <p className="text-sm text-muted-foreground">
                  {mockUserData.postsCount} posts
                </p>
              </div>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto">
        {/* Cover Photo */}
        <div className="relative h-48 bg-muted">
          <img
            src={mockUserData.coverPhoto || "/placeholder.svg"}
            alt="Foto de capa"
            className="w-full h-full object-cover"
          />
          <Button
            variant="secondary"
            size="sm"
            className="absolute bottom-4 right-4 gap-2"
          >
            <Camera className="w-4 h-4" />
            Editar capa
          </Button>
        </div>

        {/* Profile Info */}
        <div className="px-4 pb-4">
          {/* Avatar and Edit Button */}
          <div className="flex items-end justify-between -mt-16 mb-4">
            <div className="relative">
              <Avatar className="w-32 h-32 border-4 border-card">
                <AvatarImage src={mockUserData.avatar || "/placeholder.svg"} />
                <AvatarFallback className="text-2xl">
                  {mockUserData.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <Button
                variant="secondary"
                size="sm"
                className="absolute bottom-2 right-2 w-8 h-8 p-0 rounded-full"
              >
                <Camera className="w-4 h-4" />
              </Button>
            </div>
            <Button variant="outline" className="mb-4 bg-transparent">
              Editar perfil
            </Button>
          </div>

          {/* User Info */}
          <div className="space-y-3">
            <div>
              <h2 className="text-xl font-bold text-foreground">
                {mockUserData.name}
              </h2>
              <p className="text-muted-foreground">{mockUserData.username}</p>
            </div>

            <p className="text-foreground leading-relaxed whitespace-pre-line">
              {mockUserData.bio}
            </p>

            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">{mockUserData.location}</span>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-6 pt-2">
              <div className="text-center">
                <p className="font-bold text-foreground">
                  {mockUserData.postsCount}
                </p>
                <p className="text-sm text-muted-foreground">Posts</p>
              </div>
              <div className="text-center">
                <p className="font-bold text-foreground">
                  {mockUserData.followersCount}
                </p>
                <p className="text-sm text-muted-foreground">Seguidores</p>
              </div>
              <div className="text-center">
                <p className="font-bold text-foreground">
                  {mockUserData.followingCount}
                </p>
                <p className="text-sm text-muted-foreground">Seguindo</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mx-4 mb-4">
            <TabsTrigger value="posts">Posts</TabsTrigger>
            <TabsTrigger value="about">Sobre</TabsTrigger>
          </TabsList>

          <TabsContent value="posts" className="px-4">
            {/* Posts Grid */}
            <div className="grid grid-cols-3 gap-1">
              {mockUserPosts.map((post) => (
                <div
                  key={post.id}
                  className="aspect-square relative group cursor-pointer"
                >
                  <img
                    src={post.imageUrl || "/placeholder.svg"}
                    alt={`Post ${post.id}`}
                    className="w-full h-full object-cover rounded-sm"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-sm flex items-center justify-center">
                    <div className="flex items-center gap-4 text-white text-sm">
                      <span>❤️ {post.likeCount}</span>
                      <span>💬 {post.commentCount}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="about" className="px-4">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">
                      Sobre
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Olá! Sou a Maria, uma apaixonada por capturar momentos
                      únicos através da fotografia. Adoro viajar pelo Brasil e
                      descobrir lugares incríveis para compartilhar com vocês.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-foreground mb-2">
                      Localização
                    </h3>
                    <p className="text-muted-foreground flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {mockUserData.location}
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-foreground mb-2">
                      Membro desde
                    </h3>
                    <p className="text-muted-foreground">Janeiro de 2023</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
