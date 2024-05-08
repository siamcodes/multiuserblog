import MarkdownIt from "markdown-it";
import hljs from "highlight.js";

export default new MarkdownIt({
  highlight: (str, lang) => {
    const language = lang && hljs.getLanguage(lang) ? lang : "js";
    try {
      const highlightedCode = hljs.highlight(language, str, true).value;
      return `<pre class="hljs p-3"><code>${highlightedCode}</code></pre>`;
    } catch (error) {
      return ""; // Return an empty string if highlighting fails
    }
  },
});
