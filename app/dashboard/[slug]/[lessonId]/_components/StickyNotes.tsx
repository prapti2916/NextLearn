// /* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable react/no-unescaped-entities */
// "use client";

// import React, { useState, useEffect } from "react";

// interface Note {
//   id: string;
//   title: string;
//   content: string;
//   time: string;
// }

// interface StickyNotesProps {
//   lessonId?: string;
// }

// const StickyNotes: React.FC<StickyNotesProps> = ({ lessonId }) => {
//   const [notes, setNotes] = useState<Note[]>([]);
//   const [isOpen, setIsOpen] = useState(true);
//   const [showForm, setShowForm] = useState(false);
//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");

//   // Load notes from localStorage
//   useEffect(() => {
//     const saved = localStorage.getItem("notes");
//     if (saved) {
//       try {
//         setNotes(JSON.parse(saved));
//       } catch (e) {
//         setNotes([]);
//       }
//     }
//   }, []);

//   // Save notes to localStorage
//   useEffect(() => {
//     localStorage.setItem("notes", JSON.stringify(notes));
//   }, [notes]);

//   // Add note
//   const addNote = () => {
//     if (!title.trim()) return;

//     const newNote: Note = {
//       id: Date.now().toString(),
//       title: title.trim(),
//       content: content.trim(),
//       time: new Date().toLocaleTimeString([], {
//         hour: "2-digit",
//         minute: "2-digit",
//       }),
//     };

//     setNotes((prev) => [newNote, ...prev]);
//     setTitle("");
//     setContent("");
//     setShowForm(false);
//   };

//   // Delete note ✅ FIXED
//   const deleteNote = (id: string) => {
//     setNotes((prev) => prev.filter((note) => note.id !== id));
//   };

//   // Share single note
//   const shareNote = (note: Note) => {
//     const subject = `Study Note: ${note.title}`;
//     const body = `Title: ${note.title}\n\nContent: ${note.content}\n\nCreated at: ${note.time}`;
//     const mailtoLink = `mailto:?subject=${encodeURIComponent(
//       subject
//     )}&body=${encodeURIComponent(body)}`;
//     window.open(mailtoLink);
//   };

//   // Share all notes
//   const shareAllNotes = () => {
//     if (notes.length === 0) return;

//     const subject = "My Study Notes";
//     let body = `Here are my study notes:\n\n`;

//     notes.forEach((note, index) => {
//       body += `${index + 1}. ${note.title}\n`;
//       if (note.content) body += `   ${note.content}\n`;
//       body += `   Created: ${note.time}\n\n`;
//     });

//     const mailtoLink = `mailto:?subject=${encodeURIComponent(
//       subject
//     )}&body=${encodeURIComponent(body)}`;
//     window.open(mailtoLink);
//   };

//   // Copy to clipboard
//   const copyToClipboard = async (note: Note) => {
//     const text = `${note.title}\n${note.content}`;
//     try {
//       await navigator.clipboard.writeText(text);
//       alert("Note copied to clipboard!");
//     } catch (err) {
//       console.error("Failed to copy: ", err);
//     }
//   };

//   return (
//   <div
//   style={{
//     position: "relative",   // instead of fixed
//     marginTop: "20px",      // space below video
//     width: "100%",
//     maxWidth: "700px",      // match lesson/video width
//     backgroundColor: "white",
//     borderRadius: "12px",
//     boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
//     border: "1px solid #e5e5e5",
//     fontFamily: "system-ui, -apple-system, sans-serif",
//   }}
// >

//       {/* Header */}
//       <div
//         style={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-between",
//           padding: "16px",
//           borderBottom: isOpen ? "1px solid #f0f0f0" : "none",
//           backgroundColor: "#fafafa",
//           borderRadius: "12px 12px 0 0",
//         }}
//       >
//         <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
//           <span style={{ fontSize: "18px" }}>📝</span>
//           <span
//             style={{
//               fontWeight: "600",
//               fontSize: "14px",
//               color: "#333",
//             }}
//           >
//             Sticky Notes
//           </span>
//         </div>

//         <div style={{ display: "flex", gap: "8px" }}>
//           {notes.length > 0 && (
//             <button
//               onClick={shareAllNotes}
//               title="Share all notes via email"
//               style={{
//                 background: "none",
//                 border: "none",
//                 cursor: "pointer",
//                 fontSize: "16px",
//                 padding: "4px 8px",
//                 borderRadius: "4px",
//                 color: "#666",
//               }}
//             >
//               📧
//             </button>
//           )}
//           <button
//             onClick={() => setIsOpen(!isOpen)}
//             style={{
//               background: "none",
//               border: "none",
//               cursor: "pointer",
//               fontSize: "16px",
//               padding: "4px 8px",
//               borderRadius: "4px",
//               color: "#666",
//             }}
//           >
//             {isOpen ? "−" : "□"}
//           </button>
//         </div>
//       </div>

