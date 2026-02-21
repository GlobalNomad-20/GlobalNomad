const RenderHighlightedText = (text: string) => {
  const parts = text.split(/(승인|거절)/);

  return parts.map((part, index) => {
    if (part === "승인") {
      return (
        <span key={index} className="text-primary-500 font-bold">
          {part}
        </span>
      );
    }
    if (part === "거절") {
      return (
        <span key={index} className="font-bold text-red-500">
          {part}
        </span>
      );
    }
    return part;
  });
};

export default RenderHighlightedText;
