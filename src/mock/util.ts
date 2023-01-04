const responseBody = {
    success: true
} as apiResult

type apiResult = {
    success?: Boolean,
    data?: any,
    message?: string
}

export const builder = (data: any, message?: any, code = 0, headers = {}) => {
    responseBody.data = data
    if (message !== undefined && message !== null) {
        responseBody.message = message
    }
    if (code !== undefined && code !== 0) {
    }
    return responseBody
}

export const getQueryParameters = (options: any) => {
    const url = options.url
    const search = url.split('?')[1]
    if (!search) {
        return {}
    }
    return JSON.parse('{"' + decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"') + '"}')
}

export const getBody = (options: any) => {
    return options.body && JSON.parse(options.body)
}
