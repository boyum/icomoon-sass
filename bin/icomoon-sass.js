#! /usr/bin/env node

// Run `icomoon-sass <directory>`

'use strict';

// import args from 'args';
// import copy from 'copy';
// import createFile from 'create-file';
// import fileExists from 'file-exists';
// import mkdirp from 'mkdirp';
// import replace from 'replace';

const argv = require('yargs').argv;
// const copy = require('copy');
// const copyfiles = require('copyfiles');
const cp = require('cp');
// const createFile = require('create-file');
const fileExists = require('file-exists');
const mkdirp = require('mkdirp');
const replace = require('replace');
// const replaceInFile = require('replace-in-file');

const argument = (argv._ + '').replace(/\\/g, '/') + '/';

const directory = argument;

const distDir = 'dist\\';

const styleCss = 'style.css';

if (!fileExists(directory + styleCss)) {
    console.log(`Error: ${directory + styleCss} does not exist.`);
    return;
}

// Create distribution directory
mkdirp(directory + distDir, err => {
    if (err) {
        console.log('mkdirp error: ', err);
    }
});

// Copy styles from style.css to dist/style.css
// copy.one(directory + styleCss, directory + distDir, (err, file) => {
//     if (err) {
//         console.log('NEI', err);
//     }
// });

// copyfiles([directory + styleCss, directory + distDir], {}, _ => {});

cp.sync(directory + styleCss, directory + distDir + 'style.css');

// Replace `.icon` with `%icon`
replace({
    regex: /\.icon\-/g,
    replacement: '%icon-',
    paths: '\\' + directory + distDir + styleCss,
    silent: true
});

// replaceInFile({
//     files: directory + distDir + styleCss,

//     replace: /\.icon\-/g,
//     with: '%icon-',

//     replace: /fonts\//g,
//     with: '../fonts/',

//     replace: /\:before/g,
//     with: ''
// }).catch(error => {
//     console.log(error);
// });

// Replace `fonts/` with `../fonts`
// replace({
//     regex: /fonts\//g,
//     replacement: '../fonts/',
//     paths: '/' + directory + distDir + styleCss,
//     silent: true
// });

// Remove :before 
// replace({
//     regex: /\:before/g,
//     replacement: '',
//     paths: '/' + directory + distDir + styleCss,
//     silent: true
// });