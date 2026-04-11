import { useState, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'
import { generateResume } from '../services/claude.js'
import styles from './HomePage.module.css'

/* ── Skills tag input ── */
function TagsInput({ tags, onChange }) {
  const [inputVal, setInputVal] = useState('')
  const inputRef = useRef(null)

  const addTag = useCallback(
    (val) => {
      const trimmed = val.trim()
      if (trimmed && !tags.includes(trimmed)) {
        onChange([...tags, trimmed])
      }
      setInputVal('')
    },
    [tags, onChange]
  )

  const removeTag = (tag) => onChange(tags.filter((t) => t !== tag))

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      addTag(inputVal)
    } else if (e.key === 'Backspace' && !inputVal && tags.length) {
      removeTag(tags[tags.length - 1])
    }
  }

  return (
    <div
      className="tags-input-wrapper"
      onClick={() => inputRef.current?.focus()}
    >
      {tags.map((tag) => (
        <span key={tag} className="tag-chip">
          {tag}
          <button
            type="button"
            className="tag-remove"
            onClick={() => removeTag(tag)}
            aria-label={`Remove ${tag}`}
          >
            <span className="material-symbols-outlined" style={{ fontSize: 15 }}>close</span>
          </button>
        </span>
      ))}
      <input
        ref={inputRef}
        className="tag-input"
        value={inputVal}
        placeholder={tags.length === 0 ? 'Add skills (press Enter)…' : 'Add more…'}
        onChange={(e) => setInputVal(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={() => inputVal && addTag(inputVal)}
      />
    </div>
  )
}

/* ── Main Page ── */
export default function HomePage() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [form, setForm] = useState({
    name: '',
    jobTitle: '',
    skills: [],
    experience: '',
    education: '',
  })

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))
  const setSkills = (skills) => setForm((f) => ({ ...f, skills }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!form.name.trim() || !form.jobTitle.trim()) {
      setError('Please fill in at least your name and target job title.')
      return
    }

    if (!import.meta.env.VITE_OPENROUTER_API_KEY) {
      setError('Missing OpenRouter API Key. Check your .env file.')
      return
    }

    setLoading(true)
    try {
      const resumeData = await generateResume(form)
      navigate('/results', { state: { resumeData } })
    } catch (err) {
      setError(err.message || 'Failed to generate resume. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Navbar />

      <main className={styles.main}>
        {/* ── Hero ── */}
        <section className={styles.hero}>
          <span className={styles.heroBadge}>
            <span className="material-symbols-outlined" style={{ fontSize: 15, marginRight: 4 }}>auto_awesome</span>
            Powered by AI
          </span>
          <h1 className={styles.heroTitle}>
            Build Your Professional{' '}
            <em className={styles.heroAccent}>Future</em> with AI
          </h1>
          <p className={styles.heroSub}>
            Transform your career journey with the "Digital Atelier" approach. We curate
            your experience into an editorial masterpiece.
          </p>
        </section>

        {/* ── Content Grid ── */}
        <div className={styles.grid}>
          {/* ── Form Panel ── */}
          <div className={styles.formPanel}>
            <div className={styles.formCard}>
              <div className={styles.formAccentBar} />
              <h2 className="section-header">
                <span className="material-symbols-outlined" style={{ color: 'var(--primary)' }}>edit_note</span>
                Candidate Details
              </h2>

              <form onSubmit={handleSubmit} className={styles.form} id="resume-form">
                {/* Row 1 */}
                <div className={styles.row2}>
                  <div className="input-field">
                    <label className="input-label" htmlFor="inp-name">Full Name</label>
                    <input
                      id="inp-name"
                      className="input"
                      type="text"
                      placeholder="e.g. Jonathan Archer"
                      value={form.name}
                      onChange={set('name')}
                      required
                    />
                  </div>
                  <div className="input-field">
                    <label className="input-label" htmlFor="inp-title">Target Job Title</label>
                    <input
                      id="inp-title"
                      className="input"
                      type="text"
                      placeholder="e.g. Senior Software Engineer"
                      value={form.jobTitle}
                      onChange={set('jobTitle')}
                      required
                    />
                  </div>
                </div>

                {/* Skills */}
                <div className="input-field">
                  <label className="input-label">Core Skills</label>
                  <TagsInput tags={form.skills} onChange={setSkills} />
                </div>

                {/* Experience */}
                <div className="input-field">
                  <label className="input-label" htmlFor="inp-exp">Work Experience</label>
                  <textarea
                    id="inp-exp"
                    className="textarea"
                    placeholder="Describe your career highlights and achievements…&#10;e.g. Led a team of 8 engineers at Acme Corp (2020–2024), built a real-time analytics dashboard serving 500K users…"
                    value={form.experience}
                    onChange={set('experience')}
                    rows={6}
                  />
                </div>

                {/* Education */}
                <div className="input-field">
                  <label className="input-label" htmlFor="inp-edu">Education</label>
                  <input
                    id="inp-edu"
                    className="input"
                    type="text"
                    placeholder="e.g. B.S. Computer Science, MIT, 2018"
                    value={form.education}
                    onChange={set('education')}
                  />
                </div>

                {/* Error */}
                {error && (
                  <div className={styles.errorMsg} role="alert">
                    <span className="material-symbols-outlined" style={{ fontSize: 18 }}>error</span>
                    {error}
                  </div>
                )}

                {/* Submit */}
                <button
                  id="generate-btn"
                  type="submit"
                  className="btn-primary large"
                  disabled={loading}
                  style={{ marginTop: '0.5rem' }}
                >
                  {loading ? (
                    <>
                      <span className="spinner" />
                      Crafting your resume…
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined">auto_awesome</span>
                      Generate Resume
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* ── Sidebar ── */}
          <aside className={styles.sidebar}>
            {/* AI Insight */}
            <div className="insight-card fade-up">
              <div className={styles.insightHeader}>
                <span className="material-symbols-outlined" style={{ color: 'var(--secondary)' }}>lightbulb</span>
                <h3 className={styles.insightTitle}>AI Optimizer Insight</h3>
              </div>
              <p className={styles.insightBody}>
                "Candidates who quantify achievements — like '42% faster deployment' — see a{' '}
                <strong>3× higher</strong> callback rate compared to resumes with vague descriptions."
              </p>
              <button className={styles.insightBtn}>
                Apply Suggestion
                <span className="material-symbols-outlined" style={{ fontSize: 16 }}>arrow_forward</span>
              </button>
            </div>

            {/* Preview Card */}
            <div className={styles.previewCard}>
              <div className={styles.previewGlow} />
              <div className={styles.previewInner}>
                <div className={styles.previewLines}>
                  {/* Simulated resume lines */}
                  <div className={styles.resumeSimName} />
                  <div className={styles.resumeSimTitle} />
                  <div style={{ height: 1, background: 'var(--surface-container)', margin: '0.75rem 0' }} />
                  {[60, 90, 75, 85, 55, 70].map((w, i) => (
                    <div key={i} className={styles.resumeSimLine} style={{ width: `${w}%` }} />
                  ))}
                  <div style={{ height: 1, background: 'var(--surface-container)', margin: '0.75rem 0' }} />
                  {[85, 65, 80].map((w, i) => (
                    <div key={i} className={styles.resumeSimLine} style={{ width: `${w}%` }} />
                  ))}
                </div>
                <div className={styles.previewFooter}>
                  <span style={{ fontFamily: 'var(--font-headline)', fontWeight: 700, fontSize: '0.875rem' }}>
                    Elite Template v1.2
                  </span>
                  <span className={styles.previewBadge}>PREVIEW</span>
                </div>
              </div>
            </div>

            {/* Instant Optimize */}
            <div className={styles.optimizeCard}>
              <div className={styles.optimizeIconWrap}>
                <span className="material-symbols-outlined">auto_fix_high</span>
              </div>
              <div>
                <p className={styles.optimizeName}>Instant Optimize</p>
                <p className={styles.optimizeSub}>Refine bullet points instantly</p>
              </div>
              <span className="material-symbols-outlined" style={{ marginLeft: 'auto' }}>chevron_right</span>
            </div>
          </aside>
        </div>
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div>
            <span className={styles.footerBrand}>The Precision Architect</span>
            <p className={styles.footerCopy}>© {new Date().getFullYear()} Digital Atelier Inc. All rights reserved.</p>
          </div>
          <nav className={styles.footerNav}>
            {['Privacy', 'Terms', 'Career Advice', 'API'].map((l) => (
              <a key={l} href="#">{l}</a>
            ))}
          </nav>
        </div>
      </footer>
    </>
  )
}
