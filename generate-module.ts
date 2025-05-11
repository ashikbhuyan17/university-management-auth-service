//CLI to generate module boilerplate
//feat: add generic module generator with full Express-Mongoose boilerplate
// yarn run generate:module students

// ================================= generate file =================
// import * as fs from 'fs';
// import * as path from 'path';

// const moduleName = process.argv[2];

// if (!moduleName) {
//     console.error('❌ Please provide a module name.');
//     process.exit(1);
// }

// const baseDir = path.join(__dirname, 'src', 'app', 'modules', moduleName);
// const files = [
//     'controller',
//     'interface',
//     'model',
//     'route',
//     'service',
//     'utils',
//     'validation',
// ];

// fs.mkdirSync(baseDir, { recursive: true });

// files.forEach((type) => {
//     const filename = `${moduleName}.${type}.ts`;
//     const filePath = path.join(baseDir, filename);

//     const content = `// ${type} file for ${moduleName} module\n\nexport {};`;

//     fs.writeFileSync(filePath, content, 'utf8');
// });

// console.log(`✅ Module '${moduleName}' created successfully.`);


// ================================= generate file with boilerplate code =================

import * as fs from 'fs';
import * as path from 'path';

const moduleName = process.argv[2];

if (!moduleName) {
  console.error('❌ Please provide a module name. Example: yarn generate:module student');
  process.exit(1);
}

const lowerName = moduleName.toLowerCase();
const pascalName = moduleName.charAt(0).toUpperCase() + moduleName.slice(1);

const baseDir = path.join(__dirname, 'src', 'app', 'modules', moduleName);
fs.mkdirSync(baseDir, { recursive: true });

const templates: Record<string, string> = {
  interface: `import { Model } from 'mongoose';

export type I${pascalName} = {
  id: string;
  role: string;
  password?: string;
};

export type ${pascalName}Model = Model<I${pascalName}, Record<string, unknown>>;
`,

  model: `import { Schema, model } from 'mongoose';
import { I${pascalName}, ${pascalName}Model } from './${moduleName}.interface';

const ${moduleName}Schema = new Schema<I${pascalName}>(
  {
    id: { type: String, required: true, unique: true },
    role: { type: String, required: true },
    password: { type: String },
  },
  { timestamps: true }
);

export const ${pascalName} = model<I${pascalName}, ${pascalName}Model>('${pascalName}', ${moduleName}Schema);
`,

  service: `import { I${pascalName} } from './${moduleName}.interface';
import { ${pascalName} } from './${moduleName}.model';

export const create${pascalName} = async (data: I${pascalName}): Promise<I${pascalName}> => {
  const result = await ${pascalName}.create(data);
  return result;
};

export const get${pascalName}s = async (): Promise<I${pascalName}[]> => {
  return ${pascalName}.find();
};

export const get${pascalName}ById = async (id: string): Promise<I${pascalName} | null> => {
  return ${pascalName}.findById(id);
};

export const update${pascalName} = async (id: string, data: Partial<I${pascalName}>): Promise<I${pascalName} | null> => {
  return ${pascalName}.findByIdAndUpdate(id, data, { new: true });
};

export const delete${pascalName} = async (id: string): Promise<I${pascalName} | null> => {
  return ${pascalName}.findByIdAndDelete(id);
};
`,

  controller: `import { RequestHandler } from 'express';
import * as ${moduleName}Service from './${moduleName}.service';

export const create${pascalName}: RequestHandler = async (req, res, next) => {
  try {
    const result = await ${moduleName}Service.create${pascalName}(req.body);
    res.status(201).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

export const get${pascalName}s: RequestHandler = async (req, res, next) => {
  try {
    const result = await ${moduleName}Service.get${pascalName}s();
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

export const get${pascalName}ById: RequestHandler = async (req, res, next) => {
  try {
    const result = await ${moduleName}Service.get${pascalName}ById(req.params.id);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

export const update${pascalName}: RequestHandler = async (req, res, next) => {
  try {
    const result = await ${moduleName}Service.update${pascalName}(req.params.id, req.body);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

export const delete${pascalName}: RequestHandler = async (req, res, next) => {
  try {
    const result = await ${moduleName}Service.delete${pascalName}(req.params.id);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};
`,

  route: `import express from 'express';
import * as ${moduleName}Controller from './${moduleName}.controller';
import { validateRequest } from '../../middlewares/validateRequest';
import { ${pascalName}Validation } from './${moduleName}.validation';

const router = express.Router();

router.post(
  '/',
  validateRequest(${pascalName}Validation.create${pascalName}ZodSchema),
  ${moduleName}Controller.create${pascalName}
);
router.get('/', ${moduleName}Controller.get${pascalName}s);
router.get('/:id', ${moduleName}Controller.get${pascalName}ById);
router.put('/:id', ${moduleName}Controller.update${pascalName});
router.delete('/:id', ${moduleName}Controller.delete${pascalName});

export default router;
`,

  validation: `import { z } from 'zod';

const create${pascalName}ZodSchema = z.object({
  body: z.object({
    role: z.string({
      required_error: 'role is required',
    }),
    password: z.string().optional(),
  }),
});

export const ${pascalName}Validation = {
  create${pascalName}ZodSchema,
};
`,

  utils: `// Utility functions for ${moduleName}
`,
};

// Write files
Object.entries(templates).forEach(([type, content]) => {
  const filePath = path.join(baseDir, `${moduleName}.${type}.ts`);
  if (fs.existsSync(filePath)) {
    console.log(`⚠️  Skipping ${filePath} (already exists)`);
    return;
  }
  fs.writeFileSync(filePath, content, 'utf8');
});

console.log(`✅ '${moduleName}' module created with full boilerplate.`);
