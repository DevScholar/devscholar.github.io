const fs = require('fs');
const path = require('path');

const NBSP_REGEX = /&nbsp;/g;
const NBSP_CHAR = /\u00A0/g;

function isIgnored(relativePath, ignorePatterns) {
    return ignorePatterns.some(pattern => {
        if (pattern.endsWith('/')) {
            return relativePath.startsWith(pattern) || relativePath.includes('/' + pattern);
        }
        return relativePath.includes(pattern);
    });
}

function getIgnorePatterns() {
    const gitignorePath = path.join(process.cwd(), '.gitignore');
    if (!fs.existsSync(gitignorePath)) {
        return [];
    }
    
    const content = fs.readFileSync(gitignorePath, 'utf-8');
    return content
        .split('\n')
        .map(line => line.trim())
        .filter(line => line && !line.startsWith('#'))
        .map(pattern => pattern.replace(/^\//, '').replace(/\/$/, ''));
}

function processFile(filePath, ignorePatterns) {
    const relativePath = path.relative(process.cwd(), filePath);
    
    if (isIgnored(relativePath, ignorePatterns)) {
        return { skipped: true, changes: 0 };
    }
    
    if (!filePath.endsWith('.md')) {
        return { skipped: true, changes: 0 };
    }
    
    const content = fs.readFileSync(filePath, 'utf-8');
    let newContent = content
        .replace(NBSP_REGEX, '')
        .replace(NBSP_CHAR, '');
    
    if (newContent === content) {
        return { skipped: false, changes: 0 };
    }
    
    fs.writeFileSync(filePath, newContent, 'utf-8');
    const changes = (content.match(NBSP_REGEX) || []).length + (content.match(NBSP_CHAR) || []).length;
    return { skipped: false, changes };
}

function walkDir(dir, ignorePatterns, results = { processed: 0, modified: 0, totalChanges: 0, skipped: 0 }) {
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
            if (item === 'node_modules' || item === '.git') {
                continue;
            }
            const relativePath = path.relative(process.cwd(), fullPath);
            if (isIgnored(relativePath, ignorePatterns)) {
                results.skipped++;
                continue;
            }
            walkDir(fullPath, ignorePatterns, results);
        } else if (stat.isFile()) {
            results.processed++;
            const result = processFile(fullPath, ignorePatterns);
            if (result.skipped) {
                results.skipped++;
            } else if (result.changes > 0) {
                results.modified++;
                results.totalChanges += result.changes;
                console.log(`Modified: ${path.relative(process.cwd(), fullPath)} (${result.changes} nbsp removed)`);
            }
        }
    }
    
    return results;
}

console.log('Scanning for .md files and removing nbsp...\n');

const ignorePatterns = getIgnorePatterns();
if (ignorePatterns.length > 0) {
    console.log('Ignoring patterns from .gitignore:', ignorePatterns, '\n');
}

const results = walkDir(process.cwd(), ignorePatterns);

console.log('\n--- Summary ---');
console.log(`Total files processed: ${results.processed}`);
console.log(`Files modified: ${results.modified}`);
console.log(`Total nbsp removed: ${results.totalChanges}`);
console.log(`Files/dirs skipped: ${results.skipped}`);
