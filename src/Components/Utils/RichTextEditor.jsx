import React, { useState, useRef, useCallback, useMemo } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Button } from 'react-bootstrap';
import '../../Static/rts.css';

const RichTextEditor = ({createNote, setBody, body}) => {
    const quillRef = useRef();

    const imageHandler = useCallback(() => {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();

        input.onchange = async () => {
            const file = input.files[0];
            const reader = new FileReader();
            reader.onload = () => {
                const quill = quillRef.current.getEditor();
                const range = quill.getSelection(true);
                quill.insertEmbed(range.index, 'image', reader.result);
            };
            reader.readAsDataURL(file);
        };
    }, []);

    const modules = useMemo(() => ({
        toolbar: {
            container: [
                [{ header: [2, 3, 4, false] }],
                ['bold', 'italic', 'underline', 'blockquote'],
                [{ list: 'ordered' }, { list: 'bullet' }],
                // ['link', 'image'],
                // ['clean'],
            ],
            handlers: {
                image: imageHandler,
            },
        },
    }), [imageHandler]);

    return (
        <>
            <ReactQuill
                ref={quillRef}
                value={body}
                onChange={setBody}
                modules={modules}
            />
            <div style={{display:'flex', justifyContent:'end'}}>
                <Button className='buttonCustom' onClick={createNote}>Create</Button>
            </div>
        </>
    );
};

export default RichTextEditor;