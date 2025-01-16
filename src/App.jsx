import { useState, useRef } from 'react';
import WindowPrompt from './WindowPrompt';
import { useSetAtom } from 'jotai';
import { promptStateAtom } from './atom';
import "./App.css";

import * as Blockly from 'blockly/core';
import { BlocklyWorkspace } from 'react-blockly';
import * as Preset from './blockly/preset_blocks';

const toolbox = {
  "kind": "categoryToolbox",
  "contents": [
      Preset.control,
      Preset.logic,
      Preset.math,
      Preset.text,
      Preset.lists,
      Preset.variables,
      Preset.functions
  ]
}

function App() {
  const [programJson, setProgramJson] = useState();
  const [message, setMessage] = useState('');
  const [defaultValue, setDefaultValue] = useState('');
  const setPromptState = useSetAtom(promptStateAtom);
  const callbackRef = useRef(null);

  Blockly.dialog.setPrompt((message, defaultValue, callback_) => {
    setMessage(message);
    setDefaultValue(defaultValue);
    setPromptState(true);
    callbackRef.current = callback_;
  });

  return (
    <main className="h-screen container grid grid-rows-4 grid-cols-4">
      <BlocklyWorkspace
        className="row-span-3 col-span-3"
        toolboxConfiguration={toolbox}
        initialJson={programJson}
        onJsonChange={setProgramJson}
      />
      <WindowPrompt 
        message={message}
        defaultValue={defaultValue}
        callback={callbackRef.current}
      />
      {console.log(programJson) || (<div/>) /* JSONの内容を知る */}
    </main>
  );
}

export default App;
