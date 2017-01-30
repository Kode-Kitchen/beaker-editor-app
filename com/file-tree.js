const yo = require('yo-yo')

// exported api
// =

module.exports = rFileTree

// renderers
// =

function redraw (archive) {
  yo.update(document.querySelector('.filetree'), rFileTree(archive))
}

function rFileTree (archive) {
  return yo`
    <div class="filetree">
      ${rChildren(archive, archive.files.rootNode.children)}
    </div>
  `
    //   <div class="item folder"><span class="icon icon-right-dir"></span>css</div>
    //   <div class="item folder"><span class="icon icon-down-dir"></span>js</div>
    //   <div class="subtree">
    //     <div class="item folder"><span class="icon icon-right-dir"></span>tacos</div>
    //     <div class="item file">burger.js</div>
    //     <div class="item file">pizza.js</div>
    //   </div>
    //   <div class="item file">dat.json</div>
    //   <div class="item file">favicon.png</div>
    //   <div class="item file">index.css</div>
    //   <div class="item file">index.html</div>
    //   <div class="item file selected">index.js</div>
    // </div>
}

function rChildren (archive, children) {
  return Object.keys(children).map(name => rNode(archive, children[name]))
}

function rNode (archive, node) {
  if (node.entry.type === 'directory') {
    return rDirectory(archive, node)
  }
  if (node.entry.type === 'file') {
    return rFile(archive, node)
  }
  return ''
}

function rDirectory (archive, node) {
  let cls = 'right'
  let children = ''

  if (node.isExpanded) {
    children = yo`<div class="subtree">${rChildren(archive, node.children)}</div>`
    cls = 'down'
  }

  return yo`
    <div>
      <div class="item folder" onclick=${e => onClickDirectory(e, archive, node)}>
        <span class="icon icon-${cls}-dir"></span>${node.entry.name}
      </div>
      ${children}
    </div>
  `
}

function rFile (archive, node) {
  return yo`
    <div class="item file">${node.entry.name}</div>
  `
}

// event handlers
// =

function onClickDirectory (e, archive, node) {
  // toggle expanded
  node.isExpanded = !node.isExpanded
  redraw(archive)
}
