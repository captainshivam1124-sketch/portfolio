import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. CSS: Replace remaining hardcoded colors with CSS variables
replacements = [
    ('background: linear-gradient(135deg, rgba(10, 13, 23, 1), rgba(8, 10, 18, 0.96));',
     'background: var(--loader-bg);'),
    ('background: rgba(11, 15, 25, 0.6);',
     'background: var(--hero-content-bg);'),
    ('border: 1px solid rgba(255, 255, 255, 0.08);',
     'border: 1px solid var(--border);'),
    ('color: #cfe7ff;',
     'color: var(--typing-color);'),
    ('background: rgba(255,255,255,0.05);\n        border-color: rgba(255,255,255,0.12);',
     'background: var(--input-bg);\n        border-color: var(--element-border);'),
    ('background: rgba(255,255,255,0.06);\n        border: 1px solid rgba(255,255,255,0.12);\n        color: #dfe7ff;',
     'background: var(--element-bg);\n        border: 1px solid var(--element-border);\n        color: var(--social-color);'),
    ('background: rgba(255,255,255,0.06);\n        color: #dbe5ff;',
     'background: var(--element-bg);\n        color: var(--badge-color);'),
    ('background: rgba(255,255,255,0.05);\n        border: 1px solid rgba(255,255,255,0.1);',
     'background: var(--input-bg);\n        border: 1px solid var(--element-border);'),
    ('border: 1px solid rgba(255,255,255,0.12);\n        background: rgba(255,255,255,0.05);\n        text-align: center;\n        color: #dce6ff;',
     'border: 1px solid var(--element-border);\n        background: var(--input-bg);\n        text-align: center;\n        color: var(--marquee-color);'),
    ('background: rgba(255,255,255,0.05);\n        color: #dfe8ff;',
     'background: var(--input-bg);\n        color: var(--tag-color);'),
    ('background: rgba(8, 10, 18, 0.75);\n        border: 1px solid rgba(255,255,255,0.16);\n        color: #eaf6ff;',
     'background: var(--label-bg);\n        border: 1px solid var(--element-border);\n        color: var(--text);'),
    ('border: 1px solid rgba(255,255,255,0.12);\n        background: rgba(255,255,255,0.05);\n        color: var(--text);\n        outline: none;',
     'border: 1px solid var(--element-border);\n        background: var(--input-bg);\n        color: var(--text);\n        outline: none;'),
    ('border: 1px solid rgba(255,255,255,0.12);\n        background: rgba(255,255,255,0.05);\n      }',
     'border: 1px solid var(--element-border);\n        background: var(--input-bg);\n      }'),
    ('background: rgba(8, 10, 18, 0.98);\n          border: 1px solid rgba(255,255,255,0.12);',
     'background: var(--mobile-menu-bg);\n          border: 1px solid var(--element-border);'),
    ('background: rgba(255,255,255,0.08);',
     'background: var(--element-bg);'),
    ('background: rgba(255,255,255,0.06);\n        color: var(--accent);',
     'background: var(--element-bg);\n        color: var(--accent);'),
    ('background: rgba(11, 15, 25, 0.7);',
     'background: var(--nav-bg);'),
    ('background: white;\n          border-radius: 99px;',
     'background: var(--text);\n          border-radius: 99px;'),
]

for old, new in replacements:
    content = content.replace(old, new)

# 2. HTML: Add theme toggle button in nav
old_nav = '''        <div class="nav-links">
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <a href="#services">Services</a>
          <a href="#contact">Contact</a>
        </div>'''
new_nav = '''        <div class="nav-links">
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <a href="#services">Services</a>
          <a href="#contact">Contact</a>
          <button class="theme-toggle" id="theme-toggle" aria-label="Toggle theme">
            <span class="theme-icon-sun">\u2600</span>
            <span class="theme-icon-moon">\u263e</span>
          </button>
        </div>'''
content = content.replace(old_nav, new_nav)

# 3. JS: Replace Three.js with improved version
old_threejs_start = '      // Three.js 3D Background - Floating Geometric Shapes'
old_threejs_end = '      })();\n\n      // Rest of the existing JavaScript'

start_idx = content.find(old_threejs_start)
end_idx = content.find(old_threejs_end, start_idx)

