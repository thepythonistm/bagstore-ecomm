import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

const STAR = 'STAR';
const CROSS = 'CROSS';
const SQUARE = 'SQUARE';

function createTileShape(tileType) {
  const shape = new THREE.Shape();

  if (tileType === STAR) {
    const outerRadius = 0.275;
    const innerRadius = outerRadius * 0.414;
    shape.moveTo(0, outerRadius);
    for (let i = 0; i <= 16; i++) {
      const angle = (i * Math.PI) / 8;
      const r = i % 2 === 0 ? innerRadius : outerRadius;
      shape.lineTo(Math.sin(angle) * r, Math.cos(angle) * r);
    }
    shape.closePath();
  } else if (tileType === CROSS) {
    shape.moveTo(0.08, 0.275);
    shape.lineTo(0.08, 0.08);
    shape.lineTo(0.275, 0.08);
    shape.lineTo(0.275, -0.08);
    shape.lineTo(0.08, -0.08);
    shape.lineTo(0.08, -0.275);
    shape.lineTo(-0.08, -0.275);
    shape.lineTo(-0.08, -0.08);
    shape.lineTo(-0.275, -0.08);
    shape.lineTo(-0.275, 0.08);
    shape.lineTo(-0.08, 0.08);
    shape.lineTo(-0.08, 0.275);
    shape.closePath();
  } else {
    shape.moveTo(-0.275, 0.275);
    shape.lineTo(0.275, 0.275);
    shape.lineTo(0.275, -0.275);
    shape.lineTo(-0.275, -0.275);
    shape.closePath();
  }

  const groutShape = new THREE.Shape();
  groutShape.moveTo(-0.3, 0.3);
  groutShape.lineTo(0.3, 0.3);
  groutShape.lineTo(0.3, -0.3);
  groutShape.lineTo(-0.3, -0.3);
  groutShape.closePath();
  groutShape.holes = [new THREE.Path(shape.getPoints())];

  return groutShape;
}

function createTileGeometry(tileType) {
  const baseShape = createTileShape(tileType);
  const geometry = new THREE.ExtrudeGeometry(baseShape, {
    depth: 0.05,
    bevelEnabled: true,
    bevelThickness: 0.02,
    bevelSize: 0.02,
    bevelSegments: 2,
  });
  geometry.center();
  if (tileType === STAR) {
    geometry.rotateZ(Math.PI);
  }
  return geometry;
}

function createMesh(tileType, color, x, y, z) {
  const geom = createTileGeometry(tileType);
  const mat = new THREE.MeshStandardMaterial({ color, roughness: 0.4, metalness: 0.1 });
  const mesh = new THREE.Mesh(geom, mat);
  mesh.position.set(x, y, z);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}

function addRow(scene, rowIndex, yPos, zPos) {
  const rowGroup = new THREE.Group();
  rowGroup.userData = { isRow: true, rowIndex, speed: 1.0, rotationSpeed: 0 };

  const numTiles = 24;
  const angleStep = (Math.PI * 2) / numTiles;
  const radius = 6;

  const colors6 = [0xc75b2a, 0xd4a853, 0x6b7f5a, 0xf7f3ed, 0xe8c4b8, 0xc75b2a];
  const colors3 = [0xc75b2a, 0xf7f3ed, 0xd4a853];

  for (let i = 0; i < numTiles; i++) {
    const angle = i * angleStep;
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;

    const rowOffset = (rowIndex % 2) * (angleStep / 2);
    const rotY = -(angle + rowOffset);

    let tileType;
    if (rowIndex % 3 === 0) {
      tileType = CROSS;
    } else if (rowIndex % 3 === 1) {
      tileType = STAR;
    } else {
      tileType = i % 2 === 0 ? SQUARE : STAR;
    }

    let color;
    if (rowIndex % 4 === 0) {
      color = colors3[i % colors3.length];
    } else if (rowIndex % 2 === 0) {
      color = colors6[i % colors6.length];
    } else {
      color = colors3[(i + rowIndex) % colors3.length];
    }

    const tileMesh = createMesh(tileType, color, x, yPos, z + zPos);
    tileMesh.rotation.y = rotY;
    rowGroup.add(tileMesh);
  }

  scene.add(rowGroup);
  return rowGroup;
}

export default function ZelligeBackground() {
  const canvasRef = useRef(null);
  const animationRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0xf7f3ed, 8, 20);

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.set(0, 0, 0);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1, 20);
    pointLight.position.set(0, 5, 5);
    scene.add(pointLight);

    const rowCount = 24;
    const rowSpacing = 0.6;
    const rows = [];

    for (let i = 0; i < rowCount; i++) {
      const zPos = -5 - i * rowSpacing;
      const row = addRow(scene, i, 0, zPos);
      rows.push(row);
    }

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });
    renderer.setClearColor(0xf7f3ed, 1);
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const mousePos = { x: width / 2, y: height / 2 };

    const handleMouseMove = (e) => {
      mousePos.x = e.clientX;
      mousePos.y = e.clientY;

      const targetX = (mousePos.x - window.innerWidth / 2) * 0.0005;
      const targetY = (mousePos.y - window.innerHeight / 2) * 0.0005;
      gsap.to(camera.position, {
        x: targetX,
        y: -targetY,
        duration: 1.5,
        ease: 'power2.out',
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    const animate = () => {
      const time = performance.now() * 0.001;
      const scrollY = window.scrollY || window.pageYOffset;
      const scrollFactor = Math.min(scrollY / window.innerHeight, 1);

      for (const row of rows) {
        const data = row.userData;
        const baseSpeed = 1.0 + (data.rowIndex / rowCount) * 0.5;
        const scrollBoost = scrollFactor * 5.0;
        const speed = (baseSpeed + scrollBoost) * data.speed;

        row.position.z += speed * 0.01;
        row.rotation.y += data.rotationSpeed * 0.01;

        if (row.position.z > 5) {
          row.position.z = -((rowCount - 1) * rowSpacing) - 5;
          row.rotation.y = 0;
        }
      }

      for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        row.children.forEach((child, j) => {
          if (child instanceof THREE.Mesh) {
            child.rotation.x = Math.sin(time + i * 0.3 + j * 0.2) * 0.02;
          }
        });
      }

      renderer.render(scene, camera);
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();

      rows.forEach((row) => {
        row.children.forEach((child) => {
          if (child instanceof THREE.Mesh) {
            child.geometry.dispose();
            child.material.dispose();
          }
        });
      });
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
      }}
    />
  );
}
