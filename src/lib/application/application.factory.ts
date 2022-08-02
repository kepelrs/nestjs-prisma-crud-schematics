import { join, Path, strings } from '@angular-devkit/core';
import {
  apply,
  mergeWith,
  move,
  Rule,
  Source,
  template,
  url,
} from '@angular-devkit/schematics';
import { basename, parse } from 'path';
import { normalizeToKebabOrSnakeCase } from '../../utils/formatting';
import {
  DEFAULT_AUTHOR,
  DEFAULT_DESCRIPTION,
  DEFAULT_LANGUAGE,
  DEFAULT_VERSION,
} from '../defaults';
import { ApplicationOptions } from './application.schema';

export function main(options: ApplicationOptions): Rule {
  options.name = normalizeToKebabOrSnakeCase(options.name.toString());

  const path =
    !options.directory || options.directory === 'undefined'
      ? options.name
      : options.directory;

  options = transform(options);
  return mergeWith(generate(options, path));
}

function transform(options: ApplicationOptions): ApplicationOptions {
  const target: ApplicationOptions = Object.assign({}, options);

  target.author = !!target.author ? target.author : DEFAULT_AUTHOR;
  target.description = !!target.description
    ? target.description
    : DEFAULT_DESCRIPTION;
  target.language = !!target.language ? target.language : DEFAULT_LANGUAGE;
  target.name = resolvePackageName(target.name.toString());
  target.version = !!target.version ? target.version : DEFAULT_VERSION;

  target.packageManager =
    !target.packageManager || target.packageManager === 'undefined'
      ? 'npm'
      : target.packageManager;
  target.dependencies = !!target.dependencies ? target.dependencies : '';
  target.devDependencies = !!target.devDependencies
    ? target.devDependencies
    : '';
  return target;
}

/**
 * The rules for `name` field defined at https://www.npmjs.com/package/normalize-package-data
 * are the following: the string may not:
 * 1. start with a period.
 * 2. contain the following characters: `/@\s+%`.
 * 3. contain any characters that would need to be encoded for use in URLs.
 * 4. resemble the word `node_modules` or `favicon.ico` (case doesn't matter).
 * but only the rule *1* is addressed by this function as the other ones doesn't
 * have a canonical representation.
 */
function resolvePackageName(path: string) {
  const { base: baseFilename, dir: dirname } = parse(path);
  if (baseFilename === '.') {
    return basename(process.cwd());
  }
  // If is as a package with scope (https://docs.npmjs.com/misc/scope)
  if (dirname.match(/^@[^\s]/)) {
    return `${dirname}/${baseFilename}`;
  }
  return baseFilename;
}

function generate(options: ApplicationOptions, path: string): Source {
  return apply(url(join('./files' as Path, options.language)), [
    template({
      ...strings,
      ...options,
    }),
    move(path),
  ]);
}
