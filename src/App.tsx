import { useState, useRef } from "react";
import { useSetAtom } from "jotai";
import { promptStateAtom } from "./atom";

import { Separator } from "@/components/ui/separator"

import { PresetRun } from "./components/preset-run"
import { WindowPrompt } from "./components/window-prompt"

import * as Blockly from 'blockly/core';
import * as Ja from 'blockly/msg/ja';
import { BlocklyWorkspace } from 'react-blockly';
import { toolbox } from './blockly/toolbox';

export default function PlaygroundPage() {
  const [message, setMessage] = useState('');
  const [defaultValue, setDefaultValue] = useState('');
  const setPromptState = useSetAtom(promptStateAtom);
  const callbackRef = useRef<(p1: string | null) => void>(() => {});

  Blockly.setLocale(Ja);
  Blockly.dialog.setPrompt((message, defaultValue, callback_) => {
    setMessage(message);
    setDefaultValue(defaultValue);
    setPromptState(true);
    callbackRef.current = callback_;
  });

  return (
    <>
      <div className="md:hidden">
      </div>
      <div className="hidden flex flex-col flex-grow md:flex p-5 m-10 border-2 rounded-2xl">
        <div className="container mx-auto flex flex-col items-start justify-between space-y-2 py-4 sm:flex-row sm:items-center sm:space-y-0 md:h-16">
          <h2 className="text-lg font-semibold">motor_lib Playground</h2>
          <PresetRun />
        </div>
        <Separator />
        <div className="container mx-auto flex flex-col flex-grow py-6">
            <div className="flex flex-row flex-grow space-y-4">
              <BlocklyWorkspace
                className='w-full h-full'
                workspaceConfiguration={{}}
                toolboxConfiguration={toolbox}
              />
            </div>
            <WindowPrompt
              message={message}
              defaultValue={defaultValue}
              callback={callbackRef.current}
            />
          </div>
        </div>
    </>
  )
}