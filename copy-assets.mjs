import fs from 'fs';

const images = [
  {
    src: 'C:/Users/SUDHIKSHA/.gemini/antigravity-ide/brain/be5742e7-d1af-40f6-9912-fa7ab9f0380e/hero_hypercar_studio_1791298268727.jpg',
    dest: './public/images/hero_hypercar.jpg'
  },
  {
    src: 'C:/Users/SUDHIKSHA/.gemini/antigravity-ide/brain/be5742e7-d1af-40f6-9912-fa7ab9f0380e/interior_cockpit_1791298301282.jpg',
    dest: './public/images/interior_cockpit.jpg'
  },
  {
    src: 'C:/Users/SUDHIKSHA/.gemini/antigravity-ide/brain/be5742e7-d1af-40f6-9912-fa7ab9f0380e/driving_scenes_1791298410178.jpg',
    dest: './public/images/driving_scene.jpg'
  },
  {
    src: 'C:/Users/SUDHIKSHA/.gemini/antigravity-ide/brain/be5742e7-d1af-40f6-9912-fa7ab9f0380e/aerodynamics_tunnel_1791298484552.jpg',
    dest: './public/images/aerodynamics_tunnel.jpg'
  },
  {
    src: 'C:/Users/SUDHIKSHA/.gemini/antigravity-ide/brain/be5742e7-d1af-40f6-9912-fa7ab9f0380e/powertrain_architecture_1791298608451.jpg',
    dest: './public/images/powertrain_architecture.jpg'
  }
];

// Ensure directories
['./public/images', './public/models', './public/audio'].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

for (const img of images) {
  try {
    if (fs.existsSync(img.src)) {
      fs.copyFileSync(img.src, img.dest);
      console.log(`Copied ${img.dest}`);
    } else {
      console.log(`Source not found: ${img.src}`);
    }
  } catch (err) {
    console.error(`Error copying ${img.src}:`, err.message);
  }
}
