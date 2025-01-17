import { useState } from 'react';

import { ChevronsUpDown } from 'lucide-react';
import SyntaxHighlighter from 'react-syntax-highlighter';

import * as Blockly from 'blockly/core';
import { javascriptGenerator } from 'blockly/javascript';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Label } from '@/components/ui/label';

function PreviewCodeCollapse({ program }: { program: string }) {
  const [isCodeOpen, setIsCodeOpen] = useState(false);
  return (
    <Collapsible
      open={isCodeOpen}
      onOpenChange={setIsCodeOpen}
      className="space-y-2"
    >
      <CollapsibleTrigger asChild>
        <div className="hover:bg-accent hover:text-accent-foreground rounded-sm flex items-center justify-between space-x-4 px-4 py-1">
          <Label>プログラムを確認</Label>
          <div>
            <ChevronsUpDown className="h-4 w-4" />
            <span className="sr-only">Toggle</span>
          </div>
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <SyntaxHighlighter language="javascript" className="max-h-[30vh]">
          {program}
        </SyntaxHighlighter>
      </CollapsibleContent>
    </Collapsible>
  );
}
function StdOutCollapse() {
  const [isCodeOpen, setIsCodeOpen] = useState(false);
  const [standardOutput, setStandardOutput] = useState<string[]>([]);
  Blockly.dialog.setAlert((message) => {
    setStandardOutput(standardOutput.concat([message]));
  });
  return (
    <Collapsible
      open={isCodeOpen}
      onOpenChange={setIsCodeOpen}
      className="space-y-2 flex flex-col flex-grow"
    >
      <CollapsibleTrigger asChild>
        <div className="hover:bg-accent hover:text-accent-foreground rounded-sm flex items-center justify-between space-x-4 px-4 py-1">
          <Label>標準出力</Label>
          <div>
            <ChevronsUpDown className="h-4 w-4" />
            <span className="sr-only">Toggle</span>
          </div>
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent className="flex flex-col max-h-4/5">
        <div className="max-h-[30vh] whitespace-pre-wrap overflow-y-auto border-2 rounded-sm p-2">{`${standardOutput.join('\n')}`}</div>
      </CollapsibleContent>
    </Collapsible>
  );
}

export function PresetRun() {
  const [program, setProgram] = useState<string>('');
  function onClickRun() {
    setProgram(javascriptGenerator.workspaceToCode());
  }
  function onClickExecute() {
    Blockly.dialog.alert('test');
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" onClick={onClickRun}>
          Run
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[475px] h-fit flex flex-col">
        <DialogHeader>
          <DialogTitle>Run</DialogTitle>
          <DialogDescription>
            <Label>プログラムを実行します．</Label>
          </DialogDescription>
        </DialogHeader>
        <PreviewCodeCollapse program={program} />
        <StdOutCollapse />
        <div className="flex gap-5 justify-end">
          <DialogClose asChild>
            <Button type="submit" variant="outline">
              やめる
            </Button>
          </DialogClose>
          <Button type="submit" onClick={onClickExecute}>
            実行する
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
