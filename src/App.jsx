import Hero from './components/Hero'
import Projects from './components/Projects'
import Company from './components/Company'
import ContactForm from './components/ContactForm'
import AdminPanel from './components/AdminPanel'
import AdminGate from './components/AdminGate'
import './App.css'

function App() {
  return (
    <main>
      <Hero />
      <Projects />
      <Company />
      <ContactForm />
      <AdminGate />
      <AdminPanel />
    </main>
  )
}

export default App
