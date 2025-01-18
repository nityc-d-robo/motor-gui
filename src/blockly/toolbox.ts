import * as Preset from './preset_blocks';

export const toolbox = {
  kind: 'categoryToolbox',
  contents: [
    Preset.control,
    Preset.logic,
    Preset.math,
    Preset.text,
    Preset.lists,
    Preset.variables,
    Preset.functions,
    {
      kind: 'category',
      name: 'd-robo',
      contents: [
        {
          kind: 'block',
          type: 'motor_pwm',
        },
        {
          kind: 'block',
          type: 'solenoid_state',
        },
        {
          kind: 'block',
          type: 'blmd_power',
        },
      ],
    },
  ],
};
