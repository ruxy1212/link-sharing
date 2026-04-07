import { useEffect, useState } from 'react'
import './toggle.css'

export default function Toggle({ isChecked }: { isChecked: boolean }) {
  const [checked, setChecked] = useState<boolean>(isChecked || false)
  useEffect(() => {
    if(isChecked !== undefined) setChecked(isChecked)
  }, [isChecked])
  return (
    <fieldset className="w-full flex items-center flex-wrap">
      <div className="toggle-container mx-3">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
          name="includeEmail"
          id="includeEmail"
          className="toggle-input"
        />
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 292 142" className="toggle">
          <path d="M71 142C31.7878 142 0 110.212 0 71C0 31.7878 31.7878 0 71 0C110.212 0 119 30 146 30C173 30 182 0 221 0C260 0 292 31.7878 292 71C292 110.212 260.212 142 221 142C181.788 142 173 112 146 112C119 112 110.212 142 71 142Z" className="toggle-background"></path>
          <rect rx="6" height="64" width="12" y="39" x="64" className="toggle-icon on"></rect>
          <path d="M221 91C232.046 91 241 82.0457 241 71C241 59.9543 232.046 51 221 51C209.954 51 201 59.9543 201 71C201 82.0457 209.954 91 221 91ZM221 103C238.673 103 253 88.6731 253 71C253 53.3269 238.673 39 221 39C203.327 39 189 53.3269 189 71C189 88.6731 203.327 103 221 103Z" fill-rule="evenodd" className="toggle-icon off"></path>
          <g filter="url('#goo')">
            <rect fill="#fff" rx="29" height="58" width="116" y="42" x="13" className="toggle-circle-center"></rect>
            <rect fill="#fff" rx="58" height="114" width="114" y="14" x="14" className="toggle-circle left"></rect>
            <rect fill="#fff" rx="58" height="114" width="114" y="14" x="164" className="toggle-circle right"></rect>
          </g>
          <filter id="goo">
            <feGaussianBlur stdDeviation="10" result="blur" in="SourceGraphic"></feGaussianBlur>
            <feColorMatrix result="goo" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" mode="matrix" in="blur"></feColorMatrix>
          </filter>
        </svg>
      </div>
      <label
        className="text-dl-dark-gray font-instrument text-sm md:text-base font-normal leading-[150%]"
        htmlFor="{label}"
      >
        Include email in profile links to be shared
      </label>
    </fieldset>
  )
}