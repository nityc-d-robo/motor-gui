import * as Blockly from 'blockly/core';
import { javascriptGenerator } from 'blockly/javascript';
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
      .appendField('を')
      .appendField(new Blockly.FieldDropdown([
        ['LOW', '0'],
        ['HIGH', '1000'],
      ]), 'state')
      .appendField('にする');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('');
    this.setHelpUrl('');
    this.setColour(225);
  },
};
javascriptGenerator.forBlock['solenoid_state'] = function (block) {
  const number_address = block.getFieldValue('address');
  const dropdown_port = block.getFieldValue('port');
  const dropdown_state = block.getFieldValue('state');
  const code = `solenoid_state(${number_address}, ${dropdown_port}, ${dropdown_state});\n`;
  return code;
};
export const solenoid_state_wrapper = (address: number, port: number, state: number) => {
  invoke('solenoid_state', { address: address, port: port, state: state });
};
