const SELECTOR =
  ".reveal,.reveal-scale,.reveal-start,.reveal-end,.grow-x,.grow-y,.count-up";

// Marks entrance-animated elements data-seen the first time they come into view, then stops
// watching them, so each animation plays exactly once (paused until then in globals.css).
// Inline so it runs before hydration; the MutationObserver picks up client-side navigations.
const code = `(()=>{if(!("IntersectionObserver"in window)){document.querySelectorAll(${JSON.stringify(SELECTOR)}).forEach(e=>e.setAttribute("data-seen",""));return}var io=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting){e.target.setAttribute("data-seen","");io.unobserve(e.target)}})},{threshold:.15}),s=${JSON.stringify(SELECTOR)},scan=r=>{r.querySelectorAll(s+":not([data-seen])").forEach(e=>io.observe(e))};scan(document);new MutationObserver(ms=>{ms.forEach(m=>m.addedNodes.forEach(n=>{if(n.nodeType===1){if(n.matches(s)&&!n.hasAttribute("data-seen"))io.observe(n);scan(n)}}))}).observe(document.documentElement,{childList:true,subtree:true})})()`;

export default function RevealScript() {
  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}
