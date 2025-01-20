import * as Blockly from 'blockly/core';
import { javascriptGenerator, Order } from 'blockly/javascript';
import { invoke } from '@tauri-apps/api/core';

export const solenoid_blocks = [
  {
    kind: 'block',
    type: 'solenoid_state',
  },
];
Blockly.Blocks['solenoid_state'] = {
  init: function () {
    this.appendDummyInput('NAME')
      .appendField('SD')
      .appendField(new Blockly.FieldNumber(0, 0, 15), 'address')
      .appendField('のポート')
      .appendField(new Blockly.FieldDropdown([
        ['0', '0'],
        ['1', '1'],
      ]), 'port')
      .appendField('を');
    this.appendValueInput('state')
      .setCheck('Number');
    this.appendDummyInput()
      .appendField('にする');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('');
    this.setHelpUrl('');
    this.setColour(225);
  },
};
javascriptGenerator.forBlock['solenoid_state'] = function (block, generator) {
  const number_address = block.getFieldValue('address');
  const dropdown_port = block.getFieldValue('port');
  const value_state = generator.valueToCode(block, 'state', Order.ATOMIC);
  const code = `solenoid_state(${number_address}, ${dropdown_port}, ${value_state});\n`;
  return code;
};
export const solenoid_state_wrapper = (address: number, port: number, state: number) => {
  invoke('solenoid_state', { address: address, port: port, state: state });
};
