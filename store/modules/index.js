const context = require.context('./', false, /^\.\/(?!index)[^/]*\.js$/);

const modules = context.keys().reduce((module, key) => {
  const name = key.replace(/(^\.\/|\.js$)/g, '');
  module[name] = context(key).default;
  return module;
}, {});

export default modules;