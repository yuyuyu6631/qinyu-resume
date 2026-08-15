/* ============================================================
   秦宇 · 测试工程师 — 简历网站交互脚本
   零依赖: 打字机 / 滚动显现 /     零依赖: 打字机 / 滚动显现 / 数字动画 / 时间线
   动效原则: 克制、仅服务于信息呈现
   ============================================================ */
(function () {
  "use strict";

  var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- 粒子背景（浅色纸感适配 · 低对比度连线粒子） ---------- */
  var canvas = document.getElementById("particles");
  var ctx = canvas && canvas.getContext("2d");
  var particles = [];
  var mouse = { x: null, y: null };
  var running = false;

  function initParticles() {
    if (!canvas || !ctx) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    var count = Math.min(46, Math.floor(window.innerWidth / 30));
    particles = [];
    for (var i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.6 + 0.5,
        c: Math.random() > 0.7 ? "30, 79, 216" : "124, 130, 145"  // 强调蓝 / 墨灰
      });
    }
    if (!running) {
      running = true;
      requestAnimationFrame(step);
    }
  }

  var linkDist = 120;
  function step() {
    if (!canvas || !ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(" + p.c + ", 0.35)";
      ctx.fill();

      for (var j = i + 1; j < particles.length; j++) {
        var q = particles[j];
        var dx = p.x - q.x;
        var dy = p.y - q.y;
        var dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < linkDist) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.strokeStyle = "rgba(30, 79, 216, " + (0.10 * (1 - dist / linkDist)).toFixed(3) + ")";
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      if (mouse.x !== null) {
        var mdx = p.x - mouse.x;
        var mdy = p.y - mouse.y;
        var md = Math.sqrt(mdx * mdx + mdy * mdy);
        if (md < 160) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = "rgba(30, 79, 216, " + (0.16 * (1 - md / 160)).toFixed(3) + ")";
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }
    if (running) requestAnimationFrame(step);
  }

  if (canvas && ctx && !prefersReduced) {
    initParticles();
    window.addEventListener("resize", debounce(initParticles, 200));
    window.addEventListener("mousemove", function (e) { mouse.x = e.clientX; mouse.y = e.clientY; });
    window.addEventListener("mouseout", function () { mouse.x = null; mouse.y = null; });
  }

  /* ---------- 打字机效果 ---------- */
  var typedEl = document.getElementById("typed");
  var roles = [
    "软件测试工程师",
    "测试开发工程师",
    "AI 应用测试 · LLM-to-SQL / Agent",
    "接口自动化 · Python / Pytest / Playwright"
  ];
  if (typedEl && !prefersReduced) {
    var ri = 0, ci = 0, deleting = false;
    function type() {
      var word = roles[ri];
      if (!deleting) {
        ci++;
        typedEl.textContent = word.slice(0, ci);
        if (ci === word.length) { deleting = true; setTimeout(type, 2400); return; }
        setTimeout(type, 85);
      } else {
        ci--;
        typedEl.textContent = word.slice(0, ci);
        if (ci === 0) { deleting = false; ri = (ri + 1) % roles.length; setTimeout(type, 420); return; }
        setTimeout(type, 38);
      }
    }
    setTimeout(type, 700);
  } else if (typedEl) {
    typedEl.textContent = roles[0];
  }

  /* ---------- 滚动显现 + 数字动画 + 技能条 ---------- */
  function animateCounter(el) {
    var target = parseInt(el.getAttribute("data-count"), 10) || 0;
    var suffix = el.getAttribute("data-suffix") || "";
    var dur = 1300;
    var start = null;
    function tick(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  var countersDone = false;

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var el = entry.target;
      el.classList.add("visible");
      io.unobserve(el);

      if (!countersDone) {
        var nums = el.querySelectorAll(".stat-num[data-count]");
        if (nums.length) { nums.forEach(animateCounter); countersDone = true; }
      }
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -30px 0px" });

  document.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });

  /* ---------- 时间线进度 ---------- */
  var timeline = document.getElementById("timeline");
  if (timeline) {
    var tio = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          timeline.classList.add("done");
          tio.disconnect();
        }
      });
    }, { threshold: 0.1 });
    tio.observe(timeline);
  }

  /* ---------- 导航激活状态 ---------- */
  var navLinks = document.querySelectorAll(".nav-link");
  var sections = [];
  navLinks.forEach(function (link) {
    var sec = document.querySelector(link.getAttribute("href"));
    if (sec) sections.push({ id: sec.id, el: sec });
  });

  var spy = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      navLinks.forEach(function (l) {
        l.classList.toggle("active", l.getAttribute("href") === "#" + entry.target.id);
      });
    });
  }, { rootMargin: "-40% 0px -55% 0px" });

  sections.forEach(function (s) { spy.observe(s.el); });

  /* ---------- 导航栏滚动样式 / 回到顶部 ---------- */
  var toTop = document.getElementById("toTop");

  function onScroll() {
    if (toTop) toTop.classList.toggle("visible", window.scrollY > 520);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (toTop) {
    toTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: prefersReduced ? "auto" : "smooth" });
    });
  }

  /* ---------- 移动端菜单 ---------- */
  var burger = document.getElementById("navBurger");
  var navLinksBox = document.getElementById("navLinks");
  if (burger && navLinksBox) {
    burger.addEventListener("click", function () {
      var open = navLinksBox.classList.toggle("open");
      burger.classList.toggle("open", open);
      burger.setAttribute("aria-expanded", open ? "true" : "false");
    });
    navLinksBox.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        navLinksBox.classList.remove("open");
        burger.classList.remove("open");
        burger.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- 工具函数 ---------- */
  function debounce(fn, wait) {
    var t;
    return function () {
      clearTimeout(t);
      t = setTimeout(fn, wait);
    };
  }
})();
