// 'use client';

// import React, { useState, useEffect } from 'react';
// import ReactMarkdown from 'react-markdown';
// import remarkGfm from 'remark-gfm';
// import rehypeRaw from 'rehype-raw';
// import rehypeSanitize from 'rehype-sanitize';
// import rehypeHighlight from 'rehype-highlight';
// import 'highlight.js/styles/github-dark.css'; // Darker syntax highlighting

// import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
// import { Button } from "@/components/ui/button";
// import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle } from "@/components/ui/dialog";
// import { Textarea } from "@/components/ui/textarea";

// const MarkdownEditor: React.FC = () => {
//   const [markdown, setMarkdown] = useState<string>('');
//   const [isEditing, setIsEditing] = useState<boolean>(true); // Initially in editing mode
//   const [openDialog, setOpenDialog] = useState<boolean>(false);
//   const [activeTab, setActiveTab] = useState<'write' | 'preview'>('write');

//   useEffect(() => {
//     // Retrieve saved markdown from localStorage (if available)
//     const savedMarkdown = localStorage.getItem('markdown');
//     if (savedMarkdown) {
//       setMarkdown(savedMarkdown);
//       setIsEditing(false); // Switch to preview mode if markdown exists
//       setActiveTab('preview');
//     }
//   }, []);

//   const handleMarkdownChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
//     setMarkdown(e.target.value);
//   };

//   const handleSave = () => {
//     if (markdown) {
//       // Save markdown to localStorage
//       localStorage.setItem('markdown', markdown);
//       setIsEditing(false);
//       setActiveTab('preview');
//       setOpenDialog(true);
//     }
//   };

//   const handleEdit = () => {
//     setIsEditing(true);
//     setActiveTab('write');
//   };

//   return (
//     <div className="container mx-auto p-6 max-w-6xl space-y-4"> {/* Increased max width */}
//       <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
//         <TabsList className="mb-4">
//           <TabsTrigger value="write">Write</TabsTrigger>
//           {/* Show preview tab only if markdown exists */}
//           {!isEditing && markdown && <TabsTrigger value="preview">Preview</TabsTrigger>}
//         </TabsList>

//         {/* Write Mode */}
//         {isEditing && (
//           <TabsContent value="write">
//             <Textarea
//               className="w-full h-64 p-2 font-mono bg-gray-800 text-white" // Dark background with white text for textarea
//               value={markdown}
//               onChange={handleMarkdownChange}
//               placeholder="Write your markdown here..."
//             />
//             <Button onClick={handleSave} className="mt-4 bg-green-600">
//               Save
//             </Button>
//           </TabsContent>
//         )}

//         {/* Preview Mode */}
//         {!isEditing && (
//           <TabsContent value="preview">
//             <div className="prose prose-invert prose-pre:bg-gray-900 prose-pre:text-white max-w-none p-4 bg-gray-900 text-white rounded-lg shadow-md">
//               <ReactMarkdown
//                 remarkPlugins={[remarkGfm]}
//                 rehypePlugins={[rehypeRaw, rehypeSanitize, rehypeHighlight]}
//               >
//                 {markdown}
//               </ReactMarkdown>
//             </div>
//             <Button onClick={handleEdit} className="mt-4 bg-blue-600">
//               Edit
//             </Button>
//           </TabsContent>
//         )}
//       </Tabs>

//       {/* Save Dialog */}
//       <Dialog open={openDialog} onOpenChange={setOpenDialog}>
//         <DialogTrigger asChild>
//           <Button className="hidden">Open Dialog</Button>
//         </DialogTrigger>
//         <DialogContent className="bg-gray-800 text-white">
//           <DialogHeader>
//             <DialogTitle>Markdown Saved</DialogTitle>
//           </DialogHeader>
//           <div className="space-y-2">
//             <p>Your markdown has been saved successfully!</p>
//           </div>
//           <DialogFooter>
//             <Button onClick={() => setOpenDialog(false)}>OK</Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default MarkdownEditor;










// 'use client'


// import React, { useState, useEffect } from 'react';
// import ReactMarkdown from 'react-markdown';
// import remarkGfm from 'remark-gfm';
// import rehypeRaw from 'rehype-raw';
// import rehypeSanitize from 'rehype-sanitize';
// import rehypeHighlight from 'rehype-highlight';
// import 'highlight.js/styles/github.css';

// const MarkdownEditor: React.FC = () => {
//   const [markdown, setMarkdown] = useState<string>('');
//   const [activeTab, setActiveTab] = useState<'write' | 'preview'>('write');
//   const [fileName, setFileName] = useState<string>('Untitled');
//   const [isEditing, setIsEditing] = useState<boolean>(false);

//   useEffect(() => {
//     if (markdown && !isEditing) {
//       setIsEditing(true);
//     }
//   }, [markdown]);

//   const handleMarkdownChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
//     setMarkdown(e.target.value);
//   };

//   const handleSave = () => {
//     setActiveTab('preview');
//     // Here you would typically save the markdown to a backend or local storage
//     console.log('Saving markdown:', markdown);
//   };

//   const handleFileNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFileName(e.target.value);
//   };

//   return (
//     <div className="container mx-auto p-4 max-w-4xl">
//       <div className="flex justify-between items-center mb-4">
//         <div className="flex">
//           <button
//             className={`px-4 py-2 mr-2 rounded-t-lg ${
//               activeTab === 'write' ? 'bg-blue-500 text-white' : 'bg-gray-200'
//             }`}
//             onClick={() => setActiveTab('write')}
//           >
//             Write
//           </button>
//           <button
//             className={`px-4 py-2 rounded-t-lg ${
//               activeTab === 'preview' ? 'bg-blue-500 text-white' : 'bg-gray-200'
//             }`}
//             onClick={() => setActiveTab('preview')}
//           >
//             Preview
//           </button>
//         </div>
//         {isEditing && (
//           <input
//             type="text"
//             value={fileName}
//             onChange={handleFileNameChange}
//             className="px-2 py-1 border rounded"
//           />
//         )}
//       </div>
//       <div className="border rounded-b-lg p-4">
//         {activeTab === 'write' ? (
//           <div>
//             <textarea
//               className="w-full h-64 p-2 border rounded mb-4 font-mono"
//               value={markdown}
//               onChange={handleMarkdownChange}
//               placeholder="Write your markdown here..."
//             />
//             <button
//               onClick={handleSave}
//               className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
//             >
//               Save
//             </button>
//           </div>
//         ) : (
//           <div className="prose prose-blue max-w-none">
//             <ReactMarkdown
//               remarkPlugins={[remarkGfm]}
//               rehypePlugins={[rehypeRaw, rehypeSanitize, rehypeHighlight]}
//             >
//               {markdown}
//             </ReactMarkdown>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MarkdownEditor;