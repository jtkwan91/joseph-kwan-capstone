import hex from "./assets/images/hexagon.svg"

export function computeModifier(ability = 0, bonus = 0) {
  const total = ability + bonus
  if (total < 10) return Math.floor((10 - total) / -2)
  else return Math.floor((total - 10) / 2)
}

export function Hexagon({ ability, bonus = 0, onChange, label }) {
  return (
    <div className="create__hex--item">
      <div className="create__hex">
        <img src={hex} alt="hexagon" />
        <span className="create__hex--modifier">
          {computeModifier(ability, bonus)}
        </span>
        {bonus === 0 ? null : (
          <div className="create__hex--bonus">+{bonus}</div>
        )}
      </div>
      <input
        className="create__abilities--scores"
        type="text"
        Value={ability}
        onChange={onChange}
      />
      <div className="create__abilities--scores-names">{label}</div>
    </div>
  )
}

export function randomInt(n) {
  return Math.floor(Math.random() * n) + 1
}

export function computeHp(hitdie, abilityCon, bonusCon) {
  return Math.max(1, hitdie + computeModifier(abilityCon, bonusCon))
}
