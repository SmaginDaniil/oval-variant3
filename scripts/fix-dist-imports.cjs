const fs = require('fs');
const path = require('path');

function walk(dir) {
  const items = fs.readdirSync(dir, { withFileTypes: true });
  for (const it of items) {
    const full = path.join(dir, it.name);
    if (it.isDirectory()) {
      walk(full);
    } else if (it.isFile() && full.endsWith('.js')) {
      fixFile(full);
    }
  }
}

function fixFile(filePath) {
  let src = fs.readFileSync(filePath, 'utf8');
  const before = src;
  src = src.replace(/(from\s+['"])(\.\.?\/[^'";]+?)(['"])/g, (m, p1, p2, p3) => {
    if (/\.(js|mjs|cjs|json|node|ts)$/.test(p2)) {
      return p1 + p2 + p3;
    }
    return p1 + p2 + '.js' + p3;
  });
  src = src.replace(/(export\s+[^\n]*?from\s+['"])(\.\.?\/[^'";]+?)(['"])/g, (m, p1, p2, p3) => {
    if (/\.(js|mjs|cjs|json|node|ts)$/.test(p2)) {
      return p1 + p2 + p3;
    }
    return p1 + p2 + '.js' + p3;
  });

  if (src !== before) {
    fs.writeFileSync(filePath, src, 'utf8');
    console.log(`Fixed imports in ${filePath}`);
  }
}

const distDir = path.join(__dirname, '..', 'dist');
if (!fs.existsSync(distDir)) {
  console.error('dist directory not found, skipping import fixes.');
  process.exit(0);
}
walk(distDir);
console.log('Import fixup complete.');
