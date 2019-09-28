import * as fs from 'fs';
import * as path from 'path';

class Action {
	private static counter: number = 0;

	public static getCounter(): number {
		return Action.counter;
	}

	public static rename(
		dirPath: string,
		recursive: boolean,
		isCaseSensitive: boolean,
		match: string|undefined,
		exclude: string|undefined,
		find: string,
		replace: string,
	): void {
		// console.log(`rename command called with path: ${path}`);
		// console.log('Match => ', match);
		// console.log('Exclude => ', exclude);
		// console.log('Recursive => ', recursive);
		// console.log('Case => ', isCaseSensitive);
		// console.log('Find => ', find);
		// console.log('Replace => ', replace);
		// console.log('Strategy => ', strategy);
		const excludeArray: string[] = exclude ? exclude.split(',') : [];
		const matchArray: string[] = match ? match.split(',') : [];

		const pathExist: boolean = fs.existsSync(dirPath);

		if (!pathExist) {
			throw new Error('The path doesn\'t exists!');
		}

		const stat: fs.Stats = fs.statSync(dirPath);

		if (!stat.isDirectory()) {
			throw new Error('The path must be a directory!');
		}

		const dirs: string[] = fs.readdirSync(dirPath, { encoding: 'utf-8' });
		const files: string[] = [];

		for (const file of dirs) {
			const filePath: string = `${dirPath}/${file}`;
			const statFile: fs.Stats = fs.statSync(filePath);

			if (statFile.isDirectory()) {
				if (recursive) {
					Action.rename(filePath, recursive, isCaseSensitive, match, exclude, find, replace);
				}
			} else {
				const ext: string = path.extname(filePath).toLowerCase().substring(1);

				if (excludeArray.length > 0) {
					if (!excludeArray.includes(ext)) {
						files.push(file);
					}
				} else if (matchArray.length > 0) {
					if (matchArray.includes(ext)) {
						files.push(file);
					}
				} else {
					files.push(file);
				}
			}
		}

		files.forEach((f: string) => {
			const ext: string = path.extname(f);
			const temp: string = f.substring(0, f.length - ext.length);
			const renamed: string = (isCaseSensitive ? temp : temp.toLowerCase()).replace(find,  replace).trim();
			const fileName: string = `${renamed}${ext}`;

			// console.log('Final: ', fileName);
			if (f !== fileName) {
				Action.counter += 1;
			}

			fs.renameSync(`${dirPath}/${f}`, `${dirPath}/${fileName}`);
		});
	}
}

export { Action };
