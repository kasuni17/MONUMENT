import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import {
  Bold, Italic, Heading2, Heading3, List, ListOrdered, Quote, Code, Link as LinkIcon,
  ImagePlus, Minus, MessageSquareQuote, Youtube,
} from "lucide-react";
import { Callout } from "@/lib/tiptap/CalloutNode";
import { Embed } from "@/lib/tiptap/EmbedNode";
import { cx } from "@/lib/utils";
import { useEffect } from "react";

function ToolbarButton({ onClick, active, children, label }: { onClick: () => void; active?: boolean; children: React.ReactNode; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={label}
      aria-label={label}
      className={cx("p-2 rounded-sm hover:bg-[#EFEFEC] transition-colors", active && "bg-[#16161A] text-white hover:bg-[#16161A]")}
    >
      {children}
    </button>
  );
}

export function RichTextEditor({ content, onChange }: { content: string; onChange: (html: string) => void }) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [2, 3] } }),
      Image,
      Link.configure({ openOnClick: false, HTMLAttributes: { rel: "noopener noreferrer" } }),
      Placeholder.configure({ placeholder: "Start writing the story…" }),
      Callout,
      Embed,
    ],
    content,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: {
        class: "article-prose text-[17px] leading-[1.8] min-h-[420px] outline-none px-1 py-2",
      },
    },
  });

  useEffect(() => {
    if (editor && content !== editor.getHTML() && document.activeElement?.tagName !== "DIV") {
      // only sync external content changes (e.g. loading an existing article) to avoid cursor jumps
      if (!editor.isFocused) editor.commands.setContent(content, false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content]);

  if (!editor) return null;

  return (
    <div className="border border-[#D8D8D4] rounded-sm bg-white">
      <div className="flex flex-wrap items-center gap-0.5 border-b border-[#E4E4E1] p-2 sticky top-0 bg-white z-10">
        <ToolbarButton label="Heading 2" active={editor.isActive("heading", { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
          <Heading2 size={16} />
        </ToolbarButton>
        <ToolbarButton label="Heading 3" active={editor.isActive("heading", { level: 3 })} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>
          <Heading3 size={16} />
        </ToolbarButton>
        <div className="w-px h-5 bg-[#E4E4E1] mx-1" />
        <ToolbarButton label="Bold" active={editor.isActive("bold")} onClick={() => editor.chain().focus().toggleBold().run()}>
          <Bold size={16} />
        </ToolbarButton>
        <ToolbarButton label="Italic" active={editor.isActive("italic")} onClick={() => editor.chain().focus().toggleItalic().run()}>
          <Italic size={16} />
        </ToolbarButton>
        <ToolbarButton
          label="Link"
          active={editor.isActive("link")}
          onClick={() => {
            const url = window.prompt("URL");
            if (url) editor.chain().focus().setLink({ href: url }).run();
          }}
        >
          <LinkIcon size={16} />
        </ToolbarButton>
        <div className="w-px h-5 bg-[#E4E4E1] mx-1" />
        <ToolbarButton label="Bullet List" active={editor.isActive("bulletList")} onClick={() => editor.chain().focus().toggleBulletList().run()}>
          <List size={16} />
        </ToolbarButton>
        <ToolbarButton label="Numbered List" active={editor.isActive("orderedList")} onClick={() => editor.chain().focus().toggleOrderedList().run()}>
          <ListOrdered size={16} />
        </ToolbarButton>
        <ToolbarButton label="Quote" active={editor.isActive("blockquote")} onClick={() => editor.chain().focus().toggleBlockquote().run()}>
          <Quote size={16} />
        </ToolbarButton>
        <ToolbarButton label="Code Block" active={editor.isActive("codeBlock")} onClick={() => editor.chain().focus().toggleCodeBlock().run()}>
          <Code size={16} />
        </ToolbarButton>
        <ToolbarButton label="Callout" active={editor.isActive("callout")} onClick={() => (editor.commands as any).setCallout()}>
          <MessageSquareQuote size={16} />
        </ToolbarButton>
        <div className="w-px h-5 bg-[#E4E4E1] mx-1" />
        <ToolbarButton
          label="Insert Image"
          onClick={() => {
            const url = window.prompt("Image URL");
            if (url) editor.chain().focus().setImage({ src: url }).run();
          }}
        >
          <ImagePlus size={16} />
        </ToolbarButton>
        <ToolbarButton
          label="Insert Embed"
          onClick={() => {
            const url = window.prompt("Embed URL (e.g. YouTube)");
            if (url) (editor.commands as any).setEmbed(url);
          }}
        >
          <Youtube size={16} />
        </ToolbarButton>
        <ToolbarButton label="Divider" onClick={() => editor.chain().focus().setHorizontalRule().run()}>
          <Minus size={16} />
        </ToolbarButton>
      </div>
      <div className="px-4">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
