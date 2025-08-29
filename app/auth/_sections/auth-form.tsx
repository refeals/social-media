"use client"

import type React from "react"

import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"

interface FormData {
  email: string
  password: string
  fullName?: string
  username?: string
}

interface FormErrors {
  email?: string
  password?: string
  fullName?: string
  username?: string
}

export function AuthForm() {
  const [activeTab, setActiveTab] = useState("login")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const [loginData, setLoginData] = useState<FormData>({
    email: "",
    password: "",
  })

  const [signupData, setSignupData] = useState<FormData>({
    email: "",
    password: "",
    fullName: "",
    username: "",
  })

  const [loginErrors, setLoginErrors] = useState<FormErrors>({})
  const [signupErrors, setSignupErrors] = useState<FormErrors>({})

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validatePassword = (password: string): boolean => {
    return password.length >= 6
  }

  const validateUsername = (username: string): boolean => {
    return username.length >= 3 && /^[a-zA-Z0-9_]+$/.test(username)
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const errors: FormErrors = {}

    if (!loginData.email) {
      errors.email = "E-mail é obrigatório"
    } else if (!validateEmail(loginData.email)) {
      errors.email = "E-mail inválido"
    }

    if (!loginData.password) {
      errors.password = "Senha é obrigatória"
    } else if (!validatePassword(loginData.password)) {
      errors.password = "Senha deve ter pelo menos 6 caracteres"
    }

    setLoginErrors(errors)

    if (Object.keys(errors).length === 0) {
      // Simulate API call
      setTimeout(() => {
        setIsLoading(false)
        // Redirect to home page would happen here
        console.log("Login realizado com sucesso!")
      }, 1000)
    } else {
      setIsLoading(false)
    }
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const errors: FormErrors = {}

    if (!signupData.fullName) {
      errors.fullName = "Nome completo é obrigatório"
    }

    if (!signupData.username) {
      errors.username = "Nome de usuário é obrigatório"
    } else if (!validateUsername(signupData.username)) {
      errors.username = "Nome de usuário deve ter pelo menos 3 caracteres e conter apenas letras, números e _"
    }

    if (!signupData.email) {
      errors.email = "E-mail é obrigatório"
    } else if (!validateEmail(signupData.email)) {
      errors.email = "E-mail inválido"
    }

    if (!signupData.password) {
      errors.password = "Senha é obrigatória"
    } else if (!validatePassword(signupData.password)) {
      errors.password = "Senha deve ter pelo menos 6 caracteres"
    }

    setSignupErrors(errors)

    if (Object.keys(errors).length === 0) {
      // Simulate API call
      setTimeout(() => {
        setIsLoading(false)
        // Redirect to home page would happen here
        console.log("Conta criada com sucesso!")
      }, 1000)
    } else {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">S</span>
          </div>
          <span className="font-bold text-xl text-foreground">Social</span>
        </div>
        <CardTitle className="text-2xl">Bem-vindo!</CardTitle>
        <CardDescription>
          {activeTab === "login"
            ? "Entre na sua conta para continuar"
            : "Crie sua conta e faça parte da nossa comunidade"}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Entrar</TabsTrigger>
            <TabsTrigger value="signup">Criar Conta</TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="space-y-4 mt-6">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="login-email">E-mail</Label>
                <Input
                  id="login-email"
                  type="email"
                  placeholder="seu@email.com"
                  value={loginData.email}
                  onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                  className={loginErrors.email ? "border-destructive" : ""}
                />
                {loginErrors.email && <p className="text-sm text-destructive">{loginErrors.email}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="login-password">Senha</Label>
                <div className="relative">
                  <Input
                    id="login-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Sua senha"
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                    className={loginErrors.password ? "border-destructive pr-10" : "pr-10"}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
                {loginErrors.password && <p className="text-sm text-destructive">{loginErrors.password}</p>}
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Entrando..." : "Entrar"}
              </Button>
            </form>

            <div className="text-center">
              <Link href="#" className="text-sm text-primary hover:underline">
                Esqueceu sua senha?
              </Link>
            </div>
          </TabsContent>

          <TabsContent value="signup" className="space-y-4 mt-6">
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="signup-fullname">Nome completo</Label>
                <Input
                  id="signup-fullname"
                  type="text"
                  placeholder="Seu nome completo"
                  value={signupData.fullName}
                  onChange={(e) => setSignupData({ ...signupData, fullName: e.target.value })}
                  className={signupErrors.fullName ? "border-destructive" : ""}
                />
                {signupErrors.fullName && <p className="text-sm text-destructive">{signupErrors.fullName}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-username">Nome de usuário</Label>
                <Input
                  id="signup-username"
                  type="text"
                  placeholder="seuusuario"
                  value={signupData.username}
                  onChange={(e) => setSignupData({ ...signupData, username: e.target.value })}
                  className={signupErrors.username ? "border-destructive" : ""}
                />
                {signupErrors.username && <p className="text-sm text-destructive">{signupErrors.username}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-email">E-mail</Label>
                <Input
                  id="signup-email"
                  type="email"
                  placeholder="seu@email.com"
                  value={signupData.email}
                  onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                  className={signupErrors.email ? "border-destructive" : ""}
                />
                {signupErrors.email && <p className="text-sm text-destructive">{signupErrors.email}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-password">Senha</Label>
                <div className="relative">
                  <Input
                    id="signup-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Crie uma senha"
                    value={signupData.password}
                    onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                    className={signupErrors.password ? "border-destructive pr-10" : "pr-10"}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
                {signupErrors.password && <p className="text-sm text-destructive">{signupErrors.password}</p>}
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Criando conta..." : "Criar Conta"}
              </Button>
            </form>

            <div className="text-center text-sm text-muted-foreground">
              Ao criar uma conta, você concorda com nossos{" "}
              <Link href="#" className="text-primary hover:underline">
                Termos de Uso
              </Link>{" "}
              e{" "}
              <Link href="#" className="text-primary hover:underline">
                Política de Privacidade
              </Link>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
