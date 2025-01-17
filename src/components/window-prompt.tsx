import { useState, useRef } from "react";

import * as Blockly from "blockly/core";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

export function WindowPrompt() {
  const [promptState, setPromptState] = useState(false);
  const messageRef = useRef("");
  const valueRef = useRef("");
  const callbackRef = useRef<(p1: string | null) => void>(() => {});

  Blockly.dialog.setPrompt((message, defaultValue, callback_) => {
    messageRef.current = message;
    valueRef.current = defaultValue;
    callbackRef.current = callback_;
    setPromptState(true);
  });

  function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    valueRef.current = e.target.value;
  }

  function onClickSubmit() {
    callbackRef.current(valueRef.current);
  }

  return (
    <Dialog open={promptState} onOpenChange={setPromptState}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{messageRef.current}</DialogTitle>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Input
              id="link"
              defaultValue={valueRef.current}
              onChange={onInputChange}
            />
          </div>
          <DialogClose asChild>
            <Button type="submit" size="sm" onClick={onClickSubmit}>
              <span>Submit</span>
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
