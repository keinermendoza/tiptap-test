import React, { useEffect, useRef, memo, useState } from 'react'
import EditorJS from '@editorjs/editorjs';

const Editor = ({ data, onChange, editorblock, tools }) => {
    const ref = useRef();
    //Initialize editorjs
    useEffect(() => {
      //Initialize editorjs if we don't have a reference
      if (!ref.current) {
        const editor = new EditorJS({
          holder: editorblock,
  
          tools: tools,
          data: data,
          async onChange(api, event) {
            const data = await api.saver.save();
            onChange(data);
          },
        });
        ref.current = editor;
      }
  
      //Add a return function to handle cleanup
      return () => {
        if (ref.current && ref.current.destroy) {
          ref.current.destroy();
        }
      };
    }, []);
    return <div id={editorblock} />;
  };
  

export default memo(Editor);