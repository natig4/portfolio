const REVEALS = ".reveal,.reveal-scale,.reveal-start,.reveal-end";
const GROWS = ".grow-x,.grow-y";

// Start reveal effects before content enters the viewport. If observation is late,
// keep already-visible content in place instead of making it disappear and re-enter.
// data-seen records completion; data-reveal-motion owns only the active animation.
// Inline so it runs before hydration; the MutationObserver picks up client-side navigations.
const code = `(() => {
  const reveals = ${JSON.stringify(REVEALS)};
  const grows = ${JSON.stringify(GROWS)};
  const selector = reveals + "," + grows;
  const motion = typeof matchMedia === "function"
    ? matchMedia("(prefers-reduced-motion: reduce)") : null;
  const hasObserver = typeof IntersectionObserver === "function";
  const revealObserver = hasObserver ? new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const element = entry.target;
      if (!entry.isIntersecting || !element.isConnected || element.hasAttribute("data-seen")) return;
      // Read current geometry, not the potentially stale observer entry. Include
      // both viewports so Safari toolbar changes cannot hide visible content.
      const rect = element.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const visual = window.visualViewport;
      const top = Math.min(0, visual ? visual.offsetTop : 0);
      const bottom = Math.max(document.documentElement.clientHeight, window.innerHeight,
        visual ? visual.offsetTop + visual.height : 0);
      element.setAttribute("data-seen", "");
      revealObserver.unobserve(element);
      if (motion && !motion.matches && (rect.top >= bottom || rect.bottom <= top)) {
        element.setAttribute("data-reveal-motion", "");
      }
    });
  }, { rootMargin: "160px 0px", threshold: 0 }) : null;
  const growObserver = hasObserver ? new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.setAttribute("data-seen", "");
        growObserver.unobserve(entry.target);
      }
    });
  }, { threshold: .15 }) : null;

  const finish = event => {
    if (event.animationName.startsWith("reveal") && event.target.matches(reveals)) {
      event.target.removeAttribute("data-reveal-motion");
    }
  };
  document.addEventListener("animationend", finish);
  document.addEventListener("animationcancel", finish);
  if (motion) motion.addEventListener("change", () => {
    if (motion.matches) document.querySelectorAll("[data-reveal-motion]")
      .forEach(element => element.removeAttribute("data-reveal-motion"));
  });

  const observe = element => {
    if (element.hasAttribute("data-seen")) return;
    const observer = element.matches(reveals) ? revealObserver : growObserver;
    if (observer) observer.observe(element);
    else element.setAttribute("data-seen", "");
  };
  const scan = root => root.querySelectorAll(selector).forEach(observe);
  scan(document);
  new MutationObserver(mutations => {
    mutations.forEach(mutation => mutation.addedNodes.forEach(node => {
      if (node.nodeType !== 1) return;
      if (node.matches(selector)) observe(node);
      scan(node);
    }));
  }).observe(document.documentElement, { childList: true, subtree: true });
})()`;

export default function RevealScript() {
  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}
