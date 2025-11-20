import { Toaster } from '@/components/ui/sonner'
import { Router } from '@/components/Router'
import { AuthProvider } from '@/contexts/AuthContext'

function App() {
    return (
        <AuthProvider>
            <Router />
            <Toaster position="top-center" />
        </AuthProvider>
    )
}

export default App