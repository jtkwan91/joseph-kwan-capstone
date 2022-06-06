export function computeModifier(ability = 0, bonus = 0) {
  const total = ability + bonus;
  if (total < 10) return Math.floor((10 - total) / -2);
  else return Math.floor((total - 10) / 2);
}

export function Hexagon({ ability, bonus = 0, onChange, label }) {
  return (
    <div className="create__hex--item">
      <div className="create__hex">
        <svg
          style={{ fill: "#ffb700" }}
          version="1.1"
          viewBox="0 0 1000 1000"
          width="50"
          height="50"
        >
          <g>
            <path d="M500,990L75.8,745V255L500,10l424.2,245v490L500,990z M99.8,731.1L500,962.3l400.2-231.1V268.9L500,37.7L99.8,268.9V731.1z" />
          </g>
        </svg>
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
        value={ability}
        onChange={onChange}
      />
      <div className="create__abilities--scores-names">{label}</div>
    </div>
  );
}

export function randomInt(n) {
  return Math.floor(Math.random() * n) + 1;
}

export function computeHp(hitdie, abilityCon, bonusCon) {
  return Math.max(1, hitdie + computeModifier(abilityCon, bonusCon));
}
