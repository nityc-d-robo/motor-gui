import * as Blockly from 'blockly/core';
import { javascriptGenerator } from 'blockly/javascript';
import { invoke } from '@tauri-apps/api/core';

export const servo_blocks = [
  {
    kind: 'block',
    type: 'servo_angle',
  },
];
Blockly.Blocks['servo_angle'] = {
  init: function () {
    this.appendDummyInput('')
      .appendField('SMD')
      .appendField(new Blockly.FieldNumber(0, 0, 15), 'address')
      .appendField('のポート')
      .appendField(new Blockly.FieldDropdown([
        ['0', '0'],
        ['1', '1'],
      ]), 'port')
      .appendField('を')
      .appendField(new Blockly.FieldNumber(0, 0, 360), 'angle')
      .appendField('度に設定');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('');
    this.setHelpUrl('');
    this.setColour(225);
  },
};
javascriptGenerator.forBlock['servo_angle'] = function (block) {
  const number_address = block.getFieldValue('address');
  const dropdown_port = block.getFieldValue('port');
  const angle = block.getFieldValue('angle');
  const code = `servo_angle(${number_address}, ${dropdown_port}, ${angle});\n`;
  return code;
};
export const servo_angle_wrapper = (address: number, port: number, angle: number) => {
  invoke('servo_angle', { address: address, port: port, angle: angle });
};
