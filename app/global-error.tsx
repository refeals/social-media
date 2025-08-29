"use client"

import { Button } from "@/components/ui/button"
import { AlertTriangle, RefreshCw } from "lucide-react"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body>
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
          <div className="max-w-md w-full text-center space-y-6">
            <div className="space-y-4">
              <div className="flex justify-center">
                <AlertTriangle className="w-16 h-16 text-red-500" />
              </div>
              <h1 className="text-2xl font-semibold text-foreground">
                Erro crítico do sistema
              </h1>
              <p className="text-muted-foreground">
                Ocorreu um erro crítico na aplicação. Por favor, recarregue a
                página ou tente novamente mais tarde.
              </p>
              {error.digest && (
                <p className="text-xs text-muted-foreground font-mono bg-muted p-2 rounded">
                  ID do erro: {error.digest}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-3 justify-center">
              <Button
                onClick={reset}
                variant="default"
                className="flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Recarregar aplicação
              </Button>
            </div>

            <div className="pt-8 border-t border-gray-200">
              <p className="text-sm text-muted-foreground">
                Se o problema continuar, entre em contato com nossa equipe
                técnica.
              </p>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
