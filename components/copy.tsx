import "./market-sections.css"

/** A bracket with a capitalised key and a colon: [ZACH: years], [PROJECT 2: outcome]. */
const PLACEHOLDER = /(\[[A-Z][A-Z0-9 ]*:[^\]]+\])/

/**
 * Renders a line of copy from lib/site.ts. Any placeholder still in it is wrapped in
 * <mark> so unfinished information stands out on the page instead of reading as copy.
 */
export function Copy({ text }: { text: string }) {
  const parts = text.split(PLACEHOLDER)
  if (parts.length === 1) return <>{text}</>
  return (
    <>
      {parts.map((part, index) =>
        index % 2 ? (
          <mark key={index} className="placeholder" title="Information still needed">
            {part}
          </mark>
        ) : (
          part
        ),
      )}
    </>
  )
}
