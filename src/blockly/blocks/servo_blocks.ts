import * as Blockly from 'blockly/core';
import { javascriptGenerator, Order } from 'blockly/javascript';
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
      .appendField('を');
    this.appendValueInput('angle')
      .setCheck('Number');
    this.appendDummyInput()
      .appendField('度に設定');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('');
    this.setHelpUrl('');
    this.setColour(225);
  },
};
javascriptGenerator.forBlock['servo_angle'] = function (block, generator) {
  const number_address = block.getFieldValue('address');
  const dropdown_port = block.getFieldValue('port');
  const number_angle = generator.valueToCode(block, 'angle', Order.ATOMIC);
  const code = `servo_angle(${number_address}, ${dropdown_port}, ${number_angle});\n`;
  return code;
};
export const servo_angle_wrapper = (address: number, port: number, angle: number) => {
  invoke('servo_angle', { address: address, port: port, angle: angle });
};
