import * as Blockly from 'blockly/core';
import { javascriptGenerator } from 'blockly/javascript';
import { invoke } from '@tauri-apps/api/core';

export const blmd_blocks = [
  {
    kind: 'block',
    type: 'blmd_speed',
  },
];
Blockly.Blocks['blmd_speed'] = {
  init: function () {
    this.appendDummyInput('NAME')
      .appendField('BLMD')
      .appendField(new Blockly.FieldNumber(0, 0, 15), 'address')
      .appendField('の')
      .appendField(new Blockly.FieldNumber(0, 0, 3), 'port')
      .appendField('番モーターを')
      .appendField(new Blockly.FieldNumber(0, -16384, 16384), 'speed')
      .appendField('RPMで回す');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('');
    this.setHelpUrl('');
    this.setColour(225);
  },
};
javascriptGenerator.forBlock['blmd_speed'] = function (block) {
  const number_address = block.getFieldValue('address');
  const number_port = block.getFieldValue('port');
  const number_speed = block.getFieldValue('speed');
  const code = `blmd_speed(${number_address}, ${number_port}, ${number_speed});\n`;
  return code;
};
export const blmd_speed_wrapper = (address: number, port: number, speed: number) => {
  invoke('blmd_speed', { address: address, port: port, speed: speed });
};
