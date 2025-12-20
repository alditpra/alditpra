import { e as createComponent, m as maybeRenderHead, h as addAttribute, k as renderComponent, r as renderTemplate, f as createAstro, s as spreadAttributes, l as renderScript } from '../chunks/astro/server_CZWJ3hdx.mjs';
import { h as $$Icon, S as SITE_CONFIG, f as cn, j as getColorByIndex, b as getAllLinks, c as getCategories, k as groupByCategory, e as $$MeshGradient, i as candyColors, $ as $$Layout } from '../chunks/utils_DrGUlCO-.mjs';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const $$SocialLinks = createComponent(($$result, $$props, $$slots) => {
  const socialLinks = [
    {
      name: "GitHub",
      href: "https://github.com/alditpra",
      icon: "github",
      bgClass: "bg-candy-purple/15 hover:bg-candy-purple/25",
      textClass: "text-[color:color-mix(in_srgb,var(--candy-purple),black_30%)]",
      iconColorClass: "text-candy-purple"
    },
    {
      name: "Email",
      href: "mailto:alditpra@gmail.com",
      icon: "mail",
      bgClass: "bg-candy-blue/15 hover:bg-candy-blue/25",
      textClass: "text-[color:color-mix(in_srgb,var(--candy-blue),black_40%)]",
      iconColorClass: "text-candy-blue"
    },
    {
      name: "Meet",
      href: "https://meet.google.com/nnb-unix-kyy",
      icon: "video",
      bgClass: "bg-candy-teal/15 hover:bg-candy-teal/25",
      textClass: "text-[color:color-mix(in_srgb,var(--candy-teal),black_40%)]",
      iconColorClass: "text-candy-teal"
    },
    {
      name: "Facebook",
      href: "https://facebook.com/aldit",
      icon: "facebook",
      bgClass: "bg-candy-blue/15 hover:bg-candy-blue/25",
      textClass: "text-[color:color-mix(in_srgb,var(--candy-blue),black_40%)]",
      iconColorClass: "text-candy-blue"
    },
    {
      name: "WhatsApp",
      href: "https://wa.me/628158141112",
      icon: "message-circle",
      bgClass: "bg-candy-teal/15 hover:bg-candy-teal/25",
      textClass: "text-[color:color-mix(in_srgb,var(--candy-teal),black_40%)]",
      iconColorClass: "text-candy-teal"
    }
  ];
  return renderTemplate`${maybeRenderHead()}<div class="flex flex-wrap items-center justify-center sm:justify-start gap-2"> ${socialLinks.map((link) => renderTemplate`<a${addAttribute(link.href, "href")} target="_blank" rel="noopener noreferrer"${addAttribute(`
                group inline-flex items-center gap-2 
                px-4 py-2 rounded-full
                ${link.bgClass}
                transition-all duration-300 ease-out
                hover:scale-105 hover:shadow-md
                border border-transparent hover:border-white/50
            `, "class")}${addAttribute(link.name, "title")}>  <span${addAttribute(`${link.iconColorClass} transition-transform duration-300 group-hover:scale-110`, "class")}> ${renderComponent($$result, "Icon", $$Icon, { "name": `lucide:${link.icon}`, "class": "w-4 h-4" })} </span>  <span${addAttribute(`text-sm font-medium ${link.textClass}`, "class")}> ${link.name} </span> </a>`)} </div>`;
}, "/home/alditpra/Github Repository/alditpra/src/components/features/profile-card/SocialLinks.astro", void 0);

