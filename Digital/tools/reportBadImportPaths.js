"use strict";

/* reportBadImportPaths.js
 *
 * This is a tool for scanning typescript import statements.
 * If your import statement looks like this: import { blah } from './myBlah';
 * and the file on disk is named MyBlah.ts, this tool will report the 
 * difference in case so you can fix it. You can fix it by renaming the file
 * or by changing the import statement. In the example above, the import
 * statement could be changed to import { blah } from './MyBlah';
 * 
 * This tool uses the TypeScript parser that's part of the "ntypescript" npm
 * package to locate import statements in .ts files.
 * 
 * This tool enumerates all TypeScript files in the 'src' folder (top-level only)
 * and follows the import statements with relative paths in those TypeScript files
 * recursively until all referenced TypeScript files have been checked.
 * 
 * No files are written to disk by this tool.
 * 
 */

var nt = require('ntypescript');
var fs = require('fs');
var path = require('path');

var first = false;

function parseImports(fileName, mappings, typeScriptFilesOnDisk, errors, depth) {

	function findAllRelativeImports(node) {
		function findAllImports(node) {
			if ((nt.syntaxKindToName(node.kind) === 'StringLiteral') && node.parent && (nt.syntaxKindToName(node.parent.kind) === 'ImportDeclaration')) {
				if (node.text && (node.text.startsWith('./') || node.text.startsWith('../'))) {
					mappings.push(node.text);
				}
			}
		    node.getChildren().forEach(c => findAllImports(c));
		}
		var mappings = [];
		findAllImports(node);
		return mappings;
	}

	if (mappings.hasOwnProperty(fileName)) { return; }
	mappings[fileName] = 1;

	var sourceCode = fs.readFileSync(fileName, "utf8");

	var ast = nt.createSourceFile('dummy.ts', sourceCode, 0, /*setParentNodes*/ true);

	var importPaths = findAllRelativeImports(ast);

	importPaths.forEach(importPath => {
		var nextFilePath = path.resolve(path.dirname(fileName), importPath);
		var targetTsFile = nextFilePath + '.ts';
		var targetTsModule = path.join(nextFilePath, '/index.ts');
		var matched = false;

		typeScriptFilesOnDisk.forEach(file => {
			if (!matched && (file === targetTsFile || file === targetTsModule)) {
				matched = true;
			}
		});

		if (!matched) {
			if (!errors.hasOwnProperty(fileName)) {
				errors[fileName] = [];
			}

			var error = {importPath: importPath, suggestion: 'unknown'};

			typeScriptFilesOnDisk.forEach(file => {
				var suggestion;
				if (!matched) {
					if (file.toLowerCase() === targetTsFile.toLowerCase() || file.toLowerCase() === targetTsModule.toLowerCase()) {
						matched = true;

						var importPathLeadingDotDotDashes = importPath.match(/(\.\.\/)+/);
						if (importPathLeadingDotDotDashes === null) { importPathLeadingDotDotDashes = ''; } else { importPathLeadingDotDotDashes = importPathLeadingDotDotDashes[0]; }

						var importPathLeadingDotSlash = importPath.match(/^\.\//);
						if (importPathLeadingDotSlash === null) { importPathLeadingDotSlash = ''; } else { importPathLeadingDotSlash = importPathLeadingDotSlash[0]; }
						var importPathLeadingDoDadsLength = Math.max(importPathLeadingDotDotDashes.length, importPathLeadingDotSlash.length);
						var cleanFile;

						if (file.toLowerCase() === targetTsFile.toLowerCase()) {
							cleanFile = file.replace(/\.ts$/,'');
						}

						if (file.toLowerCase() === targetTsModule.toLowerCase()) {
							cleanFile = file.replace(/index\.ts$/,'');
						}

						var goodBits = importPath.substring(0, importPathLeadingDoDadsLength) + cleanFile.slice((importPath.length - importPathLeadingDoDadsLength) * -1);

						error.suggestion = goodBits.replace(/\\/g, '/');
					}
				}
			});

			errors[fileName].push(error);
		}

		if (fs.existsSync(targetTsFile)) {
			parseImports(targetTsFile, mappings, typeScriptFilesOnDisk, errors, depth++);
		} else if (fs.existsSync(targetTsModule)) {
			parseImports(targetTsModule, mappings, typeScriptFilesOnDisk, errors, depth++);
		}
	});

	// console.log('errors', errors);
}

function getTsFiles(rootDir) {
	function getTsFilesInDir(dir) {
		fs.readdirSync(dir).forEach(item => {
			var fullPath = path.resolve(dir, item);
			var fsObj = fs.statSync(fullPath);
			if (fsObj && fsObj.isDirectory()) {
				getTsFilesInDir(fullPath);
			} else {
				if (path.extname(fullPath) === '.ts') {
					files.push(fullPath);
				}
			}
		});
	}
	var files = [];
	getTsFilesInDir(rootDir);
	return files;
}

var rootFolder = path.resolve(__dirname, './src');
var typeScriptFilesOnDisk = getTsFiles(rootFolder);
var errors = {};
var mappings = [];
var fsoList = fs.readdirSync(rootFolder);

fsoList.forEach(fso => {
	var fqFileName = path.resolve(rootFolder, fso);
	var stats = fs.statSync(fqFileName);
	if (stats.isFile() && fso.endsWith('.ts')) {
		parseImports(fqFileName, mappings, typeScriptFilesOnDisk, errors, 0);
	}
});

var consoleRed = '\x1b[31m';
var consoleYellow = '\x1b[33m';
var consoleReset = '\x1b[39m';

if (Object.keys(errors).length === 0) {
	console.log('All is well. Paths in import statements in all TypeScript files match the corresponding files on disk.');
} else {
	Object.keys(errors).sort().forEach(fileName => {
		console.log('Faulty import path in', fileName);
		errors[fileName].forEach(err => {
			console.log('');
			console.log(consoleRed,    '    Change this ... :', err.importPath, consoleReset);
			console.log(consoleYellow, '    To this ....... :', err.suggestion, consoleReset);
		});
		console.log('');
	});
}
