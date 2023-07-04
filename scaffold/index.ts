import { Command } from 'commander';
import fs from 'fs';
import path from 'path';

const program = new Command();

program
  .version('0.0.1')
  .description('CLI tool for scaffolding a new lit component');

program
  .command('create <componentname>')
  .description('Create a new TypeScript lit Component')
  .action((componentname) => {
    if (!isValidComponentName(componentname)) {
      console.error(`${componentname}: Invalid name format`);
      process.exit(1);
    }

    const componentPath = path.join('src', "scripts", 'components', componentname);
    const directoryDir = path.join(process.cwd(), componentPath);
    const filePath = path.join(directoryDir, 'index.ts');

    if (fs.existsSync(directoryDir)) {
      console.error(`Component ${componentname} already exists.`);
      process.exit(1);
    } else {
      console.log("Creating component directory")
      fs.mkdirSync(directoryDir)
    }

    const content = generateComponentFileContent(componentname);
    fs.writeFileSync(filePath, content);
    console.log(`Component ${componentname} created: ${componentPath}`);
    addComponentToExports(componentname);
  });

program.parse(process.argv);

function isValidComponentName(componentName: string) {
  return /^[a-z]+(-?[a-z]+)*$/i.test(componentName)
}

function convertComponentNameToClassName(componentName: string) {
  if (!isValidComponentName(componentName)) {
    throw new Error("Invalid file format")
  }
  // Convert to PascalCase and remove hyphens at beginning/end of string
  return componentName.split("-").map(part => part[0].toUpperCase() + part.substring(1).toLowerCase()).join("");
}

function generateComponentFileContent(componentName: string) {
  const className = convertComponentNameToClassName(componentName);
  let content = `
import { LitElement, html, customElement, property } from 'lit-element';

@customElement('${componentName}')
export class ${className} extends LitElement {
  @property()
  text = 'Text';

  render() {
    return html\`<p>\${this.text}</p>\`;
  }
}`;
  return `${content}\n`
}

function addComponentToExports(componentname: string) {
  const relativePath = path.join('src', 'components', 'index.ts');
  const filePath = path.join(process.cwd(), relativePath);

  const exportStatement = `\nexport * from './${componentname}'`;

  fs.appendFileSync(filePath, exportStatement);
  console.log(`${relativePath}: Included ${componentname} in list of export`);
}