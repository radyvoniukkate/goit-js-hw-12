import{S as g,a as y,i as a}from"./assets/vendor-f144e563.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const m of o.addedNodes)m.tagName==="LINK"&&m.rel==="modulepreload"&&r(m)}).observe(document,{childList:!0,subtree:!0});function n(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(e){if(e.ep)return;e.ep=!0;const o=n(e);fetch(e.href,o)}})();const h=new g(".image-link");function p(s){const t=document.getElementById("gallery");if(s.length===0){console.log("No images found");return}const n=s.map(e=>`
    <a href="${e.largeImageURL}" class="image-link">
      <div class="card">
        <img src="${e.webformatURL}" alt="${e.tags}">
        <div class="card-info">
          <div class="info-item">
            <p>Likes</p>
            <span>${e.likes}</span>
          </div>
          <div class="info-item">
            <p>Views</p>
            <span>${e.views}</span>
          </div>
          <div class="info-item">
            <p>Comments</p>
            <span>${e.comments}</span>
          </div>
          <div class="info-item">
            <p>Downloads</p>
            <span>${e.downloads}</span>
          </div>
        </div>
      </div>
    </a>`).join("");t.insertAdjacentHTML("beforeend",n),h.refresh();const r=document.querySelector(".card");if(r){const e=r.getBoundingClientRect().height;window.scrollBy({top:e*2,behavior:"smooth"})}}const v="43969055-d0c46f522fb3643e2ec2eb3d1",E="https://pixabay.com/api/";async function u(s,t=1,n=15){const r=`${E}?key=${v}&q=${encodeURIComponent(s)}&image_type=photo&orientation=horizontal&safesearch=true&page=${t}&per_page=${n}`;try{return(await y.get(r)).data}catch(e){throw new Error("Error fetching images: "+e.message)}}let i=1,f="",c=0;const d=document.getElementById("loader"),l=document.getElementById("load-more"),L=document.getElementById("gallery");document.getElementById("search-form").addEventListener("submit",async function(s){s.preventDefault();const t=document.getElementById("search-input").value.trim();if(!t){a.error({title:"Error",message:"Please enter a search term!"});return}f=t,i=1,c=0,L.innerHTML="",l.style.display="none",d.style.display="block";try{const n=await u(f,i),r=n.hits;c=n.totalHits,console.log("Images fetched",r),p(r),r.length>0&&i*r.length<c?l.style.display="block":r.length===0&&a.error({title:"Error",message:"No images found for the search query."})}catch(n){console.error("Error fetching images:",n),a.error({title:"Error",message:"Failed to fetch images. Please try again later."})}finally{d.style.display="none"}});l.addEventListener("click",async function(){i+=1,d.style.display="block",l.style.display="none";try{const t=(await u(f,i)).hits;console.log("More images fetched",t),p(t),t.length>0&&i*t.length<c?l.style.display="block":a.info({title:"Info",message:"We're sorry, but you've reached the end of search results."})}catch(s){console.error("Error fetching more images:",s),a.error({title:"Error",message:"Failed to fetch more images. Please try again later."})}finally{d.style.display="none"}});document.addEventListener("DOMContentLoaded",function(){new g(".image-link")});
//# sourceMappingURL=commonHelpers.js.map
