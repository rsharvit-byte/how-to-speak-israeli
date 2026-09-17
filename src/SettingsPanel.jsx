import { useState } from 'react'
import { Settings, X } from 'lucide-react'
import { DEFAULT_SETTINGS } from './cards'

function SliderRow({ label, value, display, min, max, step, onChange }) {
  return (
    <div className="settings-row">
      <div className="settings-row-header">
        <span className="settings-label">{label}</span>
        <span className="settings-value">{display}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
      />
    </div>
  )
}

export default function SettingsPanel({ settings, onSettingsChange }) {
  const [open, setOpen] = useState(false)

  const update = (key, value) => {
    onSettingsChange({ ...settings, [key]: value })
  }

  return (
    <>
      <button
        type="button"
        className="settings-toggle"
        aria-label="Open settings"
        onClick={() => setOpen((current) => !current)}
      >
        <Settings size={14} strokeWidth={2} />
      </button>

      {open && (
        <aside className="settings-panel">
          <div className="settings-panel-header">
            <button
              type="button"
              className="settings-close"
              aria-label="Close settings"
              onClick={() => setOpen(false)}
            >
              <X size={16} strokeWidth={2} />
            </button>
          </div>

          <div className="settings-panel-body">
            <SliderRow
              label="Animation Duration"
              value={settings.springDuration}
              display={`${settings.springDuration.toFixed(2)}s`}
              min={0.1}
              max={1}
              step={0.05}
              onChange={(value) => update('springDuration', value)}
            />
            <SliderRow
              label="Animation Bounce"
              value={settings.springBounce}
              display={settings.springBounce.toFixed(2)}
              min={0}
              max={1}
              step={0.05}
              onChange={(value) => update('springBounce', value)}
            />
            <SliderRow
              label="Duration"
              value={settings.xSpringDuration}
              display={`${settings.xSpringDuration.toFixed(2)}s`}
              min={0.1}
              max={1.5}
              step={0.05}
              onChange={(value) => update('xSpringDuration', value)}
            />
            <SliderRow
              label="Bounce"
              value={settings.xSpringBounce}
              display={settings.xSpringBounce.toFixed(2)}
              min={0}
              max={0.5}
              step={0.01}
              onChange={(value) => update('xSpringBounce', value)}
            />
            <SliderRow
              label="Drag Elasticity"
              value={settings.dragElastic}
              display={settings.dragElastic.toFixed(2)}
              min={0.1}
              max={1.5}
              step={0.05}
              onChange={(value) => update('dragElastic', value)}
            />
            <SliderRow
              label="Swipe Sensitivity"
              value={settings.swipeConfidenceThreshold}
              display={settings.swipeConfidenceThreshold.toLocaleString()}
              min={1000}
              max={20000}
              step={500}
              onChange={(value) => update('swipeConfidenceThreshold', value)}
            />
            <SliderRow
              label="Z-Index Delay"
              value={settings.zIndexDelay}
              display={`${settings.zIndexDelay.toFixed(3)}s`}
              min={0}
              max={0.2}
              step={0.01}
              onChange={(value) => update('zIndexDelay', value)}
            />

            <button
              type="button"
              className="settings-reset"
              onClick={() => onSettingsChange({ ...DEFAULT_SETTINGS })}
            >
              Reset to Defaults
            </button>
          </div>
        </aside>
      )}
    </>
  )
}
