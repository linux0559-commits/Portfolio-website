const loader=document.getElementById("loader");
window.addEventListener("load",()=>setTimeout(()=>{loader.style.opacity="0";loader.style.visibility="hidden"},700));

const cursorGlow=document.querySelector(".cursor-glow");
window.addEventListener("pointermove",e=>{cursorGlow.style.left=e.clientX+"px";cursorGlow.style.top=e.clientY+"px"});

const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("show")}),{threshold:.12});
document.querySelectorAll(".reveal,.skill-card,.project,.timeline-item").forEach((el,i)=>{el.classList.add("reveal");el.style.transitionDelay=(i%6)*70+"ms";observer.observe(el)});

document.querySelector(".menu").addEventListener("click",()=>document.querySelector(".nav").classList.toggle("open"));
document.querySelectorAll("nav a").forEach(a=>a.addEventListener("click",()=>document.querySelector(".nav").classList.remove("open")));

// Interactive network background
const canvas=document.getElementById("network"),ctx=canvas.getContext("2d");
let W,H,nodes=[];
function resize(){W=canvas.width=innerWidth*devicePixelRatio;H=canvas.height=innerHeight*devicePixelRatio;canvas.style.width=innerWidth+"px";canvas.style.height=innerHeight+"px";ctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0);nodes=Array.from({length:Math.min(75,Math.floor(innerWidth/16))},()=>({x:Math.random()*innerWidth,y:Math.random()*innerHeight,vx:(Math.random()-.5)*.22,vy:(Math.random()-.5)*.22}))}
function draw(){ctx.clearRect(0,0,innerWidth,innerHeight);for(const a of nodes){a.x+=a.vx;a.y+=a.vy;if(a.x<0||a.x>innerWidth)a.vx*=-1;if(a.y<0||a.y>innerHeight)a.vy*=-1;for(const b of nodes){const d=Math.hypot(a.x-b.x,a.y-b.y);if(d<130&&d>0){ctx.strokeStyle=`rgba(86,240,168,${(1-d/130)*.08})`;ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke()}}ctx.fillStyle="rgba(86,240,168,.35)";ctx.fillRect(a.x,a.y,1.2,1.2)}requestAnimationFrame(draw)}
addEventListener("resize",resize);resize();draw();

// Background music
const music = new Audio("./music.mp3");
music.loop = true;
music.volume = 0.1;
let musicOn = false;
const btn = document.getElementById("musicBtn");
if (btn) {
  btn.addEventListener("click", async () => {
    try {
      if (!musicOn) {
        await music.play();
        musicOn = true;
        btn.innerHTML = '♫ <span>Music On</span>';
      } else {
        music.pause();
        musicOn = false;
        btn.innerHTML = '♫ <span>Music Off</span>';
      }
    } catch (error) {
      console.error("Music error:", error);
      alert("Music could not play. Make sure music.mp3 is in the same folder as index.html.");
    }
  });
}
