"use client"

import { useId, useState, type CSSProperties, type ReactNode } from "react"
import "./project-comparison.css"

type ProjectComparisonProps = {
  before: ReactNode
  after: ReactNode
}

/** Pass two equally sized mockups; set --comparison-height on an ancestor to size the preview. */
export function ProjectComparison({ before, after }: ProjectComparisonProps) {
  const [position, setPosition] = useState(50)
  const instructionsId = useId()
  const comparisonStyle = { "--comparison-position": `${position}%` } as CSSProperties

  return (
    <div className="project-comparison" style={comparisonStyle}>
      <div className="project-comparison__labels" aria-hidden="true">
        <span>Before</span>
        <span>After</span>
      </div>
      <div className="project-comparison__visual">
        <div className="project-comparison__layer project-comparison__after" aria-hidden="true" inert>
          {after}
        </div>
        <div className="project-comparison__layer project-comparison__before" aria-hidden="true" inert>
          {before}
        </div>
        <div className="project-comparison__divider" aria-hidden="true">
          <span className="project-comparison__handle">
            <svg viewBox="0 0 28 20" fill="none">
              <path d="m9 5-5 5 5 5M4 10h8m7-5 5 5-5 5m5-5h-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
        <input
          className="project-comparison__range"
          type="range"
          min={0}
          max={100}
          step={1}
          value={position}
          onChange={(event) => setPosition(Number(event.target.value))}
          aria-label="Compare the original and redesigned website"
          aria-valuetext={`${position}% original, ${100 - position}% redesigned`}
          aria-describedby={instructionsId}
        />
      </div>
      <div className="project-comparison__caption" aria-hidden="true">
        <span>Drag to compare <span className="project-comparison__caption-arrow">↔</span></span>
        <span>{String(position).padStart(2, "0")} / {String(100 - position).padStart(2, "0")}</span>
      </div>
      <p className="project-comparison__instructions" id={instructionsId}>
        Move left to reveal more of the redesign, or right to reveal more of the original.
        You can also use the arrow keys. Home shows the complete redesign; End shows the original.
      </p>
    </div>
  )
}
