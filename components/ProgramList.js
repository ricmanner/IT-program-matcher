export default function ProgramList({ programs, selectedIds, coursesById }) {
  if (selectedIds.length === 0) {
    return (
      <div className="no-data">
        <div>📚</div>
        <div style={{fontWeight:600,marginBottom:8}}>Välj kurser för att börja</div>
        <div>Välj kurser från vänster för att se vilket program som passar dig bäst.</div>
      </div>
    )
  }

  const results = programs.map(p => {
    const matched = (p.courseIds || []).filter(id => selectedIds.includes(id))
    const score = selectedIds.length === 0 ? 0 : matched.length / selectedIds.length
    const missingSelected = selectedIds.filter(id => !(p.courseIds || []).includes(id))
    return { ...p, matched, score, missingSelected }
  }).sort((a,b) => b.score - a.score || b.matched.length - a.matched.length)

  const bestScore = results[0]?.score ?? 0

  return (
    <div>
      <div style={{marginBottom:14}}>
        <div style={{fontWeight:700,fontSize:15}}>Programöversiktning</div>
        <div className="muted" style={{marginTop:4,fontSize:13}}>Baserat på {selectedIds.length} vald{selectedIds.length !== 1 ? 'a' : ''} kurs{selectedIds.length !== 1 ? 'er' : ''}</div>
      </div>

      <div className="program-grid">
        {results.map((p, idx) => (
          <div 
            key={p.id} 
            className={`card program-card ${p.score === bestScore && bestScore > 0 ? 'best' : ''}`}
          >
            <div className="program-header">
              <div style={{flex:1}}>
                <div style={{display:'flex',alignItems:'center',gap:10}}>
                  <div className="program-name">{p.name}</div>
                  {p.score === bestScore && bestScore > 0 && (
                    <div className="badge">🎯 Bäst matchning</div>
                  )}
                </div>
              </div>
              <div className="percentage-display">
                <div className="percentage">{Math.round(p.score * 100)}%</div>
                <div className="percentage-label">matchning</div>
              </div>
            </div>

            <div className="progress-bar">
              <span style={{width: `${Math.round(p.score*100)}%`}} />
            </div>

            <div className="muted" style={{fontSize:12}}>
              {p.matched.length} av {selectedIds.length} valda kurser passar det här programmet
            </div>

            {p.matched.length > 0 && (
              <div className="course-list-details">
                <strong className="matched">Matchade kurser</strong>
                <ul>
                  {p.matched.map(id => (
                    <li key={id} className="matched">{coursesById[id]?.title ?? id}</li>
                  ))}
                </ul>
              </div>
            )}

            {p.missingSelected.length > 0 && (
              <div className="course-list-details">
                <strong className="missing">Finns inte i det här programmet</strong>
                <ul>
                  {p.missingSelected.map(id => (
                    <li key={id} className="missing">{coursesById[id]?.title ?? id}</li>
                  ))}
                </ul>
              </div>
            )}

            {p.url && (
              <a 
                href={p.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn program-link"
                style={{display:'flex',alignItems:'center',justifyContent:'center',gap:8,marginTop:16}}
              >
                Läs mer om programmet →
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