const $$SearchBar = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="relative w-full group"> <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"> <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-search text-zinc-400 group-focus-within:text-zinc-600 transition-colors"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg> </div> <input type="text" id="search-input" class="block w-full pl-10 pr-4 py-3 bg-white/50 border border-zinc-200 rounded-xl text-zinc-900 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#7f73ff]/20 focus:border-[#7f73ff]/50 hover:bg-white/80 transition-all duration-300" placeholder="Cari link, tools, atau resource..." autocomplete="off"> <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"> <kbd class="hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 text-xs font-medium text-zinc-400 bg-zinc-100 rounded border border-zinc-200"> <span class="text-xs">⌘</span>K
</kbd> </div> </div>`;
}, "/home/alditpra/Github Repository/alditpra/src/components/ui/SearchBar.astro", void 0);

const $$ProfileCard = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<header class="mb-12" data-astro-cid-itlq5jux> <div class="relative backdrop-blur-xl bg-white/70 border border-white/50 rounded-3xl shadow-lg p-6 sm:p-8" id="profile-card" data-astro-cid-itlq5jux>  <div class="absolute inset-0 bg-gradient-to-br from-candy-purple/5 via-transparent to-candy-teal/5 pointer-events-none rounded-3xl" data-astro-cid-itlq5jux></div> <div class="relative flex flex-col sm:flex-row items-center sm:items-start gap-5 transition-all duration-500 ease-out" id="profile-info" data-astro-cid-itlq5jux>  <div class="shrink-0 group p-6 -m-6" data-astro-cid-itlq5jux> <div class="relative" data-astro-cid-itlq5jux>  <div class="absolute -inset-6 rounded-full bg-gradient-to-br from-purple-400/30 via-cyan-400/20 to-teal-400/30 blur-2xl animate-pulse-slow" data-astro-cid-itlq5jux></div>  <div class="absolute -inset-1 rounded-full bg-gradient-conic animate-spin-slow opacity-90" data-astro-cid-itlq5jux></div>  <div class="absolute -inset-0.5 rounded-full bg-white" data-astro-cid-itlq5jux></div>  <div class="relative rounded-full transition-transform duration-500 group-hover:scale-105 group-hover:rotate-3" data-astro-cid-itlq5jux> <img src="/avatar.webp"${addAttribute(SITE_CONFIG.name, "alt")} width="112" height="112" class="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-4 border-white" loading="eager" data-astro-cid-itlq5jux>  <div class="absolute bottom-1 right-1 w-5 h-5 bg-candy-teal rounded-full border-3 border-white shadow-md" data-astro-cid-itlq5jux> <div class="absolute inset-0 rounded-full bg-candy-teal animate-ping opacity-75" data-astro-cid-itlq5jux></div> </div> </div> </div> </div>  <div class="flex-1 text-center sm:text-left" data-astro-cid-itlq5jux>  <h1 class="text-3xl sm:text-4xl font-extrabold tracking-tight mb-1 animate-gradient-x" style="background: linear-gradient(135deg, var(--candy-purple) 0%, var(--candy-blue) 50%, var(--candy-teal) 100%); background-size: 200% 200%; -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; filter: drop-shadow(0 2px 8px rgba(127, 115, 255, 0.2));" data-astro-cid-itlq5jux> ${SITE_CONFIG.name} </h1>  <p class="text-base sm:text-lg text-zinc-700 font-normal leading-relaxed mb-5 max-w-lg" data-astro-cid-itlq5jux> ${SITE_CONFIG.description} </p> ${renderComponent($$result, "SocialLinks", $$SocialLinks, { "data-astro-cid-itlq5jux": true })} </div> </div>  <div class="h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent my-6 transition-all duration-500 ease-out" id="profile-divider" data-astro-cid-itlq5jux></div>  <div class="relative" id="search-wrapper" data-astro-cid-itlq5jux> ${renderComponent($$result, "SearchBar", $$SearchBar, { "data-astro-cid-itlq5jux": true })} </div> </div> </header> `;
}, "/home/alditpra/Github Repository/alditpra/src/components/features/profile-card/ProfileCard.astro", void 0);

