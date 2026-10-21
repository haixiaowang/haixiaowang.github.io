(() => {
  const papers = document.getElementById("research-papers");
  const controls = document.querySelector(".publication-view-controls");
  if (!papers || !controls) return;

  // Move the existing entries so Bib buttons, math, and previews keep their state.
  const yearGroups = Array.from(papers.querySelectorAll(":scope > h2.bibliography"), (heading) => {
    const list = heading.nextElementSibling;
    return { heading, list, items: Array.from(list.children) };
  });
  const topics = new Map();
  for (const group of yearGroups) {
    for (const item of group.items) {
      const topic = item.querySelector("[data-publication-topic]")?.dataset.publicationTopic || "Other papers";
      if (!topics.has(topic)) topics.set(topic, []);
      topics.get(topic).push(item);
    }
  }

  const topicOrder = JSON.parse(papers.dataset.topicOrder || "[]");
  const orderedTopics = [...new Set([...topicOrder, ...topics.keys()])].filter((topic) => topics.has(topic));
  const topicGroups = orderedTopics.map((topic) => {
    const heading = document.createElement("h2");
    heading.className = "bibliography publication-topic-heading";
    heading.textContent = topic;
    const list = document.createElement("ol");
    list.className = "bibliography";
    return { heading, list, items: topics.get(topic) };
  });

  const buttons = Array.from(controls.querySelectorAll("[data-publication-view]"));
  for (const button of buttons) {
    button.addEventListener("click", () => {
      if (button.getAttribute("aria-pressed") === "true") return;
      const groups = button.dataset.publicationView === "topic" ? topicGroups : yearGroups;
      const fragment = document.createDocumentFragment();
      for (const { heading, list, items } of groups) {
        list.replaceChildren(...items);
        fragment.append(heading, list);
      }
      papers.replaceChildren(fragment);
      for (const option of buttons) {
        option.setAttribute("aria-pressed", String(option === button));
      }
      window.dispatchEvent(new Event("resize"));
    });
  }
  controls.hidden = false;
})();
