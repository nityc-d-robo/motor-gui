import { Separator } from '@/components/ui/separator';

import { PresetRun } from './components/preset-run';
import { PresetSave } from './components/preset-save';
import { WindowPrompt } from './components/window-prompt';

import * as Blockly from 'blockly/core';
import * as Ja from 'blockly/msg/ja';
import { BlocklyWorkspace } from 'react-blockly';
import { toolbox } from './blockly/toolbox';

export default function PlaygroundPage() {
  Blockly.setLocale(Ja);

  return (
    <div className="hidden flex flex-col flex-grow md:flex">
      <header className="container mx-auto flex flex-col items-start justify-between space-y-2 py-4 sm:flex-row sm:items-center sm:space-y-0 md:h-16">
        <h2 className="text-lg font-semibold">motor_lib Playground</h2>
        <div className="flex flex-row space-x-2">
          <PresetSave />
          <PresetRun />
        </div>
      </header>
      <Separator />
      <div className="container mx-auto flex flex-col flex-grow py-6">
        <div className="flex flex-row flex-grow space-y-4">
          <BlocklyWorkspace
            className="w-full h-full"
            workspaceConfiguration={{}}
            toolboxConfiguration={toolbox}
          />
        </div>
        <WindowPrompt />
      </div>
    </div>
  );
}