const ALLOWED_DOMAINS = [
  "*.google.com",
  "*.googleusercontent.com",
  "google.com",
  "docs.google.com",
  "drive.google.com",
  "meet.google.com",
  "facebook.com",
  "wa.me",
  "whatsapp.com",
  "instagram.com",
  "twitter.com",
  "linkedin.com",
  "youtube.com",
  "github.com",
  "stackoverflow.com",
  "medium.com"
];
function sanitizeUrl(url) {
  if (!url || typeof url !== "string") {
    return "#";
  }
  const trimmedUrl = url.trim();
  if (trimmedUrl.startsWith("/") || trimmedUrl.startsWith("#")) {
    return trimmedUrl;
  }
  if (trimmedUrl.startsWith("//")) {
    return `https:${trimmedUrl}`;
  }
  try {
    const urlObj = new URL(trimmedUrl.startsWith("http") ? trimmedUrl : `https://${trimmedUrl}`);
    if (!["http:", "https:"].includes(urlObj.protocol)) {
      console.warn("Blocked insecure protocol:", urlObj.protocol);
      return "#";
    }
    const hostname = urlObj.hostname.toLowerCase();
    const isAllowed = ALLOWED_DOMAINS.some(
      (domain) => hostname === domain || hostname.endsWith(`.${domain}`)
    );
    if (!isAllowed) {
      console.warn("Blocked external domain:", hostname);
      return "#";
    }
    return urlObj.toString();
  } catch (error) {
    console.warn("Invalid URL format:", trimmedUrl, error);
    return "#";
  }
}
function getExternalLinkProps(url) {
  if (sanitizeUrl(url) === "#") {
    return {
      className: "cursor-not-allowed opacity-50"
    };
  }
  return {
    target: "_blank",
    rel: "noopener noreferrer"
  };
}

const $$Astro = createAstro();
const $$LinkCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$LinkCard;
  const { link, index = 0, className } = Astro2.props;
  if (!link || !link.id || !link.name) {
    throw new Error("Invalid link prop");
  }
  const color = getColorByIndex(index);
  const isDirectLink = link.level === 0 && link.link;
  const sanitizedLink = link.link ? sanitizeUrl(link.link) : "#";
  const href = isDirectLink && sanitizedLink !== "#" ? sanitizedLink : `/${link.id}`;
  const externalLinkProps = isDirectLink && sanitizedLink !== "#" ? getExternalLinkProps(sanitizedLink) : {};
  const faToLucideMap = {
    "object-group": "layout-grid",
    "book": "book-open",
    "video": "play-circle",
    "file-alt": "file-text",
    "cog": "settings",
    "certificate": "award",
    "tools": "wrench"
  };
  const rawIcon = link.icon;
  const iconName = rawIcon ? faToLucideMap[rawIcon] || rawIcon : null;
  const firstLetter = link.name.charAt(0).toUpperCase();
  return renderTemplate`${maybeRenderHead()}<a${addAttribute(href, "href")}${spreadAttributes(externalLinkProps)}${addAttribute(cn("group relative block w-full h-full link-card-item", className, externalLinkProps.className), "class")}${addAttribute(link.name.toLowerCase(), "data-name")}${addAttribute(link.category || "kuliah", "data-category")}> <div class="relative h-full transition-all duration-500 ease-out group-hover:-translate-y-2 group-hover:scale-[1.02]">  <div${addAttribute(cn(
    "absolute inset-0 rounded-3xl border-2 backdrop-blur-md transition-all duration-300",
    "bg-gradient-to-br from-white/80 to-white/40",
    "border-white/60 group-hover:border-transparent",
    color.border
  ), "class")}></div>  <div class="absolute inset-0 rounded-3xl opacity-0 transition-all duration-500 group-hover:opacity-100"${addAttribute(`box-shadow: 0 20px 40px -10px ${color.glow};`, "style")}></div>  <div class="relative p-6 h-full flex items-start gap-5">  <div${addAttribute(cn(
    "shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300",
    "group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-lg",
    color.bg,
    color.text
  ), "class")}${addAttribute(`box-shadow: 0 4px 15px -3px ${color.glow};`, "style")}> ${iconName ? renderTemplate`${renderComponent($$result, "Icon", $$Icon, { "name": `lucide:${iconName}`, "class": "w-7 h-7" })}` : renderTemplate`<span class="text-2xl font-bold">${firstLetter}</span>`} </div>  <div class="flex-1 min-w-0 space-y-2"> <div class="flex items-center gap-2"> <h3${addAttribute(cn(
    "font-bold text-lg text-zinc-800 truncate pr-4 transition-colors duration-300",
    "group-hover:text-zinc-900"
  ), "class")}> ${link.name} </h3> </div> ${link.description && renderTemplate`<p class="text-sm text-zinc-500 line-clamp-2 leading-relaxed group-hover:text-zinc-600 transition-colors"> ${link.description} </p>`}  ${link.semester && renderTemplate`<div class="flex items-center gap-2 pt-1"> <span${addAttribute(cn(
    "text-xs font-medium px-2.5 py-1 rounded-full",
    color.bg,
    color.text
  ), "class")}>
