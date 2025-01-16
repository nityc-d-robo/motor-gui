import { useState, useRef } from "react";

import * as Blockly from "blockly/core"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

export function WindowPrompt() {
  const [promptState, setPromptState] = useState(false);
  const [message, setMessage] = useState('');
  const [value, setValue] = useState('');
  const callbackRef = useRef<(p1: string | null) => void>(() => {});

  Blockly.dialog.setPrompt((message, defaultValue, callback_) => {
    setMessage(message);
    setValue(defaultValue);
    callbackRef.current = callback_;
    setPromptState(true);
  });

  return (
    <Dialog open={promptState} onOpenChange={setPromptState}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{message}</DialogTitle>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Input
              id="link"
              defaultValue={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </div>
          <DialogClose asChild>
            <Button type="submit" size="sm" onClick={() => callbackRef.current(value)}>
              <span>Submit</span>
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  )
}
