/**
 * mdx 实时编译
 * 
 * @see https://mdxjs.com/packages/mdx/
 * @see https://esm.sh/
 * sobird<i@sobird.me> at 2023/10/22 22:19:57 created.
 */


import { useEffect, useState, FC, ComponentType } from 'react';
import * as runtime from 'react/jsx-runtime';
import { evaluate, compile, run } from '@mdx-js/mdx';
import * as provider from '@mdx-js/react';

interface MdxProps {
  value: string;
  components?: {
    [key in string]: ComponentType;
  }
}

const Mdx: FC<MdxProps> = ({ value, ...props }) => {
  const [exports, setExports] = useState(() => ({ default: runtime.Fragment }));
  const { default: Component } = exports;

  useEffect(() => {
    const load = async () => {
      try {
        // const mdx = await evaluate(value, {
        //   ...runtime,
        //   ...provider,
        // });

        const code = String(await compile(value, {
          outputFormat: 'function-body',
          development: false,
          useDynamicImport: true,
        }));

        const content = await run(code, runtime)
        setExports(content);
      } catch (error) {
        console.log('error', error);
      }
    };

    load();
  }, [value]);

  return (
    <Component {...props} />
  );
};

export default Mdx;
