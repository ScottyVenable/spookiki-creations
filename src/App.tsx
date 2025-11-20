import { Toaster } from '@/components/ui/sonner'
import { Router } from '@/components/Router'
import { AuthProvider } from '@/contexts/AuthContext'
import { ScrollToTop } from '@/components/ScrollToTop'

function App() {
    return (
        <AuthProvider>
            <Router />
            <ScrollToTop />
            <Toaster position="top-center" />
        </AuthProvider>
    )
}

export default App