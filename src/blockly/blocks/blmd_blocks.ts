import * as Blockly from 'blockly/core';
import { javascriptGenerator, Order } from 'blockly/javascript';
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
      .appendField(new Blockly.FieldNumber(0, 0, 3), 'controller_id')
      .appendField('番モーターを');
    this.appendValueInput('velocity')
      .setCheck('Number');
    this.appendDummyInput()
      .appendField('RPMで回す');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('');
    this.setHelpUrl('');
    this.setColour(225);
  },
};
javascriptGenerator.forBlock['blmd_speed'] = function (block, generator) {
  const number_address = block.getFieldValue('address');
  const number_controller_id = block.getFieldValue('controller_id');
  const number_velocity = generator.valueToCode(block, 'velocity', Order.ATOMIC);
  const code = `blmd_speed(${number_address}, ${number_controller_id}, ${number_velocity});\n`;
  return code;
};
export const blmd_speed_wrapper = (address: number, controller_id: number, velocity: number) => {
  invoke('blmd_speed', { address: address, controller_id: controller_id, velocity: velocity });
};