//       {/* Content */}
//       {isOpen && (
//         <div style={{ padding: "16px", maxHeight: "440px", overflowY: "auto" }}>
//           {/* Add Note Button */}
//           <button
//             onClick={() => setShowForm(!showForm)}
//             style={{
//               width: "100%",
//               padding: "12px",
//               border: "2px dashed #ccc",
//               borderRadius: "8px",
//               background: "white",
//               cursor: "pointer",
//               fontSize: "14px",
//               color: "#666",
//               marginBottom: "16px",
//             }}
//           >
//             + Add New Note
//           </button>

//           {/* New Note Form */}
//           {showForm && (
//             <div
//               style={{
//                 padding: "16px",
//                 border: "1px solid #e5e5e5",
//                 borderRadius: "8px",
//                 marginBottom: "16px",
//                 backgroundColor: "#f9f9f9",
//               }}
//             >
//               <input
//                 type="text"
//                 placeholder="Note title..."
//                 value={title}
//                 onChange={(e) => setTitle(e.target.value)}
//                 style={{
//                   width: "100%",
//                   padding: "8px 12px",
//                   border: "1px solid #ddd",
//                   borderRadius: "6px",
//                   fontSize: "14px",
//                   marginBottom: "8px",
//                 }}
//               />
//               <textarea
//                 placeholder="Note content..."
//                 value={content}
//                 onChange={(e) => setContent(e.target.value)}
//                 style={{
//                   width: "100%",
//                   padding: "8px 12px",
//                   border: "1px solid #ddd",
//                   borderRadius: "6px",
//                   fontSize: "14px",
//                   height: "80px",
//                   resize: "none",
//                   marginBottom: "12px",
//                 }}
//               />
//               <div
//                 style={{
//                   display: "flex",
//                   gap: "8px",
//                   justifyContent: "flex-end",
//                 }}
//               >
//                 <button
//                   onClick={() => setShowForm(false)}
//                   style={{
//                     padding: "8px 16px",
//                     border: "1px solid #ddd",
//                     borderRadius: "6px",
//                     background: "white",
//                     cursor: "pointer",
//                     fontSize: "12px",
//                     color: "#666",
//                   }}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={addNote}
//                   style={{
//                     padding: "8px 16px",
//                     border: "none",
//                     borderRadius: "6px",
//                     background: "#007bff",
//                     color: "white",
//                     cursor: "pointer",
//                     fontSize: "12px",
//                   }}
//                 >
//                   Save
//                 </button>
//               </div>
//             </div>
//           )}

//           {/* Notes List */}
//           <div>
//             {notes.length === 0 ? (
//               <div
//                 style={{
//                   textAlign: "center",
//                   padding: "40px 20px",
//                   color: "#999",
//                   fontSize: "14px",
//                 }}
//               >
//                 No notes yet. Click "Add New Note" to get started!
//               </div>
//             ) : (
//               notes.map((note) => (
//                 <div
//                   key={note.id}
//                   style={{
//                     padding: "12px",
//                     marginBottom: "8px",
//                     border: "1px solid #e5e5e5",
//                     borderRadius: "8px",
//                     backgroundColor: "#fff8dc",
//                     position: "relative",
//                   }}
//                 >
//                   <div
//                     style={{
//                       display: "flex",
//                       justifyContent: "space-between",
//                       alignItems: "flex-start",
//                       marginBottom: "8px",
//                     }}
//                   >
//                     <h4
//                       style={{
//                         margin: "0",
//                         fontSize: "14px",
//                         fontWeight: "600",
//                         color: "#333",
//                       }}
//                     >
//                       {note.title}
//                     </h4>
//                     <div
//                       style={{
//                         display: "flex",
//                         alignItems: "center",
//                         gap: "4px",
//                       }}
//                     >
//                       <span
//                         style={{ fontSize: "11px", color: "#666" }}
//                       >
//                         {note.time}
//                       </span>
//                       <button
//                         onClick={() => copyToClipboard(note)}
//                         title="Copy note"
//                         style={{
//                           background: "none",
//                           border: "none",
//                           cursor: "pointer",
//                           fontSize: "12px",
//                         }}
//                       >
//                         📋
//                       </button>
//                       <button
//                         onClick={() => shareNote(note)}
//                         title="Share via email"
//                         style={{
//                           background: "none",
//                           border: "none",
//                           cursor: "pointer",
//                           fontSize: "12px",
//                         }}
//                       >
//                         📧
//                       </button>
//                       <button
//                         onClick={() => deleteNote(note.id)}
//                         title="Delete note"
//                         style={{
//                           background: "none",
//                           border: "none",
//                           cursor: "pointer",
//                           fontSize: "16px",
//                           color: "#999",
//                         }}
//                       >
//                         ×
//                       </button>
//                     </div>
//                   </div>
//                   {note.content && (
//                     <p
//                       style={{
//                         margin: "0",
//                         fontSize: "13px",
//                         color: "#555",
//                         lineHeight: "1.4",
//                       }}
//                     >
//                       {note.content}
//                     </p>
//                   )}
//                 </div>
//               ))
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default StickyNotes;



