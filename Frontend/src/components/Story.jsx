import { getImageUrl } from "../lib/contentUtils";

const Story = ({ story }) => {
  return (
    <section id="story">
      <div className="story-grid">
        <div className="story-image">
          <img src={getImageUrl(story?.image)} alt={story?.image?.alt || story?.title} />
        </div>
        <div className="story-content">
          <p style={{ letterSpacing: "0.5em", textTransform: "uppercase", color: "var(--primary-color)", fontSize: "0.75rem", marginBottom: "1rem" }}>
            {story?.eyebrow}
          </p>
          <h2>{story?.title}</h2>
          {(story?.paragraphs || []).map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Story;
