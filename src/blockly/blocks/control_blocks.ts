import * as Blockly from 'blockly/core';
import { javascriptGenerator } from 'blockly/javascript';

Blockly.Blocks['sleep'] = {
  init: function () {
    this.appendDummyInput('')
      .appendField(new Blockly.FieldNumber(0, 0), 'time')
      .appendField('秒待つ');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('');
    this.setHelpUrl('');
    this.setColour(225);
  },
};
javascriptGenerator.forBlock['sleep'] = function (block) {
  const number_time = block.getFieldValue('time');
  const code = `sleep(${number_time});\n`;
  return code;
};
export const sleep_wrapper = (time: number, callback: () => void) => {
  setTimeout(callback, time * 1000);
};
