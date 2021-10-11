import buildRollupOptions, { Input, OutputBuilder, Plugin } from '@choseohwan/rollup-builder';
import buildBasePlugins from '@choseohwan/rollup-plugin-builder-base';
import json from '@rollup/plugin-json';

const input = new Input(['src/app.ts']);

const outputBuilder = new OutputBuilder({
    sourcemap: false
});

const plugins = buildBasePlugins();
plugins.pushPlugin(new Plugin('@rollup/plugin-json', json, []));
plugins.findPlugin('@rollup/plugin-node-resolve').setOptions([
    {
        preferBuiltins: true
    }
]);

export default buildRollupOptions(
    input,
    [
        outputBuilder.buildCJS({
            dir: 'dist'
        })
    ],
    plugins
);
