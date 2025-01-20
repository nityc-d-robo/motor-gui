import * as preset from './blocks/preset_blocks';
import { motor_blocks } from './blocks/motor_blocks';
import { solenoid_blocks } from './blocks/solenoid_blocks';
import { servo_blocks } from './blocks/servo_blocks';
import { blmd_blocks } from './blocks/blmd_blocks';

export const toolbox = {
  kind: 'categoryToolbox',
  contents: [
    {
      kind: 'category',
      name: '制御',
      contents: preset.control_blocks.concat({
        kind: 'block',
        type: 'sleep',
      }),
    },
    {
      kind: 'category',
      name: '論理',
      contents: preset.logic_blocks,
    },
    {
      kind: 'category',
      name: '数値計算',
      contents: preset.math_blocks,
    },
    {
      kind: 'category',
      name: '文字列',
      contents: preset.text_blocks,
    },
    {
      kind: 'category',
      name: '配列',
      contents: preset.lists_blocks,
    },
    {
      kind: 'category',
      name: '変数',
      custom: 'VARIABLE',
    },
    {
      kind: 'category',
      name: '関数',
      custom: 'PROCEDURE',
    },
    {
      kind: 'category',
      name: 'モーター',
      contents: motor_blocks,
    },
    {
      kind: 'category',
      name: 'ソレノイド',
      contents: solenoid_blocks,
    },
    {
      kind: 'category',
      name: 'サーボ',
      contents: servo_blocks,
    },
    {
      kind: 'category',
      name: 'ブラシレス',
      contents: blmd_blocks,
    },
  ],
};
