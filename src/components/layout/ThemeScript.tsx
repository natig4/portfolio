// Runs before first paint so the stored/system theme is applied without a flash.
const code = `(()=>{try{var s=localStorage.getItem("theme"),d=s?s==="dark":matchMedia("(prefers-color-scheme: dark)").matches,e=document.documentElement;e.classList.toggle("dark",d);e.style.colorScheme=d?"dark":"light"}catch(_){}})()`;

export default function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}
