import { useMemo } from 'react'

export default function ProgramComparison({ programs, selectedProgramIds, coursesById, onBack }) {
  const selectedPrograms = useMemo(() => {
    return programs.filter(p => selectedProgramIds.includes(p.id))
  }, [programs, selectedProgramIds])

  const comparison = useMemo(() => {
    if (selectedPrograms.length === 0) return null
    if (selectedPrograms.length === 1) {
      return {
        type: 'single',
        program: selectedPrograms[0],
        courses: selectedPrograms[0].courseIds || []
      }
    }

    if (selectedPrograms.length === 2) {
      const [p1, p2] = selectedPrograms
      const set1 = new Set(p1.courseIds || [])
      const set2 = new Set(p2.courseIds || [])
      
      const shared = [...set1].filter(id => set2.has(id))
      const onlyP1 = [...set1].filter(id => !set2.has(id))
      const onlyP2 = [...set2].filter(id => !set1.has(id))

      return {
        type: 'two',
        programs: [p1, p2],
        shared,
        unique: [onlyP1, onlyP2]
      }
    }

    // 3 programs
    const [p1, p2, p3] = selectedPrograms
    const set1 = new Set(p1.courseIds || [])
    const set2 = new Set(p2.courseIds || [])
    const set3 = new Set(p3.courseIds || [])
    
    const inAll = [...set1].filter(id => set2.has(id) && set3.has(id))
    const in12 = [...set1].filter(id => set2.has(id) && !set3.has(id))
    const in13 = [...set1].filter(id => !set2.has(id) && set3.has(id))
    const in23 = [...set2].filter(id => !set1.has(id) && set3.has(id))
    const only1 = [...set1].filter(id => !set2.has(id) && !set3.has(id))
    const only2 = [...set2].filter(id => !set1.has(id) && !set3.has(id))
    const only3 = [...set3].filter(id => !set1.has(id) && !set2.has(id))

    return {
      type: 'three',
      programs: [p1, p2, p3],
      inAll,
      pairs: [in12, in13, in23],
      unique: [only1, only2, only3]
    }
  }, [selectedPrograms])

  if (!comparison) return null

  if (comparison.type === 'single') {
    return (
      <div>
        <div style={{marginBottom:20}}>
          <button className="btn secondary" onClick={onBack}>← Tillbaka</button>
        </div>
        <div className="card">
          <h3 style={{marginTop:0}}>{comparison.program.name}</h3>
          <p className="muted">Totalt {comparison.courses.length} kurser</p>
        </div>
      </div>
    )
  }

  if (comparison.type === 'two') {
    const [p1, p2] = comparison.programs
    const [only1, only2] = comparison.unique
    const overlapPercent = comparison.shared.length > 0 
      ? Math.round((comparison.shared.length / Math.max(p1.courseIds.length, p2.courseIds.length)) * 100)
      : 0

    return (
      <div>
        <div style={{marginBottom:20,display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:12}}>
          <button className="btn secondary" onClick={onBack}>← Tillbaka</button>
          <div className="muted" style={{fontSize:14}}>
            {overlapPercent}% overlap • {comparison.shared.length} delade kurser
          </div>
        </div>

        <div className="comparison-grid-2">
          <div className="comparison-section unique-section">
            <h4 className="comparison-header" style={{color:'var(--primary)'}}>{p1.name}</h4>
            <div className="comparison-count">{only1.length} unika kurser</div>
            <div className="comparison-courses">
              {only1.length === 0 ? (
                <div className="muted" style={{padding:12,textAlign:'center',fontSize:13}}>Inga unika kurser</div>
              ) : (
                only1.map(id => (
                  <div key={id} className="comparison-course">{coursesById[id]?.title ?? id}</div>
                ))
              )}
            </div>
          </div>

          <div className="comparison-section shared-section">
            <h4 className="comparison-header" style={{color:'var(--success)'}}>Delade</h4>
            <div className="comparison-count">{comparison.shared.length} kurser</div>
            <div className="comparison-courses">
              {comparison.shared.length === 0 ? (
                <div className="muted" style={{padding:12,textAlign:'center',fontSize:13}}>Inga delade kurser</div>
              ) : (
                comparison.shared.map(id => (
                  <div key={id} className="comparison-course shared">{coursesById[id]?.title ?? id}</div>
                ))
              )}
            </div>
          </div>

          <div className="comparison-section unique-section">
            <h4 className="comparison-header" style={{color:'var(--secondary)'}}>{p2.name}</h4>
            <div className="comparison-count">{only2.length} unika kurser</div>
            <div className="comparison-courses">
              {only2.length === 0 ? (
                <div className="muted" style={{padding:12,textAlign:'center',fontSize:13}}>Inga unika kurser</div>
              ) : (
                only2.map(id => (
                  <div key={id} className="comparison-course">{coursesById[id]?.title ?? id}</div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // type === 'three'
  const [p1, p2, p3] = comparison.programs
  const [in12, in13, in23] = comparison.pairs
  const [only1, only2, only3] = comparison.unique

  return (
    <div>
      <div style={{marginBottom:20}}>
        <button className="btn secondary" onClick={onBack}>← Tillbaka</button>
      </div>

      <div className="comparison-three-grid">
        <div className="comparison-section shared-section">
          <h4 className="comparison-header" style={{color:'var(--success)'}}>Alla tre</h4>
          <div className="comparison-count">{comparison.inAll.length} kurser</div>
          <div className="comparison-courses">
            {comparison.inAll.length === 0 ? (
              <div className="muted" style={{padding:12,textAlign:'center',fontSize:13}}>Inga kurser i alla tre</div>
            ) : (
              comparison.inAll.map(id => (
                <div key={id} className="comparison-course shared">{coursesById[id]?.title ?? id}</div>
              ))
            )}
          </div>
        </div>

        <div className="comparison-section pair-section">
          <h4 className="comparison-header">{p1.name} + {p2.name}</h4>
          <div className="comparison-count">{in12.length} kurser</div>
          <div className="comparison-courses">
            {in12.length === 0 ? (
              <div className="muted" style={{padding:12,textAlign:'center',fontSize:13}}>Inga</div>
            ) : (
              in12.map(id => (
                <div key={id} className="comparison-course">{coursesById[id]?.title ?? id}</div>
              ))
            )}
          </div>
        </div>

        <div className="comparison-section pair-section">
          <h4 className="comparison-header">{p1.name} + {p3.name}</h4>
          <div className="comparison-count">{in13.length} kurser</div>
          <div className="comparison-courses">
            {in13.length === 0 ? (
              <div className="muted" style={{padding:12,textAlign:'center',fontSize:13}}>Inga</div>
            ) : (
              in13.map(id => (
                <div key={id} className="comparison-course">{coursesById[id]?.title ?? id}</div>
              ))
            )}
          </div>
        </div>

        <div className="comparison-section pair-section">
          <h4 className="comparison-header">{p2.name} + {p3.name}</h4>
          <div className="comparison-count">{in23.length} kurser</div>
          <div className="comparison-courses">
            {in23.length === 0 ? (
              <div className="muted" style={{padding:12,textAlign:'center',fontSize:13}}>Inga</div>
            ) : (
              in23.map(id => (
                <div key={id} className="comparison-course">{coursesById[id]?.title ?? id}</div>
              ))
            )}
          </div>
        </div>

        <div className="comparison-section unique-section">
          <h4 className="comparison-header" style={{color:'var(--primary)'}}>Endast {p1.name}</h4>
          <div className="comparison-count">{only1.length} kurser</div>
          <div className="comparison-courses">
            {only1.length === 0 ? (
              <div className="muted" style={{padding:12,textAlign:'center',fontSize:13}}>Inga</div>
            ) : (
              only1.map(id => (
                <div key={id} className="comparison-course">{coursesById[id]?.title ?? id}</div>
              ))
            )}
          </div>
        </div>

        <div className="comparison-section unique-section">
          <h4 className="comparison-header" style={{color:'var(--secondary)'}}>Endast {p2.name}</h4>
          <div className="comparison-count">{only2.length} kurser</div>
          <div className="comparison-courses">
            {only2.length === 0 ? (
              <div className="muted" style={{padding:12,textAlign:'center',fontSize:13}}>Inga</div>
            ) : (
              only2.map(id => (
                <div key={id} className="comparison-course">{coursesById[id]?.title ?? id}</div>
              ))
            )}
          </div>
        </div>

        <div className="comparison-section unique-section">
          <h4 className="comparison-header" style={{color:'var(--tertiary)'}}>Endast {p3.name}</h4>
          <div className="comparison-count">{only3.length} kurser</div>
          <div className="comparison-courses">
            {only3.length === 0 ? (
              <div className="muted" style={{padding:12,textAlign:'center',fontSize:13}}>Inga</div>
            ) : (
              only3.map(id => (
                <div key={id} className="comparison-course">{coursesById[id]?.title ?? id}</div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
