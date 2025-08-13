"use client";

import { EditorKit } from "@/components/editor/editor-kit";
import { EditorContainer } from "@/components/ui/editor";
import { Plate, usePlateEditor } from "platejs/react";
import ViewContent from "./ViewContent";

const ViewContainer = ({ value }: { value: string }) => {
  const editor = usePlateEditor({
    plugins: EditorKit(true)
      .filter((p) => !["link", "hoverToolbar", "fixed-toolbar"].includes(p.key))
      .map((p) => ({
        ...p,
        options: { ...p.options, readOnly: true },
      })),
    value,
  });

  return (
    <Plate editor={editor}>
      <EditorContainer>
        <ViewContent />
      </EditorContainer>
    </Plate>
  );
};

export default ViewContainer;
