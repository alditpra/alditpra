import { v as decodeKey } from './chunks/astro/server_CEVrwVh7.mjs';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_BpKNim0h.mjs';
import 'es-module-lexer';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///home/alditpra/Github%20Repository/alditpra/","cacheDir":"file:///home/alditpra/Github%20Repository/alditpra/node_modules/.astro/","outDir":"file:///home/alditpra/Github%20Repository/alditpra/dist/","srcDir":"file:///home/alditpra/Github%20Repository/alditpra/src/","publicDir":"file:///home/alditpra/Github%20Repository/alditpra/public/","buildClientDir":"file:///home/alditpra/Github%20Repository/alditpra/dist/client/","buildServerDir":"file:///home/alditpra/Github%20Repository/alditpra/dist/server/","adapterName":"@astrojs/vercel","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/_id_.CkNP83HS.css"},{"type":"inline","content":"/*! tailwindcss v4.0.0-beta.1 | MIT License | https://tailwindcss.com */@keyframes blob{0%{transform:translate(0)scale(1)}33%{transform:translate(30px,-50px)scale(1.1)}66%{transform:translate(-20px,20px)scale(.9)}to{transform:translate(0)scale(1)}}.animate-blob[data-astro-cid-wczh3e54]{animation:7s infinite blob}.animation-delay-2000[data-astro-cid-wczh3e54]{animation-delay:2s}.animation-delay-4000[data-astro-cid-wczh3e54]{animation-delay:4s}\n"}],"routeData":{"route":"/[id]","isIndex":false,"type":"page","pattern":"^\\/([^/]+?)\\/?$","segments":[[{"content":"id","dynamic":true,"spread":false}]],"params":["id"],"component":"src/pages/[id].astro","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/_id_.CkNP83HS.css"},{"type":"inline","content":"/*! tailwindcss v4.0.0-beta.1 | MIT License | https://tailwindcss.com */@keyframes blob{0%{transform:translate(0)scale(1)}33%{transform:translate(30px,-50px)scale(1.1)}66%{transform:translate(-20px,20px)scale(.9)}to{transform:translate(0)scale(1)}}.animate-blob[data-astro-cid-wczh3e54]{animation:7s infinite blob}.animation-delay-2000[data-astro-cid-wczh3e54]{animation-delay:2s}.animation-delay-4000[data-astro-cid-wczh3e54]{animation-delay:4s}\n/*! tailwindcss v4.0.0-beta.1 | MIT License | https://tailwindcss.com */@keyframes gradient-x{0%,to{background-position:0%}50%{background-position:100%}}.animate-gradient-x[data-astro-cid-itlq5jux]{animation:6s ease-in-out infinite gradient-x}.bg-gradient-conic[data-astro-cid-itlq5jux]{background:conic-gradient(#7f73ff,#14d0f0,#35e2c3,#f59e0b,#ec4899,#7f73ff)}@keyframes spin-slow{0%{transform:rotate(0)}to{transform:rotate(360deg)}}.animate-spin-slow[data-astro-cid-itlq5jux]{animation:4s linear infinite spin-slow}@keyframes float-slow{0%,to{transform:translate(0)scale(1)}33%{transform:translate(15px,-10px)scale(1.05)}66%{transform:translate(-10px,15px)scale(.95)}}@keyframes float-slow-reverse{0%,to{transform:translate(0)scale(1)}33%{transform:translate(-15px,10px)scale(.95)}66%{transform:translate(10px,-15px)scale(1.05)}}@keyframes pulse-slow{0%,to{opacity:.3;transform:translate(-50%,-50%)scale(1)}50%{opacity:.5;transform:translate(-50%,-50%)scale(1.2)}}.animate-float-slow[data-astro-cid-itlq5jux]{animation:8s ease-in-out infinite float-slow}.animate-float-slow-reverse[data-astro-cid-itlq5jux]{animation:10s ease-in-out infinite float-slow-reverse}.animate-pulse-slow[data-astro-cid-itlq5jux]{animation:6s ease-in-out infinite pulse-slow}.avatar-glow[data-astro-cid-itlq5jux]{box-shadow:0 0 25px 6px #9370db66,0 0 50px 12px #14d0f04d,0 0 80px 20px #35e2c333}#profile-info[data-astro-cid-itlq5jux]{opacity:1;max-height:500px;margin-bottom:0;transition:max-height .5s cubic-bezier(.4,0,.2,1),opacity .4s cubic-bezier(.4,0,.2,1),margin .5s cubic-bezier(.4,0,.2,1),transform .4s cubic-bezier(.4,0,.2,1),overflow 0s linear .5s;overflow:visible;transform:translateY(0)}#profile-card[data-astro-cid-itlq5jux]:focus-within #profile-info[data-astro-cid-itlq5jux],#search-wrapper[data-astro-cid-itlq5jux].has-text~#profile-info[data-astro-cid-itlq5jux],.has-text[data-astro-cid-itlq5jux] #profile-info[data-astro-cid-itlq5jux]{opacity:0;pointer-events:none;max-height:0;margin-bottom:0;transition:max-height .5s cubic-bezier(.4,0,.2,1),opacity .4s cubic-bezier(.4,0,.2,1),margin .5s cubic-bezier(.4,0,.2,1),transform .4s cubic-bezier(.4,0,.2,1),overflow linear;overflow:hidden;transform:translateY(-10px)}#profile-divider[data-astro-cid-itlq5jux]{max-height:10px;transition:max-height .5s cubic-bezier(.4,0,.2,1),opacity .3s cubic-bezier(.4,0,.2,1),margin .5s cubic-bezier(.4,0,.2,1);overflow:hidden}#profile-card[data-astro-cid-itlq5jux]:focus-within #profile-divider[data-astro-cid-itlq5jux]{opacity:0;max-height:0;margin-top:0;margin-bottom:0}#search-wrapper[data-astro-cid-itlq5jux]{padding-top:0;padding-bottom:0;transition:padding .5s cubic-bezier(.4,0,.2,1)}#profile-card[data-astro-cid-itlq5jux]:focus-within #search-wrapper[data-astro-cid-itlq5jux],#search-wrapper[data-astro-cid-itlq5jux].has-text{padding-top:.25rem;padding-bottom:.25rem}\n"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/home/alditpra/Github Repository/alditpra/src/pages/[id].astro",{"propagation":"none","containsHead":true}],["/home/alditpra/Github Repository/alditpra/src/pages/index.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000virtual:astro:actions/noop-entrypoint":"noop-entrypoint.mjs","\u0000@astro-page:src/pages/[id]@_@astro":"pages/_id_.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_B1Zr1y2Q.mjs","/home/alditpra/Github Repository/alditpra/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_Cks1accd.mjs","/home/alditpra/Github Repository/alditpra/src/components/HomePage.astro?astro&type=script&index=0&lang.ts":"_astro/HomePage.astro_astro_type_script_index_0_lang.Uz-iSgee.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["/home/alditpra/Github Repository/alditpra/src/components/HomePage.astro?astro&type=script&index=0&lang.ts","document.addEventListener(\"astro:page-load\",()=>{d()});d();function d(){const l=document.getElementById(\"search-input\"),y=document.querySelectorAll(\".link-section\"),m=document.querySelectorAll(\".link-card-item\"),s=document.getElementById(\"empty-state\");document.getElementById(\"profile-info\"),document.getElementById(\"profile-divider\"),document.getElementById(\"search-wrapper\");let n=\"\";function r(){let e=!1;const o=n;m.forEach(t=>{const c=(t.getAttribute(\"data-name\")||\"\").toLowerCase();t.getAttribute(\"data-category\");const a=t,i=a.closest(\".link-section\");c.includes(o)?(a.classList.remove(\"hidden\"),a.style.display=\"\",e=!0,i&&(i.classList.remove(\"hidden\"),i.style.display=\"\")):(a.classList.add(\"hidden\"),a.style.display=\"none\")}),y.forEach(t=>{Array.from(t.querySelectorAll(\".link-card-item\")).filter(a=>a.style.display!==\"none\").length===0?(t.classList.add(\"hidden\"),t.style.display=\"none\"):(t.classList.remove(\"hidden\"),t.style.display=\"\")}),!e&&n?(s?.classList.remove(\"hidden\"),s?.style.removeProperty(\"display\"),s&&(s.style.display=\"flex\")):(s?.classList.add(\"hidden\"),s&&(s.style.display=\"none\"))}l?.addEventListener(\"input\",e=>{n=e.target.value.trim().toLowerCase(),r()}),l?.addEventListener(\"blur\",()=>{const e=document.getElementById(\"search-wrapper\");n&&n.length>0?e?.classList.add(\"has-text\"):e?.classList.remove(\"has-text\")}),l?.addEventListener(\"input\",()=>{const e=document.getElementById(\"search-wrapper\");(!n||n.length===0)&&e?.classList.remove(\"has-text\")}),document.addEventListener(\"keydown\",e=>{(e.metaKey||e.ctrlKey)&&e.key===\"k\"&&(e.preventDefault(),l?.focus())}),r()}document.readyState===\"loading\"?document.addEventListener(\"DOMContentLoaded\",d):d();"]],"assets":["/_astro/inter-cyrillic-ext-400-normal.BQZuk6qB.woff2","/_astro/inter-cyrillic-400-normal.obahsSVq.woff2","/_astro/inter-greek-ext-400-normal.DGGRlc-M.woff2","/_astro/inter-vietnamese-400-normal.DMkecbls.woff2","/_astro/inter-greek-400-normal.B4URO6DV.woff2","/_astro/inter-latin-ext-400-normal.C1nco2VV.woff2","/_astro/inter-latin-400-normal.C38fXH4l.woff2","/_astro/inter-cyrillic-ext-400-normal.DQukG94-.woff","/_astro/inter-cyrillic-400-normal.HOLc17fK.woff","/_astro/inter-greek-ext-400-normal.KugGGMne.woff","/_astro/inter-vietnamese-400-normal.Bbgyi5SW.woff","/_astro/inter-greek-400-normal.q2sYcFCs.woff","/_astro/inter-latin-ext-400-normal.77YHD8bZ.woff","/_astro/inter-latin-400-normal.CyCys3Eg.woff","/_astro/_id_.CkNP83HS.css","/avatar.webp","/favicon.ico","/file.svg","/globe.svg","/next.svg","/vercel.svg","/window.svg"],"buildFormat":"directory","checkOrigin":true,"allowedDomains":[],"serverIslandNameMap":[],"key":"BgYJlx49RT4Ttr84J/OKLXiffchSZCi2oEVqBm43QJQ="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
