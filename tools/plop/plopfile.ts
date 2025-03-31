import type { ActionType, NodePlopAPI } from "plop";
import fs from "node:fs";
import path from "node:path";

module.exports = function (plop: NodePlopAPI) {
  plop.setHelper("toPascalCase", (text) => {
    return text.replace(/(^\w|-\w)/g, clearAndUpper).replace(/-/g, "");

    function clearAndUpper(text: string) {
      return text.replace(/-/, "").toUpperCase();
    }
  });

  const rootDir = path.resolve(__dirname, "../../");
  const appsDir = path.resolve(__dirname, `${rootDir}/apps`);

  // const currentDir = process.env.INIT_CWD!;

  const apps = fs.readdirSync(appsDir).filter((file) => {
    return fs.statSync(path.join(appsDir, file)).isDirectory();
  });

  //convert existing apps to object
  const appsObj: Record<string, string> = apps.reduce((acc, app) => {
    acc[app] = app;
    return acc;
  }, {});

  const myApps: Record<string, string> = {
    ...appsObj,
    newApp: "New λ - lambda (from template)",
  };

  plop.setGenerator("myGenerator", {
    prompts: [
      {
        type: "list",
        name: "appName",
        message: "Choose an app or generate a new one",
        choices: Object.values(myApps),
      },
      /* ADD TO EXISITNG PROJECT PROMPT */
      {
        when(context) {
          return !context.appName.includes(myApps.newApp);
        },
        type: "list",
        name: "resourceType",
        message: "Select the type of resource to generate:",
        choices: ["route"],
        default: "route",
      },
      {
        when(context) {
          return (
            !context.appName.includes(myApps.newApp) &&
            context?.resourceType === "route"
          );
        },
        type: "input",
        name: "routeName",
        message: "Route name in plural (e.g., projects):",
        validate(value) {
          if (/.+/.test(value)) return true;
          return "Project name is required.";
        },
      },

      /* NEW PROJECT PROMPT */
      {
        when(context) {
          return context.appName.includes(myApps.newApp);
        },
        type: "input",
        name: "newAppName",
        message: "Choose a new app name",
      },
    ],
    actions: (data) => {
      const actions: ActionType[] = [];
      /* NEW PROJECT ACTION */
      if (data?.newAppName) {
        const { newAppName } = data;
        actions.push({
          type: "addMany",
          destination: `${appsDir}/${newAppName}`,
          templateFiles: ["template/lambda-package/**"],
          base: "template/lambda-package",
        });
        actions.push(
          {
            type: "append",
            path: `${rootDir}/pnpm-workspace.yaml`,
            separator: `  - "apps/${newAppName}"\n`,
          },
          {
            type: "Success-message-project",
          }
        );
      }

      /* NEW ROUTE ACTION */
      if (data?.routeName) {
        const { routeName, appName } = data;
        const folderName = `${appsDir}/${appName}/src/routes/${routeName}`;

        actions.push(
          {
            type: "add",
            path: `${folderName}/index.ts`,
            templateFile: "template/routes/index.ts.hbs",
          },
          {
            type: "add",
            path: `${folderName}/${routeName}.controller.ts`,
            templateFile: "template/routes/controller.ts.hbs",
          },
          {
            type: "add",
            path: `${folderName}/${routeName}.service.ts`,
            templateFile: "template/routes/service.ts.hbs",
          },
          {
            type: "add",
            path: `${folderName}/${routeName}.routes.ts`,
            templateFile: "template/routes/routes.ts.hbs",
          },
          {
            type: "add",
            path: `${folderName}/${routeName}.test.ts`,
            templateFile: "template/routes/test.ts.hbs",
          },
          {
            type: "add",
            path: `${folderName}/${routeName}.type.ts`,
            templateFile: "template/routes/type.ts.hbs",
          },
          {
            type: "Success-message-route",
          }
        );
      }

      return actions;
    },
  });

  // Log a message after the action is completed
  plop.setActionType("Success-message-route", () => {
    return "DO NOT FORGET TO REGISTER THE ROUTE IN THE APP'S MAIN ROUTER";
  });
  plop.setActionType("Success-message-project", () => {
    return "DO NOT FORGET TO INSTALL THE DEPENDENCIES";
  });
};
