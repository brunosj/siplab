import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

interface Props {
  markdown: string;
}

const MarkdownParser = ({ markdown }: Props) => {
  return (
    <ReactMarkdown
      rehypePlugins={[rehypeRaw]}
      components={{
        a: ({ node, ...props }) => (
          <a
            {...props}
            rel={props.href?.includes("http") ? "noopener noreferrer" : ""}
            target={props.href?.includes("http") ? "_blank" : "_self"}
          />
        ),
      }}
    >
      {markdown}
    </ReactMarkdown>
  );
};

export default MarkdownParser;
