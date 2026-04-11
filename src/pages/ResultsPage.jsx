import { useLocation, useNavigate, Navigate } from 'react-router-dom'
import { useRef } from 'react'
import Navbar from '../components/Navbar.jsx'
import styles from './ResultsPage.module.css'

export default function ResultsPage() {
  const { state } = useLocation()
  const navigate = useNavigate()
  const resumeRef = useRef(null)

  // Redirect if no data
  if (!state?.resumeData) {
    return <Navigate to="/" replace />
  }

  const r = state.resumeData

  /* ── PDF Download ── */
  const handleDownloadPDF = async () => {
    const element = resumeRef.current
    if (!element) return

    // Dynamically import html2pdf to avoid SSR issues
    const html2pdf = (await import('html2pdf.js')).default

    const opt = {
      margin: [10, 10, 10, 10],
      filename: `${r.name.replace(/\s+/g, '_')}_Resume.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, logging: false },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    }

    html2pdf().set(opt).from(element).save()
  }

  return (
    <>
      <Navbar />

      <main className={styles.main}>
        {/* ── Page Header ── */}
        <div className={styles.pageHeader}>
          <div>
            <div className={styles.headerRow}>
              <button className={styles.backBtn} onClick={() => navigate('/')} id="back-btn">
                <span className="material-symbols-outlined" style={{ fontSize: 20 }}>arrow_back</span>
                Back
              </button>
            </div>
            <h1 className={styles.pageTitle}>Final Draft Analysis</h1>
            <p className={styles.pageSub}>Review your AI-optimized resume before exporting.</p>
          </div>
          <div className={styles.liveBadge}>
            <span className={styles.liveDot} />
            <span>Live Preview</span>
          </div>
        </div>

        {/* ── Grid ── */}
        <div className={styles.grid}>
          {/* ── Resume Canvas ── */}
          <div className={styles.canvasWrap}>
            <div className={styles.canvasBg}>
              {/* The element exported to PDF */}
              <div id="resume-output" ref={resumeRef} className={styles.resumePaper}>
                {/* Header */}
                <div className={styles.rHeader}>
                  <div>
                    <h2 className={styles.rName}>{r.name}</h2>
                    <p className={styles.rTitle}>{r.jobTitle}</p>
                  </div>
                  <div className={styles.rContact}>
                    <p>{r.contact?.email}</p>
                    <p>{r.contact?.phone}</p>
                    <p>{r.contact?.location}</p>
                  </div>
                </div>

                {/* Summary */}
                <div className={styles.rSection}>
                  <h3 className={styles.rSectionTitle}>Professional Summary</h3>
                  <p className={styles.rParagraph}>{r.summary}</p>
                </div>

                {/* Experience */}
                {r.experience?.length > 0 && (
                  <div className={styles.rSection}>
                    <h3 className={styles.rSectionTitle}>Experience</h3>
                    <div className={styles.rExpList}>
                      {r.experience.map((job, i) => (
                        <div key={i} className={styles.rExpItem}>
                          <div className={styles.rExpBar} />
                          <div className={styles.rExpContent}>
                            <div className={styles.rExpTop}>
                              <h4 className={styles.rExpTitle}>{job.title}</h4>
                              <span className={styles.rExpPeriod}>{job.period}</span>
                            </div>
                            <p className={styles.rExpCompany}>{job.company}</p>
                            <ul className={styles.rBullets}>
                              {job.bullets?.map((b, j) => (
                                <li key={j}>{b}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Skills & Education – Two columns */}
                <div className={styles.rGrid2}>
                  {/* Skills */}
                  {r.skills?.length > 0 && (
                    <div className={styles.rSection}>
                      <h3 className={styles.rSectionTitle}>Expertise</h3>
                      <div className={styles.rSkills}>
                        {r.skills.map((s, i) => (
                          <span key={i} className={styles.rSkillChip}>{s}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Education */}
                  {r.education && (
                    <div className={styles.rSection}>
                      <h3 className={styles.rSectionTitle}>Education</h3>
                      <p className={styles.rEduDegree}>{r.education.degree}</p>
                      <p className={styles.rEduInst}>{r.education.institution}</p>
                      {r.education.year && (
                        <p className={styles.rEduYear}>{r.education.year}</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* ── Control Panel ── */}
          <aside className={styles.panel}>
            {/* Export Card */}
            <div className={styles.exportCard}>
              <div>
                <h2 className={styles.exportTitle}>Export Options</h2>
                <p className={styles.exportSub}>Your resume is ready for the professional world.</p>
              </div>

              <button
                id="download-pdf-btn"
                className="btn-primary large"
                onClick={handleDownloadPDF}
              >
                <span className="material-symbols-outlined">download</span>
                Download PDF
              </button>

              <div className={styles.exportActions}>
                <button className="btn-secondary" onClick={() => navigate('/')} id="edit-btn">
                  <span className="material-symbols-outlined" style={{ fontSize: 18 }}>edit</span>
                  Edit
                </button>
                <button
                  className="btn-secondary"
                  onClick={() => navigator.share?.({ title: `${r.name}'s Resume`, url: window.location.href })}
                  id="share-btn"
                >
                  <span className="material-symbols-outlined" style={{ fontSize: 18 }}>share</span>
                  Share
                </button>
              </div>
            </div>

            {/* AI Insights */}
            <div className={styles.insightsSection}>
              <h3 className={styles.insightsHeader}>
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: 18, color: 'var(--primary)', fontVariationSettings: "'FILL' 1" }}
                >
                  bolt
                </span>
                AI Analysis Insights
              </h3>

              {r.insights?.map((insight, i) => (
                <div
                  key={i}
                  className={`insight-card ${insight.type === 'tip' ? 'tertiary' : ''} fade-up`}
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <p className={styles.insightText}>
                    <span style={{ fontWeight: 700 }}>
                      {insight.type === 'positive' ? 'Strong Impact: ' : 'Optimization Tip: '}
                    </span>
                    {insight.text}
                  </p>
                </div>
              ))}

              <button className="btn-tertiary" id="apply-suggestions-btn">
                <span className="material-symbols-outlined">auto_fix_high</span>
                Apply AI Suggestions
              </button>
            </div>

            {/* Metrics */}
            <div className={styles.metricsGrid}>
              <div className="score-badge">
                <span className="score-value">{r.atsScore ?? 88}</span>
                <span className="score-label">ATS Score</span>
              </div>
              <div className="score-badge">
                <span className="score-value">{r.keywordsFound ?? 12}</span>
                <span className="score-label">Keywords Found</span>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* Mobile bottom action bar */}
      <div className={styles.mobileBar}>
        <button className="btn-primary" style={{ flex: 1 }} onClick={handleDownloadPDF}>
          <span className="material-symbols-outlined">download</span>
          PDF
        </button>
        <button className="btn-secondary" style={{ flex: 1 }} onClick={() => navigate('/')}>
          <span className="material-symbols-outlined">edit</span>
          Edit
        </button>
      </div>
    </>
  )
}
