import * as Blockly from 'blockly/core';
import { javascriptGenerator, Order } from 'blockly/javascript';
import { invoke } from '@tauri-apps/api/core';

export const motor_blocks = [
  {
    kind: 'block',
    type: 'motor_pwm',
  },
  {
    kind: 'block',
    type: 'emergency_stop',
  },
];
Blockly.Blocks['motor_pwm'] = {
  init: function () {
    this.appendDummyInput('NAME1')
      .appendField('MD')
      .appendField(new Blockly.FieldNumber(0, 0, 15), 'address')
      .appendField('のモーターを');
    this.appendValueInput('power')
      .setCheck('Number');
    this.appendDummyInput()
      .appendField('のパワーで回す');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('');
    this.setHelpUrl('');
    this.setColour(225);
  },
};
javascriptGenerator.forBlock['motor_pwm'] = function (block, generator) {
  const number_address = block.getFieldValue('address');
  const number_power = generator.valueToCode(block, 'power', Order.ATOMIC);
  const code = `motor_pwm(${number_address}, ${number_power});\n`;
  return code;
};
export const motor_pwm_wrapper = (address: number, power: number) => {
  invoke('motor_pwm', { address: address, power: power });
};

Blockly.Blocks['emergency_stop'] = {
  init: function () {
    this.appendDummyInput('NAME1')
      .appendField('全ての回路を停止する');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('');
    this.setHelpUrl('');
    this.setColour(225);
  },
};
javascriptGenerator.forBlock['emergency_stop'] = function () {
  const code = `emergency_stop();\n`;
  return code;
};
export const emergency_stop_wrapper = () => {
  invoke('emergency_stop');
};
