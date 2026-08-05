/* FMED BACK BUTTON SYSTEM START */

const FMED_BACK_CLASS = "fmed-back-standard";
const FMED_BACK_TEXT = "TORNA INDIETRO";

const backWords = [
  "torna indietro",
  "torna ai processi",
  "torna al processo",
  "torna alla pagina precedente",
  "indietro",
  "back",
  "go back",
  "return"
];

const explicitSelectors = [
  ".fmed-wizard-head > button",
  ".fmed-process-create-page [class*='back']",
  ".fmed-process-detail-page [class*='back']",
  ".fmed-new-intervention-page [class*='back']",
  ".fmed-intervention-workspace [class*='back']",
  ".fmed-process-page [class*='back']",
  ".wizard [class*='back']",
  "[data-action='back']",
  "[data-role='back']",
  "[data-fmed-action='back']"
].join(",");

function normalize(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");
}

function hasBackMeaning(button) {
  if (!(button instanceof HTMLButtonElement)) return false;

  if (button.matches(explicitSelectors)) return true;

  const aria = normalize(button.getAttribute("aria-label"));
  const title = normalize(button.getAttribute("title"));
  const text = normalize(button.textContent);
  const className = normalize(button.className);

  if (backWords.some((word) => aria.includes(word))) return true;
  if (backWords.some((word) => title.includes(word))) return true;
  if (backWords.some((word) => text === word || text.startsWith(`${word} `))) return true;

  if (
    className.includes("back-button") ||
    className.includes("button-back") ||
    className.includes("go-back") ||
    className.includes("torna-indietro") ||
    className.includes("return-button")
  ) {
    return true;
  }

  return false;
}

function standardizeBackButton(button) {
  if (!hasBackMeaning(button)) return;

  if (!button.dataset.fmedOriginalLabel) {
    button.dataset.fmedOriginalLabel =
      button.getAttribute("aria-label") ||
      button.getAttribute("title") ||
      button.textContent ||
      "";
  }

  button.classList.add(FMED_BACK_CLASS);
  button.setAttribute("aria-label", FMED_BACK_TEXT);
  button.setAttribute("title", FMED_BACK_TEXT);

  if (button.textContent !== FMED_BACK_TEXT || button.children.length > 0) {
    button.replaceChildren(document.createTextNode(FMED_BACK_TEXT));
  }
}

function scan(root = document) {
  if (root instanceof HTMLButtonElement) {
    standardizeBackButton(root);
  }

  root.querySelectorAll?.("button").forEach(standardizeBackButton);
}

function startFmedBackButtonSystem() {
  scan(document);

  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      mutation.addedNodes.forEach((node) => {
        if (node instanceof Element) scan(node);
      });

      if (
        mutation.type === "attributes" &&
        mutation.target instanceof HTMLButtonElement
      ) {
        standardizeBackButton(mutation.target);
      }
    }
  });

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ["class", "aria-label", "title", "data-action", "data-role"]
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", startFmedBackButtonSystem, {
    once: true
  });
} else {
  startFmedBackButtonSystem();
}

/* FMED BACK BUTTON SYSTEM END */