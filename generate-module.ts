//CLI to generate module boilerplate
// yarn run generate:module students

import * as fs from 'fs';
import * as path from 'path';

const moduleName = process.argv[2];

if (!moduleName) {
    console.error('❌ Please provide a module name.');
    process.exit(1);
}

const baseDir = path.join(__dirname, 'src', 'app', 'modules', moduleName);
const files = [
    'controller',
    'interface',
    'model',
    'route',
    'service',
    'utils',
    'validation',
];

fs.mkdirSync(baseDir, { recursive: true });

files.forEach((type) => {
    const filename = `${moduleName}.${type}.ts`;
    const filePath = path.join(baseDir, filename);

    const content = `// ${type} file for ${moduleName} module\n\nexport {};`;

    fs.writeFileSync(filePath, content, 'utf8');
});

console.log(`✅ Module '${moduleName}' created successfully.`);
