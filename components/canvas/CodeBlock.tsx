

// @ts-ignore
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// @ts-ignore
import { materialOceanic } from 'react-syntax-highlighter/dist/cjs/styles/prism';

interface CodeBlockProps {
  language: string;
  value: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ language, value }) => {
  return (
    <SyntaxHighlighter
      language={language}
      style={materialOceanic}
      wrapLines={true}
      className="not-prose rounded-md"
    >
      {value}
    </SyntaxHighlighter>
  );
};
