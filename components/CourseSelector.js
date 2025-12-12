import { useState, useMemo } from 'react'

export default function CourseSelector({ courses, selectedIds, onChange }) {
  const [q, setQ] = useState('')

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase()
    if (!s) return courses
    return courses.filter(c => (c.title + ' ' + (c.code||'')).toLowerCase().includes(s))
  }, [q, courses])

  function toggle(id) {
    if (selectedIds.includes(id)) onChange(selectedIds.filter(x => x !== id))
    else onChange([...selectedIds, id])
  }

  function clearAll() { onChange([]) }

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
          <div style={{fontWeight:700,fontSize:13,color:'#6b7280',marginBottom:8}}>
            Valda ({selectedIds.length})
          </div>
          <div className="selected-chips">
            {selectedIds.map(id => {
              const c = courses.find(x => x.id === id)
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
        </div>
      )}

      <div style={{marginBottom:8}}>
        <div style={{fontWeight:700,fontSize:13,color:'#6b7280'}}>
          Alla kurser ({filtered.length})
        </div>
      </div>

      <div className="course-list">
        {filtered.length === 0 ? (
          <div className="muted" style={{padding:12,textAlign:'center'}}>
            Inga kurser hittades
          </div>
        ) : (
          filtered.map(c => (
            <label key={c.id} className="course-item">
              <input
                type="checkbox"
                checked={selectedIds.includes(c.id)}
                onChange={() => toggle(c.id)}
                aria-label={`Select ${c.title}`}
              />
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontWeight:600,fontSize:13.5}}>
                  {c.title}
                </div>
                <div className="muted">
                  {c.code ?? ''} {c.credits ? `• ${c.credits} hp` : ''}
                </div>
              </div>
            </label>
          ))
        )}
      </div>

      <div className="muted" style={{marginTop:12,textAlign:'center',fontSize:12}}>
        {selectedIds.length > 0 ? `${selectedIds.length} valda` : 'Välj kurser för att börja'}
      </div>
    </div>
  )
}