/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useState, useEffect } from "react";

interface Note {
  id: string;
  title: string;
  content: string;
  time: string;
}

interface StickyNotesProps {
  lessonId?: string;
}

const StickyNotes: React.FC<StickyNotesProps> = ({ lessonId }) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isOpen, setIsOpen] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // Load notes
  useEffect(() => {
    const saved = localStorage.getItem("notes");
    if (saved) {
      try {
        setNotes(JSON.parse(saved));
      } catch {
        setNotes([]);
      }
    }
  }, []);

  // Save notes
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    if (!title.trim()) return;

    const newNote: Note = {
      id: Date.now().toString(),
      title: title.trim(),
      content: content.trim(),
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setNotes((prev) => [newNote, ...prev]);
    setTitle("");
    setContent("");
    setShowForm(false);
  };

  const deleteNote = (id: string) => {
    setNotes((prev) => prev.filter((note) => note.id !== id));
  };

  const shareNote = (note: Note) => {
    const subject = `Study Note: ${note.title}`;
    const body = `Title: ${note.title}\n\nContent: ${note.content}\n\nCreated at: ${note.time}`;

    const mailtoLink = `mailto:?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    window.open(mailtoLink);
  };

  const shareAllNotes = () => {
    if (notes.length === 0) return;

    const subject = "My Study Notes";
    let body = `Here are my study notes:\n\n`;

    notes.forEach((note, index) => {
      body += `${index + 1}. ${note.title}\n`;
      if (note.content) body += `   ${note.content}\n`;
      body += `   Created: ${note.time}\n\n`;
    });

    const mailtoLink = `mailto:?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    window.open(mailtoLink);
  };

  const copyToClipboard = async (note: Note) => {
    const text = `${note.title}\n${note.content}`;
    await navigator.clipboard.writeText(text);
    alert("Note copied!");
  };

  return (
    <div className="relative mt-5 w-full max-w-[700px] rounded-xl border border-border bg-card shadow-lg">
      
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border bg-muted rounded-t-xl">
        <div className="flex items-center gap-2">
          <span className="text-lg">📝</span>
          <span className="font-semibold text-sm">Sticky Notes</span>
        </div>

        <div className="flex gap-2">
          {notes.length > 0 && (
            <button
              onClick={shareAllNotes}
              title="Share all notes"
              className="text-sm hover:opacity-70"
            >
              📧
            </button>
          )}

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-sm hover:opacity-70"
          >
            {isOpen ? "−" : "□"}
          </button>
        </div>
      </div>

      {/* Content */}
      {isOpen && (
        <div className="p-4 max-h-[440px] overflow-y-auto">

          {/* Add Button */}
          <button
            onClick={() => setShowForm(!showForm)}
            className="w-full p-3 mb-4 border-2 border-dashed rounded-lg border-border bg-background hover:bg-muted transition"
          >
            + Add New Note
          </button>

          {/* Form */}
          {showForm && (
            <div className="p-4 mb-4 border border-border rounded-lg bg-muted/40">
              <input
                type="text"
                placeholder="Note title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full mb-2 p-2 rounded-md border border-border bg-background"
              />

              <textarea
                placeholder="Note content..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full mb-3 p-2 h-[80px] rounded-md border border-border bg-background resize-none"
              />

              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setShowForm(false)}
                  className="px-3 py-1 text-sm border rounded-md border-border hover:bg-muted"
                >
                  Cancel
                </button>

                <button
                  onClick={addNote}
                  className="px-3 py-1 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700"
                >
                  Save
                </button>
              </div>
            </div>
          )}

          {/* Notes */}
          {notes.length === 0 ? (
            <div className="text-center text-sm opacity-60 py-10">
              No notes yet. Click "Add New Note"
            </div>
          ) : (
            notes.map((note) => (
              <div
                key={note.id}
                className="p-3 mb-2 border border-border rounded-lg bg-yellow-100 dark:bg-yellow-900"
              >
                <div className="flex justify-between items-start mb-1">
                  <h4 className="text-sm font-semibold">{note.title}</h4>

                  <div className="flex items-center gap-1 text-xs">
                    <span>{note.time}</span>

                    <button onClick={() => copyToClipboard(note)}>
                      📋
                    </button>

                    <button onClick={() => shareNote(note)}>
                      📧
                    </button>

                    <button onClick={() => deleteNote(note.id)}>
                      ✕
                    </button>
                  </div>
                </div>

                {note.content && (
                  <p className="text-sm opacity-80">{note.content}</p>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default StickyNotes;