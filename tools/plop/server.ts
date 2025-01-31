import type { ActionType, NodePlopAPI } from "plop";
import path from "node:path";

module.exports = function (plop: NodePlopAPI) {
  plop.setHelper("toPascalCase", (text) => {
    return text.replace(/(^\w|-\w)/g, clearAndUpper).replace(/-/g, "");

    function clearAndUpper(text: string) {
      return text.replace(/-/, "").toUpperCase();
    }
  });

  const rootDir = path.resolve(__dirname, "../../");
  const serverDir = path.resolve(__dirname, `${rootDir}/apps/server`);

  plop.setGenerator("myGenerator", {
    prompts: [
      {
        type: "list",
        name: "resourceType",
        message: "Select the type of resource to generate:",
        choices: ["route"],
        default: "route",
      },
      {
        type: "input",
        name: "routeName",
        message: "Route name in plural (e.g., projects):",
        validate(value) {
          if (/.+/.test(value)) return true;
          return "Project name is required.";
        },
      },
    ],
    actions: (data) => {
      const actions: ActionType[] = [];
      /* NEW ROUTE ACTION */
      if (data?.routeName) {
        const { routeName, appName } = data;
        const folderName = `${serverDir}/src/routes/${routeName}`;

        actions.push(
          {
            type: "add",
            path: `${folderName}/${routeName}.handlers.ts`,
            templateFile: "template/routes/handlers.ts.hbs",
          },
          {
            type: "add",
            path: `${folderName}/${routeName}.index.ts`,
            templateFile: "template/routes/index.ts.hbs",
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
            type: "Success-message",
          }
        );
      }

      return actions;
    },
  });

  // Log a message after the action is completed
  plop.setActionType("Success-message", () => {
    return "DO NOT FORGET TO REGISTER THE ROUTE IN THE APP'S MAIN ROUTER";
  });
};
