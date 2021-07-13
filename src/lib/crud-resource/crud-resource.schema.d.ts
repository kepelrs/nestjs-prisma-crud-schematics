import { Path } from '@angular-devkit/core';

export interface CrudResourceOptions {
  /**
   * The name of the crud-resource.
   */
  name: string;
  /**
   * The path to create the crud-resource.
   */
  path?: string | Path;
  /**
   * The source root path
   */
  sourceRoot?: string;
  /**
   * Application language.
   */
  language?: string;
  /**
   * Specifies if spec files are generated.
   */
  spec?: boolean;
  /**
   * The path to insert the module declaration.
   */
  module?: Path;
  /**
   * Metadata name affected by declaration insertion.
   */
  metadata?: string;
  /**
   * Directive to insert declaration in module.
   */
  skipImport?: boolean;
  /**
   * The transport layer.
   */
  type?: 'rest' | string;
  /**
   * When true, CRUD entry points are generated.
   */
  crud?: true;
  /**
   * Flag to indicate if a directory is created.
   */
  flat?: boolean;
  /**
   * When true, "@nestjs/swagger" dependency is installed in the project.
   */
  isSwaggerInstalled?: boolean;
}
