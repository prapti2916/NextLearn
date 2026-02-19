/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import { Play, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { ThemeToggle } from "@/components/ui/themeToggle";

export default function CodeEditorPage() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const [html, setHtml] = useState("<h1>Hello NextLearn 🚀</h1>");
  const [css, setCss] = useState(`
body {
  font-family: sans-serif;
}
h1 {
  color: #22c55e;
}
`);
  const [js, setJs] = useState("console.log('Ready')");
  const [srcDoc, setSrcDoc] = useState("");

  const run = () => {
  const isDark = resolvedTheme === "dark";

  setSrcDoc(`
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        * {
          margin:0;
          padding:0;
          box-sizing:border-box;
        }

        body {
          background: ${isDark ? "#000000" : "#ffffff"} !important;
          color: ${isDark ? "#ffffff" : "#000000"};
          font-family: sans-serif;
          padding: 10px;
        }

        ${css}
      </style>
    </head>
    <body>
      ${html}
      <script>${js}<\/script>
    </body>
    </html>
  `);
};



  // Auto run when theme changes
  useEffect(() => {
    run();
  }, [resolvedTheme]);

  const editorTheme = resolvedTheme === "light" ? "vs-light" : "vs-dark";

  if (!mounted) return null;

  return (
    <div className="h-screen flex flex-col bg-background text-foreground">

      {/* ================= TOP BAR ================= */}
      <div className="h-14 flex items-center px-6 border-b bg-background/80 backdrop-blur-xl shadow relative">

        <Link
          href="/"
          className="flex items-center gap-2 text-sm font-medium hover:text-primary transition"
        >
          <ArrowLeft size={18} />
          Go Back
        </Link>

        <h1 className="absolute left-1/2 -translate-x-1/2 font-bold text-xl tracking-wide">
          NextLearn Code Editor
        </h1>

        <div className="ml-auto flex items-center gap-4">
          <ThemeToggle />

          <button
            onClick={run}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg font-semibold shadow text-white"
          >
            <Play size={16} /> Run
          </button>
        </div>
      </div>

      {/* ================= EDITOR PANELS ================= */}
      <div className="grid grid-cols-3 flex-1 gap-[1px] bg-border">

        {[
          { title: "HTML", value: html, set: setHtml, lang: "html", color: "bg-red-500" },
          { title: "CSS", value: css, set: setCss, lang: "css", color: "bg-blue-500" },
          { title: "JavaScript", value: js, set: setJs, lang: "javascript", color: "bg-yellow-400" },
        ].map((panel) => (
          <div key={panel.title} className="bg-background flex flex-col">

            {/* Panel Header */}
            <div className="flex items-center px-3 py-2 bg-muted border-b text-sm font-semibold">
              <span className={`w-2 h-2 rounded-full ${panel.color}`}></span>
              <span className="ml-2">{panel.title}</span>
            </div>

            {/* Monaco Editor */}
            <Editor
              height="100%"
              language={panel.lang}
              theme={editorTheme}
              value={panel.value}
              onChange={(v) => panel.set(v || "")}
              options={{
                fontSize: 14,
                minimap: { enabled: false },
                automaticLayout: true,
                wordWrap: "on",
              }}
            />
          </div>
        ))}
      </div>

      {/* ================= OUTPUT PREVIEW ================= */}
      <div className="h-[35%] border-t bg-background dark:bg-black shadow-inner">

        {/* Fake Browser Header */}
        <div className="flex gap-2 px-3 py-2 border-b bg-muted">
          <span className="w-3 h-3 bg-red-500 rounded-full"></span>
          <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
          <span className="w-3 h-3 bg-green-500 rounded-full"></span>
          <span className="ml-3 text-xs text-muted-foreground">Live Preview</span>
        </div>

        <iframe
          srcDoc={srcDoc}
          className="w-full h-full border-0"
          sandbox="allow-scripts"
        />
      </div>
    </div>
  );
}
