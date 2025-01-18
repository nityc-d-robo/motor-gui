import * as Blockly from 'blockly/core';
import { javascriptGenerator, Order } from 'blockly/javascript';

Blockly.Blocks['motor_pwm'] = {
  init: function () {
    this.appendDummyInput('NAME1')
      .appendField('モーター')
      .appendField(new Blockly.FieldNumber(0, 0, 15), 'address');
    this.appendDummyInput('NAME2')
      .appendField('のパワーを')
      .appendField(new Blockly.FieldNumber(0, -1000, 1000), 'power')
      .appendField('にする');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('');
    this.setHelpUrl('');
    this.setColour(225);
  },
};
javascriptGenerator.forBlock['motor_pwm'] = function (block) {
  const number_address = block.getFieldValue('address');
  const number_power = block.getFieldValue('power');
  const code = `send_pwm(${number_address}, ${number_power});\n`;
  return code;
};

Blockly.Blocks['solenoid_state'] = {
  init: function () {
    this.appendValueInput('state')
      .setCheck('Boolean')
      .appendField('アドレス')
      .appendField(new Blockly.FieldNumber(0, 0, 15), 'address')
      .appendField('のソレノイドを');
    this.appendDummyInput('')
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
  const value_state = generator.valueToCode(block, 'state', Order.ATOMIC);
  const code = `send_solenoid(${number_address}, ${value_state});\n`;
  return code;
};

Blockly.Blocks['blmd_power'] = {
  init: function () {
    this.appendDummyInput('')
      .appendField('ブラシレス')
      .appendField(new Blockly.FieldNumber(0, 0, 15), 'address')
      .appendField('の速度を')
      .appendField(new Blockly.FieldNumber(0, -16384, 16384), 'power');
    this.appendDummyInput('')
      .appendField('rpmにする');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('');
    this.setHelpUrl('');
    this.setColour(225);
  },
};
javascriptGenerator.forBlock['blmd_power'] = function (block) {
  const number_address = block.getFieldValue('address');
  const number_power = block.getFieldValue('power');
  const code = `send_blmd(${number_address}, ${number_power});\n`;
  return code;
};
