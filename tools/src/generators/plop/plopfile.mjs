export default function (
  /** @type {import('plop').NodePlopAPI} */
  plop,
) {
  plop.setGenerator('component', {
    description: 'Generate bq components',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Component name (we will prepend mfp-) ',
      },
      {
        type: 'confirm',
        name: 'styling',
        message: 'Styling ',
      },
      {
        type: 'confirm',
        name: 'stylingVariables',
        message: 'Style variables ',
        when: ({ styling }) => styling,
      },
      {
        type: 'confirm',
        name: 'storybook',
        message: 'Storybook ',
      },
    ],
    actions: [
      {
        type: 'add',
        path: '../../../../packages/mfp/src/components/{{kebabCase name}}/mfp-{{kebabCase name}}.tsx',
        templateFile: './component.hbs',
        skipIfExists: true,
      },
      {
        type: 'add',
        path: '../../../../packages/mfp/src/components/{{kebabCase name}}/__tests__/mfp-{{kebabCase name}}.e2e.ts',
        templateFile: './e2e.hbs',
        skipIfExists: true,
      },
      {
        type: 'add',
        path: '../../../../packages/mfp/src/components/{{kebabCase name}}/scss/mfp-{{kebabCase name}}.scss',
        templateFile: './scss.hbs',
        skipIfExists: true,
        skip: ({ styling }) => {
          if (!styling) {
            return 'Styling skipped';
          }
        },
      },
      {
        type: 'add',
        path: '../../../../packages/mfp/src/components/{{kebabCase name}}/scss/mfp-{{kebabCase name}}.variables.scss',
        templateFile: './scss-variables.hbs',
        skipIfExists: true,
        skip: ({ stylingVariables }) => {
          if (!stylingVariables) {
            return 'Style variables skipped';
          }
        },
      },
      {
        type: 'add',
        path: '../../../../packages/mfp/src/components/{{kebabCase name}}/_storybook/mfp-{{kebabCase name}}.mdx',
        templateFile: './storybook-docs.hbs',
        skipIfExists: true,
        skip: ({ storybook }) => {
          if (!storybook) {
            return 'Storybook skipped';
          }
        },
      },
      {
        type: 'add',
        path: '../../../../packages/mfp/src/components/{{kebabCase name}}/_storybook/mfp-{{kebabCase name}}.stories.tsx',
        templateFile: './storybook.hbs',
        skipIfExists: true,
        skip: ({ storybook }) => {
          if (!storybook) {
            return 'Storybook skipped';
          }
        },
      },
    ],
  });
}
