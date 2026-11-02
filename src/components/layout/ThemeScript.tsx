// Runs before first paint so the stored theme (dark by default) is applied without a flash.
const code = `(()=>{try{var d=localStorage.getItem("theme")!=="light",e=document.documentElement;e.classList.toggle("dark",d);e.style.colorScheme=d?"dark":"light"}catch(_){}})()`;

export default function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}
