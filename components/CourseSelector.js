import { useState, useMemo } from 'react'

export default function CourseSelector({ courses, selectedIds, onChange, courseOverlapCounts = {} }) {
  const [q, setQ] = useState('')
  const [showSelected, setShowSelected] = useState(false)
  const [expandedCategories, setExpandedCategories] = useState({})
  const [viewMode, setViewMode] = useState('list') // 'list' or 'categories'

  const coursesById = useMemo(() => {
    const map = {}
    for (const c of courses) map[c.id] = c
    return map
  }, [courses])

  // Group courses by category
  const coursesByCategory = useMemo(() => {
    const groups = {}
    courses.forEach(c => {
      const cat = c.category || 'Övrigt'
      if (!groups[cat]) groups[cat] = []
      groups[cat].push(c)
    })
    // Sort categories by name
    return Object.keys(groups).sort().reduce((acc, key) => {
      acc[key] = groups[key]
      return acc
    }, {})
  }, [courses])

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase()
    if (!s) return null // Return null when no search, to show categories
    return courses.filter(c => (c.title + ' ' + (c.code||'')).toLowerCase().includes(s))
  }, [q, courses])

  function toggle(id) {
    if (selectedIds.includes(id)) onChange(selectedIds.filter(x => x !== id))
    else onChange([...selectedIds, id])
  }

  function clearAll() { onChange([]) }

  function toggleCategory(cat) {
    setExpandedCategories(prev => ({...prev, [cat]: !prev[cat]}))
  }

  function renderCourseItem(c) {
    return (
      <label key={c.id} className="course-item">
        <input
          type="checkbox"
          checked={selectedIds.includes(c.id)}
          onChange={() => toggle(c.id)}
          aria-label={`Select ${c.title}`}
        />
        <div style={{flex:1,minWidth:0}}>
          <div style={{fontWeight:600,fontSize:13.5,display:'flex',alignItems:'center',gap:8,flexWrap:'wrap'}}>
            <span>{c.title}</span>
            {courseOverlapCounts[c.id] > 1 && (
              <span 
                className="overlap-badge"
                title={`Ingår i ${courseOverlapCounts[c.id]} program`}
              >
                ×{courseOverlapCounts[c.id]}
              </span>
            )}
          </div>
          <div className="muted">
            {c.code ?? ''} {c.credits ? `• ${c.credits} hp` : ''}
          </div>
        </div>
      </label>
    )
  }

  return (
    <div>
      <div style={{marginBottom:16}}>
        <div style={{fontWeight:700,fontSize:15,marginBottom:8}}>Sök kurser</div>
        <div className="search">
          <input
            placeholder="Sök efter namn eller kod..."
            value={q}
            onChange={e => setQ(e.target.value)}
            aria-label="Search courses"
          />
          {selectedIds.length > 0 && (
            <button className="btn secondary" onClick={clearAll} title="Deselect all">
              Rensa
            </button>
          )}
        </div>
      </div>

      {selectedIds.length > 0 && (
        <div style={{marginBottom:16}}>
          <div 
            style={{
              fontWeight:700,
              fontSize:13,
              color:'#6b7280',
              marginBottom:8,
              display:'flex',
              alignItems:'center',
              justifyContent:'space-between'
            }}
          >
            <span>Valda ({selectedIds.length})</span>
            <button
              onClick={() => setShowSelected(!showSelected)}
              style={{
                background:'none',
                border:'none',
                color:'var(--primary)',
                cursor:'pointer',
                fontSize:12,
                fontWeight:600,
                padding:'4px 8px',
                borderRadius:6,
                transition:'all 0.2s'
              }}
              onMouseOver={(e) => e.target.style.background = 'rgba(59,130,246,0.1)'}
              onMouseOut={(e) => e.target.style.background = 'none'}
            >
              {showSelected ? 'Dölj' : 'Visa'}
            </button>
          </div>
          {showSelected && (
            <div className="selected-chips">
              {selectedIds.map(id => {
                const c = coursesById[id]
                if (!c) return null
                return (
                  <button
                    key={id}
                    className="chip"
                    onClick={() => toggle(id)}
                    title="Klicka för att ta bort"
                  >
                    {c.title}
                  </button>
                )
              }).filter(Boolean)}
            </div>
          )}
        </div>
      )}

      <div style={{marginBottom:8}}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:8}}>
          <div style={{fontWeight:700,fontSize:13,color:'#6b7280'}}>
            {filtered ? `Sökresultat (${filtered.length})` : 'Välj kurser'}
          </div>
          {!filtered && (
            <div style={{display:'flex',gap:4,background:'var(--bg-secondary)',padding:4,borderRadius:8,border:'1px solid var(--card-border)'}}>
              <button
                onClick={() => setViewMode('list')}
                style={{
                  padding:'6px 12px',
                  border:'none',
                  borderRadius:6,
                  background: viewMode === 'list' ? 'var(--primary)' : 'transparent',
                  color: viewMode === 'list' ? 'white' : 'var(--text-muted)',
                  cursor:'pointer',
                  fontSize:13,
                  fontWeight:600,
                  transition:'all 0.2s'
                }}
                title="Visa som lista"
              >
                Alla kurser
              </button>
              <button
                onClick={() => setViewMode('categories')}
                style={{
                  padding:'6px 12px',
                  border:'none',
                  borderRadius:6,
                  background: viewMode === 'categories' ? 'var(--primary)' : 'transparent',
                  color: viewMode === 'categories' ? 'white' : 'var(--text-muted)',
                  cursor:'pointer',
                  fontSize:13,
                  fontWeight:600,
                  transition:'all 0.2s'
                }}
                title="Visa som kategorier"
              >
                Kategorier
              </button>
            </div>
          )}
        </div>
      </div>

      {filtered ? (
        // Show search results
        <div className="course-list">
          {filtered.length === 0 ? (
            <div className="muted" style={{padding:12,textAlign:'center'}}>
              Inga kurser hittades
            </div>
          ) : (
            filtered.map(c => renderCourseItem(c))
          )}
        </div>
      ) : viewMode === 'list' ? (
        // Show flat list of all courses
        <div className="course-list">
          {courses.map(c => renderCourseItem(c))}
        </div>
      ) : (
        // Show categories
        <div style={{display:'flex',flexDirection:'column',gap:12}}>
          {Object.entries(coursesByCategory).map(([category, coursesInCat]) => (
            <div key={category}>
              <div 
                className="collapsible-header"
                onClick={() => toggleCategory(category)}
              >
                <div style={{display:'flex',alignItems:'center',gap:8}}>
                  <strong style={{fontWeight:600,fontSize:14}}>{category}</strong>
                  <span className="count-badge" style={{background:'var(--bg-secondary)',color:'var(--text-muted)',border:'1px solid var(--card-border)'}}>
                    {coursesInCat.length}
                  </span>
                </div>
                <span className="collapse-icon">
                  {expandedCategories[category] ? '▼' : '▶'}
                </span>
              </div>
              {expandedCategories[category] && (
                <div className="course-list" style={{marginTop:8,maxHeight:'400px'}}>
                  {coursesInCat.map(c => renderCourseItem(c))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="muted" style={{marginTop:12,textAlign:'center',fontSize:12}}>
        {selectedIds.length > 0 ? `${selectedIds.length} valda` : 'Välj kurser för att börja'}
      </div>
    </div>
  )
}
