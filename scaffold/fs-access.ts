import fs from 'fs';
import path from 'path';
import { generateComponentFileContent } from './utils.js';

export function createComponent(componentname: string) {
  const componentPath = path.join('src', "scripts", 'components', componentname);
  const directoryDir = path.join(process.cwd(), componentPath);
  const filePath = path.join(directoryDir, 'index.ts');

  if (fs.existsSync(directoryDir)) {
    console.error(`Component ${componentname} already exists.`);
    process.exit(1);
  } else {
    fs.mkdirSync(directoryDir)
  }

  const content = generateComponentFileContent(componentname);
  fs.writeFileSync(filePath, content);
  console.log(`CREATED ${componentPath}`);
}

export function addComponentToExports(componentname: string) {
  const relativePath = path.join('src', 'scripts', 'components', 'index.ts');
  const filePath = path.join(process.cwd(), relativePath);

  const exportStatement = `\nexport * from './${componentname}'`;

  fs.appendFileSync(filePath, exportStatement);
  console.log(`UPDATED ${relativePath}`);
}