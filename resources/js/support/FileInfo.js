export function humanFileSize(size) {
    if (size) {
        if (size > (1000 * 1000)) {
            return ((size / (1000 *1000)).toFixed(1) + ' Mb').replace('.', ',')
        }
        if (size > 1024) {
            return ((size / 1000).toFixed(1) + ' kb').replace('.', ',')
        }
        return ((size).toFixed(1) + ' *kb').replace('.', ',')
    }

    return 'unknow size'
}

/**
 * @param {File} file
 * @param {String} uuid
 * **/
export function normalizeFileToShow(file,uuid) {
    if (!(file instanceof File)) {
        return false
    }
    return {
        name: file.name,
        size: file.size,
        type: file.type,
        is_new: true,
        is_success: false,
        error : false,
        filekey : uuid,
        progress: 0,
        'url': URL.createObjectURL(file),
    }
}

export function checkFile(file) {
    return {
        _minSize : null,
        _maxSize : null,
        _acceptedFileTypes : null,
        minSize(minSize){
            this._minSize = minSize
            return this
        },
        maxSize(maxSize) {
            this._maxSize = maxSize
            return this
        },
        fileType(acceptedFileTypes){
            this._acceptedFileTypes = acceptedFileTypes
            return this
        },
        check() {
            return !checkFileType(file, this.acceptedFileTypes)
                || !checkMaxSize(file, this._maxSize)
                || !checkMinSize(file, this._minSize)
        }
    }
}

/**
 * @param {FileList} files
 * @param {number|none} maxFiles
 * @param {number} nbFilesUpload
 *
 * @return {boolean}
 */
export function checkMaxFile(files, maxFiles, nbFilesUpload) {
    const nbFiles = files.length + nbFilesUpload

    return !(maxFiles && nbFiles > maxFiles);
}
/**
 * @param {File} file
 * @param {number|none} minSize
 *
 * @return {boolean}
 */
export function checkMinSize(file, minSize) {
    return !(minSize && file.size > minSize);
}
/**
 * @param {File} file
 * @param {number|none} maxSize
 *
 * @return {boolean}
 */
export function checkMaxSize(file, maxSize) {
    return !(maxSize && file.size >( maxSize * 1024));
}

/**
 * @param {File} file
 * @param {Array} fileTypes
 *
 * @return {boolean}
 */
export function checkFileType(file, fileTypes) {
    if(fileTypes) {
        let type = fileTypes.filter(type => type === file.type);
        return type.length > 0
    }
    return true
}


export function uuid() {
    return (
        [1e7] +
        -1e3 +
        -4e3 +
        -8e3 +
        -1e11
    ).replace(/[018]/g, (c) =>
        (
            c ^
            (crypto.getRandomValues(
                    new Uint8Array(1),
                )[0] &
                (15 >> (c / 4)))
        ).toString(16)
    )
}
