#!/usr/bin/env node

const {execSync} = require('child_process')
const readline = require('readline');


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


const runCommand  = (command) =>{
    try {
        execSync(`${command}`, {stdio: 'inherit'})
    } catch (error) {
        console.error(`Failed to execute ${command} `, e)
        return false
    }

    return true
}

let repoName = process.argv[2];

if (!repoName){
    rl.question(`Enter your project's name: ` , (answer) => {
        repoName = answer.trim();
        rl.close();
    });
}
const gitCheckoutCommand = `git clone --depth 1 https://github.com/AweSamarth/create-morph-app ${repoName}`
const installDepsCommand = `cd ${repoName} && npm install`


console.log(`Creating project ${repoName}`)
const checkedOut = runCommand(gitCheckoutCommand)
if(!checkedOut) process.exit(-1)

console.log(`Installing dependencies for ${repoName}`)
const installedDeps = runCommand( installDepsCommand)
if(!installedDeps) process.exit(-1)


console.log("Project created successfully! Run the following commands to start your project in development mode:")
console.log(`cd ${repoName} && npm run dev`)