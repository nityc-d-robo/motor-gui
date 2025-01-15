import { useState } from "react";

import { useAtom } from "jotai";
import { promptStateAtom } from "./atom";

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

export default function WindowPrompt({ message, defaultValue, callback }) {
  const [value, setValue] = useState(defaultValue);
  const [isOpenPrompt, setIsOpenPrompt] = useAtom(promptStateAtom);
  return (
    <Dialog open={isOpenPrompt} onOpenChange={setIsOpenPrompt}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{message}</DialogTitle>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Input
              id="link"
              defaultValue={defaultValue}
              onChange={(e) => setValue(e.target.value)}
            />
          </div>
          <DialogClose asChild>
            <Button type="submit" size="sm" onClick={() => callback(value)}>
              <span>Submit</span>
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  )
}
