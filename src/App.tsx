import { Toaster } from '@/components/ui/sonner'
import { Router } from '@/components/Router'
import { AuthProvider } from '@/contexts/AuthContext'
import { MobileOptimizationProvider } from '@/contexts/MobileOptimizationContext'

function App() {
    return (
        <MobileOptimizationProvider>
            <AuthProvider>
                <Router />
                <Toaster position="top-center" />
            </AuthProvider>
        </MobileOptimizationProvider>
    )
}

export default App