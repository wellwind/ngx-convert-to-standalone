ngx-convert-to-standalone
===

Convert a new Angular project to standalone settings.

This sechmatics will convert `angular.json` in Angular, add `standalone: true` settings to `projects.[project].schematics.@schematics/angular:[component|directive|pipe]`.

By default setting, will convert `angular.json` settings like following.

```json
{
  "$schema": "./node_modules/@angular/cli/lib/config/schema.json",
  "version": 1,
  "newProjectRoot": "projects",
  "projects": {
    "demo1": {
      "projectType": "application",
      "schematics": {
        "@schematics/angular:component": {
          "inlineTemplate": true,
          "inlineStyle": true,
          "standalone": true,
          "flat": true
        },
        "@schematics/angular:directive": {
          "standalone": true
        },
        "@schematics/angular:pipe": {
          "standalone": true
        }
      },
    }
  }
}
```

Usage
---

```bash
ng add ngx-convert-to-standalone
```

You can skip some settings, for example, `--skip-component-inline-template=false`.

```bash
ng add ngx-convert-to-standalone --skip-component-inline-template
```

Then `projects.[project].schematics.@schematics/angular:component` will not be changed.

If you have multiple projects, you can specify the project name.

```bash
ng add ngx-convert-to-standalone --project=demo1
```

Arguments
---

* `--project`: Specify the project name. If not set, will set the first project.
* `--skip-component-inline-template`: Skip setting `"inlineTemplate": true` in `@schematics/angular:component` settings. Default is `false`.
* `--skip-component-inline-style`: Skip setting `"inlineStyle": true` in `@schematics/angular:component` settings. Default is `false`.
* `--skip-component-standalone`: Skip setting `"standalone": true` in `@schematics/angular:component` settings. Default is `false`.
* `--skip-component-flat`: Skip setting `"flat": true` in `@schematics/angular:component` settings. Default is `false`.
* `--skip-directive-standalone`: Skip setting `"standalone": true` in `@schematics/angular:directive` settings. Default is `false`.
* `--skip-pipe-standalone`: Skip setting `"standalone": true` in `@schematics/angular:pipe` settings. Default is `false`.

License
---

MIT