if start_idx != -1 and end_idx != -1:
    new_threejs = '''      // Three.js 3D Background - Enhanced with particles, distortion, and realistic materials
      (function() {
        const container = document.getElementById('canvas-container');
        if (!container) return;

        const scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0x0b0f19, 0.035);

        const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 12;

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.2;
        container.appendChild(renderer.domElement);

        const ambientLight = new THREE.AmbientLight(0x404060, 0.5);
        scene.add(ambientLight);

        const keyLight = new THREE.DirectionalLight(0x5bdcff, 1.2);
        keyLight.position.set(5, 8, 5);
        scene.add(keyLight);

        const fillLight = new THREE.DirectionalLight(0x9f6bff, 0.8);
        fillLight.position.set(-5, -3, 5);
        scene.add(fillLight);

        const rimLight = new THREE.PointLight(0x5bdcff, 1, 30);
        rimLight.position.set(0, 0, 8);
        scene.add(rimLight);

        const accentLight = new THREE.PointLight(0x9f6bff, 0.8, 25);
        accentLight.position.set(-3, 4, 6);
        scene.add(accentLight);

        // Central distorted sphere
        const heroGeometry = new THREE.IcosahedronGeometry(2.5, 4);
        const heroMaterial = new THREE.MeshStandardMaterial({
          color: 0x1a1f3a, metalness: 0.9, roughness: 0.15,
          emissive: 0x0a0a1a, emissiveIntensity: 0.3
        });
        const heroMesh = new THREE.Mesh(heroGeometry, heroMaterial);
        heroMesh.position.set(0, 0, -3);
        scene.add(heroMesh);
        const heroOriginalPositions = heroGeometry.attributes.position.array.slice();

        // Particle field
        const particleCount = 800;
        const particleGeometry = new THREE.BufferGeometry();
        const particlePositions = new Float32Array(particleCount * 3);
        const particleColors = new Float32Array(particleCount * 3);
        for (let i = 0; i < particleCount; i++) {
          particlePositions[i*3] = (Math.random()-0.5)*60;
          particlePositions[i*3+1] = (Math.random()-0.5)*60;
          particlePositions[i*3+2] = (Math.random()-0.5)*40;
          const color = new THREE.Color();
          color.setHSL(0.55+Math.random()*0.15, 0.7, 0.5+Math.random()*0.3);
          particleColors[i*3] = color.r;
          particleColors[i*3+1] = color.g;
          particleColors[i*3+2] = color.b;
        }
        particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
        particleGeometry.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));
        const particleMaterial = new THREE.PointsMaterial({
          size: 0.08, vertexColors: true, transparent: true, opacity: 0.8,
          blending: THREE.AdditiveBlending, sizeAttenuation: true
        });
        const particles = new THREE.Points(particleGeometry, particleMaterial);
        scene.add(particles);

        // Floating shapes
        const shapes = [];
        const colors = [0x5bdcff, 0x9f6bff, 0x4fc3f7, 0x7c4dff, 0x00e5ff, 0xff6b9d];
        function createShape(type, color, size) {
          let geometry;
          switch(type) {
            case 'torus': geometry = new THREE.TorusGeometry(size, size*0.3, 16, 48); break;
            case 'octahedron': geometry = new THREE.OctahedronGeometry(size, 0); break;
            case 'icosahedron': geometry = new THREE.IcosahedronGeometry(size, 0); break;
            case 'dodecahedron': geometry = new THREE.DodecahedronGeometry(size); break;
            case 'torusknot': geometry = new THREE.TorusKnotGeometry(size, size*0.25, 64, 8); break;
            default: geometry = new THREE.SphereGeometry(size, 24, 24);
          }
          const material = new THREE.MeshStandardMaterial({
            color: color, metalness: 0.7, roughness: 0.2,
            emissive: color, emissiveIntensity: 0.15,
            transparent: true, opacity: 0.75,
            flatShading: type==='octahedron'||type==='icosahedron'
          });
          const mesh = new THREE.Mesh(geometry, material);
          const wireframeMaterial = new THREE.MeshBasicMaterial({
            color: color, wireframe: true, transparent: true, opacity: 0.15
          });
          mesh.add(new THREE.Mesh(geometry, wireframeMaterial));
          return mesh;
        }
        const shapeTypes = ['torus','octahedron','icosahedron','dodecahedron','torusknot','sphere'];
        for (let i = 0; i < 18; i++) {
          const type = shapeTypes[Math.floor(Math.random()*shapeTypes.length)];
          const color = colors[Math.floor(Math.random()*colors.length)];
          const size = 0.3+Math.random()*0.7;
          const shape = createShape(type, color, size);
          const angle = (i/18)*Math.PI*2;
          const radius = 6+Math.random()*6;
          shape.position.x = Math.cos(angle)*radius+(Math.random()-0.5)*4;
          shape.position.y = Math.sin(angle)*radius+(Math.random()-0.5)*4;
          shape.position.z = (Math.random()-0.5)*8-2;
          shape.rotation.x = Math.random()*Math.PI*2;
          shape.rotation.y = Math.random()*Math.PI*2;
          shape.userData = {
            rotSpeedX: (Math.random()-0.5)*0.015, rotSpeedY: (Math.random()-0.5)*0.015,
            rotSpeedZ: (Math.random()-0.5)*0.01, floatSpeed: 0.3+Math.random()*0.5,
            floatAmount: 0.3+Math.random()*1.2, originalY: shape.position.y,
            orbitAngle: angle, orbitRadius: radius, orbitSpeed: 0.0002+Math.random()*0.0003
          };
          scene.add(shape);
          shapes.push(shape);
        }

        let mouseX=0, mouseY=0, targetMouseX=0, targetMouseY=0;
        document.addEventListener('mousemove', (event) => {
          targetMouseX = (event.clientX/window.innerWidth)*2-1;
          targetMouseY = -(event.clientY/window.innerHeight)*2+1;
        });
        let scrollY = 0;
        window.addEventListener('scroll', () => { scrollY = window.scrollY; }, { passive: true });

        function resize() {
          camera.aspect = window.innerWidth/window.innerHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(window.innerWidth, window.innerHeight);
        }
        window.addEventListener('resize', resize);

        const clock = new THREE.Clock();
        function animate() {
          requestAnimationFrame(animate);
          const elapsed = clock.getElapsedTime();
          mouseX += (targetMouseX-mouseX)*0.04;
          mouseY += (targetMouseY-mouseY)*0.04;
          const heroPositions = heroGeometry.attributes.position.array;
          for (let i = 0; i < heroPositions.length; i += 3) {
            const ox = heroOriginalPositions[i];
            const oy = heroOriginalPositions[i+1];
            const oz = heroOriginalPositions[i+2];
            const noise = Math.sin(ox*2+elapsed)*Math.cos(oy*2+elapsed)*0.15;
            heroPositions[i] = ox+ox*noise;
            heroPositions[i+1] = oy+oy*noise;
            heroPositions[i+2] = oz+oz*noise;
          }
          heroGeometry.attributes.position.needsUpdate = true;
          heroGeometry.computeVertexNormals();
          heroMesh.rotation.x = elapsed*0.1;
          heroMesh.rotation.y = elapsed*0.15;
          shapes.forEach((shape) => {
            shape.rotation.x += shape.userData.rotSpeedX;
            shape.rotation.y += shape.userData.rotSpeedY;
            shape.rotation.z += shape.userData.rotSpeedZ;
            shape.position.y = shape.userData.originalY+Math.sin(elapsed*shape.userData.floatSpeed)*shape.userData.floatAmount;
            shape.userData.orbitAngle += shape.userData.orbitSpeed;
            shape.position.x = Math.cos(shape.userData.orbitAngle)*shape.userData.orbitRadius+Math.cos(elapsed*shape.userData.floatSpeed*0.5)*0.5;
          });
          particles.rotation.y = elapsed*0.02;
          particles.rotation.x = elapsed*0.01;
          camera.position.x += (mouseX*1.5-camera.position.x)*0.03;
          camera.position.y += (mouseY*1-scrollY*0.002-camera.position.y)*0.03;
          camera.lookAt(0, 0, 0);
          renderer.render(scene, camera);
        }
        animate();

        window.updateSceneTheme = function(isLight) {
          if (isLight) {
            scene.fog.color.setHex(0xeef1f6);
            heroMaterial.color.setHex(0x8a9bb5);
            heroMaterial.emissive.setHex(0x4a5a7a);
            particleMaterial.opacity = 0.4;
          } else {
            scene.fog.color.setHex(0x0b0f19);
            heroMaterial.color.setHex(0x1a1f3a);
            heroMaterial.emissive.setHex(0x0a0a1a);
            particleMaterial.opacity = 0.8;
          }
        };

        setTimeout(() => {
          const loader = document.querySelector('.loader');
          if (loader) loader.classList.add('hidden');
        }, 1500);
      })();

      // Rest of the existing JavaScript'''

    content = content[:start_idx] + new_threejs + content[end_idx + len(old_threejs_end):]

