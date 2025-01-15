import * as Blockly from 'blockly/core';
import { javascriptGenerator } from 'blockly/javascript';
import * as Ja from 'blockly/msg/ja';

import 'blockly/blocks';
import * as Preset from './blockly/preset_blocks';

Blockly.setLocale(Ja);
const toolbox = {
  "kind": "categoryToolbox",
  "contents": [
    Preset.control,
    Preset.logic,
    Preset.math,
    Preset.text,
    Preset.lists,
    Preset.variables,
    Preset.functions
  ]
}

// The toolbox gets passed to the configuration struct during injection.
Blockly.inject('blocklyDiv', { toolbox: toolbox });