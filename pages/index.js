import { useState, useMemo } from 'react'
import CourseSelector from '../components/CourseSelector'
import ProgramList from '../components/ProgramList'
import ProgramComparison from '../components/ProgramComparison'
import courses from '../data/courses'
import programs from '../data/programs'
import { useTheme } from '../hooks/useTheme'

export default function Home() {
  const [selectedIds, setSelectedIds] = useState([])
  const [comparisonMode, setComparisonMode] = useState(false)
  const [comparisonProgramIds, setComparisonProgramIds] = useState([])
  const { theme, toggleTheme, mounted } = useTheme()

  const coursesById = useMemo(() => {
    const map = {}
    for (const c of courses) map[c.id] = c
    return map
  }, [])

  // Calculate how many programs include each course
  const courseOverlapCounts = useMemo(() => {
    const counts = {}
    courses.forEach(c => {
      counts[c.id] = programs.filter(p => p.courseIds.includes(c.id)).length
    })
    return counts
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

        <div style={{display:'flex',gap:12,alignItems:'center'}}>
          <button
            className="btn secondary"
            onClick={() => setComparisonMode(!comparisonMode)}
            style={{fontSize:14}}
          >
            {comparisonMode ? '← Tillbaka till kurser' : '📊 Jämför program'}
          </button>
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </div>
      </header>

      <div className="intro-card">
        <div style={{marginBottom:16}}>
          <h2 style={{fontWeight:700,fontSize:20,marginBottom:8}}>Välkommen!</h2>
          <p style={{color:'var(--text-muted)',lineHeight:1.6,margin:0}}>
            {comparisonMode 
              ? 'Välj 2-3 program nedan för att jämföra deras kurser och se vad som är unikt eller delat.'
              : 'Välj kurser som verkar intressanta och se vilket program på Högskolan i Skövde som passar bäst. Matchningen uppdateras i realtid.'}
          </p>
        </div>
        {!comparisonMode && (
          <div style={{fontSize:13,color:'var(--text-muted)',fontStyle:'italic'}}>
            💡 Tips: Ju fler kurser du väljer, desto bättre blir matchningen.
          </div>
        )}
      </div>

      {comparisonMode ? (
        <div className="card">
          <div style={{marginBottom:20}}>
            <h3 style={{marginTop:0,marginBottom:16}}>Välj program att jämföra</h3>
            <div style={{display:'flex',flexDirection:'column',gap:10}}>
              {programs.map(p => (
                <label key={p.id} style={{display:'flex',alignItems:'center',gap:10,cursor:'pointer'}}>
                  <input
                    type="checkbox"
                    checked={comparisonProgramIds.includes(p.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        if (comparisonProgramIds.length < 3) {
                          setComparisonProgramIds([...comparisonProgramIds, p.id])
                        }
                      } else {
                        setComparisonProgramIds(comparisonProgramIds.filter(id => id !== p.id))
                      }
                    }}
                    disabled={!comparisonProgramIds.includes(p.id) && comparisonProgramIds.length >= 3}
                  />
                  <span style={{fontWeight:500}}>{p.name}</span>
                  <span className="muted" style={{fontSize:13}}>({p.courseIds.length} kurser)</span>
                </label>
              ))}
            </div>
            {comparisonProgramIds.length > 0 && comparisonProgramIds.length < 2 && (
              <div className="muted" style={{marginTop:12,fontSize:13}}>
                Välj minst 2 program för att jämföra
              </div>
            )}
            {comparisonProgramIds.length >= 3 && (
              <div className="muted" style={{marginTop:12,fontSize:13}}>
                Max 3 program kan jämföras åt gången
              </div>
            )}
          </div>

          {comparisonProgramIds.length >= 2 && (
            <ProgramComparison
              programs={programs}
              selectedProgramIds={comparisonProgramIds}
              coursesById={coursesById}
              onBack={() => setComparisonProgramIds([])}
            />
          )}
        </div>
      ) : (
        <div className="layout">
          <div>
            <div className="card">
              <CourseSelector
                courses={courses}
                selectedIds={selectedIds}
                onChange={setSelectedIds}
                courseOverlapCounts={courseOverlapCounts}
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
      )}

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
