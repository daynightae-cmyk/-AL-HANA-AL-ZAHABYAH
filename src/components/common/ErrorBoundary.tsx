// src/components/common/ErrorBoundary.tsx
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { RefreshCw, ShieldAlert, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error captured by boundary:", error, errorInfo);
  }

  private handleReload = () => {
    window.location.reload();
  };

  private handleGoHome = () => {
    window.location.href = "/";
  };

  public render() {
    if (this.state.hasError) {
      // Safely fetch language configuration from storage, default to Arabic or English
      const savedLang = localStorage.getItem("language") || "en";
      const isArabic = savedLang === "ar";

      return (
        <div className="min-h-screen bg-[#050505] text-[#D6D6D6] flex flex-col items-center justify-center p-4 relative overflow-hidden font-sans">
          {/* Ambient luxury glow backdrop */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-luxury-gold/5 blur-[120px] rounded-full pointer-events-none"></div>
          
          <div className="max-w-md w-full border border-luxury-gold/30 bg-neutral-950 p-8 text-center relative z-10 space-y-6 shadow-2xl">
            {/* Warning Shield Accent Icon */}
            <div className="w-16 h-16 bg-luxury-gold/10 border border-luxury-gold/25 rounded-full flex items-center justify-center mx-auto">
              <ShieldAlert className="w-8 h-8 text-luxury-gold" />
            </div>

            <div className="space-y-2">
              <h1 className="text-xl font-serif font-bold text-[#F8F5ED]">
                {isArabic ? "عذراً، حدث خطأ فني غير متوقع" : "Oops, Something Went Wrong"}
              </h1>
              <p className="text-xs text-luxury-muted leading-relaxed">
                {isArabic
                  ? "لقد واجهنا مشكلة تقنية في معالجة هذه الصفحة. يرجى الضغط على زر التحديث للمحاولة مرة أخرى أو الرجوع للرئيسية."
                  : "We encountered an unexpected rendering error. Please try refreshing the page or return to the main homepage."}
              </p>
            </div>

            {this.state.error && (
              <div className="p-3 bg-red-950/20 border border-red-900/30 text-left rounded-sm overflow-hidden">
                <p className="font-mono text-[9px] text-red-400 break-words line-clamp-3">
                  {this.state.error.toString()}
                </p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="button"
                onClick={this.handleReload}
                className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-luxury-gold to-yellow-600 text-black px-4 py-2.5 text-xs font-bold uppercase tracking-wider hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>{isArabic ? "تحديث الصفحة" : "Reload Page"}</span>
              </button>
              <button
                type="button"
                onClick={this.handleGoHome}
                className="flex-1 flex items-center justify-center gap-2 border border-white/10 text-[#D6D6D6] px-4 py-2.5 text-xs font-bold uppercase tracking-wider hover:bg-white/5 active:scale-[0.98] transition-all cursor-pointer"
              >
                <Home className="w-3.5 h-3.5 text-luxury-gold" />
                <span>{isArabic ? "الرئيسية" : "Go Home"}</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
