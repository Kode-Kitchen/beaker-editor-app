require.config({ paths: { 'vs': 'beaker:editor/vs' }});
require(['vs/editor/editor.main'], function() {
  var editor = monaco.editor.create(document.getElementById('code'), {
    lineNumbersMinChars: 4,
    automaticLayout: true,
    fixedOverflowWidgets: true,
    value: [
      'function x() {',
      '\tconsole.log("Hello world!");',
      '}'
    ].join('\n'),
    language: 'javascript'
  });
});