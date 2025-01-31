import React from "react";
import Markdown from "react-remarkable";
import hljs from "highlight.js";
import "highlight.js/styles/github-gist.css";
import "katex/dist/katex.min.css"; // Import KaTeX styles
import katex from "katex";

// Function to process math expressions
const renderMath = (text) => {
  return text
    .replace(/\$\$(.+?)\$\$/g, (match, equation) => {
      // Block math rendering
      try {
        return `<div class="math-block">${katex.renderToString(equation, { displayMode: true })}</div>`;
      } catch (error) {
        console.error("KaTeX Error:", error);
        return match;
      }
    })
    .replace(/\$(.+?)\$/g, (match, equation) => {
      // Inline math rendering
      try {
        return `<span class="math-inline">${katex.renderToString(equation, { displayMode: false })}</span>`;
      } catch (error) {
        console.error("KaTeX Error:", error);
        return match;
      }
    });
};

// Function to highlight code blocks
const highlight = (str, lang) => {
  if (lang && hljs.getLanguage(lang)) {
    try {
      return hljs.highlight(lang, str).value;
    } catch (err) {
      console.error(err);
    }
  }
  try {
    return hljs.highlightAuto(str).value;
  } catch (err) {
    console.error(err);
  }
  return "";
};

export default ({ source, children }) => {
  const processedSource = renderMath(source); // Process math expressions

  return (
    <Markdown
      source={processedSource}
      options={{ highlight, html: true, linkify: true }}
    >
      {children}
    </Markdown>
  );
};
