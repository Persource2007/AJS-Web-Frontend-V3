var previewTemplate, dropzone, dropzonePreviewNode = document.querySelector("#dropzone-preview-list"),
        inputMultipleElements = (dropzonePreviewNode.id = "", dropzonePreviewNode && (previewTemplate = dropzonePreviewNode.parentNode.innerHTML, dropzonePreviewNode.parentNode.removeChild(dropzonePreviewNode), dropzone = new Dropzone(".dropzone", {
            url: "https://httpbin.org/post",
            method: "post",
            previewTemplate: previewTemplate,
            previewsContainer: "#dropzone-preview"
        })), FilePond.registerPlugin(FilePondPluginFileEncode, FilePondPluginFileValidateSize, FilePondPluginImageExifOrientation, FilePondPluginImagePreview), document.querySelectorAll("input.filepond-input-multiple"));
inputMultipleElements && (Array.from(inputMultipleElements).forEach(function (e) {
    FilePond.create(e)
}), FilePond.create(document.querySelector(".filepond-input-circle"), {
    labelIdle: 'Drag & Drop your picture or <span class="filepond--label-action">Browse</span>',
    imagePreviewHeight: 170,
    imageCropAspectRatio: "1:1",
    imageResizeTargetWidth: 200,
    imageResizeTargetHeight: 200,
    stylePanelLayout: "compact circle",
    styleLoadIndicatorPosition: "center bottom",
    styleProgressIndicatorPosition: "right bottom",
    styleButtonRemoveItemPosition: "left bottom",
    styleButtonProcessItemPosition: "right bottom"
}));

var previewTemplate1, dropzone1, dropzonePreviewNode1 = document.querySelector("#dropzone-preview-list-document"),
        inputMultipleElements = (dropzonePreviewNode1.id = "", dropzonePreviewNode1 && (previewTemplate1 = dropzonePreviewNode1.parentNode.innerHTML, dropzonePreviewNode1.parentNode.removeChild(dropzonePreviewNode1), dropzone1 = new Dropzone(".dropzone1", {
            url: "https://httpbin.org/post",
            method: "post",
            previewTemplate: previewTemplate1,
            previewsContainer: "#dropzone-preview-document"
        })), FilePond.registerPlugin(FilePondPluginFileEncode, FilePondPluginFileValidateSize, FilePondPluginImageExifOrientation, FilePondPluginImagePreview), document.querySelectorAll("input.filepond-input-multiple"));
inputMultipleElements && (Array.from(inputMultipleElements).forEach(function (e) {
    FilePond.create(e)
}), FilePond.create(document.querySelector(".filepond-input-circle-document"), {
    labelIdle: 'Drag & Drop your picture or <span class="filepond--label-action">Browse</span>',
    imagePreviewHeight: 170,
    imageCropAspectRatio: "1:1",
    imageResizeTargetWidth: 200,
    imageResizeTargetHeight: 200,
    stylePanelLayout: "compact circle",
    styleLoadIndicatorPosition: "center bottom",
    styleProgressIndicatorPosition: "right bottom",
    styleButtonRemoveItemPosition: "left bottom",
    styleButtonProcessItemPosition: "right bottom"
}));