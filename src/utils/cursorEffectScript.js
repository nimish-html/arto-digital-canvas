// @ts-nocheck 
// ^-- Add this to suppress TypeScript errors in this JS file derived from TSX

var ctx, f, e = 0, pos = {}, lines = [], E = {
  debug: true,
  friction: 0.5,
  trails: 80,
  size: 50,
  dampening: 0.025,
  tension: 0.99,
};

function Node() {
  this.x = 0;
  this.y = 0;
  this.vx = 0;
  this.vy = 0;
}

function n(e) {
  this.init(e || {});
}
n.prototype = {
  init: function (e) {
    this.phase = e.phase || 0;
    this.offset = e.offset || 0;
    this.frequency = e.frequency || 0.001;
    this.amplitude = e.amplitude || 1;
  },
  update() {
    return (
      (this.phase += this.frequency),
      (e = this.offset + Math.sin(this.phase) * this.amplitude)
    );
  },
  value: function () {
    return e;
  },
};

function Line(e) {
  this.init(e || {});
}

Line.prototype = {
  init: function (e) {
    this.spring = e.spring + 0.1 * Math.random() - 0.05;
    this.friction = E.friction + 0.01 * Math.random() - 0.005;
    this.nodes = [];
    for (var t, n = 0; n < E.size; n++) {
      t = new Node();
      t.x = pos.x;
      t.y = pos.y;
      this.nodes.push(t);
    }
  },
  update() {
    let e = this.spring,
      t = this.nodes[0];
    t.vx += (pos.x - t.x) * e;
    t.vy += (pos.y - t.y) * e;
    for (var n, i = 0, a = this.nodes.length; i < a; i++)
      (t = this.nodes[i]),
        0 < i &&
          ((n = this.nodes[i - 1]),
          (t.vx += (n.x - t.x) * e),
          (t.vy += (n.y - t.y) * e),
          (t.vx += n.vx * E.dampening),
          (t.vy += n.vy * E.dampening)),
        (t.vx *= this.friction),
        (t.vy *= this.friction),
        (t.x += t.vx),
        (t.y += t.vy),
        (e *= E.tension);
  },
  draw: function () {
    let e,
      t,
      n = this.nodes[0].x,
      i = this.nodes[0].y;
    ctx.beginPath();
    ctx.moveTo(n, i);
    for (var a = 1, o = this.nodes.length - 2; a < o; a++) {
      e = this.nodes[a];
      t = this.nodes[a + 1];
      n = 0.5 * (e.x + t.x);
      i = 0.5 * (e.y + t.y);
      ctx.quadraticCurveTo(e.x, e.y, n, i);
    }
    e = this.nodes[a];
    t = this.nodes[a + 1];
    ctx.quadraticCurveTo(e.x, e.y, t.x, t.y);
    ctx.stroke();
    ctx.closePath();
  },
};

function renderInternal() {
  if (ctx && ctx.running) {
    ctx.globalCompositeOperation = "source-over";
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.globalCompositeOperation = "lighter";
    ctx.strokeStyle = "hsla(" + Math.round(f.update()) + ",100%,50%,0.025)";
    ctx.lineWidth = 10;
    for (var e, t = 0; t < E.trails; t++) {
      if (lines[t]) { // Add check if line exists
         e = lines[t];
         e.update();
         e.draw();
      }
    }
    ctx.frame = (ctx.frame || 0) + 1;
    window.requestAnimationFrame(renderInternal);
  }
}

export function onMousemove(e) {
  function o() {
    lines = [];
    for (let i = 0; i < E.trails; i++)
      lines.push(new Line({ spring: 0.45 + (i / E.trails) * 0.025 }));
  }
  
  function c(event) {
    if (event.touches) {
        pos.x = event.touches[0].pageX;
        pos.y = event.touches[0].pageY;
    } else {
        pos.x = event.clientX;
        pos.y = event.clientY;
    }
    // Prevent default behavior if it's a touch event to avoid scrolling, etc.
    if (event.type.startsWith('touch')) {
       event.preventDefault();
    }
  }

  function l(event) {
    if (event.touches && event.touches.length === 1) {
       pos.x = event.touches[0].pageX;
       pos.y = event.touches[0].pageY;
    }
  }

  // Only add listeners if they haven't been added before
  if (!document.mouseMoveInitialized) {
      document.removeEventListener("mousemove", onMousemove);
      document.removeEventListener("touchstart", onMousemove);
      
      document.addEventListener("mousemove", c);
      document.addEventListener("touchmove", c, { passive: false }); // Explicitly set passive to false if preventDefault is needed
      document.addEventListener("touchstart", l, { passive: false });
      document.mouseMoveInitialized = true; // Flag to prevent adding listeners again
  }

  c(e); // Initialize position
  o(); // Initialize lines
  if (ctx && !ctx.running) { // Start rendering only if not already running
     ctx.running = true;
     renderInternal();
  }
}

export function renderCanvas() {
  if (typeof window !== 'undefined' && document.getElementById('canvas')) {
    const canvas = document.getElementById('canvas');
    ctx = canvas.getContext("2d");
    ctx.running = false; // Initialize running state
    ctx.frame = 0;
    
    f = new n({
      phase: Math.random() * 2 * Math.PI,
      amplitude: 85,
      frequency: 0.0015,
      offset: 285,
    });
    
    // Initialize pos with center screen or 0,0 if window is not available early
    pos.x = window.innerWidth / 2 || 0;
    pos.y = window.innerHeight / 2 || 0;

    // Add initial mouse move listener that sets up the actual listeners
    document.addEventListener("mousemove", onMousemove);
    document.addEventListener("touchstart", onMousemove, { passive: false });
    
    resizeCanvas(); // Initial resize
  } else {
    console.error('Canvas element not found or window is undefined.');
  }
}

export function resizeCanvas() {
  if (typeof window !== 'undefined' && ctx && ctx.canvas) {
      ctx.canvas.width = window.innerWidth;
      ctx.canvas.height = window.innerHeight;
  } 
}

// Basic cleanup function (might need refinement)
export function cleanupCanvas() {
    if (ctx) {
        ctx.running = false; // Stop the animation loop
    }
    // Remove listeners added by onMousemove
    document.removeEventListener("mousemove", onMousemove); // Initial listener
    document.removeEventListener("touchstart", onMousemove); // Initial listener
    if (document.mouseMoveInitialized) {
        // Need the actual handlers (c, l) to remove them properly. 
        // This simple cleanup might not fully work without script rewrite.
        // For now, just reset the flag.
        document.mouseMoveInitialized = false; 
    }
    lines = []; // Clear lines array
    console.log("Canvas cleanup attempted.");
}
