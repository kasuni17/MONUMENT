import { Node, mergeAttributes } from "@tiptap/core";

export const Embed = Node.create({
  name: "embed",
  group: "block",
  atom: true,

  addAttributes() {
    return {
      url: { default: "" },
    };
  },

  parseHTML() {
    return [{ tag: 'iframe[data-type="embed"]' }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "iframe",
      mergeAttributes(HTMLAttributes, {
        "data-type": "embed",
        src: HTMLAttributes.url,
        frameborder: "0",
        allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
        allowfullscreen: "true",
      }),
    ];
  },

  addCommands() {
    return {
      setEmbed:
        (url: string) =>
        ({ commands }: any) => {
          return commands.insertContent({ type: this.name, attrs: { url } });
        },
    } as any;
  },
});
