"use client";

import { Plate, usePlateEditor } from "platejs/react";

import { EditorKit } from "@/components/editor/editor-kit";
import { SettingsDialog } from "@/components/editor/settings-dialog";
import { Editor, EditorContainer } from "@/components/ui/editor";
import SaveChange from "./saveChange";

export function PlateEditor({
  value,
  articleId,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any;
  articleId: string;
}) {
  const editor = usePlateEditor({
    plugins: EditorKit(false),
    value,
  });

  return (
    <Plate editor={editor}>
      <SaveChange articleId={articleId} />
      <EditorContainer>
        <Editor variant="demo" />
      </EditorContainer>

      <SettingsDialog />
    </Plate>
  );
}
