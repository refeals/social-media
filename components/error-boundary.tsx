"use client"

import { Component, type ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { AlertTriangle, RefreshCw, Home } from "lucide-react"
import Link from "next/link"

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error("ErrorBoundary caught an error:", error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="min-h-[400px] flex items-center justify-center p-4">
          <div className="max-w-sm w-full text-center space-y-4">
            <div className="space-y-3">
              <div className="flex justify-center">
                <AlertTriangle className="w-12 h-12 text-destructive" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">
                Erro no componente
              </h3>
              <p className="text-sm text-muted-foreground">
                Este componente encontrou um erro e não pode ser exibido.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <Button
                onClick={() => this.setState({ hasError: false })}
                variant="default"
                size="sm"
                className="flex items-center gap-2"
              >
                <RefreshCw className="w-3 h-3" />
                Tentar novamente
              </Button>
              <Button
                asChild
                variant="outline"
                size="sm"
                className="flex items-center gap-2 bg-transparent"
              >
                <Link href="/">
                  <Home className="w-3 h-3" />
                  Ir para o Feed
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
