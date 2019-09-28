import { Option } from 'commander';

export type RenameOption = {
	recursive: boolean;
	case: boolean;
	match: string|undefined;
	exclude: string|undefined;
	find: string;
	replace: string;
	strategy: string;
} & Option;
