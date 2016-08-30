'use strict';

import Handlebars from 'handlebars';

const handlebarsRuntimePath = 'handlebars/handlebars.runtime';

export function translate(load) {
  var precompiled = Handlebars.precompile(load.source);
  if (this.transpiler) {
    load.metadata.format = 'esm';
    return `import hbr from '${handlebarsRuntimePath}';\n export default hbr.template(${precompiled});`;
  }

  load.metadata.format = 'amd';
  return 'def' + 'ine(function() {\nreturn ' +  `require('${handlebarsRuntimePath}').template(${precompiled});` + ';\n});';
}