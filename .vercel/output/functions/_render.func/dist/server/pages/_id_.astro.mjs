import { e as createComponent, f as createAstro, k as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from '../chunks/astro/server_BWEPh-Qp.mjs';
import { g as getLinkById, a as getLevelOneItemsByLink, b as getAllLinks, c as getCategories, d as getLinkColorIndex, $ as $$Layout, e as $$MeshGradient, f as cn, h as $$Icon, i as candyColors, j as getColorByIndex } from '../chunks/utils_DPyJ14CC.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$id = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$id;
  const { id } = Astro2.params;
  const linkData = await getLinkById(id);
  const items = await getLevelOneItemsByLink(id);
  if (!linkData) {
    return Astro2.redirect("/404");
  }
  const allLinks = await getAllLinks();
  const categories = await getCategories();
  const pageColorIndex = getLinkColorIndex(id, allLinks, categories);
  const pageColor = candyColors[pageColorIndex % candyColors.length];
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": `${linkData.name} - alditpra` }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="min-h-screen relative overflow-hidden bg-[#fafafa]"> ${renderComponent($$result2, "MeshGradient", $$MeshGradient, {})} <div class="relative z-10 container mx-auto px-4 py-8 sm:py-12 max-w-4xl">  <div class="mb-8">  <a href="/" class="inline-flex items-center gap-3 mb-6 group"> <div${addAttribute(cn(
    "p-2.5 rounded-2xl transition-all duration-300",
    "bg-white/60 backdrop-blur-md border border-white/80",
    "group-hover:bg-white group-hover:shadow-lg group-hover:scale-105",
    "group-hover:border-candy-purple"
  ), "class")} style="--hover-glow: var(--candy-purple);"> ${renderComponent($$result2, "Icon", $$Icon, { "name": "lucide:arrow-left", "class": "w-5 h-5 text-zinc-600 group-hover:text-candy-purple transition-colors" })} </div> <span class="font-semibold text-zinc-600 group-hover:text-zinc-900 transition-colors">Kembali</span> </a>  <div class="relative bg-white/50 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-white/60 shadow-xl overflow-hidden">  <div class="absolute inset-0 bg-gradient-to-br from-candy-purple/5 via-transparent to-candy-teal/5 pointer-events-none rounded-3xl"></div> <div class="relative flex items-start gap-5 sm:gap-6">  <div${addAttribute(cn(
    "shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center shadow-lg",
    pageColor.bg
  ), "class")}${addAttribute(`box-shadow: 0 8px 25px -5px ${pageColor.glow};`, "style")}> ${linkData.icon ? renderTemplate`${renderComponent($$result2, "Icon", $$Icon, { "name": `lucide:${linkData.icon}`, "class": cn("w-8 h-8 sm:w-10 sm:h-10", pageColor.text) })}` : renderTemplate`<span${addAttribute(cn("font-bold text-3xl sm:text-4xl uppercase", pageColor.text), "class")}> ${linkData.name.charAt(0)} </span>`} </div> <div class="flex-1 min-w-0">  <h1${addAttribute(cn("text-2xl sm:text-3xl font-extrabold mb-2", pageColor.text), "class")}> ${linkData.name} </h1> <p class="text-zinc-600 leading-relaxed text-base sm:text-lg"> ${linkData.description || "Detail materi dan referensi pembelajaran."} </p> </div> </div> </div> </div>  <div class="space-y-6"> ${(() => {
    const driveFolderMatch = linkData.link && linkData.link.match(/drive\.google\.com\/drive\/folders\/([a-zA-Z0-9_-]+)/);
    if (driveFolderMatch) {
      const folderId = driveFolderMatch[1];
      return renderTemplate`<div class="relative">  <div class="bg-white/50 backdrop-blur-xl rounded-t-3xl border border-b-0 border-white/60 p-5 sm:p-6"> <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">  <div class="flex items-center gap-3"> <div${addAttribute(cn("w-10 h-10 rounded-2xl flex items-center justify-center", pageColor.bg), "class")}${addAttribute(`box-shadow: 0 4px 15px -3px ${pageColor.glow};`, "style")}> ${renderComponent($$result2, "Icon", $$Icon, { "name": "lucide:folder-open", "class": cn("w-5 h-5", pageColor.text) })} </div> <div> <h2 class="text-lg sm:text-xl font-bold text-zinc-800">
Isi Folder
</h2> <p class="text-xs text-zinc-500">Klik file untuk membuka</p> </div> </div> <div class="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-between sm:justify-end">  <div class="flex items-center gap-1.5 p-1 bg-zinc-100/80 rounded-2xl"> <button id="view-grid" class="group p-2.5 rounded-xl bg-transparent hover:bg-white transition-all duration-200" title="Tampilan Grid" onclick="document.getElementById('drive-iframe').src = document.getElementById('drive-iframe').src.replace('#list', '#grid'); this.classList.add('bg-white', 'shadow-sm'); this.nextElementSibling.classList.remove('bg-white', 'shadow-sm');"> ${renderComponent($$result2, "Icon", $$Icon, { "name": "lucide:layout-grid", "class": "w-4 h-4 text-zinc-500 group-hover:text-zinc-800 transition-colors" })} </button> <button id="view-list" class="group p-2.5 rounded-xl bg-white shadow-sm transition-all duration-200" title="Tampilan List" onclick="document.getElementById('drive-iframe').src = document.getElementById('drive-iframe').src.replace('#grid', '#list'); this.classList.add('bg-white', 'shadow-sm'); this.previousElementSibling.classList.remove('bg-white', 'shadow-sm');"> ${renderComponent($$result2, "Icon", $$Icon, { "name": "lucide:list", "class": "w-4 h-4 text-zinc-500 group-hover:text-zinc-800 transition-colors" })} </button> </div>  <a${addAttribute(linkData.link, "href")} target="_blank" rel="noopener noreferrer"${addAttribute(cn(
        "group inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl transition-all duration-300",
        "bg-white/80 border border-white hover:border-transparent",
        "hover:scale-105 hover:shadow-lg"
      ), "class")}${addAttribute(`--hover-bg: ${pageColor.glow}15;`, "style")}> ${renderComponent($$result2, "Icon", $$Icon, { "name": "lucide:external-link", "class": cn("w-4 h-4 transition-colors", pageColor.text) })} <span${addAttribute(cn("font-semibold text-sm transition-colors hidden sm:inline", pageColor.text), "class")}>
Buka di Tab Baru
</span> <span${addAttribute(cn("font-semibold text-sm sm:hidden", pageColor.text), "class")}>
Buka
</span> </a> </div> </div> </div>  <div class="relative w-full h-[70vh] bg-white/60 backdrop-blur-md rounded-b-3xl border border-t-0 border-white/60 shadow-xl overflow-hidden">  <div class="absolute inset-0 flex items-center justify-center bg-white/90 iframe-skeleton"> <div class="flex flex-col items-center gap-4"> <div${addAttribute(cn("w-12 h-12 rounded-full border-4 border-t-transparent animate-spin", `border-[${pageColor.glow}]`), "class")}${addAttribute(`border-color: ${pageColor.glow}40; border-top-color: ${pageColor.glow};`, "style")}></div> <p class="text-zinc-500 font-medium">Memuat Google Drive...</p> </div> </div> <iframe id="drive-iframe"${addAttribute(`https://drive.google.com/embeddedfolderview?id=${folderId}#list`, "src")} width="100%" height="100%" style="border:0;" title="Google Drive Folder" class="relative z-10" onload="this.parentElement.querySelector('.iframe-skeleton').style.display='none'"></iframe> </div> </div>`;
    }
    if (items.length === 0) {
      return renderTemplate`<div class="text-center py-16 bg-white/40 backdrop-blur-md rounded-3xl border border-white/60 shadow-lg"> <div class="w-16 h-16 mx-auto mb-4 rounded-2xl bg-zinc-100 flex items-center justify-center"> ${renderComponent($$result2, "Icon", $$Icon, { "name": "lucide:inbox", "class": "w-8 h-8 text-zinc-400" })} </div> <p class="text-zinc-500 font-medium">Belum ada konten untuk topik ini.</p> </div>`;
    }
    return renderTemplate`<div class="grid gap-4"> ${items.map((item, index) => {
      const color = getColorByIndex(index);
      return renderTemplate`<a${addAttribute(item.link, "href")} target="_blank" rel="noopener noreferrer" class="group block bg-white/60 hover:bg-white backdrop-blur-sm border border-white/80 hover:border-transparent rounded-2xl p-3 sm:p-4 transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1"> <div class="flex items-center gap-3">  <div${addAttribute(cn(
        "shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300",
        "group-hover:scale-110 group-hover:rotate-3",
        color.bg
      ), "class")}${addAttribute(`box-shadow: 0 4px 15px -3px ${color.glow};`, "style")}> ${item.icon ? renderTemplate`${renderComponent($$result2, "Icon", $$Icon, { "name": `lucide:${item.icon}`, "class": cn("w-5 h-5", color.text) })}` : renderTemplate`<span${addAttribute(cn("text-lg font-bold", color.text), "class")}> ${item.title.charAt(0).toUpperCase()} </span>`} </div> <div class="flex-1 min-w-0">  <div class="flex items-center gap-2 mb-1"> <span${addAttribute(cn(
        "text-xs font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider",
        color.bg,
        color.text
      ), "class")}> ${item.type || "Link"} </span> </div> <h3 class="font-semibold text-base sm:text-lg text-zinc-900 truncate group-hover:text-zinc-700 transition-colors"> ${item.title} </h3> ${item.description && renderTemplate`<p class="text-sm text-zinc-500 line-clamp-2 leading-relaxed mt-0.5"> ${item.description} </p>`} </div>  <div${addAttribute(cn(
        "shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300",
        "bg-zinc-100 text-zinc-400",
        "group-hover:bg-zinc-900 group-hover:text-white group-hover:translate-x-1"
      ), "class")}> ${renderComponent($$result2, "Icon", $$Icon, { "name": "lucide:arrow-right", "class": "w-4 h-4" })} </div> </div> </a>`;
    })} </div>`;
  })()} </div> </div> </main> ` })}`;
}, "/home/alditpra/Github Repository/alditpra/src/pages/[id].astro", void 0);

const $$file = "/home/alditpra/Github Repository/alditpra/src/pages/[id].astro";
const $$url = "/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$id,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
