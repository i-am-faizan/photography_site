import { useEffect, useState } from "react";
import homepageFallback from "../data/homepageFallback";
import { adminApi } from "../lib/contentApi";
import { getImageUrl } from "../lib/contentUtils";

const cloneValue = (value) => JSON.parse(JSON.stringify(value));

const setByPath = (target, path, value) => {
  const keys = path.split(".");
  const next = cloneValue(target);
  let cursor = next;

  keys.slice(0, -1).forEach((key) => {
    cursor[key] = cursor[key] ?? {};
    cursor = cursor[key];
  });

  cursor[keys[keys.length - 1]] = value;
  return next;
};

const sectionLabels = {
  siteSettings: "Site Settings",
  hero: "Hero",
  featuredGallery: "Featured Gallery",
  story: "Story",
  portfolioSection: "Portfolio Section",
  servicesSection: "Services Section",
  speciality: "Speciality",
  contact: "Contact",
  footer: "Footer"
};

const collectionConfig = {
  portfolioItems: {
    path: "portfolio",
    title: "Portfolio Items",
    create: () => ({
      category: "wedding",
      title: "New Portfolio Item",
      subtitle: "",
      image: { url: "", publicId: "", alt: "" },
      sortOrder: Date.now(),
      published: true
    })
  },
  serviceItems: {
    path: "services",
    title: "Service Items",
    create: () => ({
      name: "New Service",
      desc: "",
      subtitle: "",
      longDescription: "",
      color: "linear-gradient(135deg, #202b4d, #11172a)",
      panelColor: "linear-gradient(135deg, #324678 0%, #1a2544 100%)",
      image: { url: "", publicId: "", alt: "" },
      sortOrder: Date.now(),
      published: true
    })
  },
  parallaxBlocks: {
    path: "parallax-blocks",
    title: "Parallax Blocks",
    create: () => ({
      subtitle: "",
      title: "",
      variant: "1",
      image: { url: "", publicId: "", alt: "" },
      sortOrder: Date.now(),
      published: true
    })
  }
};

const SectionPanel = ({ title, description, onSave, saving, children }) => (
  <section className="admin-panel">
    <div className="admin-panel-header">
      <div>
        <h2>{title}</h2>
        {description ? <p>{description}</p> : null}
      </div>
      {onSave ? (
        <button className="admin-button" onClick={onSave} disabled={saving}>
          {saving ? "Saving..." : "Save"}
        </button>
      ) : null}
    </div>
    <div className="admin-panel-body">{children}</div>
  </section>
);

const Field = ({ label, children }) => (
  <label className="admin-field">
    <span>{label}</span>
    {children}
  </label>
);

const TextInput = ({ label, value, onChange, type = "text" }) => (
  <Field label={label}>
    <input type={type} value={value || ""} onChange={(event) => onChange(event.target.value)} />
  </Field>
);

const TextArea = ({ label, value, onChange, rows = 4 }) => (
  <Field label={label}>
    <textarea rows={rows} value={value || ""} onChange={(event) => onChange(event.target.value)} />
  </Field>
);

const Toggle = ({ label, checked, onChange }) => (
  <label className="admin-toggle">
    <input type="checkbox" checked={Boolean(checked)} onChange={(event) => onChange(event.target.checked)} />
    <span>{label}</span>
  </label>
);

