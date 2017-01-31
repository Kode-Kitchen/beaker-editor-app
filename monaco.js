require.config({ paths: { 'vs': 'beaker:editor/vs' }});
require(['vs/editor/editor.main'], function() {
  window.editor = monaco.editor.create(document.getElementById('code'), {
    lineNumbersMinChars: 4,
    automaticLayout: true,
    fixedOverflowWidgets: true,
    roundedSelection: false
  })
  window.dispatchEvent(new Event('editor-created'))
})