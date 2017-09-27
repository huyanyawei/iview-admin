(function () {

var defs = {}; // id -> {dependencies, definition, instance (possibly undefined)}

// Used when there is no 'main' module.
// The name is probably (hopefully) unique so minification removes for releases.
var register_3795 = function (id) {
  var module = dem(id);
  var fragments = id.split('.');
  var target = Function('return this;')();
  for (var i = 0; i < fragments.length - 1; ++i) {
    if (target[fragments[i]] === undefined)
      target[fragments[i]] = {};
    target = target[fragments[i]];
  }
  target[fragments[fragments.length - 1]] = module;
};

var instantiate = function (id) {
  var actual = defs[id];
  var dependencies = actual.deps;
  var definition = actual.defn;
  var len = dependencies.length;
  var instances = new Array(len);
  for (var i = 0; i < len; ++i)
    instances[i] = dem(dependencies[i]);
  var defResult = definition.apply(null, instances);
  if (defResult === undefined)
     throw 'module [' + id + '] returned undefined';
  actual.instance = defResult;
};

var def = function (id, dependencies, definition) {
  if (typeof id !== 'string')
    throw 'module id must be a string';
  else if (dependencies === undefined)
    throw 'no dependencies for ' + id;
  else if (definition === undefined)
    throw 'no definition function for ' + id;
  defs[id] = {
    deps: dependencies,
    defn: definition,
    instance: undefined
  };
};

var dem = function (id) {
  var actual = defs[id];
  if (actual === undefined)
    throw 'module [' + id + '] was undefined';
  else if (actual.instance === undefined)
    instantiate(id);
  return actual.instance;
};

var req = function (ids, callback) {
  var len = ids.length;
  var instances = new Array(len);
  for (var i = 0; i < len; ++i)
    instances.push(dem(ids[i]));
  callback.apply(null, callback);
};

var ephox = {};

ephox.bolt = {
  module: {
    api: {
      define: def,
      require: req,
      demand: dem
    }
  }
};

var define = def;
var require = req;
var demand = dem;
// this helps with minificiation when using a lot of global references
var defineGlobal = function (id, ref) {
  define(id, [], function () { return ref; });
};
/*jsc
["0","1","2","3","4","5","6","7","8","9","a","b","c","d"]
jsc*/
define(
  "1",

  [
  ],

  function () {
    var Cell = function (initial) {
      var value = initial;

      var get = function () {
        return value;
      };

      var set = function (v) {
        value = v;
      };

      var clone = function () {
        return Cell(get());
      };

      return {
        get: get,
        set: set,
        clone: clone
      };
    };

    return Cell;
  }
);

defineGlobal("6", tinymce.util.Tools.resolve);
/**
 * ResolveGlobal.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

define(
  "2",
  [
    "6"
  ],
  function (resolve) {
    return resolve('tinymce.PluginManager');
  }
);

/**
 * Api.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

define(
  "3",
  [
  ],
  function () {
    var get = function (patternsState) {
      var setPatterns = function (newPatterns) {
        patternsState.set(newPatterns);
      };

      var getPatterns = function () {
        return patternsState.get();
      };

      return {
        setPatterns: setPatterns,
        getPatterns: getPatterns
      };
    };

    return {
      get: get
    };
  }
);
/**
 * Settings.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

define(
  "4",
  [
  ],
  function () {
    var defaultPatterns = [
      { start: '*', end: '*', format: 'italic' },
      { start: '**', end: '**', format: 'bold' },
      { start: '#', format: 'h1' },
      { start: '##', format: 'h2' },
      { start: '###', format: 'h3' },
      { start: '####', format: 'h4' },
      { start: '#####', format: 'h5' },
      { start: '######', format: 'h6' },
      { start: '1. ', cmd: 'InsertOrderedList' },
      { start: '* ', cmd: 'InsertUnorderedList' },
      { start: '- ', cmd: 'InsertUnorderedList' }
    ];

    var getPatterns = function (editorSettings) {
      return editorSettings.textpattern_patterns !== undefined ?
        editorSettings.textpattern_patterns :
        defaultPatterns;
    };

    return {
      getPatterns: getPatterns
    };
  }
);

/**
 * ResolveGlobal.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

define(
  "7",
  [
    "6"
  ],
  function (resolve) {
    return resolve('tinymce.util.Delay');
  }
);

/**
 * ResolveGlobal.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

define(
  "8",
  [
    "6"
  ],
  function (resolve) {
    return resolve('tinymce.util.VK');
  }
);

/**
 * ResolveGlobal.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

define(
  "b",
  [
    "6"
  ],
  function (resolve) {
    return resolve('tinymce.dom.TreeWalker');
  }
);

/**
 * ResolveGlobal.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

define(
  "c",
  [
    "6"
  ],
  function (resolve) {
    return resolve('tinymce.util.Tools');
  }
);

/**
 * Patterns.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

define(
  "d",
  [
  ],
  function () {
    // Returns a sorted patterns list, ordered descending by start length
    var sortPatterns = function (patterns) {
      return patterns.sort(function (a, b) {
        if (a.start.length > b.start.length) {
          return -1;
        }

        if (a.start.length < b.start.length) {
          return 1;
        }

        return 0;
      });
    };

    // Finds a matching pattern to the specified text
    var findPattern = function (patterns, text) {
      for (var i = 0; i < patterns.length; i++) {
        if (text.indexOf(patterns[i].start) !== 0) {
          continue;
        }

        if (patterns[i].end && text.lastIndexOf(patterns[i].end) !== (text.length - patterns[i].end.length)) {
          continue;
        }

        return patterns[i];
      }
    };

    var isMatchingPattern = function (pattern, text, offset, delta) {
      var textEnd = text.substr(offset - pattern.end.length - delta, pattern.end.length);
      return textEnd === pattern.end;
    };

    var hasContent = function (offset, delta, pattern) {
      return (offset - delta - pattern.end.length - pattern.start.length) > 0;
    };

    // Finds the best matching end pattern
    var findEndPattern = function (patterns, text, offset, delta) {
      var pattern, i;
      var sortedPatterns = sortPatterns(patterns);

      // Find best matching end
      for (i = 0; i < sortedPatterns.length; i++) {
        pattern = sortedPatterns[i];
        if (pattern.end !== undefined && isMatchingPattern(pattern, text, offset, delta) && hasContent(offset, delta, pattern)) {
          return pattern;
        }
      }
    };

    return {
      findPattern: findPattern,
      findEndPattern: findEndPattern
    };
  }
);

/**
 * Formatter.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

define(
  "a",
  [
    "b",
    "c",
    "d"
  ],
  function (TreeWalker, Tools, Patterns) {
    var splitContainer = function (container, pattern, offset, startOffset, delta) {

      // Split text node and remove start/end from text node
      container = startOffset > 0 ? container.splitText(startOffset) : container;
      container.splitText(offset - startOffset - delta);
      container.deleteData(0, pattern.start.length);
      container.deleteData(container.data.length - pattern.end.length, pattern.end.length);

      return container;
    };

    // Handles inline formats like *abc* and **abc**
    var applyInlineFormat = function (editor, patterns, space) {
      var selection, dom, rng, container, offset, startOffset, text, patternRng, pattern, delta, format;

      selection = editor.selection;
      dom = editor.dom;

      if (!selection.isCollapsed()) {
        return;
      }

      rng = selection.getRng(true);
      container = rng.startContainer;
      offset = rng.startOffset;
      text = container.data;
      delta = space === true ? 1 : 0;

      if (container.nodeType !== 3) {
        return;
      }

      // Find best matching end
      pattern = Patterns.findEndPattern(patterns, text, offset, delta);
      if (pattern === undefined) {
        return;
      }

      // Find start of matched pattern
      // TODO: Might need to improve this if there is nested formats
      startOffset = Math.max(0, offset - delta);
      startOffset = text.lastIndexOf(pattern.start, startOffset - pattern.end.length - 1);

      if (startOffset === -1) {
        return;
      }

      // Setup a range for the matching word
      patternRng = dom.createRng();
      patternRng.setStart(container, startOffset);
      patternRng.setEnd(container, offset - delta);
      pattern = Patterns.findPattern(patterns, patternRng.toString());

      if (!pattern || !pattern.end) {
        return;
      }

      // If container match doesn't have anything between start/end then do nothing
      if (container.data.length <= pattern.start.length + pattern.end.length) {
        return;
      }

      format = editor.formatter.get(pattern.format);
      if (format && format[0].inline) {
        editor.undoManager.transact(function () {
          container = splitContainer(container, pattern, offset, startOffset, delta);
          editor.formatter.apply(pattern.format, {}, container);
        });

        return container;
      }
    };

    // Handles block formats like ##abc or 1. abc
    var applyBlockFormat = function (editor, patterns) {
      var selection, dom, container, firstTextNode, node, format, textBlockElm, pattern, walker, rng, offset;

      selection = editor.selection;
      dom = editor.dom;

      if (!selection.isCollapsed()) {
        return;
      }

      textBlockElm = dom.getParent(selection.getStart(), 'p');
      if (textBlockElm) {
        walker = new TreeWalker(textBlockElm, textBlockElm);
        while ((node = walker.next())) {
          if (node.nodeType === 3) {
            firstTextNode = node;
            break;
          }
        }

        if (firstTextNode) {
          pattern = Patterns.findPattern(patterns, firstTextNode.data);
          if (!pattern) {
            return;
          }

          rng = selection.getRng(true);
          container = rng.startContainer;
          offset = rng.startOffset;

          if (firstTextNode === container) {
            offset = Math.max(0, offset - pattern.start.length);
          }

          if (Tools.trim(firstTextNode.data).length === pattern.start.length) {
            return;
          }

          if (pattern.format) {
            format = editor.formatter.get(pattern.format);
            if (format && format[0].block) {
              firstTextNode.deleteData(0, pattern.start.length);
              editor.formatter.apply(pattern.format, {}, firstTextNode);

              rng.setStart(container, offset);
              rng.collapse(true);
              selection.setRng(rng);
            }
          }

          if (pattern.cmd) {
            editor.undoManager.transact(function () {
              firstTextNode.deleteData(0, pattern.start.length);
              editor.execCommand(pattern.cmd);
            });
          }
        }
      }
    };

    return {
      applyInlineFormat: applyInlineFormat,
      applyBlockFormat: applyBlockFormat
    };
  }
);

/**
 * KeyHandler.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

define(
  "9",
  [
    "8",
    "a"
  ],
  function (VK, Formatter) {
    function handleEnter(editor, patterns) {
      var rng, wrappedTextNode;

      wrappedTextNode = Formatter.applyInlineFormat(editor, patterns, false);
      if (wrappedTextNode) {
        rng = editor.dom.createRng();
        rng.setStart(wrappedTextNode, wrappedTextNode.data.length);
        rng.setEnd(wrappedTextNode, wrappedTextNode.data.length);
        editor.selection.setRng(rng);
      }

      Formatter.applyBlockFormat(editor, patterns);
    }

    function handleInlineKey(editor, patterns) {
      var wrappedTextNode, lastChar, lastCharNode, rng, dom;

      wrappedTextNode = Formatter.applyInlineFormat(editor, patterns, true);
      if (wrappedTextNode) {
        dom = editor.dom;
        lastChar = wrappedTextNode.data.slice(-1);

        // Move space after the newly formatted node
        if (/[\u00a0 ]/.test(lastChar)) {
          wrappedTextNode.deleteData(wrappedTextNode.data.length - 1, 1);
          lastCharNode = dom.doc.createTextNode(lastChar);

          if (wrappedTextNode.nextSibling) {
            dom.insertAfter(lastCharNode, wrappedTextNode.nextSibling);
          } else {
            wrappedTextNode.parentNode.appendChild(lastCharNode);
          }

          rng = dom.createRng();
          rng.setStart(lastCharNode, 1);
          rng.setEnd(lastCharNode, 1);
          editor.selection.setRng(rng);
        }
      }
    }

    var checkKeyEvent = function (codes, event, predicate) {
      for (var i = 0; i < codes.length; i++) {
        if (predicate(codes[i], event)) {
          return true;
        }
      }
    };

    var checkKeyCode = function (codes, event) {
      return checkKeyEvent(codes, event, function (code, event) {
        return code === event.keyCode && VK.modifierPressed(event) === false;
      });
    };

    var checkCharCode = function (chars, event) {
      return checkKeyEvent(chars, event, function (chr, event) {
        return chr.charCodeAt(0) === event.charCode;
      });
    };

    return {
      handleEnter: handleEnter,
      handleInlineKey: handleInlineKey,
      checkCharCode: checkCharCode,
      checkKeyCode: checkKeyCode
    };
  }
);

/**
 * Keyboard.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

define(
  "5",
  [
    "7",
    "8",
    "9"
  ],
  function (Delay, VK, KeyHandler) {
    var setup = function (editor, patternsState) {
      var charCodes = [',', '.', ';', ':', '!', '?'];
      var keyCodes = [32];

      editor.on('keydown', function (e) {
        if (e.keyCode === 13 && !VK.modifierPressed(e)) {
          KeyHandler.handleEnter(editor, patternsState.get());
        }
      }, true);

      editor.on('keyup', function (e) {
        if (KeyHandler.checkKeyCode(keyCodes, e)) {
          KeyHandler.handleInlineKey(editor, patternsState.get());
        }
      });

      editor.on('keypress', function (e) {
        if (KeyHandler.checkCharCode(charCodes, e)) {
          Delay.setEditorTimeout(editor, function () {
            KeyHandler.handleInlineKey(editor, patternsState.get());
          });
        }
      });
    };

    return {
      setup: setup
    };
  }
);
/**
 * Plugin.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

define(
  "0",
  [
    "1",
    "2",
    "3",
    "4",
    "5"
  ],
  function (Cell, PluginManager, Api, Settings, Keyboard) {
    PluginManager.add('textpattern', function (editor) {
      var patternsState = Cell(Settings.getPatterns(editor.settings));

      Keyboard.setup(editor, patternsState);

      return Api.get(patternsState);
    });

    return function () { };
  }
);
dem("0")();
})();