const ImageField = ({ label, value, onChange, folder, onUploadStart, onUploadEnd }) => {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    try {
      setUploading(true);
      onUploadStart?.();
      const uploaded = await adminApi.uploadImage(file, folder, value?.alt || "");
      onChange({ ...uploaded, alt: value?.alt || uploaded.alt || "" });
    } catch (error) {
      alert(error.message);
    } finally {
      setUploading(false);
      onUploadEnd?.();
      event.target.value = "";
    }
  };

  return (
    <div className="admin-image-field">
      <span>{label}</span>
      <div className="admin-image-preview">
        {getImageUrl(value) ? <img src={getImageUrl(value)} alt={value?.alt || label} /> : <div>No image selected</div>}
      </div>
      <div className="admin-grid two-col">
        <TextInput label="Image URL" value={value?.url || ""} onChange={(next) => onChange({ ...(value || {}), url: next })} />
        <TextInput label="Alt Text" value={value?.alt || ""} onChange={(next) => onChange({ ...(value || {}), alt: next })} />
      </div>
      <div className="admin-image-actions">
        <label className="admin-upload">
          <span>{uploading ? "Uploading..." : "Upload Image"}</span>
          <input type="file" accept="image/*" onChange={handleUpload} disabled={uploading} />
        </label>
      </div>
    </div>
  );
};

const ObjectListEditor = ({ title, items, onChange, renderItem, createItem }) => {
  const updateItem = (index, nextValue) => {
    onChange(items.map((item, itemIndex) => (itemIndex === index ? nextValue : item)));
  };

  const removeItem = (index) => {
    onChange(items.filter((_, itemIndex) => itemIndex !== index));
  };

  return (
    <div className="admin-list-editor">
      <div className="admin-list-header">
        <h3>{title}</h3>
        <button className="admin-button secondary" onClick={() => onChange([...(items || []), createItem()])}>
          Add Item
        </button>
      </div>
      {(items || []).map((item, index) => (
        <div key={`${title}-${index}`} className="admin-list-card">
          <div className="admin-list-card-header">
            <strong>{title} {index + 1}</strong>
            <button className="admin-link danger" onClick={() => removeItem(index)}>Remove</button>
          </div>
          {renderItem(item, (nextItem) => updateItem(index, nextItem), index)}
        </div>
      ))}
    </div>
  );
};

const sortByOrder = (items = []) => [...items].sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));

