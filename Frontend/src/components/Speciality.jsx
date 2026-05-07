import { getImageUrl } from "../lib/contentUtils";

const Speciality = ({ speciality }) => {
  return (
    <section id="speciality" className="speciality">
      <div className="spec-grid">
        <div>
          <h2 className="section-title">{speciality?.title}</h2>
          <p style={{ marginBottom: "3rem" }}>{speciality?.description}</p>
          <ul style={{ listStyle: "none", color: "var(--text-muted)" }}>
            {(speciality?.bullets || []).map((bullet) => (
              <li key={bullet} style={{ marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "1rem" }}>
                <span style={{ color: "var(--primary-color)" }}>✦</span> {bullet}
              </li>
            ))}
          </ul>
        </div>
        <div style={{ background: "var(--surface-color)", aspectRatio: "1/1", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", border: "1px solid var(--accent-color)" }}>
          <img src={getImageUrl(speciality?.image)} alt={speciality?.image?.alt || speciality?.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
      </div>
    </section>
  );
};

export default Speciality;
