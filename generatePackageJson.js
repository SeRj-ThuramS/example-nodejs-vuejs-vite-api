import fs from "fs";
import path from "path";
import {fileURLToPath} from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectDir = path.resolve(__dirname, 'server');
const packageJsonPath = path.resolve(__dirname, 'dist', 'package.json');

const jsFiles = [];

function getJsFiles(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            getJsFiles(fullPath);
        } else if (entry.isFile() && /\.(js|ts)$/.test(entry.name)) {
            jsFiles.push(fullPath);
        }
    }
}


function getInstalledVersion(pkg) {
    const projectPackageJsonPath = path.resolve(__dirname, 'package.json');
    const projectPackageJson = JSON.parse(fs.readFileSync(projectPackageJsonPath, 'utf8'));

    if (projectPackageJson.dependencies && projectPackageJson.dependencies[pkg]) {
        return projectPackageJson.dependencies[pkg];
    }

    if (projectPackageJson.devDependencies && projectPackageJson.devDependencies[pkg]) {
        return projectPackageJson.devDependencies[pkg];
    }

    return '*';
}



getJsFiles(projectDir);

const depSet = new Set();
const importRegex = /(?:require\(['"]([^'"]+)['"]\))|(?:from\s+['"]([^'"]+)['"])/g;

for (const file of jsFiles) {
    const content = fs.readFileSync(file, 'utf8');
    let match;
    while ((match = importRegex.exec(content)) !== null) {
        const dep = match[1] || match[2];
        if (dep && !dep.startsWith('.') && !dep.startsWith('/')) {
            depSet.add(dep.split('/')[0]); // Берём основной пакет
        }
    }
}

const dependencies = {};
let depSetSize = 0
depSet.forEach(dep => {
    const version = getInstalledVersion(dep)

    if (version !== "*") {
        dependencies[dep] = version;
        depSetSize++
    }
});

const packageJson = {
    name: "server-api",
    version: "1.0.0",
    main: "server.cjs",
    type: "commonjs",
    scripts: {
        update: "npm install .",
        start: "node .",
    },
    dependencies
};

fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
console.log(`${packageJsonPath} created with ${depSetSize} dependencies.`);
