#!/usr/bin/env node

import { Command } from 'commander';
import {DeleteOption, RenameOption} from './types';
import { Action } from './action';

const program: Command = require('commander');

// The default option flags are -V and --version
program.version('1.0.0', '-v, --version', 'Output the current version');

program
	.command('size <path> [unit]')
	.option('-m, --match <type>',  'Specify some extensions to look')
	.option('-e, --exclude <type>',  'Exclude folders')
	.option('-r, --recursive',  'Recursive')
	.description('Get the size of a folder')
	.action((path: string, unit: string, options: any) => {
		console.log(`size command called with path ${path}; unit ${unit}`);
		console.log(`size options ${JSON.stringify(options)}`);
	});

program
	.command('delete <path>')
	.description('Delete a folder')
	.option('-r, --recursive',  'Delete recursively')
	.action((path: string, options: DeleteOption) => {
		Action.removeDirectory(path, options.recursive);
		console.info('Done: Directory deleted successfully!');
	});

program
	.command('rename <path>')
	.description('Rename files in folder')
	.option('-r, --recursive',  'Recursive')
	.option('-c, --case', 'Sensitive case')
	.option('-m, --match <type>',  'Specify some extensions to look')
	.option('-e, --exclude <type>',  'Exclude files with provided extension')
	.option('-o, --find <type>', 'Text to find')
	.option('-n, --replace <type>', 'Text to replace with', '')
	.option('-s, --strategy <type>', 'Replace at start, include, end, match', 'match')
	.action((path: string, options: RenameOption) => {
		const { match, exclude, recursive, find, replace }: any = options;

		Action.rename(path, recursive, options.case, match, exclude, find, replace);
		const counter: number = Action.getCounter();

		console.info(`Done: ${counter} file${ counter > 1 ? 's' : '' } processed!`);
	});

program
	.option('-l, --list',  'List folder\'s content');

// Must be before .parse() since node's emit() is immediate
program.on('--help', () => {
	console.log('');
	console.log('Examples:');
	console.log('  $ rhaegal size /Home/Desktop/Code unit GB');
	console.log('  $ custom-help -h');
});

program.on('option:strategy', () => {
	// TODO make sure the value is end, match, start, include otherwise fail
});

// error on unknown commands
program.on('command:*',  () => {
	console.error('Invalid command: %s\nSee --help for a list of available commands.', program.args.join(' '));
	process.exit(1);
});

program.parse(process.argv);