Semester ${link.semester} </span> </div>`} </div>  <div${addAttribute(cn(
    "shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300",
    "bg-zinc-100 text-zinc-400 group-hover:bg-zinc-900 group-hover:text-white",
    "group-hover:translate-x-1"
  ), "class")}> ${renderComponent($$result, "Icon", $$Icon, { "name": "lucide:arrow-right", "class": "w-4 h-4" })} </div> </div> </div> </a>`;
}, "/home/alditpra/Github Repository/alditpra/src/components/features/LinkCard.astro", void 0);

const $$HomePage = createComponent(async ($$result, $$props, $$slots) => {
  const links = await getAllLinks();
  const categories = await getCategories();
  const groupedLinks = groupByCategory(links, categories);
  return renderTemplate`${maybeRenderHead()}<main class="min-h-screen relative overflow-hidden bg-[#fafafa]">  ${renderComponent($$result, "MeshGradient", $$MeshGradient, {})} <div class="relative z-10 container mx-auto px-4 py-8 sm:py-12 max-w-4xl">  <div class="max-w-4xl mx-auto mb-12"> ${renderComponent($$result, "ProfileCard", $$ProfileCard, {})} </div> <div class="max-w-4xl mx-auto pb-20" id="links-container"> ${(() => {
    let globalIndex = 0;
    return categories.map((category, categoryIdx) => {
      const categoryLinks = groupedLinks.get(category.id) || [];
      if (categoryLinks.length === 0) return null;
      const headerColorIndex = globalIndex++;
      const headerColor = candyColors[headerColorIndex % candyColors.length];
      return renderTemplate`<section class="mb-16 link-section"${addAttribute(category.id, "data-category")}>  <div class="flex items-center gap-4 mb-8 px-1"> <div class="flex items-center gap-4">  <div${addAttribute(`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 ${headerColor.bg} ${headerColor.text}`, "class")}${addAttribute(`box-shadow: 0 8px 20px -4px ${headerColor.glow};`, "style")}> ${category.icon ? renderTemplate`${renderComponent($$result, "Icon", $$Icon, { "name": `lucide:${category.icon}`, "class": "w-6 h-6" })}` : renderTemplate`<span class="text-xl font-bold">${category.title.charAt(0).toUpperCase()}</span>`} </div>  <div class="flex flex-col gap-0.5"> <h2 class="text-2xl font-bold text-zinc-800 leading-tight"> ${category.title} </h2> ${category.description && renderTemplate`<p${addAttribute(`text-sm font-medium ${headerColor.text}`, "class")}> ${category.description} </p>`} </div>  <span${addAttribute(`text-sm font-bold px-3 py-1.5 rounded-full ${headerColor.bg} ${headerColor.text}`, "class")}> ${categoryLinks.length} </span> </div>  <div class="h-0.5 flex-1 rounded-full"${addAttribute(`background: linear-gradient(to right, ${headerColor.glow}50, transparent);`, "style")}></div> </div> <div class="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-7"> ${categoryLinks.map((link) => {
        const currentIndex = globalIndex++;
        return renderTemplate`${renderComponent($$result, "LinkCard", $$LinkCard, { "link": link, "index": currentIndex })}`;
      })} </div> </section>`;
    });
  })()} </div>  <div id="empty-state" class="hidden flex-col items-center justify-center py-20 text-center"> <div class="bg-zinc-100 p-4 rounded-full mb-4"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-search-x text-zinc-400"><path d="m13.5 8.5-5 5"></path><path d="m8.5 8.5 5 5"></path><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg> </div> <h3 class="text-lg font-medium text-zinc-900">Tidak ada hasil ditemukan</h3> <p class="text-zinc-500 mt-1">Coba kata kunci lain atau ubah kategori.</p> </div> </div> </main> ${renderScript($$result, "/home/alditpra/Github Repository/alditpra/src/components/HomePage.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/alditpra/Github Repository/alditpra/src/components/HomePage.astro", void 0);

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "HomePage", $$HomePage, {})} ` })}`;
}, "/home/alditpra/Github Repository/alditpra/src/pages/index.astro", void 0);

const $$file = "/home/alditpra/Github Repository/alditpra/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
