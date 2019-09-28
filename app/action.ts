import * as fs from 'fs';
import * as path from 'path';

/**
 * Contains the definition of function to executed when
 * we run a command
 *
 * @class
 */
class Action {
	private static counter: number = 0;

	/**
	 * getCounter
	 *
	 * Returns the number of files renamed
	 *
	 * @return number
	 */
	public static getCounter(): number {
		return Action.counter;
	}

	/**
	 * rename
	 *
	 * Find the file's name in a directory that match the keyword and
	 * replace with a string the rename the file to the new one
	 *
	 * @param {string} dirPath Directory containing the files to rename
	 * @param {boolean} recursive Indicates if we want to rename sub directory
	 * @param {boolean} isCaseSensitive If case sensitivity matter on file's name
	 * @param {string} match Extensions to search for
	 * @param {string} exclude Extensions to ignore
	 * @param { string} find keyword to find
	 * @param { string} replace string to replace the keyword found
	 *
	 * @return void
	 */
	public static rename(
		dirPath: string,
		recursive: boolean,
		isCaseSensitive: boolean,
		match: string|undefined,
		exclude: string|undefined,
		find: string,
		replace: string,
	): void {
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

	/**
	 * removeDirectory
	 *
	 * Delete a directory
	 *
	 * @param {string} dirPath Directory containing the files to rename
	 * @param {boolean} recursive Indicates if we want to rename sub directory
	 *
	 * @return void
	 */
	public static removeDirectory(dirPath: string, recursive: boolean): void {
		const pathExist: boolean = fs.existsSync(dirPath);

		if (!pathExist) {
			throw new Error('The path doesn\'t exists!');
		}

		const files: string[] = fs.readdirSync(dirPath, { encoding: 'utf-8' });

		for (const file of files) {
			const filePath: string = `${dirPath}/${file}`;

			if (fs.statSync(filePath).isDirectory() && recursive) {
					Action.removeDirectory(filePath, recursive);
			} else {
				fs.unlinkSync(filePath);
			}
		}

		fs.rmdirSync(dirPath);
	}
}

export { Action };
