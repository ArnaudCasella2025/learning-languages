interface Props {
  icon: string;
  title: string;
  description: string;
  onClick: () => void;
}

export function ModuleCard({ icon, title, description, onClick }: Props) {
  return (
    <button className="module-card" onClick={onClick}>
      <span className="module-icon">{icon}</span>
      <span className="module-card-title">{title}</span>
      <span className="module-card-desc">{description}</span>
    </button>
  );
}
