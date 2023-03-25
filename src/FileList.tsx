import { useAutoAnimate } from "@formkit/auto-animate/react";

type FileListProps = {
  files: File[];
  handleMoveUp: (index: number) => void;
  handleMoveDown: (index: number) => void;
  handleRemoveFile: (index: number) => void;
};

function FileList({
  files,
  handleMoveUp,
  handleMoveDown,
  handleRemoveFile,
}: FileListProps) {
  const [animationParent] = useAutoAnimate();

  return (
    <ul ref={animationParent}>
      {files.map((file, index) => (
        <li key={index}>
          File {index + 1}: {file.name}
          <button onClick={() => handleMoveUp(index)} disabled={index === 0}>
            Up
          </button>
          <button
            onClick={() => handleMoveDown(index)}
            disabled={index === files.length - 1}
          >
            Down
          </button>
          <button onClick={() => handleRemoveFile(index)}>Remove</button>
        </li>
      ))}
    </ul>
  );
}

export default FileList;
