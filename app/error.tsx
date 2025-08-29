"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { AlertTriangle, RefreshCw, Home } from "lucide-react"
import Link from "next/link"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="space-y-4">
          <div className="flex justify-center">
            <AlertTriangle className="w-16 h-16 text-destructive" />
          </div>
          <h1 className="text-2xl font-semibold text-foreground">
            Algo deu errado!
          </h1>
          <p className="text-muted-foreground">
            Ocorreu um erro inesperado. Nossa equipe foi notificada e está
            trabalhando para resolver o problema.
          </p>
          {error.digest && (
            <p className="text-xs text-muted-foreground font-mono bg-muted p-2 rounded">
              ID do erro: {error.digest}
            </p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            onClick={reset}
            variant="default"
            className="flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Tentar novamente
          </Button>
          <Button
            asChild
            variant="outline"
            className="flex items-center gap-2 bg-transparent"
          >
            <Link href="/">
              <Home className="w-4 h-4" />
              Ir para o Feed
            </Link>
          </Button>
        </div>

        <div className="pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground">
            Se o problema persistir, entre em contato com o suporte.
          </p>
        </div>
      </div>
    </div>
  )
}