const AdminApp = () => {
  const [content, setContent] = useState(homepageFallback);
  const [sessionChecked, setSessionChecked] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [savingMap, setSavingMap] = useState({});
  const [statusMessage, setStatusMessage] = useState("");

  const saveState = (key, value) => setSavingMap((prev) => ({ ...prev, [key]: value }));

  const loadHomepage = async () => {
    setLoading(true);
    try {
      const data = await adminApi.getHomepage();
      setContent(data);
    } catch (error) {
      setStatusMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let active = true;

    const bootstrap = async () => {
      try {
        await adminApi.session();
        if (!active) {
          return;
        }
        setIsAuthenticated(true);
        await loadHomepage();
      } catch {
        if (active) {
          setIsAuthenticated(false);
        }
      } finally {
        if (active) {
          setSessionChecked(true);
        }
      }
    };

    bootstrap();

    return () => {
      active = false;
    };
  }, []);

  const updateSection = (sectionKey, updater) => {
    setContent((prev) => ({
      ...prev,
      [sectionKey]: typeof updater === "function" ? updater(prev[sectionKey]) : updater
    }));
  };

  const handleSectionFieldChange = (sectionKey, path, value) => {
    updateSection(sectionKey, (section) => setByPath(section, path, value));
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    setStatusMessage("");
    try {
      await adminApi.login(loginForm);
      setIsAuthenticated(true);
      await loadHomepage();
      setStatusMessage("Logged in successfully.");
    } catch (error) {
      setStatusMessage(error.message);
    } finally {
      setLoading(false);
      setSessionChecked(true);
    }
  };

  const handleLogout = async () => {
    await adminApi.logout();
    setIsAuthenticated(false);
    setStatusMessage("Logged out.");
  };

  const saveSection = async (sectionKey) => {
    saveState(sectionKey, true);
    setStatusMessage("");
    try {
      await adminApi.saveSection(sectionKey, content[sectionKey]);
      setStatusMessage(`${sectionLabels[sectionKey]} saved.`);
    } catch (error) {
      setStatusMessage(error.message);
    } finally {
      saveState(sectionKey, false);
    }
  };

  const saveCollectionItem = async (collectionKey, item) => {
    const config = collectionConfig[collectionKey];
    const mapKey = `${collectionKey}-${item._id || item.id || item.sortOrder}`;
    saveState(mapKey, true);
    try {
      const saved = item._id
        ? await adminApi.updateCollectionItem(config.path, item._id, item)
        : await adminApi.createCollectionItem(config.path, item);

      setContent((prev) => ({
        ...prev,
        [collectionKey]: prev[collectionKey].map((entry) =>
          (entry._id || entry.id || entry.sortOrder) === (item._id || item.id || item.sortOrder) ? saved : entry
        )
      }));

      if (!item._id) {
        setContent((prev) => ({
          ...prev,
          [collectionKey]: prev[collectionKey].map((entry) =>
            entry === item ? saved : entry
          )
        }));
      }

      setStatusMessage(`${config.title.slice(0, -1)} saved.`);
    } catch (error) {
      setStatusMessage(error.message);
    } finally {
      saveState(mapKey, false);
    }
  };

  const deleteCollectionItem = async (collectionKey, item) => {
    const config = collectionConfig[collectionKey];
    if (!item._id) {
      setContent((prev) => ({
        ...prev,
        [collectionKey]: prev[collectionKey].filter((entry) => entry !== item)
      }));
      return;
    }

    const mapKey = `${collectionKey}-${item._id}`;
    saveState(mapKey, true);
    try {
      await adminApi.deleteCollectionItem(config.path, item._id);
      setContent((prev) => ({
        ...prev,
        [collectionKey]: prev[collectionKey].filter((entry) => entry._id !== item._id)
      }));
      setStatusMessage(`${config.title.slice(0, -1)} deleted.`);
    } catch (error) {
      setStatusMessage(error.message);
    } finally {
      saveState(mapKey, false);
    }
  };

  const addCollectionItem = (collectionKey) => {
    const nextItem = collectionConfig[collectionKey].create();
    setContent((prev) => ({
      ...prev,
      [collectionKey]: [...prev[collectionKey], nextItem]
    }));
  };

  if (!sessionChecked) {
    return <div className="app-shell-state"><p>Checking admin session...</p></div>;
  }

  if (!isAuthenticated) {
    return (
      <div className="admin-shell">
        <div className="admin-login-card">
          <div>
            <p className="admin-kicker">Admin Panel</p>
            <h1>Manage website content and images</h1>
            <p>Sign in to update homepage sections, portfolio cards, service cards, contact details, and parallax imagery.</p>
          </div>
          <form onSubmit={handleLogin} className="admin-login-form">
            <TextInput label="Email" value={loginForm.email} onChange={(email) => setLoginForm((prev) => ({ ...prev, email }))} />
            <TextInput label="Password" type="password" value={loginForm.password} onChange={(password) => setLoginForm((prev) => ({ ...prev, password }))} />
            <button className="admin-button" type="submit" disabled={loading}>
              {loading ? "Signing In..." : "Sign In"}
            </button>
            {statusMessage ? <p className="admin-status">{statusMessage}</p> : null}
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-shell">
      <header className="admin-topbar">
        <div>
          <p className="admin-kicker">Protected CMS</p>
          <h1>STITCH Admin</h1>
        </div>
        <div className="admin-topbar-actions">
          <a className="admin-button secondary" href="/">Open Website</a>
          <button className="admin-button secondary" onClick={loadHomepage} disabled={loading}>
            {loading ? "Refreshing..." : "Refresh"}
          </button>
          <button className="admin-button" onClick={handleLogout}>Logout</button>
        </div>
      </header>

      {statusMessage ? <div className="admin-status-banner">{statusMessage}</div> : null}

      <SectionPanel title="Site Settings" description="Brand name, navigation, social links, and SEO defaults." onSave={() => saveSection("siteSettings")} saving={savingMap.siteSettings}>
        <div className="admin-grid two-col">
          <TextInput label="Brand Name" value={content.siteSettings.brandName} onChange={(value) => handleSectionFieldChange("siteSettings", "brandName", value)} />
          <TextInput label="SEO Title" value={content.siteSettings.seo.title} onChange={(value) => handleSectionFieldChange("siteSettings", "seo.title", value)} />
        </div>
        <TextArea label="SEO Description" value={content.siteSettings.seo.description} onChange={(value) => handleSectionFieldChange("siteSettings", "seo.description", value)} rows={3} />

        <ObjectListEditor
          title="Navigation Links"
          items={sortByOrder(content.siteSettings.navLinks)}
          onChange={(items) => handleSectionFieldChange("siteSettings", "navLinks", items)}
          createItem={() => ({ label: "New Link", href: "#", sortOrder: (content.siteSettings.navLinks?.length || 0) + 1 })}
          renderItem={(item, onItemChange) => (
            <div className="admin-grid three-col">
              <TextInput label="Label" value={item.label} onChange={(value) => onItemChange({ ...item, label: value })} />
              <TextInput label="Href" value={item.href} onChange={(value) => onItemChange({ ...item, href: value })} />
              <TextInput label="Sort Order" type="number" value={item.sortOrder} onChange={(value) => onItemChange({ ...item, sortOrder: Number(value) })} />
            </div>
          )}
        />

        <ObjectListEditor
          title="Social Links"
          items={content.siteSettings.socialLinks}
          onChange={(items) => handleSectionFieldChange("siteSettings", "socialLinks", items)}
          createItem={() => ({ label: "SOCIAL", href: "#" })}
          renderItem={(item, onItemChange) => (
            <div className="admin-grid two-col">
              <TextInput label="Label" value={item.label} onChange={(value) => onItemChange({ ...item, label: value })} />
              <TextInput label="Href" value={item.href} onChange={(value) => onItemChange({ ...item, href: value })} />
            </div>
          )}
        />
      </SectionPanel>

      <SectionPanel title="Hero" description="Homepage headline and hero carousel." onSave={() => saveSection("hero")} saving={savingMap.hero}>
        <div className="admin-grid two-col">
          <TextInput label="Heading" value={content.hero.heading} onChange={(value) => handleSectionFieldChange("hero", "heading", value)} />
          <TextInput label="Subheading" value={content.hero.subheading} onChange={(value) => handleSectionFieldChange("hero", "subheading", value)} />
        </div>
        <ObjectListEditor
          title="Hero Images"
          items={content.hero.images}
          onChange={(items) => handleSectionFieldChange("hero", "images", items)}
          createItem={() => ({ url: "", publicId: "", alt: "" })}
          renderItem={(item, onItemChange, index) => (
            <>
              <TextInput label="Alt Text" value={item.alt} onChange={(value) => onItemChange({ ...item, alt: value })} />
              <ImageField label={`Hero Image ${index + 1}`} value={item} onChange={onItemChange} folder="hero" />
            </>
          )}
        />
      </SectionPanel>

      <SectionPanel title="Featured Gallery" description="Bento gallery tiles and CTA." onSave={() => saveSection("featuredGallery")} saving={savingMap.featuredGallery}>
        <div className="admin-grid three-col">
          <TextInput label="Title" value={content.featuredGallery.title} onChange={(value) => handleSectionFieldChange("featuredGallery", "title", value)} />
          <TextInput label="CTA Label" value={content.featuredGallery.ctaLabel} onChange={(value) => handleSectionFieldChange("featuredGallery", "ctaLabel", value)} />
          <TextInput label="CTA Href" value={content.featuredGallery.ctaHref} onChange={(value) => handleSectionFieldChange("featuredGallery", "ctaHref", value)} />
        </div>
        {["lead", "stat", "wide", "cta", "tall", "short", "family"].map((key) => (
          <div key={key} className="admin-subpanel">
            <h3>{key}</h3>
            <ImageField
              label={`${key} image`}
              value={content.featuredGallery.cards[key].image}
              onChange={(value) => handleSectionFieldChange("featuredGallery", `cards.${key}.image`, value)}
              folder="featured-gallery"
            />
            {"title" in content.featuredGallery.cards[key] ? (
              <TextArea label="Title" value={content.featuredGallery.cards[key].title} onChange={(value) => handleSectionFieldChange("featuredGallery", `cards.${key}.title`, value)} rows={2} />
            ) : null}
            {"stat" in content.featuredGallery.cards[key] ? (
              <div className="admin-grid two-col">
                <TextInput label="Stat" value={content.featuredGallery.cards[key].stat} onChange={(value) => handleSectionFieldChange("featuredGallery", `cards.${key}.stat`, value)} />
                <TextInput label="Text" value={content.featuredGallery.cards[key].text} onChange={(value) => handleSectionFieldChange("featuredGallery", `cards.${key}.text`, value)} />
              </div>
            ) : null}
            {"accentTitle" in content.featuredGallery.cards[key] ? (
              <div className="admin-grid four-col">
                <TextInput label="Accent" value={content.featuredGallery.cards[key].accentTitle} onChange={(value) => handleSectionFieldChange("featuredGallery", `cards.${key}.accentTitle`, value)} />
                <TextInput label="Line One" value={content.featuredGallery.cards[key].lineOne} onChange={(value) => handleSectionFieldChange("featuredGallery", `cards.${key}.lineOne`, value)} />
                <TextInput label="Line Two" value={content.featuredGallery.cards[key].lineTwo} onChange={(value) => handleSectionFieldChange("featuredGallery", `cards.${key}.lineTwo`, value)} />
                <TextInput label="Line Three" value={content.featuredGallery.cards[key].lineThree} onChange={(value) => handleSectionFieldChange("featuredGallery", `cards.${key}.lineThree`, value)} />
              </div>
            ) : null}
          </div>
        ))}
      </SectionPanel>

      <SectionPanel title="Story" onSave={() => saveSection("story")} saving={savingMap.story}>
        <div className="admin-grid two-col">
          <TextInput label="Eyebrow" value={content.story.eyebrow} onChange={(value) => handleSectionFieldChange("story", "eyebrow", value)} />
          <TextInput label="Title" value={content.story.title} onChange={(value) => handleSectionFieldChange("story", "title", value)} />
        </div>
        <ObjectListEditor
          title="Paragraphs"
          items={content.story.paragraphs.map((paragraph) => ({ value: paragraph }))}
          onChange={(items) => handleSectionFieldChange("story", "paragraphs", items.map((item) => item.value))}
          createItem={() => ({ value: "" })}
          renderItem={(item, onItemChange) => <TextArea label="Paragraph" value={item.value} onChange={(value) => onItemChange({ value })} rows={4} />}
        />
        <ImageField label="Story Portrait" value={content.story.image} onChange={(value) => handleSectionFieldChange("story", "image", value)} folder="story" />
      </SectionPanel>

      <SectionPanel title="Portfolio Section" onSave={() => saveSection("portfolioSection")} saving={savingMap.portfolioSection}>
        <div className="admin-grid two-col">
          <TextInput label="Title" value={content.portfolioSection.title} onChange={(value) => handleSectionFieldChange("portfolioSection", "title", value)} />
          <TextInput label="Load More Label" value={content.portfolioSection.loadMoreLabel} onChange={(value) => handleSectionFieldChange("portfolioSection", "loadMoreLabel", value)} />
        </div>
        <TextArea label="Intro" value={content.portfolioSection.intro} onChange={(value) => handleSectionFieldChange("portfolioSection", "intro", value)} rows={3} />
        <div className="admin-grid two-col">
          <TextInput label="Initial Visible Count" type="number" value={content.portfolioSection.initialVisibleCount} onChange={(value) => handleSectionFieldChange("portfolioSection", "initialVisibleCount", Number(value))} />
          <TextInput label="Load More Step" type="number" value={content.portfolioSection.loadMoreStep} onChange={(value) => handleSectionFieldChange("portfolioSection", "loadMoreStep", Number(value))} />
        </div>
        <ObjectListEditor
          title="Filters"
          items={sortByOrder(content.portfolioSection.filters)}
          onChange={(items) => handleSectionFieldChange("portfolioSection", "filters", items)}
          createItem={() => ({ value: "new-category", label: "New Category", sortOrder: (content.portfolioSection.filters?.length || 0) + 1 })}
          renderItem={(item, onItemChange) => (
            <div className="admin-grid three-col">
              <TextInput label="Value" value={item.value} onChange={(value) => onItemChange({ ...item, value })} />
              <TextInput label="Label" value={item.label} onChange={(value) => onItemChange({ ...item, label: value })} />
              <TextInput label="Sort Order" type="number" value={item.sortOrder} onChange={(value) => onItemChange({ ...item, sortOrder: Number(value) })} />
            </div>
          )}
        />
      </SectionPanel>

      <SectionPanel title="Services Section" onSave={() => saveSection("servicesSection")} saving={savingMap.servicesSection}>
        <div className="admin-grid two-col">
          <TextInput label="Subtitle" value={content.servicesSection.subtitle} onChange={(value) => handleSectionFieldChange("servicesSection", "subtitle", value)} />
          <TextInput label="Title" value={content.servicesSection.title} onChange={(value) => handleSectionFieldChange("servicesSection", "title", value)} />
        </div>
      </SectionPanel>

      <SectionPanel title="Speciality" onSave={() => saveSection("speciality")} saving={savingMap.speciality}>
        <TextInput label="Title" value={content.speciality.title} onChange={(value) => handleSectionFieldChange("speciality", "title", value)} />
        <TextArea label="Description" value={content.speciality.description} onChange={(value) => handleSectionFieldChange("speciality", "description", value)} rows={4} />
        <ObjectListEditor
          title="Bullets"
          items={content.speciality.bullets.map((bullet) => ({ value: bullet }))}
          onChange={(items) => handleSectionFieldChange("speciality", "bullets", items.map((item) => item.value))}
          createItem={() => ({ value: "" })}
          renderItem={(item, onItemChange) => <TextInput label="Bullet" value={item.value} onChange={(value) => onItemChange({ value })} />}
        />
        <ImageField label="Speciality Image" value={content.speciality.image} onChange={(value) => handleSectionFieldChange("speciality", "image", value)} folder="speciality" />
      </SectionPanel>

      <SectionPanel title="Contact" onSave={() => saveSection("contact")} saving={savingMap.contact}>
        <div className="admin-grid two-col">
          <TextInput label="Subtitle" value={content.contact.subtitle} onChange={(value) => handleSectionFieldChange("contact", "subtitle", value)} />
          <TextInput label="Submit Label" value={content.contact.submitLabel} onChange={(value) => handleSectionFieldChange("contact", "submitLabel", value)} />
        </div>
        <TextArea label="Title" value={content.contact.title} onChange={(value) => handleSectionFieldChange("contact", "title", value)} rows={2} />
        <TextArea label="Body" value={content.contact.body} onChange={(value) => handleSectionFieldChange("contact", "body", value)} rows={3} />
        <TextArea label="Success Message" value={content.contact.successMessage} onChange={(value) => handleSectionFieldChange("contact", "successMessage", value)} rows={2} />
        <ObjectListEditor
          title="Contact Details"
          items={content.contact.details}
          onChange={(items) => handleSectionFieldChange("contact", "details", items)}
          createItem={() => ({ label: "Label", value: "", href: "" })}
          renderItem={(item, onItemChange) => (
            <div className="admin-grid three-col">
              <TextInput label="Label" value={item.label} onChange={(value) => onItemChange({ ...item, label: value })} />
              <TextInput label="Value" value={item.value} onChange={(value) => onItemChange({ ...item, value })} />
              <TextInput label="Href" value={item.href} onChange={(value) => onItemChange({ ...item, href: value })} />
            </div>
          )}
        />
      </SectionPanel>

      <SectionPanel title="Footer" onSave={() => saveSection("footer")} saving={savingMap.footer}>
        <div className="admin-grid two-col">
          <TextInput label="Logo Text" value={content.footer.logoText} onChange={(value) => handleSectionFieldChange("footer", "logoText", value)} />
          <TextInput label="Copyright Text" value={content.footer.copyrightText} onChange={(value) => handleSectionFieldChange("footer", "copyrightText", value)} />
        </div>
      </SectionPanel>

      {Object.entries(collectionConfig).map(([collectionKey, config]) => (
        <SectionPanel
          key={collectionKey}
          title={config.title}
          description="Create, edit, publish, and reorder repeatable content."
        >
          <div className="admin-list-header">
            <h3>{config.title}</h3>
            <button className="admin-button secondary" onClick={() => addCollectionItem(collectionKey)}>
              Add Item
            </button>
          </div>
          {sortByOrder(content[collectionKey]).map((item) => {
            const itemKey = item._id || item.id || item.sortOrder;
            return (
              <div key={itemKey} className="admin-list-card">
                <div className="admin-list-card-header">
                  <strong>{config.title.slice(0, -1)}</strong>
                  <div className="admin-inline-actions">
                    <button className="admin-button secondary" onClick={() => saveCollectionItem(collectionKey, item)} disabled={savingMap[`${collectionKey}-${itemKey}`]}>
                      {savingMap[`${collectionKey}-${itemKey}`] ? "Saving..." : "Save Item"}
                    </button>
                    <button className="admin-link danger" onClick={() => deleteCollectionItem(collectionKey, item)}>Delete</button>
                  </div>
                </div>

                {collectionKey === "portfolioItems" ? (
                  <>
                    <div className="admin-grid four-col">
                      <TextInput label="Title" value={item.title} onChange={(value) => setContent((prev) => ({ ...prev, portfolioItems: prev.portfolioItems.map((entry) => (entry === item ? { ...entry, title: value } : entry)) }))} />
                      <TextInput label="Subtitle" value={item.subtitle} onChange={(value) => setContent((prev) => ({ ...prev, portfolioItems: prev.portfolioItems.map((entry) => (entry === item ? { ...entry, subtitle: value } : entry)) }))} />
                      <TextInput label="Category" value={item.category} onChange={(value) => setContent((prev) => ({ ...prev, portfolioItems: prev.portfolioItems.map((entry) => (entry === item ? { ...entry, category: value } : entry)) }))} />
                      <TextInput label="Sort Order" type="number" value={item.sortOrder} onChange={(value) => setContent((prev) => ({ ...prev, portfolioItems: prev.portfolioItems.map((entry) => (entry === item ? { ...entry, sortOrder: Number(value) } : entry)) }))} />
                    </div>
                    <Toggle label="Published" checked={item.published} onChange={(value) => setContent((prev) => ({ ...prev, portfolioItems: prev.portfolioItems.map((entry) => (entry === item ? { ...entry, published: value } : entry)) }))} />
                    <ImageField label="Portfolio Image" value={item.image} onChange={(value) => setContent((prev) => ({ ...prev, portfolioItems: prev.portfolioItems.map((entry) => (entry === item ? { ...entry, image: value } : entry)) }))} folder="portfolio" />
                  </>
                ) : null}

                {collectionKey === "serviceItems" ? (
                  <>
                    <div className="admin-grid three-col">
                      <TextInput label="Name" value={item.name} onChange={(value) => setContent((prev) => ({ ...prev, serviceItems: prev.serviceItems.map((entry) => (entry === item ? { ...entry, name: value } : entry)) }))} />
                      <TextInput label="Short Text" value={item.desc} onChange={(value) => setContent((prev) => ({ ...prev, serviceItems: prev.serviceItems.map((entry) => (entry === item ? { ...entry, desc: value } : entry)) }))} />
                      <TextInput label="Subtitle" value={item.subtitle} onChange={(value) => setContent((prev) => ({ ...prev, serviceItems: prev.serviceItems.map((entry) => (entry === item ? { ...entry, subtitle: value } : entry)) }))} />
                    </div>
                    <TextArea label="Long Description" value={item.longDescription} onChange={(value) => setContent((prev) => ({ ...prev, serviceItems: prev.serviceItems.map((entry) => (entry === item ? { ...entry, longDescription: value } : entry)) }))} rows={4} />
                    <div className="admin-grid three-col">
                      <TextInput label="Card Gradient" value={item.color} onChange={(value) => setContent((prev) => ({ ...prev, serviceItems: prev.serviceItems.map((entry) => (entry === item ? { ...entry, color: value } : entry)) }))} />
                      <TextInput label="Panel Gradient" value={item.panelColor} onChange={(value) => setContent((prev) => ({ ...prev, serviceItems: prev.serviceItems.map((entry) => (entry === item ? { ...entry, panelColor: value } : entry)) }))} />
                      <TextInput label="Sort Order" type="number" value={item.sortOrder} onChange={(value) => setContent((prev) => ({ ...prev, serviceItems: prev.serviceItems.map((entry) => (entry === item ? { ...entry, sortOrder: Number(value) } : entry)) }))} />
                    </div>
                    <Toggle label="Published" checked={item.published} onChange={(value) => setContent((prev) => ({ ...prev, serviceItems: prev.serviceItems.map((entry) => (entry === item ? { ...entry, published: value } : entry)) }))} />
                    <ImageField label="Service Image" value={item.image} onChange={(value) => setContent((prev) => ({ ...prev, serviceItems: prev.serviceItems.map((entry) => (entry === item ? { ...entry, image: value } : entry)) }))} folder="services" />
                  </>
                ) : null}

                {collectionKey === "parallaxBlocks" ? (
                  <>
                    <div className="admin-grid four-col">
                      <TextInput label="Subtitle" value={item.subtitle} onChange={(value) => setContent((prev) => ({ ...prev, parallaxBlocks: prev.parallaxBlocks.map((entry) => (entry === item ? { ...entry, subtitle: value } : entry)) }))} />
                      <TextInput label="Title" value={item.title} onChange={(value) => setContent((prev) => ({ ...prev, parallaxBlocks: prev.parallaxBlocks.map((entry) => (entry === item ? { ...entry, title: value } : entry)) }))} />
                      <TextInput label="Variant" value={item.variant} onChange={(value) => setContent((prev) => ({ ...prev, parallaxBlocks: prev.parallaxBlocks.map((entry) => (entry === item ? { ...entry, variant: value } : entry)) }))} />
                      <TextInput label="Sort Order" type="number" value={item.sortOrder} onChange={(value) => setContent((prev) => ({ ...prev, parallaxBlocks: prev.parallaxBlocks.map((entry) => (entry === item ? { ...entry, sortOrder: Number(value) } : entry)) }))} />
                    </div>
                    <Toggle label="Published" checked={item.published} onChange={(value) => setContent((prev) => ({ ...prev, parallaxBlocks: prev.parallaxBlocks.map((entry) => (entry === item ? { ...entry, published: value } : entry)) }))} />
                    <ImageField label="Parallax Image" value={item.image} onChange={(value) => setContent((prev) => ({ ...prev, parallaxBlocks: prev.parallaxBlocks.map((entry) => (entry === item ? { ...entry, image: value } : entry)) }))} folder="parallax" />
                  </>
                ) : null}
              </div>
            );
          })}
        </SectionPanel>
      ))}
    </div>
  );
};

export default AdminApp;
