"use client";

import { Plate, usePlateEditor } from "platejs/react";

import { EditorKit } from "@/components/editor/editor-kit";
import { SettingsDialog } from "@/components/editor/settings-dialog";
import { Editor, EditorContainer } from "@/components/ui/editor";
import SaveChange from "./saveChange";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function PlateEditor({
  value,
  articleId,
}: {
  value: any;
  articleId: string;
}) {
  const editor = usePlateEditor({
    plugins: EditorKit,
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