# 4. JS: Fix Lenis config
old_lenis = """      const lenis = new Lenis({
        duration: 0.8,
        smoothWheel: true,
        smoothTouch: true,
        wheelMultiplier: 1.6,
        touchMultiplier: 1.4,
        lerp: 0.14
      });
      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);"""

new_lenis = """      // Fixed Lenis smooth scroll - no more stuttering
      const lenis = new Lenis({
        lerp: 0.1,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.5,
        syncTouch: false,
        gestureOrientation: 'vertical',
        orientation: 'vertical'
      });

      // Integrate Lenis with GSAP ScrollTrigger for smooth sync
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);"""

content = content.replace(old_lenis, new_lenis)

# 5. JS: Add theme toggle JS before the typing animation
old_typing = """      const textLines = ["""
new_typing = """      // Theme Toggle
      const themeToggle = document.getElementById('theme-toggle');
      const htmlEl = document.documentElement;

      const savedTheme = localStorage.getItem('theme') || 'dark';
      if (savedTheme === 'light') {
        htmlEl.setAttribute('data-theme', 'light');
      }

      themeToggle?.addEventListener('click', () => {
        const currentTheme = htmlEl.getAttribute('data-theme');
        if (currentTheme === 'light') {
          htmlEl.removeAttribute('data-theme');
          localStorage.setItem('theme', 'dark');
          if (window.updateSceneTheme) window.updateSceneTheme(false);
        } else {
          htmlEl.setAttribute('data-theme', 'light');
          localStorage.setItem('theme', 'light');
          if (window.updateSceneTheme) window.updateSceneTheme(true);
        }
      });

      const textLines = ["""

content = content.replace(old_typing, new_typing)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("All changes applied successfully!")
print(f"File size: {len(content)} characters")