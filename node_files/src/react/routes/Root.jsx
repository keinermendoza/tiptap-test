import React from 'react'

import Document from '@tiptap/extension-document'
import Heading from '@tiptap/extension-heading'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import Dropcursor from '@tiptap/extension-dropcursor'
import { EditorContent, useEditor } from '@tiptap/react'
import Image from '@tiptap/extension-image'
import { useCallback } from 'react'
import Drop from '../components/Drop'
export default function Root() {
  const editor = useEditor({
    extensions: [
      Document,
      Paragraph,
      Text,
      Image,
      Dropcursor,
      Heading.configure({
        levels: [1, 2, 3],
      }),
    ],
    content: `
        <h1>This is a 1st level heading</h1>
        <h2>This is a 2nd level heading</h2>
        <h3>This is a 3rd level heading</h3>
        <h4>This 4th level heading will be converted to a paragraph, because levels are configured to be only 1, 2 or 3.</h4>
      `,
  })

  const addImage = useCallback(() => {
    const url = window.prompt('URL')

    if (url) {
      editor.chain().focus().setImage({ src: url }).run()
    }
  }, [editor])

  if (!editor) {
    return null
  }

  return (
    <>
      <Drop />
      <div className="control-group">
        <div className="button-group">
          <button onClick={addImage}>Set image</button>
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
          >
            H1
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
          >
            H2
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
          >
            H3
          </button>
        </div>
      </div>

      <EditorContent editor={editor} />
    </>
  )
}