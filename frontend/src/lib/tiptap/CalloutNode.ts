import { Node, mergeAttributes } from "@tiptap/core";

export const Callout = Node.create({
  name: "callout",
  group: "block",
  content: "block+",
  defining: true,

  parseHTML() {
    return [{ tag: 'div[data-type="callout"]' }];
  },

  renderHTML({ HTMLAttributes }) {
    return ["div", mergeAttributes(HTMLAttributes, { "data-type": "callout" }), 0];
  },

  addCommands() {
    return {
      setCallout:
        () =>
        ({ commands }: any) => {
          return commands.wrapIn(this.name);
        },
      unsetCallout:
        () =>
        ({ commands }: any) => {
          return commands.lift(this.name);
        },
    } as any;
  },
});
