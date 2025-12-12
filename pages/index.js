import { useState, useMemo } from 'react'
import CourseSelector from '../components/CourseSelector'
import ProgramList from '../components/ProgramList'
import courses from '../data/courses'
import programs from '../data/programs'
import { useTheme } from '../hooks/useTheme'

export default function Home() {
  const [selectedIds, setSelectedIds] = useState([])
  const { theme, toggleTheme, mounted } = useTheme()

  const coursesById = useMemo(() => {
    const map = {}
    for (const c of courses) map[c.id] = c
    return map
  }, [])

  // TODO: could add filters by credits or category later

  if (!mounted) return null

  return (
    <main className="container">
      <header className="header">
        <div className="brand">
          <div className="logo">🎓</div>
          <div>
            <div className="title">Programmatchning</div>
            <div className="subtitle">Hitta ditt perfekta program vid Högskolan i Skövde</div>
          </div>
        </div>

        <button
          className="theme-toggle"
          onClick={toggleTheme}
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
      </header>

      <div className="intro-card">
        <div style={{marginBottom:16}}>
          <h2 style={{fontWeight:700,fontSize:20,marginBottom:8}}>Välkommen!</h2>
          <p style={{color:'var(--text-muted)',lineHeight:1.6,margin:0}}>
            Välj kurser som verkar intressanta och se vilket program på Högskolan i Skövde som passar bäst. 
            Matchningen uppdateras i realtid.
          </p>
        </div>
        <div style={{fontSize:13,color:'var(--text-muted)',fontStyle:'italic'}}>
          💡 Tips: Ju fler kurser du väljer, desto bättre blir matchningen.
        </div>
      </div>

      <div className="layout">
        <div>
          <div className="card">
            <CourseSelector
              courses={courses}
              selectedIds={selectedIds}
              onChange={setSelectedIds}
            />
          </div>
        </div>

        <div>
          <div className="card">
            <ProgramList
              programs={programs}
              selectedIds={selectedIds}
              coursesById={coursesById}
            />
          </div>
        </div>
      </div>

      <footer className="footer">
        <div className="footer-content" style={{textAlign:'center'}}>
          <div style={{fontSize:13,color:'var(--text-muted)'}}>
            © 2025 Richard · Programmatchning
            {' · '}
            <a href="https://github.com/ricmanner/course-program-matcher" target="_blank" rel="noopener noreferrer" className="footer-link">
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </main>
  )
}
