import React from "react";

export function highlightMatch(name: string, search: string) {
  if (!search) return name;

  const searchLower = search.trim().toLowerCase();
  const words = name.split(/\s+/);

  return words.map((word, i) => {
    let part;
    if (word.toLowerCase().startsWith(searchLower)) {
      const match = word.slice(0, search.length);
      const rest = word.slice(search.length);
      part = (
        <React.Fragment key={i}>
          <span className="bg-blue-500 rounded-sm">{match}</span>
          {rest}
        </React.Fragment>
      );
    } else {
      part = <React.Fragment key={i}>{word}</React.Fragment>;
    }

    return (
      <React.Fragment key={i}>
        {i > 0 && " "}
        {part}
      </React.Fragment>
    );
  });
}
