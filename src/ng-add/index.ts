import { Rule, SchematicContext, Tree } from "@angular-devkit/schematics";
import { NgAddOptions } from "./schema";

const setProjectSchematicSettings = (
  angularJson: any,
  projectName: string,
  schematicName: string,
  key: string,
  value: any
) => {
  const project = angularJson.projects[projectName];
  project.schematics = project.schematics || {};
  project.schematics[schematicName] = project.schematics[schematicName] || {};
  project.schematics[schematicName][key] = value;
};

export function ngAdd(options: NgAddOptions): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    // validate options
    if (!tree.exists("angular.json")) {
      _context.logger.error("❌ angular.json not found");
      return tree;
    }

    const angularJson = JSON.parse(tree.read("angular.json")!.toString("utf-8"));

    if (!angularJson.projects) {
      _context.logger.error("❌ angular.json does not contain projects");
      return tree;
    }

    let projectName = options.project || Object.keys(angularJson.projects)[0];
    if (!angularJson.projects[projectName]) {
      _context.logger.error(`❌ Project ${projectName} not found in angular.json`);
      return tree;
    }

    // set project setting

    // components
    if (!options.skipComponentInlineTemplate) {
      setProjectSchematicSettings(
        angularJson,
        projectName,
        "@schematics/angular:component",
        "inlineTemplate",
        true
      );
      _context.logger.info(`✅ Set inlineTemplate of components for project ${projectName}`)
    }
    if (!options.skipComponentInlineStyle) {
      setProjectSchematicSettings(
        angularJson,
        projectName,
        "@schematics/angular:component",
        "inlineStyle",
        true
      );
      _context.logger.info(`✅ Set inlineStyle of components for project ${projectName}`)
    }
    if (!options.skipComponentFlat) {
      setProjectSchematicSettings(
        angularJson,
        projectName,
        "@schematics/angular:component",
        "flat",
        true
      );
      _context.logger.info(`✅ Set flat directory of components for project ${projectName}`)
    }
    if (!options.skipComponentStandalone) {
      setProjectSchematicSettings(
        angularJson,
        projectName,
        "@schematics/angular:component",
        "standalone",
        true
      );
      _context.logger.info(`✅ Use Standalone Components as default for project ${projectName}`)
    }

    // directives
    if (!options.skipDirectiveStandalone) {
      setProjectSchematicSettings(
        angularJson,
        projectName,
        "@schematics/angular:directive",
        "standalone",
        true
      );
      _context.logger.info(`✅ Use Standalone Directives as default for project ${projectName}`)
    }

    if (!options.skipPipeStandalone) {
      setProjectSchematicSettings(
        angularJson,
        projectName,
        "@schematics/angular:pipe",
        "standalone",
        true
      );

      _context.logger.info(`✅ Use Standalone Pipes as default for project ${projectName}`)
    }

    tree.overwrite("angular.json", JSON.stringify(angularJson, null, 2));
    return tree;
  };
}
