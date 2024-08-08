import React from 'react';
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import juice from 'juice';

function uploadAdapter(loader) {
  return {
    upload: () => {
      return loader.file.then(
        (file) =>
          new Promise((resolve, reject) => {
            const toBase64 = (file) =>
              new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result);
                reader.onerror = (error) => reject(error);
              });
            const base64_image = toBase64(file).then((data) => {
              return resolve({
                default: data
              });
            });
            loader.uploaded = true;
            return base64_image;
          })
      );
    }
  };
}

function uploadPlugin(editor) {
  editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
    return uploadAdapter(loader);
  };
}

const cssContent = `table {width: 100%} 
                    td {border: 1px solid #bfbfbf; padding: 2px} 
                    h2 { font-size: 24px; font-weight: bold; } 
                    h3 { font-size: 20px; font-weight: bold; } 
                    h4 { font-size: 18px; font-weight: bold; } 
                    p { font-size: 16px; } 
                    ul { list-style-type: disc; } 
                    ol { list-style-type: decimal; }
                    .image-style-side {
                      float: right;
                      margin-left: 1.5em;
                      max-width: 50%;
                    }
                    .image {
                      clear: both;
                      display: table;
                      margin: .9em auto;
                      min-width: 50px;
                      text-align: center;
                    }
                    `;

const CKTextEditor = ({ data, setDataEditor }) => {
  return (
    <>
        <style jsx global>{`
          .ck-content h2 { font-size: 24px; font-weight: bold; }
          .ck-content h3 { font-size: 20px; font-weight: bold; }
          .ck-content h4 { font-size: 18px; font-weight: bold; }
          .ck-content p { font-size: 16px; }
        `}</style>
        <CKEditor
          editor={ClassicEditor}
          config={{
              toolbar: [
                "heading",
                "|",
                "bold",
                "italic",
                "link",
                "bulletedList",
                "numberedList",
                "blockQuote",
                "ckfinder",
                "|",
                "imageTextAlternative",
                "imageUpload",
                "imageStyle:side",
                "|",
                "mediaEmbed",
                "insertTable",
                "tableColumn",
                "tableRow",
                "mergeTableCells",
                "|",
                "undo",
                "redo"
              ],
              extraPlugins: [uploadPlugin],
              mediaEmbed: {
                previewsInData: true
              },
          }}
          onReady={(editor) => {}}
          onBlur={(event, editor) => {}}
          onFocus={(event, editor) => {}}
          onChange={(event, editor) => {
            const htmlContent = editor.getData()
            const inlinedHtmlContent = juice.inlineContent(htmlContent, cssContent) 
            setDataEditor(htmlContent, inlinedHtmlContent);
          }}
          data={data}
        />
    </>
  )
}

export default CKTextEditor